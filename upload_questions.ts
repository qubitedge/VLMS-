import { supabase } from './src/lib/supabase';
import { courses } from './src/lib/course-data';

async function upload() {
  console.log("Starting upload...");
  let totalUploaded = 0;

  try {
    for (const courseId of Object.keys(courses)) {
      const course = courses[courseId];
      
      for (const week of course.weeks) {
        for (const exp of week.experiments) {
          
          if (exp.content.pretest && exp.content.pretest.length > 0) {
            console.log(`Uploading pretest for ${courseId} - ${exp.id}...`);
            const pretestRows = exp.content.pretest.map(q => ({
              course_id: course.id,
              experiment_id: exp.id,
              type: 'pretest',
              question: q.question,
              options: q.options,
              answer_index: q.answerIndex
            }));
            
            const { error } = await supabase.from('questions').insert(pretestRows);
            if (error) {
              console.error(`Error uploading pretest for ${exp.id}:`, error.message);
            } else {
              totalUploaded += pretestRows.length;
            }
          }
          
          if (exp.content.posttest && exp.content.posttest.length > 0) {
            console.log(`Uploading posttest for ${courseId} - ${exp.id}...`);
            const posttestRows = exp.content.posttest.map(q => ({
              course_id: course.id,
              experiment_id: exp.id,
              type: 'posttest',
              question: q.question,
              options: q.options,
              answer_index: q.answerIndex
            }));
            
            const { error } = await supabase.from('questions').insert(posttestRows);
            if (error) {
              console.error(`Error uploading posttest for ${exp.id}:`, error.message);
            } else {
              totalUploaded += posttestRows.length;
            }
          }
        }
      }
    }
    
    console.log(`Successfully uploaded ${totalUploaded} questions to Supabase.`);
  } catch (e) {
    console.error("Upload failed with exception:", e);
  }
  process.exit(0);
}

upload();
