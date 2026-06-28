import * as fs from 'fs';
import { courses } from './src/lib/course-data';

const cCourse = courses['c-programming'];
if (!cCourse) {
  console.log("C Programming course not found under key 'c-programming'");
  process.exit(1);
}

let output = `C Programming Pre-test and Post-test Questions\n\n`;

cCourse.weeks.forEach(week => {
  output += `========================================================\n`;
  output += `Module: ${week.title} - ${week.objective}\n`;
  output += `========================================================\n\n`;

  week.experiments.forEach(exp => {
    output += `Experiment: ${exp.title}\n`;
    output += `--------------------------------------------------------\n`;

    if (exp.content?.pretest && exp.content.pretest.length > 0) {
      output += `[Pre-test Questions]\n`;
      exp.content.pretest.forEach((q, index) => {
        output += `${index + 1}. ${q.question}\n`;
        q.options.forEach((opt, oIndex) => {
          output += `   ${String.fromCharCode(97 + oIndex)}) ${opt}\n`;
        });
        output += `   Answer: ${q.options[q.answerIndex]}\n\n`;
      });
    }

    if (exp.content?.posttest && exp.content.posttest.length > 0) {
      output += `[Post-test Questions]\n`;
      exp.content.posttest.forEach((q, index) => {
        output += `${index + 1}. ${q.question}\n`;
        q.options.forEach((opt, oIndex) => {
          output += `   ${String.fromCharCode(97 + oIndex)}) ${opt}\n`;
        });
        output += `   Answer: ${q.options[q.answerIndex]}\n\n`;
      });
    }
  });
});

fs.writeFileSync('c_programming_questions.txt', output);
console.log('Successfully written to c_programming_questions.txt');
