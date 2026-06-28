import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import { javaCourse } from '../src/lib/java-data';

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

export async function getQuestionsForExperiment(
  courseId: string,
  experimentId: string,
  type: 'pretest' | 'posttest'
) {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('course_id', courseId)
    .eq('experiment_id', experimentId)
    .eq('type', type);

  if (error) {
    console.error('Error fetching questions:', error.message);
    return [];
  }
  return data || [];
}

async function testFetch() {
  console.log("Checking all Java experiments for questions in Supabase...");
  let totalExps = 0;
  let emptyExps: string[] = [];

  for (const week of javaCourse.weeks) {
    for (const exp of week.experiments) {
      totalExps++;
      const pre = await getQuestionsForExperiment('java', exp.id, 'pretest');
      const post = await getQuestionsForExperiment('java', exp.id, 'posttest');
      
      console.log(`Experiment ${exp.id}: Pretest count in DB = ${pre.length}, Posttest count in DB = ${post.length}`);
      if (pre.length === 0 || post.length === 0) {
        emptyExps.push(exp.id);
      }
    }
  }

  console.log("\nSummary:");
  console.log(`Total Java Experiments checked: ${totalExps}`);
  console.log(`Experiments missing questions in database: ${emptyExps.length}`);
  if (emptyExps.length > 0) {
    console.log("Missing experiments:", emptyExps);
  } else {
    console.log("All Java experiments have questions in the Supabase database!");
  }
}

testFetch();
