const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'src', 'lib', 'course-data.ts');
let buf = fs.readFileSync(filePath);
let content = buf.toString('utf-8');

// On disk we have: 5c 5c 5c 22 (three backslash chars + one quote char)
// We want on disk: 5c 22 (one backslash char + one quote char) 
// So we need to replace three consecutive backslashes followed by a quote
// with one backslash followed by a quote

// In JS string matching:
// To match literal \\\", we need the regex pattern: \\\\\\\\"
// Three literal backslashes = six escaped backslashes in regex
// One literal quote = \\"

let count = 0;
let result = '';
let i = 0;
while (i < content.length) {
  // Check if we have three backslashes followed by a quote
  if (i + 3 < content.length && 
      content[i] === '\\' && 
      content[i+1] === '\\' && 
      content[i+2] === '\\' && 
      content[i+3] === '"') {
    // Replace with single backslash + quote
    result += '\\"';
    i += 4;
    count++;
  } else {
    result += content[i];
    i++;
  }
}

console.log(`Replaced ${count} instances of \\\\\\\" with \\"`);

fs.writeFileSync(filePath, result, 'utf-8');

// Verify
const verify = fs.readFileSync(filePath, 'utf-8');
const idx = verify.indexOf('Zero-Shot means');
if (idx > -1) {
  const slice = verify.substring(idx - 30, idx + 5);
  const chars = [];
  for (let j = 0; j < slice.length; j++) {
    chars.push(slice.charCodeAt(j).toString(16));
  }
  console.log('Raw chars around "Zero": ' + chars.join(' '));
  console.log('Text: ' + slice);
}

console.log('Done!');
