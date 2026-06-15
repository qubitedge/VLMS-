const fs = require('fs');

const data = fs.readFileSync('./src/lib/course-data.ts', 'utf8');

// A simple regex to find all C experiments and check if they have emojis in their theory titles
const expRegex = /id:\s*"c-w(\d+)-(\d+)",\s*title:\s*"([^"]+)"([\s\S]*?)theory:\s*\[([\s\S]*?)\]/g;

let match;
let count = 0;
let missing = [];

while ((match = expRegex.exec(data)) !== null) {
  count++;
  const id = `c-w${match[1]}-${match[2]}`;
  const title = match[3];
  const theoryStr = match[5];
  
  // Check if theory has an emoji (our kid-friendly additions always have emojis like 🚂, 📏, etc.)
  // Actually, we can check for "Unsplash" or an emoji.
  const hasKidFriendly = theoryStr.includes('unsplash.com') || /[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(theoryStr);
  
  if (!hasKidFriendly) {
    missing.push(`${count}. ${id} - ${title}`);
  }
}

console.log(missing.join('\n'));
