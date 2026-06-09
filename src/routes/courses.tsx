import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { branches } from "@/lib/lab-data";
import { BookOpen, GitBranch, Code, Workflow, Monitor, Database, Brain, Sparkles, Bot, Star, Network } from "lucide-react";

function getTopicIcon(topic: string) {
  if (topic === "C Programming") return <Code className="size-5 shrink-0" />;
  if (topic === "Python") return <i className="fab fa-python text-[1.25rem] shrink-0"></i>;
  if (topic === "Java") return <i className="fab fa-java text-[1.25rem] shrink-0"></i>;
  if (topic.includes("Data Structures")) return <GitBranch className="size-5 shrink-0" />;
  if (topic === "OS" || topic === "Operating Systems") return <Monitor className="size-5 shrink-0 text-cyan" />;
  if (topic === "DBMS") return <Database className="size-5 shrink-0 text-cyan" />;
  if (topic === "Machine Learning") return <Brain className="size-5 shrink-0 text-cyan" />;
  if (topic === "AI Tools") return <Sparkles className="size-5 shrink-0 text-cyan" />;
  if (topic === "LLMs") return <Bot className="size-5 shrink-0 text-cyan" />;
  if (topic === "IoT") return <Network className="size-5 shrink-0 text-cyan" />;
  if (topic === "Algorithms") return <Workflow className="size-5 shrink-0 text-cyan" />;
  return null;
}

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Courses — VLMS" }, { name: "description", content: "Technical courses for the curriculum." }] }),
  component: CoursesPage,
});

function CoursesPage() {
  const [profile, setProfile] = useState<{name: string, interests: string[]} | null>(null);

  useEffect(() => {
    const profileStr = localStorage.getItem('currentUserProfile');
    if (profileStr) {
      try {
        setProfile(JSON.parse(profileStr));
      } catch(e) {}
    }
  }, []);

  const itBranch = branches.find(b => b.code === "IT");
  const courses = itBranch?.topics || [];

  const recommendedCourses = courses.filter(c => {
    if (!profile || !profile.interests || profile.interests.length === 0) return false;
    const lowerCourse = c.toLowerCase();
    return profile.interests.some(i => {
      const lowerInterest = i.toLowerCase();
      if (lowerInterest === "ai" && (lowerCourse.includes("ai") || lowerCourse.includes("machine learning") || lowerCourse.includes("llm"))) return true;
      if (lowerCourse.includes(lowerInterest)) return true;
      if (lowerInterest === "web development" && (lowerCourse.includes("web") || lowerCourse.includes("java"))) return true;
      return false;
    });
  });

  const remainingCourses = courses.filter(c => !recommendedCourses.includes(c));

  return (
    <div className="px-6 lg:px-10 py-12 max-w-5xl mx-auto">
      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan">Curriculum</div>
      <h1 className="mt-2 font-display text-4xl lg:text-5xl font-bold tracking-tight">Courses</h1>
      {profile?.name && (
        <p className="mt-2 text-cyan font-medium text-lg">Welcome back, {profile.name}!</p>
      )}
      <p className="mt-2 text-muted-foreground max-w-2xl mb-10">Explore the complete syllabus and experiment workspace for your courses.</p>
      
      {recommendedCourses.length > 0 && (
        <>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-400/50 bg-purple-500/10 text-xs font-medium text-purple-400 mb-6">
            <Star className="size-3.5" /> Recommended for You
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {recommendedCourses.map((t) => {
              const slug = t.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
              return (
                <Link 
                  key={t}
                  to={`/course/${slug}`}
                  className="group flex flex-col justify-between p-6 rounded-xl border border-purple-400/30 bg-card hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all"
                >
                  <div>
                    <h3 className="font-display text-xl font-semibold group-hover:text-cyan transition-colors flex items-center gap-2.5">
                      {getTopicIcon(t)}
                      <span>{t}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">Highly recommended based on your interests.</p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
                    Start Learning &rarr;
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-xs font-medium text-muted-foreground mb-6">
        <BookOpen className="size-3.5" /> All Subjects
      </div>
      
      {remainingCourses.length === 0 && recommendedCourses.length === 0 ? (
        <div className="text-muted-foreground p-10 border border-dashed border-border rounded-xl text-center">
          No subjects configured yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {remainingCourses.map((t) => {
            const slug = t.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            return (
              <Link 
                key={t}
                to={`/course/${slug}`}
                className="group flex flex-col justify-between p-6 rounded-xl border border-border bg-card hover:border-foreground/30 hover:shadow-sm transition-all"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold group-hover:text-cyan transition-colors flex items-center gap-2.5">
                    {getTopicIcon(t)}
                    <span>{t}</span>
                  </h3>
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
