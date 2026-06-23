import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

// Parse .env manually
const envText = fs.readFileSync('.env', 'utf8');
const env: Record<string, string> = {};
envText.split(/\r?\n/).forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseAnonKey = env['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase env variables!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspect() {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('course_id', 'java');

  if (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }

  console.log(`Total Java questions in Supabase: ${data.length}`);

  // Check for duplicates
  const seen = new Set<string>();
  const duplicates: any[] = [];
  const placeholderQuestions: any[] = [];

  for (const q of data) {
    const key = `${q.experiment_id}-${q.type}-${q.question.trim().toLowerCase()}`;
    if (seen.has(key)) {
      duplicates.push(q);
    } else {
      seen.add(key);
    }

    // Check if the question looks like a placeholder
    const qText = q.question.toLowerCase();
    if (
      qText.includes('replace this') || 
      qText.includes('placeholder') || 
      qText.includes('todo') ||
      /q[0-9]+[\.\:]/.test(qText) || // e.g. "Q1. ..."
      qText.startsWith('question ') ||
      qText.includes('option a')
    ) {
      placeholderQuestions.push(q);
    }
  }

  console.log(`Duplicate questions found: ${duplicates.length}`);
  if (duplicates.length > 0) {
    console.log("Sample duplicates:", duplicates.slice(0, 5).map(d => ({ exp: d.experiment_id, q: d.question })));
  }

  console.log(`Suspected placeholder questions found: ${placeholderQuestions.length}`);
  if (placeholderQuestions.length > 0) {
    console.log("Sample placeholders:", placeholderQuestions.slice(0, 10).map(p => ({ exp: p.experiment_id, q: p.question })));
  }

  // Count how many questions per experiment/type
  const counts: Record<string, { pretest: number, posttest: number }> = {};
  for (const q of data) {
    if (!counts[q.experiment_id]) {
      counts[q.experiment_id] = { pretest: 0, posttest: 0 };
    }
    if (q.type === 'pretest') {
      counts[q.experiment_id].pretest++;
    } else if (q.type === 'posttest') {
      counts[q.experiment_id].posttest++;
    }
  }

  console.log("\nQuestions distribution:");
  for (const [expId, c] of Object.entries(counts).sort()) {
    console.log(`  ${expId}: pretest=${c.pretest}, posttest=${c.posttest}`);
  }
}

inspect();
