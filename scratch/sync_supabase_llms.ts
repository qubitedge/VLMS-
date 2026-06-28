import { createClient } from '@supabase/supabase-js';
import { courses } from '../src/lib/course-data';

// Load credentials
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in process.env!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function sync() {
  console.log("Connecting to Supabase...");
  
  // 1. Delete existing LLM questions
  console.log("Deleting old questions for course 'llms' in Supabase...");
  const { error: deleteError } = await supabase
    .from('questions')
    .delete()
    .eq('course_id', 'llms');
    
  if (deleteError) {
    console.error("Failed to delete old questions:", deleteError.message);
    process.exit(1);
  }
  console.log("Old LLM questions deleted successfully.");

  // 2. Upload new clean questions
  const llmsCourse = courses['llms'];
  if (!llmsCourse) {
    console.error("LLMs course not found in course-data.ts!");
    process.exit(1);
  }

  const rowsToInsert: any[] = [];
  
  llmsCourse.weeks.forEach(week => {
    week.experiments.forEach(exp => {
      const pretest = exp.content?.pretest || [];
      const posttest = exp.content?.posttest || [];
      
      pretest.forEach(q => {
        rowsToInsert.push({
          course_id: 'llms',
          experiment_id: exp.id,
          type: 'pretest',
          question: q.question,
          options: q.options,
          answer_index: q.answerIndex
        });
      });
      
      posttest.forEach(q => {
        rowsToInsert.push({
          course_id: 'llms',
          experiment_id: exp.id,
          type: 'posttest',
          question: q.question,
          options: q.options,
          answer_index: q.answerIndex
        });
      });
    });
  });

  if (rowsToInsert.length === 0) {
    console.log("No questions found locally to upload.");
    process.exit(0);
  }

  console.log(`Uploading ${rowsToInsert.length} clean questions to Supabase...`);
  
  // Insert in batches of 50 to prevent size limits
  const batchSize = 50;
  for (let i = 0; i < rowsToInsert.length; i += batchSize) {
    const batch = rowsToInsert.slice(i, i + batchSize);
    const { error: insertError } = await supabase
      .from('questions')
      .insert(batch);
      
    if (insertError) {
      console.error(`Error uploading batch starting at index ${i}:`, insertError.message);
      process.exit(1);
    }
  }

  console.log("✅ Successfully synced LLM questions with Supabase!");
  process.exit(0);
}

sync();
