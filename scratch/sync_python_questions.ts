import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import { pythonCourse } from '../src/lib/python-data';

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

async function sync() {
  console.log("Deleting existing python questions in Supabase...");
  const { error: deleteError } = await supabase
    .from('questions')
    .delete()
    .eq('course_id', 'python');

  if (deleteError) {
    console.error("Error deleting old questions:", deleteError.message);
    process.exit(1);
  }
  console.log("Successfully deleted old python questions.");

  const rows: any[] = [];

  for (const week of pythonCourse.weeks) {
    for (const exp of week.experiments) {
      if (exp.content?.pretest) {
        console.log(`Gathering pretest for ${exp.id} (${exp.content.pretest.length} questions)...`);
        exp.content.pretest.forEach(q => {
          rows.push({
            course_id: 'python',
            experiment_id: exp.id,
            type: 'pretest',
            question: q.question,
            options: q.options,
            answer_index: q.answerIndex
          });
        });
      }

      if (exp.content?.posttest) {
        console.log(`Gathering posttest for ${exp.id} (${exp.content.posttest.length} questions)...`);
        exp.content.posttest.forEach(q => {
          rows.push({
            course_id: 'python',
            experiment_id: exp.id,
            type: 'posttest',
            question: q.question,
            options: q.options,
            answer_index: q.answerIndex
          });
        });
      }
    }
  }

  console.log(`Inserting ${rows.length} questions into Supabase...`);
  
  // Insert in batches of 100 to avoid request size limits if any
  const batchSize = 100;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error: insertError } = await supabase
      .from('questions')
      .insert(batch);

    if (insertError) {
      console.error(`Error inserting batch starting at index ${i}:`, insertError.message);
      process.exit(1);
    }
    console.log(`Inserted batch ${i} to ${Math.min(i + batchSize, rows.length)}`);
  }

  console.log("Successfully synchronized all python questions!");
}

sync();
