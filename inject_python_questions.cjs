const { Project } = require('ts-morph');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('python_all_questions.json', 'utf8'));

const project = new Project();

function formatQuestions(qs) {
    if (!qs || qs.length === 0) return '[]';
    return '[\n' + qs.map(q => `{ question: ${JSON.stringify(q.question)}, options: ${JSON.stringify(q.options)}, answerIndex: ${q.answerIndex} }`).join(',\n') + '\n]';
}

for (let i = 1; i <= 15; i++) {
    const questions = data[i.toString()] || [];
    if (questions.length === 0) continue;
    
    // Split into pretest (first 15) and posttest (last 15)
    const mid = Math.ceil(questions.length / 2);
    const pretestQs = questions.slice(0, mid);
    const posttestQs = questions.slice(mid);
    
    const filePath = `src/lib/python-e${i}.ts`;
    if (!fs.existsSync(filePath)) {
        console.log(`File ${filePath} does not exist. Skipping.`);
        continue;
    }
    
    project.addSourceFileAtPath(filePath);
    const sourceFile = project.getSourceFile(filePath);
    
    const weekVarName = `pythonExercise${i}`;
    const weekDecl = sourceFile.getVariableDeclaration(weekVarName);
    if (!weekDecl) {
        console.log(`Could not find export ${weekVarName} in ${filePath}`);
        continue;
    }
    
    const weekObj = weekDecl.getInitializer();
    const experiments = weekObj.getProperty('experiments').getInitializer().getElements();
    
    // Assuming each exercise has 1 main experiment inside
    const firstExp = experiments[0];
    const content = firstExp.getProperty('content').getInitializer();
    
    let pretestProp = content.getProperty('pretest');
    if (pretestProp) {
        pretestProp.setInitializer(formatQuestions(pretestQs));
    } else {
        content.addPropertyAssignment({ name: 'pretest', initializer: formatQuestions(pretestQs) });
    }
    
    let posttestProp = content.getProperty('posttest');
    if (posttestProp) {
        posttestProp.setInitializer(formatQuestions(posttestQs));
    } else {
        content.addPropertyAssignment({ name: 'posttest', initializer: formatQuestions(posttestQs) });
    }
    
    sourceFile.saveSync();
    console.log(`Injected Exercise ${i} questions (${pretestQs.length} pretest, ${posttestQs.length} posttest).`);
}
