import { courses } from '../src/lib/course-data';

// Print all course keys to check the correct key for LLMs
console.log("Available course keys:", Object.keys(courses));

const llmKey = Object.keys(courses).find(k => k.includes('llm') || k.includes('language-model')) || 'large-language-models';
const llmCourse = courses[llmKey];

if (!llmCourse) {
  console.error(`LLM course not found with key: ${llmKey}`);
  process.exit(1);
}

console.log(`\n=== VERIFYING ${llmCourse.title || 'LLMs'} QUESTIONS ===`);

let totalExperiments = 0;
let errors = 0;

llmCourse.weeks.forEach((week: any) => {
  console.log(`\n--- ${week.title || week.objective || 'Week'} ---`);
  week.experiments.forEach((exp: any) => {
    totalExperiments++;
    const pretest = exp.content?.pretest || [];
    const posttest = exp.content?.posttest || [];
    
    console.log(`Experiment ${exp.id} (${exp.title}):`);
    console.log(`  Pretest count: ${pretest.length}`);
    console.log(`  Posttest count: ${posttest.length}`);
    
    if (pretest.length !== 20) {
      console.error(`  ERROR: Experiment ${exp.id} pretest has ${pretest.length} questions (expected 20)`);
      errors++;
    }
    if (posttest.length !== 20) {
      console.error(`  ERROR: Experiment ${exp.id} posttest has ${posttest.length} questions (expected 20)`);
      errors++;
    }
  });
});

console.log(`\nVerification complete. Total experiments checked: ${totalExperiments}. Errors: ${errors}`);
if (errors > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
