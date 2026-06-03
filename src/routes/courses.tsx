import { createFileRoute, Link } from "@tanstack/react-router";
import { branches } from "@/lib/lab-data";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Courses — VLMS" }, { name: "description", content: "Technical courses for the curriculum." }] }),
  component: CoursesPage,
});

function CoursesPage() {
  // Use IT branch topics as courses
  const itBranch = branches.find(b => b.code === "IT");
  const courses = itBranch?.topics || [];

  return (
    <div className="px-6 lg:px-10 py-12 max-w-5xl mx-auto">
      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan">Curriculum</div>
      <h1 className="mt-2 font-display text-4xl lg:text-5xl font-bold tracking-tight">Courses</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl mb-10">Explore the complete syllabus and experiment workspace for your courses.</p>
      
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-xs font-medium text-muted-foreground mb-6">
        <BookOpen className="size-3.5" /> Department Subjects
      </div>
      
      {courses.length === 0 ? (
        <div className="text-muted-foreground p-10 border border-dashed border-border rounded-xl text-center">
          No subjects configured yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {courses.map((t) => {
            const slug = t.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            return (
              <Link 
                key={t}
                to={`/course/${slug}`}
                className="group flex flex-col justify-between p-6 rounded-xl border border-border bg-card hover:border-foreground/30 hover:shadow-sm transition-all"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold group-hover:text-cyan transition-colors">{t}</h3>
                  <p className="text-sm text-muted-foreground mt-2">View complete syllabus and experiment workspace for this course.</p>
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
                  Explore Course &rarr;
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
