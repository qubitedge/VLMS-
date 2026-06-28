const fs = require('fs');

let content = fs.readFileSync('src/lib/course-data.ts', 'utf8');

const startIndex = content.indexOf('"c-programming": {');
if (startIndex === -1) {
  console.log('Error: "c-programming": { not found');
  process.exit(1);
}

let prefix = content.slice(0, startIndex);
let target = content.slice(startIndex);

function generateQuestions(type) {
  let qList = [];
  for (let i = 1; i <= 50; i++) {
    qList.push(`{ question: "Mock ${type.charAt(0).toUpperCase() + type.slice(1)} Question ${i} - Replace this text later", options: ["Option A", "Option B", "Option C", "Option D"], answerIndex: 0 }`);
  }
  return `${type}: [\n          ` + qList.join(',\n          ') + `\n        ]`;
}

target = target.replace(/pretest:\s*\[[\s\S]*?\](?=\s*(?:,|}|$))/g, generateQuestions('pretest'));
target = target.replace(/posttest:\s*\[[\s\S]*?\](?=\s*(?:,|}|$))/g, generateQuestions('posttest'));

fs.writeFileSync('src/lib/course-data.ts', prefix + target);
console.log('course-data.ts updated with 50 mock questions for pretest and posttest in C Programming.');
