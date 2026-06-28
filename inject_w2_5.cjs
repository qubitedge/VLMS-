const { Project } = require('ts-morph');
const w23 = require('./week2_3_questions.cjs');
const w45 = require('./week4_5_questions.cjs');

const project = new Project();
project.addSourceFileAtPath('src/lib/course-data.ts');
const sf = project.getSourceFile('course-data.ts');
const obj = sf.getVariableDeclaration('courses').getInitializer();
const cProg = obj.getProperty('"c-programming"').getInitializer();
const weeks = cProg.getProperty('weeks').getInitializer().getElements();

function formatQs(qs) {
  return '[\n' + qs.map(q => `{ question: ${JSON.stringify(q.question)}, options: ${JSON.stringify(q.options)}, answerIndex: ${q.answerIndex} }`).join(',\n') + '\n]';
}

function injectWeek(weekIdx, preQs, postQs) {
  const exps = weeks[weekIdx].getProperty('experiments').getInitializer().getElements();
  for (const exp of exps) {
    const content = exp.getProperty('content').getInitializer();
    const pretestProp = content.getProperty('pretest');
    if (pretestProp) pretestProp.setInitializer(formatQs(preQs));
    const posttestProp = content.getProperty('posttest');
    if (posttestProp) posttestProp.setInitializer(formatQs(postQs));
  }
}

injectWeek(1, w23.w2_pre, w23.w2_post); // Week 2
injectWeek(2, w23.w3_pre, w23.w3_post); // Week 3
injectWeek(3, w45.w4_pre, w45.w4_post); // Week 4
injectWeek(4, w45.w5_pre, w45.w5_post); // Week 5

sf.saveSync();
console.log("Successfully injected weeks 2-5.");
