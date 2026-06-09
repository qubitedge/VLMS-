import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { courses } from "@/lib/course-data";
import { ArrowLeft, Book, Code, List, Info, Target, LayoutTemplate, Beaker, MessageSquare, Star } from "lucide-react";
import { toast } from "sonner";
import { ErrorGraphic } from "@/components/ErrorGraphic";
import { CheckCircle2 } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { CertificateModal } from "@/components/Certificate";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/course/$courseId")({
  component: CoursePage,
});

function CoursePage() {
  const { courseId } = Route.useParams();
  const course = courses[courseId];
  
  if (!course) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <ErrorGraphic />
        <h1 className="text-4xl font-bold font-display mt-4">Course Not Found</h1>
        <p className="text-muted-foreground mt-2 max-w-md">The course you are looking for does not exist in the registry.</p>
        <Link to="/courses" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-2.5 text-sm font-semibold text-cyan-foreground hover:bg-cyan/90 transition-all shadow-lg hover:scale-105">
          Back to Courses
        </Link>
      </div>
    );
  }
  
  const tabs = useMemo(() => {
    const t = [];
    if (course.introduction) t.push({ id: "Introduction", icon: Info });
    t.push({ id: "Objective", icon: Target });
    if (course.targetAudience) t.push({ id: "Target Audience", icon: List });
    if (course.alignment) t.push({ id: "Course Alignment", icon: LayoutTemplate });
    t.push({ id: "List of Experiments", icon: Beaker });
    t.push({ id: "Feedback", icon: MessageSquare });
    return t;
  }, [course]);

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#experiments') {
      return "List of Experiments";
    }
    return tabs[0]?.id;
  });
  const [rating, setRating] = useState(0);

  // Clear hash after initial load to avoid sticking to it unnecessarily
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#experiments') {
      // Use replaceState to keep history clean
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Track solved status
  const [solvedExps, setSolvedExps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      setSolvedExps(JSON.parse(localStorage.getItem('solved_experiments') || '{}'));
    } catch (e) {}
  }, []);

  const allExperiments = course.weeks.flatMap(w => w.experiments);
  const allSolved = allExperiments.length > 0 && allExperiments.every(exp => solvedExps[exp.id]);

  // Auth / Cert State
  const [showAuth, setShowAuth] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [certName, setCertName] = useState('');

  const handleClaimCertificate = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      const profileStr = localStorage.getItem('currentUserProfile');
      if (profileStr) {
        try {
          const profile = JSON.parse(profileStr);
          if (profile.name) setCertName(profile.name);
        } catch (e) {}
      }
      setShowCert(true);
    } else {
      setShowAuth(true);
    }
  };

  const handleAuthenticated = () => {
    setShowAuth(false);
    const profileStr = localStorage.getItem('currentUserProfile');
    if (profileStr) {
      try {
        const profile = JSON.parse(profileStr);
        if (profile.name) setCertName(profile.name);
      } catch (e) {}
    }
    setShowCert(true);
  };

  const currentTabIndex = tabs.findIndex(t => t.id === activeTab);
  const currentTab = tabs[currentTabIndex] ? activeTab : tabs[0].id;
  const prevTab = currentTabIndex > 0 ? tabs[currentTabIndex - 1] : null;
  const nextTab = currentTabIndex < tabs.length - 1 ? tabs[currentTabIndex + 1] : null;

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

      {allSolved && (
        <div className="mb-12 p-8 rounded-2xl border border-mint/40 bg-gradient-to-r from-mint/10 to-transparent flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold font-display text-foreground flex items-center gap-2 mb-2">
              <CheckCircle2 className="size-6 text-mint" /> Course Completed!
            </h2>
            <p className="text-muted-foreground">You have successfully solved all experiments in this course.</p>
          </div>
          <button 
            onClick={handleClaimCertificate} 
            className="shrink-0 px-6 py-3 rounded-xl bg-cyan text-cyan-foreground font-semibold hover:bg-cyan/90 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Claim Certificate
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-[250px_1fr] gap-10 items-start">
        {/* Sidebar */}
        <div className="sticky top-24 flex flex-col gap-1 border-r border-border/50 pr-4 h-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all text-left ${isActive ? "bg-secondary text-cyan shadow-sm translate-x-1" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:translate-x-1"}`}
              >
                <Icon className={`size-4 ${isActive ? "text-cyan" : ""}`} />
                {tab.id}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="min-h-[500px] flex flex-col justify-between pb-16">
          <div key={currentTab} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
            {currentTab === "Introduction" && course.introduction && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Introduction</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {course.introduction.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {currentTab === "Objective" && (
              <section>
            <h2 className="text-2xl font-bold mb-6">Objective</h2>
            
            {course.id === "ai-tools" && (
              <div className="mb-8 max-w-2xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg">
                <img 
                  src="/ai-labs-flowchart.jpg" 
                  alt="Top 5 AI Labs Hands-on Learning Journey" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" 
                />
              </div>
            )}
            
            {course.id === "ml" && (
              <div className="mb-8 max-w-2xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg">
                <img 
                  src="/ml-flowchart.jpg" 
                  alt="Machine Learning Journey" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" 
                />
              </div>
            )}
            
            {course.id === "c-programming" && (
              <div className="mb-8 max-w-4xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg">
                <img 
                  src="/c-flowchart.jpg" 
                  alt="C Programming Curriculum Flowchart" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" 
                />
              </div>
            )}
            
            {course.id === "dbms" && (
              <div className="mb-8 max-w-4xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg">
                <img 
                  src="/dbms-flowchart.jpg" 
                  alt="DBMS Syllabus Journey" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" 
                />
              </div>
            )}
            
            {course.id === "data-structures-using-c-programming" && (
              <div className="mb-8 max-w-4xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg">
                <img 
                  src="/ds-flowchart.png" 
                  alt="Data Structures Curriculum Flowchart" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" 
                />
              </div>
            )}
            
            {course.id === "python" && (
              <div className="mb-8 max-w-2xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg">
                <img 
                  src="/python-flowchart.png" 
                  alt="Python Programming Curriculum Flowchart" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" 
                />
              </div>
            )}
            
            {course.id === "java" && (
              <div className="mb-8 max-w-2xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg">
                <img 
                  src="/java-flowchart.png" 
                  alt="Java Programming Curriculum Flowchart" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" 
                />
              </div>
            )}

            {course.id === "llms" && (
              <div className="mb-8 max-w-lg mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg">
                <img 
                  src="/llm-flowchart.png" 
                  alt="Large Language Models Curriculum Flowchart" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" 
                />
              </div>
            )}

            {course.id === "iot" && (
              <div className="mb-8 max-w-lg mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg">
                <img 
                  src="/iot-flowchart.png" 
                  alt="Internet of Things (IoT) Ecosystem Flowchart" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" 
                />
              </div>
            )}

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
              <section>
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
              <section>
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
              <section>
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
                                {solvedExps[exp.id] && <CheckCircle2 className="size-4 text-mint" />}
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

                {/* Certificate Section at Bottom of Experiments */}
                <div className={`mt-12 p-8 rounded-2xl border ${allSolved ? 'border-mint/40 bg-gradient-to-r from-mint/10 to-transparent shadow-sm' : 'border-border bg-secondary/20'} flex flex-col sm:flex-row items-center justify-between gap-6`}>
                  <div>
                    <h2 className={`text-2xl font-bold font-display flex items-center gap-2 mb-2 ${allSolved ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {allSolved ? <CheckCircle2 className="size-6 text-mint" /> : <Star className="size-6 opacity-50" />}
                      Course Certificate
                    </h2>
                    <p className="text-muted-foreground">
                      {allSolved 
                        ? "You have successfully solved all experiments in this course!" 
                        : "Complete all experiments in this course to unlock your certificate."}
                    </p>
                  </div>
                  <button 
                    onClick={handleClaimCertificate} 
                    disabled={!allSolved}
                    className={`shrink-0 px-6 py-3 rounded-xl font-semibold transition-all ${
                      allSolved 
                        ? "bg-cyan text-cyan-foreground hover:bg-cyan/90 shadow-md hover:shadow-lg active:scale-95" 
                        : "bg-secondary text-muted-foreground cursor-not-allowed opacity-50"
                    }`}
                  >
                    Claim Certificate
                  </button>
                </div>
              </section>
            )}

            {currentTab === "Feedback" && (
              <section>
            <h2 className="text-2xl font-bold mb-6">Feedback</h2>
              <div className="bg-card border border-border rounded-xl p-8 max-w-3xl">
                <p className="text-muted-foreground mb-8">We value your feedback. Please take a few minutes to share your experience using this virtual laboratory. Your responses will help us improve the quality, usability, and content of the experiments.</p>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Feedback submitted successfully!", { description: "Thank you for helping us improve." });
                    (e.target as HTMLFormElement).reset();
                    setRating(0);
                  }} 
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Name (Optional)</label>
                      <input type="text" className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Institute / College Name *</label>
                      <input type="text" required className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors" placeholder="Your institute" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Course / Program *</label>
                      <input type="text" required defaultValue={course.title} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Year of Study *</label>
                      <select required className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors text-foreground">
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="text-sm font-medium text-foreground">Rating of the Lab *</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star} 
                          type="button" 
                          onClick={() => setRating(star)}
                          className="focus:outline-none hover:scale-110 transition-transform"
                        >
                          <Star className={`size-6 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 pt-4 border-t border-border/50">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">Was the experiment easy to understand?</label>
                      <div className="flex gap-6">
                        {['Yes', 'No', 'Partially'].map(opt => (
                          <label key={`easy-${opt}`} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                            <input type="radio" name="easy" value={opt} required className="accent-cyan" /> {opt}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">Were the instructions clear and well-structured?</label>
                      <div className="flex gap-6">
                        {['Yes', 'No', 'Partially'].map(opt => (
                          <label key={`clear-${opt}`} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                            <input type="radio" name="clear" value={opt} required className="accent-cyan" /> {opt}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">Did the virtual lab help you understand the concept better?</label>
                      <div className="flex gap-6">
                        {['Yes', 'No', 'Partially'].map(opt => (
                          <label key={`helpful-${opt}`} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                            <input type="radio" name="helpful" value={opt} required className="accent-cyan" /> {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Which experiment did you find most useful? *</label>
                      <select required className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors text-foreground">
                        <option value="">Select Experiment</option>
                        {course.weeks.flatMap(w => w.experiments).map(exp => (
                          <option key={`useful-${exp.id}`} value={exp.id}>{exp.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Which experiment needs improvement? *</label>
                      <select required className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors text-foreground">
                        <option value="">Select Experiment</option>
                        {course.weeks.flatMap(w => w.experiments).map(exp => (
                          <option key={`improve-${exp.id}`} value={exp.id}>{exp.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium text-foreground">Suggestions or Comments</label>
                    <textarea rows={4} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan transition-colors resize-none" placeholder="Share your thoughts..."></textarea>
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="px-6 py-2.5 rounded-lg bg-cyan text-cyan-foreground font-medium text-sm hover:bg-cyan/90 transition-colors shadow-sm hover:shadow active:scale-[0.98]">
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </div>
            </section>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-16 pt-8 border-t border-border/50 flex items-center justify-between">
            {prevTab ? (
              <button
                onClick={() => {
                  setActiveTab(prevTab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                &larr; {prevTab.id}
              </button>
            ) : <div />}
            
            {nextTab && (
              <button
                onClick={() => {
                  setActiveTab(nextTab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-colors shadow-sm"
              >
                {nextTab.id} &rarr;
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        onAuthenticated={handleAuthenticated} 
        courseId={course.id} 
      />
      
      <CertificateModal 
        isOpen={showCert} 
        onClose={() => setShowCert(false)} 
        courseId={course.id} 
        userName={certName}
      />
    </div>
  );
}
