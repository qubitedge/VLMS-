const { Project } = require('ts-morph');
const project = new Project();
project.addSourceFileAtPath('src/lib/course-data.ts');
const sf = project.getSourceFile('course-data.ts');
const obj = sf.getVariableDeclaration('courses').getInitializer();
const cProg = obj.getProperty('"c-programming"').getInitializer();
const weeks = cProg.getProperty('weeks').getInitializer().getElements();
const expMapping = {};

for(let i=0; i<5; i++) {
  const exps = weeks[i].getProperty('experiments').getInitializer().getElements();
  expMapping[`week${i+1}`] = [];
  exps.forEach(e => {
    expMapping[`week${i+1}`].push(e.getProperty('id').getInitializer().getText().replace(/"/g, ''));
  });
}

console.log(JSON.stringify(expMapping, null, 2));
