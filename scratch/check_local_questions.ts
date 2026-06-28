import { courses } from '../src/lib/course-data';

const llms = courses['llms'];
if (!llms) {
  console.error("LLMs course not found in course-data.ts!");
  process.exit(1);
}

console.log("Checking local questions in course-data.ts for LLMs course:");
llms.weeks.forEach((week) => {
  console.log(`\n--- ${week.title} ---`);
  week.experiments.forEach((exp) => {
    const pretestCount = exp.content?.pretest?.length ?? 0;
    const posttestCount = exp.content?.posttest?.length ?? 0;
    console.log(`Experiment ${exp.id}: Pretest count = ${pretestCount}, Posttest count = ${posttestCount}`);
    
    // Check if the questions are actually valid or empty strings
    if (pretestCount > 0) {
      console.log(`  First pretest question: "${exp.content?.pretest?.[0]?.question}"`);
    }
  });
});
