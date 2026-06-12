import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { courses } from "@/lib/course-data";
import { ArrowLeft, Book, Code, List, Info, Target, LayoutTemplate, Beaker, MessageSquare, Star, FileText, Download } from "lucide-react";
import { toast } from "sonner";
import { ErrorGraphic } from "@/components/ErrorGraphic";
import { CheckCircle2 } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { CertificateModal } from "@/components/Certificate";
import { supabase, awardBadge, getCompletedExperimentsForCourse } from "@/lib/supabase";
export const Route = createFileRoute("/course/$courseId")({
  component: CoursePage,
});

function CoursePage() {
  const { courseId } = Route.useParams();
  const course = courses[courseId];

  // 🏆 TRACK ACHIEVEMENT: CURIOUS MIND
useEffect(() => {
  const trackSubjectExploration = async () => {
    try {
      // 1. Check if we have an active user session
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 2. TYPE-SAFE CATEGORY IDENTIFICATION 
      // We look at the unique course ID string (e.g., 'dbms', 'ml', 'ai-tools')
      const currentSubject = course.id || courseId;
      if (!currentSubject) return;

      // 3. Fetch or initialize the local tracking storage
      const storageKey = `explored_${user.id}`;
      const explored = JSON.parse(localStorage.getItem(storageKey) || "[]");

      // 4. Update storage if this is a brand new course path
      if (!explored.includes(currentSubject)) {
        const updatedExplored = [...explored, currentSubject];
        localStorage.setItem(storageKey, JSON.stringify(updatedExplored));

        // 5. Trigger the badge entry when they hit 3 unique courses
        if (updatedExplored.length === 3) {
          await awardBadge(user.id, "curious_mind");
          toast.success("🧠 Polymath! Achievement Unlocked: Curious Mind (Explored 3 Dynamic Subjects)!");
        }
      }
    } catch (err) {
      console.error("Failed tracking subject exploration:", err);
    }
  };

  if (course) {
    trackSubjectExploration();
  }
}, [course, courseId]);
  
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
    t.push({ id: "Short Notes", icon: FileText });
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

// Track solved status — loaded from DB for logged-in users
const [solvedExps, setSolvedExps] = useState<Set<string>>(new Set());
const [completionsLoaded, setCompletionsLoaded] = useState(false);

useEffect(() => {
  const loadCompletions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Logged-in user: fetch from database (per-user, device-independent)
        const completed = await getCompletedExperimentsForCourse(user.id, courseId);
        setSolvedExps(completed);
      } else {
        // Guest user: fall back to localStorage
        const raw = JSON.parse(localStorage.getItem('solved_experiments') || '{}');
        setSolvedExps(new Set(Object.keys(raw).filter(k => raw[k])));
      }
    } catch (e) {
      console.error('Failed to load completions:', e);
    } finally {
      setCompletionsLoaded(true);
    }
  };

  loadCompletions();

  // Also re-sync when the tab regains focus (e.g. returning from workspace)
  const handleFocus = () => loadCompletions();
  window.addEventListener('focus', handleFocus);
  return () => window.removeEventListener('focus', handleFocus);
}, [courseId]);

  const allExperiments = course.weeks.flatMap(w => w.experiments);
  const allSolved = completionsLoaded && 
                  allExperiments.length > 0 && 
                  allExperiments.every(exp => solvedExps.has(exp.id));

  // Auth / Cert State
  const [showAuth, setShowAuth] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [certName, setCertName] = useState('');

  const handleClaimCertificate = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      // Get name from DB profile instead of localStorage
      const { data: profileData } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', data.session.user.id)
        .single();
  
      if (profileData?.name) {
        setCertName(profileData.name);
      }
      setShowCert(true);
    } else {
      setShowAuth(true);
    }
  };

  const handleAuthenticated = async () => {
    setShowAuth(false);
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', data.session.user.id)
        .single();
  
      if (profileData?.name) setCertName(profileData.name);
    }
    setShowCert(true);
  };

  const currentTabIndex = tabs.findIndex(t => t.id === activeTab);
  const currentTab = tabs[currentTabIndex] ? activeTab : tabs[0].id;
  const prevTab = currentTabIndex > 0 ? tabs[currentTabIndex - 1] : null;
  const nextTab = currentTabIndex < tabs.length - 1 ? tabs[currentTabIndex + 1] : null;

  return (
    <div className="px-6 lg:px-10 py-12 max-w-7xl mx-auto">
      <div>
        <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="size-4" /> Back to Courses
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-xs font-medium text-muted-foreground mb-4 block w-fit">
          <Book className="size-3.5" /> Syllabus Overview
        </div>
        <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary pb-2 w-fit block">{course.title}</h1>
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
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all text-left ${isActive ? "bg-secondary shadow-sm translate-x-1" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:translate-x-1"}`}
              >
                <Icon className={`size-4 shrink-0 ${isActive ? "text-cyan" : ""}`} />
                <span className={isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary font-bold inline-block" : ""}>
                  {tab.id}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="min-h-[500px] flex flex-col justify-between pb-16">
          <div key={currentTab} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
            {currentTab === "Introduction" && course.introduction && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary w-fit block">Introduction</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {course.introduction.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {currentTab === "Objective" && (
              <section>
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary w-fit block">Objective</h2>
            
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

            {currentTab === "Short Notes" && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary w-fit block">Short Notes</h2>
                  {course.shortNotes && (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          const blob = new Blob([course.shortNotes || ""], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${course.title.replace(/\\s+/g, '_')}_Short_Notes.txt`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                          toast.success("Notes downloaded!");
                        }}
                        className="text-xs bg-secondary hover:bg-secondary/80 text-foreground px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors"
                      >
                        <Download className="size-3.5" />
                        Download
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(course.shortNotes || "");
                          toast.success("Notes copied to clipboard!");
                        }}
                        className="text-xs bg-secondary hover:bg-secondary/80 text-foreground px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors"
                      >
                        <FileText className="size-3.5" />
                        Copy Notes
                      </button>
                    </div>
                  )}
                </div>
                {course.shortNotes ? (
                  <div className="relative p-6 md:p-10 rounded-3xl border border-cyan/20 bg-card/50 backdrop-blur-sm shadow-xl overflow-y-auto max-h-[70vh] custom-scrollbar">
                    <div className="sm:pl-4 relative z-10">
                    {/* Top Image */}
                    {course.id === 'data-structures-using-c-programming' && (
                      <div className="mb-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-cyan/40 flex justify-center group relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <img src="/ds_types_of_data_structures.png" alt="Types of Data Structures Flowchart" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="space-y-2">
                    {course.shortNotes.split(/\r?\n/).map((line, i) => {
                      const text = line.trim();
                      if (!text) return null;

                      let el = null;
                      if (text.startsWith('UNIT ')) {
                        el = <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary mt-12 mb-6 pb-2 border-b-2 border-cyan/30 flex items-center gap-2"><Book className="size-6 text-cyan" /> {text}</h3>;
                      } else if (text === text.toUpperCase() && text.length > 5 && !text.includes('—')) {
                        el = <div className="bg-gradient-to-r from-cyan/10 to-blue-500/10 border border-cyan/20 shadow-sm text-foreground px-5 py-2.5 rounded-xl font-bold text-xl mt-10 mb-4 inline-block tracking-tight">{text}</div>;
                      } else if (text.endsWith(':')) {
                        el = <h5 className="text-xl font-bold text-cyan mt-8 mb-4 flex items-center gap-2"><div className="w-3 h-3 rounded bg-orange-500"></div> {text}</h5>;
                      } else if (text.match(/^[A-Z][a-zA-Z\\s/]+$/) && text.length < 40 && !text.includes('—')) {
                        // Side headings
                        el = <h6 className="text-lg font-bold text-foreground mt-6 mb-3 bg-secondary px-4 py-1.5 rounded-md border-l-4 border-cyan inline-block shadow-sm">{text}</h6>;
                      } else if (text.includes('—') && text.split('—')[0].length < 30) {
                        const parts = text.split('—');
                        el = <div className="pl-4 border-l-4 border-orange-400/50 my-3 py-2 bg-orange-50/50 dark:bg-orange-900/10 rounded-r-lg shadow-sm"><span className="font-bold text-foreground text-lg">{parts[0]}</span> <span className="text-muted-foreground mx-2">—</span> <span className="text-foreground/90">{parts.slice(1).join('—')}</span></div>;
                      } else if (text.startsWith('![') && text.includes('](') && text.endsWith(')')) {
                        const altMatch = text.match(/!\[(.*?)\]/);
                        const srcMatch = text.match(/\((.*?)\)/);
                        if (altMatch && srcMatch) {
                          const alt = altMatch[1];
                          const src = srcMatch[1];
                          el = (
                            <div className="my-8 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-cyan/40 flex justify-center group relative overflow-hidden max-w-lg mx-auto">
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              <img src={src} alt={alt} className="max-h-64 object-contain max-w-full rounded-xl hover:scale-[1.02] transition-transform duration-500 shadow-sm relative z-10" />
                            </div>
                          );
                        }
                      } else {
                        // Regular text items as bullet points
                        el = (
                          <div className="flex gap-3 items-start ml-2 md:ml-6 group">
                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan/50 group-hover:bg-cyan transition-colors shrink-0"></div>
                            <p className="text-foreground/80 leading-relaxed text-base md:text-lg">{text}</p>
                          </div>
                        );
                      }
                      
                      // Skip image injection if it's already at top
                      if (text.includes('Types of Data Structures:')) {
                        return <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500">{el}</div>;
                      }

                      if (text.startsWith('UNIT I ') || text.startsWith('UNIT I —')) {
                        return (
                          <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {el}
                            {course.id === 'c-programming' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-cyan/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/c_unit1.png" alt="Unit 1 Computer Problem Solving" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'machine-learning' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-cyan/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/ml-unit1.png" alt="Unit 1 Introduction to ML" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'python' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-cyan/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/python_unit1.png" alt="Unit 1 Introduction to Python Programming" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (text.startsWith('UNIT II')) {
                        return (
                          <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {el}
                            {course.id === 'data-structures-using-c-programming' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-indigo-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/ds_unit2_linked_lists.png" alt="Unit 2 Linked Lists Diagram" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'c-programming' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-indigo-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/c_unit2.png" alt="Unit 2 Intro to C Programming" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'machine-learning' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-indigo-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/ml-unit2.png" alt="Unit 2 Tree Based and Ensemble Learning" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'python' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-indigo-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/python_unit2.png" alt="Unit 2 Functions, Strings, and Lists" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (text.startsWith('UNIT III')) {
                        return (
                          <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {el}
                            {course.id === 'data-structures-using-c-programming' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-purple-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/ds_unit3_stacks.png" alt="Unit 3 Stacks Diagram" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'c-programming' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-purple-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/c_unit3.png" alt="Unit 3 Arrays and Pointers" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'machine-learning' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-purple-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/ml-unit3.png" alt="Unit 3 Linear Models and Probabilistic Learning" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'python' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-purple-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/python_unit3.svg" alt="Unit 3 Dictionaries, Tuples, and Sets" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (text.startsWith('UNIT IV')) {
                        return (
                          <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {el}
                            {course.id === 'data-structures-using-c-programming' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-emerald-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/ds_unit4_queues.jpg" alt="Unit 4 Queues & Deques Diagram" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'c-programming' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-emerald-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/c_unit4.png" alt="Unit 4 Functions and Strings" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'machine-learning' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-emerald-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/ml-unit4.png" alt="Unit 4 Neural Networks" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'python' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-emerald-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/python_unit4.png" alt="Unit 4 Files and Object-Oriented Programming" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (text.startsWith('UNIT V')) {
                        return (
                          <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {el}
                            {course.id === 'data-structures-using-c-programming' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-rose-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/ds_unit5_trees.jpg" alt="Unit 5 Trees & Hashing Diagram" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'c-programming' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-rose-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/c_unit5.png" alt="Unit 5 Structures, Unions, and Files" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'machine-learning' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-rose-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/ml-unit5.png" alt="Unit 5 Clustering Algorithms" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                            {course.id === 'python' && (
                              <div className="my-10 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-rose-400/40 flex justify-center group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <img src="/python_unit5.png" alt="Unit 5 Introduction to Data Science" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
                              </div>
                            )}
                          </div>
                        );
                      }

                      return <div key={i} className="animate-in fade-in duration-500">{el}</div>;
                    })}
                    </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 rounded-xl border border-border bg-card/50 flex flex-col items-center justify-center text-center border-dashed">
                    <FileText className="size-10 text-muted-foreground/30 mb-4" />
                    <h3 className="font-medium text-foreground mb-1">No short notes provided yet</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">This space will contain comprehensive notes, complete data, and images for this course.</p>
                  </div>
                )}
              </section>
            )}

            {currentTab === "Target Audience" && course.targetAudience && (
              <section>
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary w-fit block">Target Audience</h2>
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
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary w-fit block">Course Alignment</h2>
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
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary w-fit block">List of Experiments</h2>
                 <div className="space-y-8">
                  {course.weeks.map((week, index) => (
                    <div key={index} className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm hover:shadow-xl hover:border-cyan/30 transition-all duration-500 group">
                      <div className="px-6 py-6 border-b border-border/40 bg-gradient-to-r from-cyan/5 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-cyan/20 transition-colors duration-700"></div>
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="flex-shrink-0 grid place-items-center size-14 rounded-xl bg-gradient-to-br from-cyan to-primary text-white font-black font-display text-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-500">
                            W{index + 1}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold font-display tracking-tight text-foreground">{week.title}</h2>
                            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-2xl">{week.objective}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="mb-6 p-4 rounded-xl bg-secondary/30 border border-border/50">
                          <h3 className="text-sm font-semibold mb-1 text-foreground flex items-center gap-2">
                            <Book className="size-4 text-cyan" /> {week.tutorial}
                          </h3>
                          <p className="text-sm text-muted-foreground pl-6">{week.labTitle}</p>
                        </div>
                        <div className="space-y-3 mt-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Beaker className="size-4 text-cyan" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Experiments</h4>
                          </div>
                          {week.experiments.map((exp, i) => (
                            <div key={exp.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border/40 bg-secondary/10 hover:bg-card hover:-translate-y-1 hover:border-cyan/30 hover:shadow-lg transition-all duration-300 gap-4">
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex-shrink-0 grid place-items-center size-6 rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                                  {i + 1}
                                </div>
                                <div>
                                  <span className="text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors leading-tight">{exp.title}</span>
                                  {solvedExps.has(exp.id) && (
                                    <span className="inline-flex items-center gap-1 mt-1 ml-2 px-2 py-0.5 rounded-full bg-mint/10 border border-mint/20 text-[10px] font-bold text-mint uppercase tracking-wider">
                                      <CheckCircle2 className="size-3" /> Solved
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Link 
                                to="/workspace"
                                search={{ exp: exp.id }}
                                className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan to-primary text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-cyan/20 hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto"
                              >
                                <Code className="size-4" /> Solve Lab
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
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary w-fit block">Feedback</h2>
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
