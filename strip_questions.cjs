const fs = require('fs');
const path = require('path');

const srcLibDir = path.join(__dirname, 'src', 'lib');

function stripQuestions(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalLength = content.length;
  
  // Using a balanced parenthesis matching or recursive regex is hard in JS.
  // We can match `pretest: [` or `posttest: [` and then find the matching closing bracket.
  
  function stripArray(key) {
    let searchStr = key + ':';
    let index = 0;
    while ((index = content.indexOf(searchStr, index)) !== -1) {
      // Find the '[' after the key
      let bracketStart = content.indexOf('[', index + searchStr.length);
      if (bracketStart === -1) {
        index += searchStr.length;
        continue;
      }
      
      // Check if there are non-whitespace chars between key: and [
      let between = content.substring(index + searchStr.length, bracketStart);
      if (between.trim() !== '') {
         index += searchStr.length;
         continue;
      }
      
      let bracketCount = 0;
      let bracketEnd = -1;
      let inString = false;
      let stringChar = '';
      
      for (let i = bracketStart; i < content.length; i++) {
        let char = content[i];
        
        if (!inString) {
          if (char === '"' || char === "'" || char === "`") {
            inString = true;
            stringChar = char;
          } else if (char === '[') {
            bracketCount++;
          } else if (char === ']') {
            bracketCount--;
            if (bracketCount === 0) {
              bracketEnd = i;
              break;
            }
          }
        } else {
          // Handle escapes
          if (char === '\\') {
            i++; // skip next char
          } else if (char === stringChar) {
            inString = false;
          }
        }
      }
      
      if (bracketEnd !== -1) {
        content = content.substring(0, bracketStart) + '[]' + content.substring(bracketEnd + 1);
        index = bracketStart + 2; // move past '[]'
      } else {
        index += searchStr.length;
      }
    }
  }

  stripArray('pretest');
  stripArray('posttest');
  
  if (content.length !== originalLength) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Stripped questions from ${path.basename(filePath)} (Reduced by ${originalLength - content.length} bytes)`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      stripQuestions(fullPath);
    }
  }
}

console.log("Stripping questions from src/lib/**/*.ts ...");
walkDir(srcLibDir);
console.log("Done!");
