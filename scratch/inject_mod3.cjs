const fs = require("fs");
const path = require("path");

const parsedPath = path.resolve(__dirname, "mod3_parsed.json");
const filePath = path.resolve(__dirname, "..", "src", "lib", "course-data.ts");

const allQuestions = JSON.parse(fs.readFileSync(parsedPath, "utf-8"));

// Slicing questions
// w3-1 (Part 1: 25 questions)
const w3_1_pre = allQuestions.slice(0, 13);
const w3_1_post = allQuestions.slice(13, 25);

// w3-2 (Part 2: 15 questions)
const w3_2_pre = allQuestions.slice(25, 33);
const w3_2_post = allQuestions.slice(33, 40);

// w3-3 (Part 3: 10 questions)
const w3_3_pre = allQuestions.slice(40, 45);
const w3_3_post = allQuestions.slice(45, 50);

const experiments = [
  { id: "llms-w3-1", pretest: w3_1_pre, posttest: w3_1_post },
  { id: "llms-w3-2", pretest: w3_2_pre, posttest: w3_2_post },
  { id: "llms-w3-3", pretest: w3_3_pre, posttest: w3_3_post },
];

function formatQuestion(q) {
  return `{ question: ${JSON.stringify(q.question)}, options: ${JSON.stringify(q.options)}, answerIndex: ${q.answerIndex} }`;
}

function buildArrayContent(questions) {
  const lines = questions.map((q, i) => {
    const comma = i < questions.length - 1 ? "," : "";
    return `                            ${formatQuestion(q)}${comma}`;
  });
  return `[\n${lines.join("\n")}\n                          ]`;
}

let content = fs.readFileSync(filePath, "utf-8");

for (const exp of experiments) {
  console.log(`\nInjecting questions for ${exp.id}...`);

  const idPattern = `id: "${exp.id}"`;
  const idIndex = content.indexOf(idPattern);
  if (idIndex === -1) {
    console.error(`  ERROR: Could not find experiment ${exp.id}`);
    continue;
  }

  // Find the pretest: [] within this experiment block
  const searchStart = idIndex;
  const searchEnd = Math.min(idIndex + 10000, content.length);
  const block = content.substring(searchStart, searchEnd);

  const pretestEmpty = "pretest: []";
  const pretestIdx = block.indexOf(pretestEmpty);
  if (pretestIdx === -1) {
    console.log(`  Pretest already populated or not found for ${exp.id}, skipping.`);
  } else {
    const pretestContent = buildArrayContent(exp.pretest);
    const globalPretestIdx = searchStart + pretestIdx;
    content = content.substring(0, globalPretestIdx) +
      `pretest: ${pretestContent}` +
      content.substring(globalPretestIdx + pretestEmpty.length);
    console.log(`  ✅ Pretest injected.`);
  }

  // Re-find the experiment block
  const idIndex2 = content.indexOf(idPattern);
  const searchStart2 = idIndex2;
  const searchEnd2 = Math.min(idIndex2 + 50000, content.length);
  const block2 = content.substring(searchStart2, searchEnd2);

  const posttestEmpty = "posttest: []";
  const posttestIdx = block2.indexOf(posttestEmpty);
  if (posttestIdx === -1) {
    console.log(`  Posttest already populated or not found for ${exp.id}, skipping.`);
  } else {
    const posttestContent = buildArrayContent(exp.posttest);
    const globalPosttestIdx = searchStart2 + posttestIdx;
    content = content.substring(0, globalPosttestIdx) +
      `posttest: ${posttestContent}` +
      content.substring(globalPosttestIdx + posttestEmpty.length);
    console.log(`  ✅ Posttest injected.`);
  }
}

fs.writeFileSync(filePath, content, "utf-8");
console.log(`\n✅ Done injecting Module 3 questions!`);
