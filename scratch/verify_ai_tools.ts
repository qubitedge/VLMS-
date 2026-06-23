import { courses } from '../src/lib/course-data';

const aiTools = courses['ai-tools'];
if (!aiTools) {
  console.error("AI Tools course not found in course-data.ts!");
  process.exit(1);
}

console.log("=== VERIFYING AI TOOLS EXPERIMENT CONTENTS ===");

let totalExps = 0;
let errors = 0;

aiTools.weeks.forEach(week => {
  console.log(`\n--- ${week.title} ---`);
  week.experiments.forEach(exp => {
    totalExps++;
    const theory = exp.content?.theory ?? [];
    
    // Find image in theory
    let hasImage = false;
    let imageSrc = "";
    theory.forEach((section: any) => {
      section.body.forEach((p: string) => {
        const match = p.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (match) {
          hasImage = true;
          imageSrc = match[2];
        }
      });
    });
    
    // Check if tables are present (using [TABLE]: prefix)
    let hasTable = false;
    theory.forEach((section: any) => {
      section.body.forEach((p: string) => {
        if (p.includes('[TABLE]:')) {
          hasTable = true;
        }
      });
    });

    console.log(`Experiment ${exp.id} (${exp.title}):`);
    console.log(`  Aim text length: ${exp.content?.aim?.text?.length ?? 0}`);
    console.log(`  Theory sections: ${theory.length}`);
    console.log(`  Theory Tables: ${hasTable ? 'Found' : 'None'}`);
    console.log(`  Theory Illustration: ${hasImage ? `Found (${imageSrc})` : 'MISSING'}`);
    
    if (!exp.content?.aim?.text) {
      console.error(`  ERROR: Experiment ${exp.id} has no aim text!`);
      errors++;
    }
    if (theory.length === 0) {
      console.error(`  ERROR: Experiment ${exp.id} has no theory sections!`);
      errors++;
    }
  });
});

console.log(`\nVerification complete. Total experiments checked: ${totalExps}. Errors: ${errors}`);
if (errors > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
