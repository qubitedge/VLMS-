// src/lib/course-utils.ts

import { supabase } from './supabase';
import { courses } from './course-data';

export interface CompletedCourse {
  courseId: string;
  courseTitle: string;
  experimentsCompleted: number;
  totalExperiments: number;
  completionPercentage: number;
  lastCompletedAt: string;
}

export async function getCompletedCourses(userId: string): Promise<CompletedCourse[]> {
  // Get all experiment completions for this user
  const { data: completions, error } = await supabase
    .from('experiment_completions')
    .select('course_id, experiment_id, completed_at')
    .eq('user_id', userId);

  if (error || !completions) {
    console.error('Error fetching completions:', error);
    return [];
  }

  // Group completions by course
  const courseCompletions: Record<string, { experiments: Set<string>, lastCompleted: string }> = {};
  
  completions.forEach(comp => {
    if (!courseCompletions[comp.course_id]) {
      courseCompletions[comp.course_id] = {
        experiments: new Set(),
        lastCompleted: comp.completed_at
      };
    }
    courseCompletions[comp.course_id].experiments.add(comp.experiment_id);
    // Update last completed time if this completion is newer
    if (comp.completed_at > courseCompletions[comp.course_id].lastCompleted) {
      courseCompletions[comp.course_id].lastCompleted = comp.completed_at;
    }
  });

  const completedCourses: CompletedCourse[] = [];

  // Check each course against the course data
  for (const [courseId, course] of Object.entries(courses)) {
    // Calculate total experiments in this course
    const totalExperiments = course.weeks.reduce(
      (sum: number, week: any) => sum + week.experiments.length, 0
    );

    const completionData = courseCompletions[courseId];
    if (completionData) {
      const experimentsCompleted = completionData.experiments.size;
      const completionPercentage = Math.round((experimentsCompleted / totalExperiments) * 100);
      
      // Only include if at least one experiment is completed
      if (experimentsCompleted > 0) {
        completedCourses.push({
          courseId,
          courseTitle: course.title,
          experimentsCompleted,
          totalExperiments,
          completionPercentage,
          lastCompletedAt: completionData.lastCompleted,
        });
      }
    }
  }

  // Sort by completion percentage (highest first) and then by last completed
  completedCourses.sort((a, b) => {
    if (a.completionPercentage !== b.completionPercentage) {
      return b.completionPercentage - a.completionPercentage;
    }
    return new Date(b.lastCompletedAt).getTime() - new Date(a.lastCompletedAt).getTime();
  });

  return completedCourses;
}