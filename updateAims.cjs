const fs = require('fs');
const path = require('path');

const javaDataPath = path.join(__dirname, 'src', 'lib', 'java-data.ts');
let content = fs.readFileSync(javaDataPath, 'utf8');

// Find all experiments
const expRegex = /id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*desc:\s*"([^"]+)",[\s\S]*?aim:\s*\{\s*text:\s*"([^"]+)"\s*\}/g;

let match;
const replacements = [];

while ((match = expRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const id = match[1];
    const title = match[2];
    const desc = match[3];
    const oldText = match[4];
    
    // Generate new aim based on title and old text
    let newText = `In this experiment the student will implement a Java program to ${oldText.replace(/^To write a Java program /, "").replace(/^To /, "").replace(/^to /, "").toLowerCase()}`;
    // ensure it ends with period
    if (!newText.endsWith('.')) newText += '.';

    // Capitalize first letter of action
    newText = newText.replace(/to ([a-z])/, (m, p1) => `to ${p1}`);

    let bullets = [
        `Understand the core concepts of ${title}`,
        `Implement a Java program that demonstrates ${title.toLowerCase()}`,
        `Trace the execution flow and observe the state in the simulation memory panel`,
        `Analyze the compilation and execution results in the Wandbox code tester`,
        `Identify edge cases and best practices related to ${title}`
    ];

    const aimBlockRegex = /aim:\s*\{\s*text:\s*"[^"]+"\s*\}/;
    const newAimBlock = `aim: {\n              text: "${newText}",\n              bullets: [\n                "${bullets[0]}",\n                "${bullets[1]}",\n                "${bullets[2]}",\n                "${bullets[3]}",\n                "${bullets[4]}"\n              ]\n            }`;

    const newFullMatch = fullMatch.replace(aimBlockRegex, newAimBlock);
    
    replacements.push({
        oldMatch: fullMatch,
        newMatch: newFullMatch
    });
}

console.log(`Found ${replacements.length} experiments to update.`);

let newContent = content;
for (const rep of replacements) {
    newContent = newContent.replace(rep.oldMatch, rep.newMatch);
}

fs.writeFileSync(javaDataPath, newContent, 'utf8');
console.log('Successfully updated java-data.ts with C-style aims.');
