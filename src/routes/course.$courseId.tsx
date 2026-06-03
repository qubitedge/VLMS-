import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { courses } from "@/lib/course-data";
import { ArrowLeft, Book, Code, List, Info, Target, LayoutTemplate, Beaker } from "lucide-react";

export const Route = createFileRoute("/course/$courseId")({
  component: CoursePage,
});

function CoursePage() {
  const { courseId } = Route.useParams();
  const course = courses[courseId];
  
  const [activeTab, setActiveTab] = useState("Introduction");

  if (!course) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Course Not Found</h1>
        <Link to="/courses" className="text-cyan hover:underline mt-4 inline-block">Return to Courses</Link>
      </div>
    );
  }

  const tabs = [];
  if (course.introduction) tabs.push({ id: "Introduction", icon: Info });
  tabs.push({ id: "Objective", icon: Target });
  if (course.targetAudience) tabs.push({ id: "Target Audience", icon: List });
  if (course.alignment) tabs.push({ id: "Course Alignment", icon: LayoutTemplate });
  tabs.push({ id: "List of Experiments", icon: Beaker });

  const currentTab = tabs.find(t => t.id === activeTab) ? activeTab : tabs[0].id;

  return (
    <div className="px-6 lg:px-10 py-12 max-w-6xl mx-auto">
      <div>
        <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="size-4" /> Back to Courses
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-xs font-medium text-muted-foreground mb-4 block w-fit">
          <Book className="size-3.5" /> Syllabus Overview
        </div>
        <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-12">{course.title}</h1>
      </div>

      <div className="grid lg:grid-cols-[250px_1fr] gap-10 items-start">
        {/* Sidebar */}
        <div className="sticky top-24 flex flex-col gap-1 border-r border-border/50 pr-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left ${isActive ? "bg-secondary text-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}`}
              >
                <Icon className={`size-4 ${isActive ? "text-cyan" : ""}`} />
                {tab.id}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="min-h-[500px]">
          {currentTab === "Introduction" && course.introduction && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-bold mb-6">Introduction</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {course.introduction.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {currentTab === "Objective" && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-bold mb-6">Objective</h2>
              {Array.isArray(course.objectives) ? (
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                  {course.objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground leading-relaxed">{course.objectives}</p>
              )}
            </section>
          )}

          {currentTab === "Target Audience" && course.targetAudience && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-bold mb-6">Target Audience</h2>
              <div className="space-y-8 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Primary Audience</h3>
                  <p>{course.targetAudience.primary}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Pre-requisites</h3>
                  <ul className="list-disc list-inside space-y-1.5">
                    {course.targetAudience.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Also Useful For</h3>
                  <ul className="list-disc list-inside space-y-1.5">
                    {course.targetAudience.usefulFor.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {currentTab === "Course Alignment" && course.alignment && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-bold mb-6">Course Alignment</h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm text-muted-foreground">
                  <tbody className="divide-y divide-border/50">
                    <tr className="hover:bg-secondary/10"><th className="py-3 px-4 font-semibold text-foreground w-48 bg-secondary/20">University</th><td className="py-3 px-4">{course.alignment.university}</td></tr>
                    <tr className="hover:bg-secondary/10"><th className="py-3 px-4 font-semibold text-foreground bg-secondary/20">Department</th><td className="py-3 px-4">{course.alignment.department}</td></tr>
                    <tr className="hover:bg-secondary/10"><th className="py-3 px-4 font-semibold text-foreground bg-secondary/20">Course</th><td className="py-3 px-4">{course.alignment.course}</td></tr>
                    <tr className="hover:bg-secondary/10"><th className="py-3 px-4 font-semibold text-foreground bg-secondary/20">Credits</th><td className="py-3 px-4">{course.alignment.credits}</td></tr>
                    <tr className="hover:bg-secondary/10"><th className="py-3 px-4 font-semibold text-foreground bg-secondary/20">Year / Semester</th><td className="py-3 px-4">{course.alignment.yearSem}</td></tr>
                    <tr className="hover:bg-secondary/10"><th className="py-3 px-4 font-semibold text-foreground bg-secondary/20">Applicable Branches</th><td className="py-3 px-4">{course.alignment.branches}</td></tr>
                    <tr className="hover:bg-secondary/10"><th className="py-3 px-4 font-semibold text-foreground bg-secondary/20">Total Experiments</th><td className="py-3 px-4">{course.alignment.totalExperiments}</td></tr>
                    <tr className="hover:bg-secondary/10"><th className="py-3 px-4 font-semibold text-foreground bg-secondary/20">Compiler Used</th><td className="py-3 px-4">{course.alignment.compiler}</td></tr>
                  </tbody>
                </table>
              </div>
              {course.alignment.units && (
                <div className="mt-8 overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left text-sm text-muted-foreground">
                    <thead className="bg-secondary/50 text-foreground">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Unit</th>
                        <th className="px-4 py-3 font-semibold">Topics Covered</th>
                        <th className="px-4 py-3 font-semibold">Weeks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {course.alignment.units.map((u, i) => (
                        <tr key={i} className="hover:bg-secondary/20 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground">{u.unit}</td>
                          <td className="px-4 py-3">{u.topics}</td>
                          <td className="px-4 py-3">{u.weeks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {currentTab === "List of Experiments" && (
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-bold mb-6">List of Experiments</h2>
              <div className="space-y-8">
                {course.weeks.map((week, index) => (
                  <div key={index} className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-6 py-5 border-b border-border bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 grid place-items-center size-10 rounded-lg bg-primary/10 text-primary font-bold font-mono">
                          W{index + 1}
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">{week.title}</h2>
                          <p className="text-sm text-muted-foreground mt-1">{week.objective}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-1 text-foreground/80">{week.tutorial}</h3>
                        <p className="text-sm text-muted-foreground">{week.labTitle}</p>
                      </div>
                      <div className="space-y-2 mt-4">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-cyan mb-3">Experiments</h4>
                        {week.experiments.map((exp, i) => (
                          <div key={exp.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50 hover:border-border transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-muted-foreground">{i + 1}.</span>
                              <span className="text-sm font-medium">{exp.title}</span>
                            </div>
                            <Link 
                              to="/workspace"
                              search={{ exp: exp.id }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
                            >
                              <Code className="size-3.5" /> Solve
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
