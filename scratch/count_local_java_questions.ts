import { javaCourse } from '../src/lib/java-data';
javaCourse.weeks.forEach(w => {
  w.experiments.forEach(e => {
    const preCount = e.content?.pretest?.length || 0;
    const postCount = e.content?.posttest?.length || 0;
    console.log(`${e.id}: pretest=${preCount}, posttest=${postCount}`);
  });
});
