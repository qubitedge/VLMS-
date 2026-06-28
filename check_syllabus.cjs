const fs = require('fs');
const content = fs.readFileSync('src/lib/course-data.ts', 'utf8');
const cIdx = content.indexOf('"c-programming"');
const sub = content.substring(cIdx, cIdx + 4000);
console.log(sub);
