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

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase env variables!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  console.log("Fetching questions for course 'java'...");
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('course_id', 'java');

  if (error) {
    console.error("Error fetching:", error.message);
    process.exit(1);
  }

  console.log(`Total questions found in Supabase for course 'java': ${data.length}`);
  if (data.length > 0) {
    const experiments = {};
    let mockCount = 0;
    data.forEach(q => {
      experiments[q.experiment_id] = (experiments[q.experiment_id] || 0) + 1;
      if (q.question.includes("Mock")) {
        mockCount++;
      }
    });
    console.log("Questions per experiment:", experiments);
    console.log(`Mock questions count: ${mockCount}`);
    console.log("Sample of first 10 questions:");
    console.log(data.slice(0, 10).map(q => `${q.experiment_id} (${q.type}): ${q.question}`));
  }
}

check();
