import fs from 'fs';
import path from 'path';

const dir = './src/lib';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const regex = /\{\s*question:\s*([`'"][\s\S]*?[`'"]),\s*options:\s*(\[[\s\S]*?\]),\s*answerIndex:\s*(\d+),?\s*\}/g;
    
    content = content.replace(regex, (match, qStr, optionsStr, indexStr) => {
        try {
            const options = eval(optionsStr);
            const answerIndex = parseInt(indexStr, 10);
            const correctOption = options[answerIndex];
            
            let hintText = "Review the theory section and core concepts.";
            if (correctOption) {
                 let text = correctOption.toString().replace(/\n/g, ' ').substring(0, 100).trim();
                 if (text.length === 100) text += "...";
                 hintText = `Think about why the correct answer involves: ${text}`;
            }

            return match.replace(new RegExp(`answerIndex:\\s*${indexStr},?\\s*\\}`), `answerIndex: ${indexStr}, hint: ${JSON.stringify(hintText)} }`);
        } catch (e) {
            return match.replace(new RegExp(`answerIndex:\\s*${indexStr},?\\s*\\}`), `answerIndex: ${indexStr}, hint: "Review the theory section and core concepts to find the correct answer." }`);
        }
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
}
