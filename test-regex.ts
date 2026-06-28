import fs from 'fs';
import path from 'path';

const dir = './src/lib';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

let totalMatched = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const regex = /(answerIndex:\s*\d+),?\s*\}/g;
    let match;
    let count = 0;
    while ((match = regex.exec(content)) !== null) {
        count++;
    }
    
    if (count > 0) {
        console.log(`${file}: ${count} matches`);
        totalMatched += count;
    }
}

console.log(`Total matched: ${totalMatched}`);
