import { courses } from './src/lib/course-data';
import * as fs from 'fs';

const cCourse = courses['c-programming'];
let markdown = '# C Programming Theories\n\n';

if (cCourse && cCourse.weeks) {
  cCourse.weeks.forEach((week) => {
    markdown += `## ${week.title} - ${week.objective}\n\n`;
    week.experiments.forEach((exp) => {
      markdown += `### ${exp.title}\n\n`;
      if (exp.content && exp.content.theory) {
        exp.content.theory.forEach((theoryItem) => {
          markdown += `**${theoryItem.title}**\n\n`;
          theoryItem.body.forEach((para) => {
            markdown += `${para}\n\n`;
          });
        });
      }
    });
  });
}

fs.writeFileSync('c_theories.md', markdown);
console.log('Successfully generated c_theories.md');
