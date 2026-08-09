import { createClient } from '@supabase/supabase-js';
import { datavizPandasCourse } from '../src/lib/dataviz-pandas-data';

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://rfbxbwuwlrhsfesbpmps.supabase.co";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_nE2cac4RcWpk0OsjRpmd3A_a4Z9feRb";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function sync() {
  const courseId = datavizPandasCourse.id; // "data-visualization-with-pandas"
  console.log(`Connecting to Supabase to sync questions for [${courseId}]...`);
  
  // 1. Delete existing questions for this course
  console.log(`Deleting old questions for course '${courseId}'...`);
  const { error: deleteError } = await supabase
    .from('questions')
    .delete()
    .eq('course_id', courseId);
    
  if (deleteError) {
    console.error("Failed to delete old questions:", deleteError.message);
  } else {
    console.log("Old questions cleared successfully.");
  }

  // 2. Prepare new questions rows
  const rowsToInsert: any[] = [];
  
  datavizPandasCourse.weeks.forEach(week => {
    week.experiments.forEach(exp => {
      const pretest = exp.content?.pretest || [];
      const posttest = exp.content?.posttest || [];
      
      pretest.forEach(q => {
        rowsToInsert.push({
          course_id: courseId,
          experiment_id: exp.id,
          type: 'pretest',
          question: q.question,
          options: q.options,
          answer_index: q.answerIndex
        });
      });
      
      posttest.forEach(q => {
        rowsToInsert.push({
          course_id: courseId,
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
    console.log("No questions found locally in datavizPandasCourse!");
    process.exit(0);
  }

  console.log(`Uploading ${rowsToInsert.length} pretest and posttest questions to Supabase...`);
  
  // Batch insertion
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

  console.log("✅ Successfully synced Data Visualization with Pandas questions with Supabase!");
  process.exit(0);
}

sync();
