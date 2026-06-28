const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Parse .env manually
const envText = fs.readFileSync('.env', 'utf8');
const env = {};
envText.split(/\r?\n/).forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseAnonKey = env['VITE_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function find() {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('course_id', 'llms');

  if (error) {
    console.error(error);
    process.exit(1);
  }

  const mock = data.filter(q => q.question.includes("Mock"));
  const empty = data.filter(q => q.question === "" || q.question === "?");
  const others = data.filter(q => !q.question.includes("Mock") && q.question !== "" && q.question !== "?");

  console.log(`Supabase total questions for llms: ${data.length}`);
  console.log(`Mock questions: ${mock.length}`);
  console.log(`Empty/corrupted questions: ${empty.length}`);
  console.log(`Other questions: ${others.length}`);

  if (others.length > 0) {
    console.log("Sample of other questions:");
    console.log(others.slice(0, 3).map(q => q.question));
  }
}

find();
