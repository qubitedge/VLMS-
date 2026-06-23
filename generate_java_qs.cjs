require('dotenv').config();
const { Groq } = require('groq-sdk');
const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');

const groq = new Groq({
    apiKey: process.env.VITE_GROQ_API_KEY
});

const project = new Project();
project.addSourceFileAtPath('src/lib/java-data.ts');
const sourceFile = project.getSourceFile('java-data.ts');

const javaCourse = sourceFile.getVariableDeclaration('javaCourse').getInitializer();
// Wait, javaCourse doesn't have "weeks" directly, let me check the keys
let weeksProp = javaCourse.getProperty('weeks');
if (!weeksProp) {
    weeksProp = javaCourse.getProperty('exercises');
}
if (!weeksProp) {
    console.error("Could not find 'weeks' or 'exercises' in javaCourse");
    process.exit(1);
}

const weeks = weeksProp.getInitializer().getElements();

async function generateQuestions(theoryText, count) {
    const prompt = `Based on the following theory, generate exactly ${count} unique multiple-choice questions. 
Distribute the correct answers randomly among options 0, 1, 2, and 3.

Theory:
${theoryText}

Return ONLY a strictly valid JSON object with a single key "questions" containing an array of objects with the following format, and nothing else (no markdown blocks, no explanations outside JSON):
{
  "questions": [
    {
      "question": "The question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answerIndex": 2
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3,
        response_format: { type: 'json_object' }
    });

    let result = completion.choices[0].message.content;
    const parsed = JSON.parse(result);
    return parsed.questions || [];
}

function formatQuestions(qs) {
    if (!qs || qs.length === 0) return '[]';
    return '[\n' + qs.map(q => `{ question: ${JSON.stringify(q.question)}, options: ${JSON.stringify(q.options)}, answerIndex: ${q.answerIndex} }`).join(',\n') + '\n]';
}

async function main() {
    for (const week of weeks) {
        const title = week.getProperty('title').getInitializer().getText();
        console.log(`Processing ${title}...`);
        
        const experiments = week.getProperty('experiments').getInitializer().getElements();
        for (const exp of experiments) {
            const expId = exp.getProperty('id').getInitializer().getText();
            console.log(`  Processing experiment ${expId}...`);
            
            const content = exp.getProperty('content').getInitializer();
            const theoryProp = content.getProperty('theory');
            
            if (!theoryProp) {
                console.log(`  No theory found for ${expId}`);
                continue;
            }
            
            const theoryElements = theoryProp.getInitializer().getElements();
            let theoryText = '';
            for (const t of theoryElements) {
                const body = t.getProperty('body').getInitializer().getElements();
                for (const b of body) {
                    theoryText += b.getText() + '\n';
                }
            }
            
            console.log(`    Extracted ${theoryText.length} characters of theory. Generating questions...`);
            
            try {
                // Generate 30 questions
                const qs = await generateQuestions(theoryText, 30);
                
                if (!qs || qs.length === 0) throw new Error("No questions generated");
                
                // Truncate to exactly 30 if more were generated
                const finalQs = qs.slice(0, 30);
                
                const mid = Math.ceil(finalQs.length / 2);
                const pretestQs = finalQs.slice(0, mid);
                const posttestQs = finalQs.slice(mid);
                
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
                
                console.log(`    Successfully injected ${pretestQs.length} pretest and ${posttestQs.length} posttest questions.`);
            } catch (e) {
                console.error(`    Failed to generate or parse questions for ${expId}:`, e);
            }
            
            sourceFile.saveSync();
        }
    }
    console.log("Done generating and injecting questions!");
}

main().catch(console.error);
