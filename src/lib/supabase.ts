// src/lib/supabase.ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Pass explicit auth configuration options to bypass strict 401 header blocks
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// ── Types ──────────────────────────────────────────────────────────────────

export type Profile = {
  id: string;
  name: string;
  college: string;
  interests: string[];
  skills: string[] | null;
  degree: string | null;
  branch: string | null;
  year_of_study: string | null;
  graduation_year: number | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export type Badge = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

export type UserBadge = {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
};

// ── Experiment Completion helpers ──────────────────────────────────────────

export type ExperimentCompletion = {
  id: string;
  user_id: string;
  experiment_id: string;
  course_id: string;
  completed_at: string;
};

/** Mark an experiment as completed for the current user */
export async function markExperimentComplete(
  userId: string,
  experimentId: string,
  courseId: string
): Promise<boolean> {
  const { error } = await supabase
    .from('experiment_completions')
    .upsert(
      { user_id: userId, experiment_id: experimentId, course_id: courseId },
      { onConflict: 'user_id,experiment_id' }
    );

  if (error) {
    console.error('markExperimentComplete error:', error);
    return false;
  }
  return true;
}

/** Get all completed experiment IDs for the current user */
export async function getCompletedExperiments(userId: string): Promise<Set<string>> {
  const { data, error } = await supabase
    .from('experiment_completions')
    .select('experiment_id')
    .eq('user_id', userId);

  if (error) {
    console.error('getCompletedExperiments error:', error);
    return new Set();
  }

  return new Set(data.map((row: any) => row.experiment_id));
}

/** Get all completed experiment IDs for a specific course */
export async function getCompletedExperimentsForCourse(
  userId: string,
  courseId: string
): Promise<Set<string>> {
  const { data, error } = await supabase
    .from('experiment_completions')
    .select('experiment_id')
    .eq('user_id', userId)
    .eq('course_id', courseId);

  if (error) {
    console.error('getCompletedExperimentsForCourse error:', error);
    return new Set();
  }

  return new Set(data.map((row: any) => row.experiment_id));
}

/** Count how many unique courses a user has at least one completion in */
export async function getUniqueCourseCount(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('experiment_completions')
    .select('course_id')
    .eq('user_id', userId);

  if (error) {
    console.error('getUniqueCourseCount error:', error);
    return 0;
  }

  const unique = new Set(data.map((row: any) => row.course_id));
  return unique.size;
}

// Migrates guest localStorage solves into the DB after login
export async function migrateGuestProgress(userId: string) {
  const KEY = 'vlms_guest_solved';
  const data: Record<string, boolean> = JSON.parse(localStorage.getItem(KEY) || '{}');
  const entries = Object.entries(data).filter(([, v]) => v);
  if (entries.length === 0) return;

  // Build rows — you'll need course_id. Since we only store exp IDs,
  // insert with course_id = 'unknown' or look it up from courses data.
  // Best approach: store {expId, courseId} pairs in localStorage from the start.
  // See Step 4 for how we'll store courseId too.
  const rows = entries.map(([experimentId]) => ({
    user_id: userId,
    experiment_id: experimentId,
    // course_id will be stored alongside in Step 4
    course_id: JSON.parse(localStorage.getItem('vlms_guest_course') || '{}')[experimentId] || 'unknown',
  }));

  await supabase
    .from('experiment_completions')
    .upsert(rows, { onConflict: 'user_id,experiment_id' });

  localStorage.removeItem(KEY);
  localStorage.removeItem('vlms_guest_course');
}

// ── Profile helpers ────────────────────────────────────────────────────────

/** Fetch the profile for the currently logged-in user */
export async function getProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) { console.error('getProfile error:', error); return null; }
  return data as Profile;
}

/** Create a new profile row after sign-up */
export async function createProfile(
  userId: string,
  name: string,
  college: string,
  interests: string[]
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .insert({ id: userId, name, college, interests })
    .select()
    .single();

  if (error) { console.error('createProfile error:', error); return null; }
  return data as Profile;
}

/** Update an existing profile */
export async function updateProfile(
  userId: string,
  updates: Partial<Pick<Profile,
  'name' | 'college' | 'interests' | 'skills' |
  'degree' | 'branch' | 'year_of_study' | 'graduation_year' | 'bio'
>>
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) { console.error('updateProfile error:', error); return null; }
  return data as Profile;
}

// ── Badge helpers ──────────────────────────────────────────────────────────

/** Get all badges a user has earned (with badge details joined) */
export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  const { data, error } = await supabase
    .from('user_badges')
    .select('*, badge:badges(*)')
    .eq('user_id', userId);

  if (error) { console.error('getUserBadges error:', error); return []; }
  return data as UserBadge[];
}

/** Award a badge to a user (silently ignores if already earned) */
export async function awardBadge(userId: string, badgeId: string): Promise<void> {
  const { data, error } = await supabase
    .from('user_badges')
    .upsert(
      { user_id: userId, badge_id: badgeId }, 
      { onConflict: 'user_id,badge_id' }
    )
    .select();

  if (error) {
    console.error(`❌ awardBadge database error for [${badgeId}]:`, error.message, error.details);
  } else {
    console.log(`✅ Database confirmed: Badge [${badgeId}] successfully saved!`, data);
  }
}

/** Get all available badge definitions */
export async function getAllBadges(): Promise<Badge[]> {
  const { data, error } = await supabase.from('badges').select('*');
  if (error) { console.error('getAllBadges error:', error); return []; }
  return data as Badge[];
}
// -- Question helpers -------------------------------------------------------

export type Question = {
  id: string;
  course_id: string;
  experiment_id: string;
  type: 'pretest' | 'posttest';
  question: string;
  options: string[];
  answer_index: number;
};

/** Fetch 5 random questions for a given course and experiment */
export async function getQuestionsForExperiment(
  courseId: string,
  experimentId: string,
  type: 'pretest' | 'posttest'
): Promise<Question[]> {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('course_id', courseId)
    .eq('experiment_id', experimentId)
    .eq('type', type);

  if (error) {
    console.error('Error fetching questions:', error.message);
    return [];
  }

  // Shuffle and sample 5
  if (!data || data.length === 0) return [];
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}
