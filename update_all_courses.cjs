const { Project, SyntaxKind } = require('ts-morph');
const path = require('path');
const fs = require('fs');

const project = new Project();
const libDir = path.join(__dirname, 'src', 'lib');
project.addSourceFilesAtPaths(path.join(libDir, '**/*.ts'));

function generateQuestions(type) {
  let qList = [];
  for (let i = 1; i <= 50; i++) {
    qList.push(`{ question: "Mock ${type.charAt(0).toUpperCase() + type.slice(1)} Question ${i} - Replace this text later", options: ["Option A", "Option B", "Option C", "Option D"], answerIndex: 0 }`);
  }
  return `[\n` + qList.join(',\n') + `\n]`;
}

const sourceFiles = project.getSourceFiles();
let updatedFiles = 0;

for (const sourceFile of sourceFiles) {
  let fileUpdated = false;

  // Find all PropertyAssignments directly
  const properties = sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAssignment);
  
  // Filter for 'pretest' and 'posttest'
  const targetProps = properties.filter(p => {
    const name = p.getName();
    return name === 'pretest' || name === 'posttest';
  });

  if (targetProps.length > 0) {
    // Reverse the order so modifying a child doesn't invalidate subsequent siblings/parents that appear later in traversal
    for (const prop of targetProps.reverse()) {
      const name = prop.getName();
      prop.setInitializer(generateQuestions(name));
      fileUpdated = true;
    }
  }

  if (fileUpdated) {
    sourceFile.saveSync();
    console.log(`Updated ${sourceFile.getBaseName()}`);
    updatedFiles++;
  }
}

console.log(`Finished updating ${updatedFiles} files.`);
