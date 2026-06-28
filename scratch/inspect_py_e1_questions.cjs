const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

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

async function inspect() {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('course_id', 'python')
    .eq('experiment_id', 'py-e1-1');

  if (error) {
    console.error(error);
    return;
  }

  console.log(`Total questions for py-e1-1 in Supabase: ${data.length}`);
  const pretest = data.filter(q => q.type === 'pretest');
  const posttest = data.filter(q => q.type === 'posttest');
  console.log(`Pretest count: ${pretest.length}, Posttest count: ${posttest.length}`);

  const mockPre = pretest.filter(q => q.question.includes('Mock'));
  const realPre = pretest.filter(q => !q.question.includes('Mock'));
  console.log(`Pretest: Mock=${mockPre.length}, Real=${realPre.length}`);

  const mockPost = posttest.filter(q => q.question.includes('Mock'));
  const realPost = posttest.filter(q => !q.question.includes('Mock'));
  console.log(`Posttest: Mock=${mockPost.length}, Real=${realPost.length}`);

  console.log("\nMock Pretest questions sample:");
  console.log(mockPre.slice(0, 5).map(q => q.question));

  console.log("\nReal Pretest questions sample:");
  console.log(realPre.slice(0, 5).map(q => q.question));
}

inspect();
