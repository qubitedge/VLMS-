const { Project, SyntaxKind } = require('ts-morph');
const path = require('path');
const week1Data = require('./week1_questions.cjs');

const project = new Project();
project.addSourceFileAtPath('src/lib/course-data.ts');
const sourceFile = project.getSourceFile('course-data.ts');

const obj = sourceFile.getVariableDeclaration('courses').getInitializer();
const cProg = obj.getProperty('"c-programming"').getInitializer();
const weeks = cProg.getProperty('weeks').getInitializer();

const week1 = weeks.getElements()[0];
const exps = week1.getProperty('experiments').getInitializer().getElements();

function formatQuestions(qs) {
    return '[\n' + qs.map(q => `{ question: ${JSON.stringify(q.question)}, options: ${JSON.stringify(q.options)}, answerIndex: ${q.answerIndex} }`).join(',\n') + '\n]';
}

for (const exp of exps) {
    const content = exp.getProperty('content').getInitializer();
    
    let pretestProp = content.getProperty('pretest');
    if (pretestProp) {
        pretestProp.setInitializer(formatQuestions(week1Data.pretest));
    }
    
    let posttestProp = content.getProperty('posttest');
    if (posttestProp) {
        posttestProp.setInitializer(formatQuestions(week1Data.posttest));
    }
}

sourceFile.saveSync();
console.log("Updated Week 1 experiments successfully.");
