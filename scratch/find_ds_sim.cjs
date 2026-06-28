const fs = require('fs');
const content = fs.readFileSync('src/lib/ds-data.ts', 'utf8');

const experiments = content.split('id:').slice(1);
const result = {
  hasSim: [],
  noSim: []
};

experiments.forEach(exp => {
  const match = exp.match(/^\s*['"]?([^'",\s]+)['"]?/);
  if (!match) return;
  const id = match[1];
  
  // Look for simulation block before the next experiment block begins
  // Since we split by 'id:', exp contains everything until the next id.
  if (exp.includes('simulation:')) {
    result.hasSim.push(id);
  } else {
    // Only consider proper experiment ids
    if (id.startsWith('ds-e')) {
      result.noSim.push(id);
    }
  }
});

console.log("Experiments WITHOUT simulation:");
console.log(result.noSim);
console.log("\nExperiments WITH simulation:");
console.log(result.hasSim);
