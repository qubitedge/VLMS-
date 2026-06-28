import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

// Parse .env manually
const envText = fs.readFileSync('.env', 'utf8');
const env: Record<string, string> = {};
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

async function checkAll() {
  const allData: any[] = [];
  let from = 0;
  const limit = 1000;
  
  while (true) {
    const to = from + limit - 1;
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .range(from, to);

    if (error) {
      console.error("Error fetching all questions:", error.message);
      process.exit(1);
    }

    if (!data || data.length === 0) {
      break;
    }

    allData.push(...data);
    if (data.length < limit) {
      break;
    }
    from += limit;
  }

  console.log(`Total questions in database: ${allData.length}`);

  const coursesMap: Record<string, any[]> = {};
  for (const q of allData) {
    if (!coursesMap[q.course_id]) {
      coursesMap[q.course_id] = [];
    }
    coursesMap[q.course_id].push(q);
  }

  console.log("\nCourses found in database:");
  for (const [courseId, qs] of Object.entries(coursesMap)) {
    console.log(`- Course '${courseId}': ${qs.length} questions`);
    const mockQs = qs.filter(q => {
      const text = q.question.toLowerCase();
      return text.includes("mock") || text.includes("placeholder") || text.includes("replace this");
    });
    console.log(`  Mock questions: ${mockQs.length}`);
    if (mockQs.length > 0) {
      console.log(`  Sample mock questions for '${courseId}':`, mockQs.slice(0, 3).map(m => m.question));
    }
  }
}

checkAll();
