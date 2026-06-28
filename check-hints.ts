import { courses } from './src/lib/course-data';

let missingHints: string[] = [];
let coursesWithMissingHints = new Set<string>();

for (const [courseId, course] of Object.entries(courses)) {
    for (const week of course.weeks) {
        for (const exp of week.experiments) {
            const content = exp.content;
            if (!content) continue;
            
            let hasMissing = false;
            if (content.pretest) {
                content.pretest.forEach((q, idx) => {
                    if (!q.hint) {
                        hasMissing = true;
                    }
                });
            }
            if (content.posttest) {
                content.posttest.forEach((q, idx) => {
                    if (!q.hint) {
                        hasMissing = true;
                    }
                });
            }
            if (hasMissing) {
                coursesWithMissingHints.add(course.title);
            }
        }
    }
}

if (coursesWithMissingHints.size > 0) {
    console.log("Courses missing hints in pre/post tests:");
    coursesWithMissingHints.forEach(c => console.log("- " + c));
} else {
    console.log("All courses have hints in all pre/post tests!");
}
