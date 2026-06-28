import data from '../java_all_questions.json';
console.log("Keys in java_all_questions.json:", Object.keys(data));
// Print length for each key
for (const key of Object.keys(data)) {
  console.log(`${key}: ${(data as any)[key]?.length || 0} questions`);
}
