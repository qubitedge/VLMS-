import { courses } from '../src/lib/course-data';

const llms = courses['llms'];
if (!llms) {
  console.error("LLMs course not found in course-data.ts!");
  process.exit(1);
}

console.log("=== VERIFYING LLM EXPERIMENT CONTENTS ===");

llms.weeks.forEach(week => {
  console.log(`\n--- ${week.title} ---`);
  week.experiments.forEach(exp => {
    const preCount = exp.content?.pretest?.length ?? 0;
    const postCount = exp.content?.posttest?.length ?? 0;
    
    // Find image in theory
    let hasImage = false;
    let imageSrc = "";
    const theory = exp.content?.theory ?? [];
    theory.forEach((section: any) => {
      section.body.forEach((p: string) => {
        const match = p.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (match) {
          hasImage = true;
          imageSrc = match[2];
        }
      });
    });
    
    console.log(`Experiment ${exp.id}:`);
    console.log(`  Questions: Pretest = ${preCount}, Posttest = ${postCount}`);
    console.log(`  Theory Illustration: ${hasImage ? `Found (${imageSrc})` : 'MISSING'}`);
    
    if (preCount > 0) {
      console.log(`  Sample Pretest: "${exp.content?.pretest[0].question}"`);
    }
  });
});

console.log("\nVerification complete!");
process.exit(0);
