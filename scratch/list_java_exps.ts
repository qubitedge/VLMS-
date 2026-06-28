import { javaCourse } from '../src/lib/java-data';
javaCourse.weeks.forEach(w => {
  w.experiments.forEach(e => {
    console.log(`${e.id} | ${e.title}`);
  });
});
