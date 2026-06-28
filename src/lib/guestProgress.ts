const KEY = 'vlms_guest_solved';
const COURSE_KEY = 'vlms_guest_course';

export function markGuestSolved(experimentId: string, courseId: string) {
  // Store solve flag
  const data = JSON.parse(localStorage.getItem(KEY) || '{}');
  data[experimentId] = true;
  localStorage.setItem(KEY, JSON.stringify(data));

  // Store courseId mapping separately for migration
  const courseMap = JSON.parse(localStorage.getItem(COURSE_KEY) || '{}');
  courseMap[experimentId] = courseId;
  localStorage.setItem(COURSE_KEY, JSON.stringify(courseMap));
}

export function hasGuestSolved(experimentId: string): boolean {
  const data = JSON.parse(localStorage.getItem(KEY) || '{}');
  return !!data[experimentId];
}

export function getGuestSolvedAll(): Record<string, boolean> {
  return JSON.parse(localStorage.getItem(KEY) || '{}');
}