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
  let inCodeBlock = false;
  let codeLines: string[] = [];

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
  const hasCustomBg = course.id === 'quantum-computing' || course.id === 'dbms';

  return (
    <>
      {course.id === 'quantum-computing' && (
        <div 
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ 
            backgroundImage: 'url(/quantum-bg.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            opacity: 0.7
          }} 
        />
      )}
      {course.id === 'dbms' && (
        <div 
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ 
            backgroundImage: 'url(/dbms-bg.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            opacity: 0.7
          }} 
        />
      )}
      <div className="px-6 lg:px-10 py-12 max-w-7xl mx-auto relative z-10">
      <div>
        <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors relative z-10">
          <ArrowLeft className="size-4" /> Back to Courses
        </Link>

        {/* Course Hero & Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mb-12 relative">
          
          {/* Hero Card */}
          <div 
            className={`relative z-10 p-8 rounded-3xl border shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-center ${hasCustomBg ? 'border-white/40 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl text-slate-900 dark:text-white' : 'border-border/50 bg-secondary/20'}`}
          >
            {/* Premium animated blur blobs & illustrations for quantum */}
            {course.id === 'quantum-computing' && (
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                 {/* Atom Illustration Top Left */}
                 <svg className="absolute -top-12 -left-12 w-64 h-64 text-blue-500 opacity-[0.03] animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="10" fill="currentColor" />
                    <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(30 50 50)" />
                    <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(90 50 50)" />
                    <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(150 50 50)" />
                 </svg>
                 {/* Wave Pattern Bottom Right */}
                 <svg className="absolute -bottom-8 -right-8 w-72 h-72 text-cyan-600 opacity-[0.04]" viewBox="0 0 100 100">
                    <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path d="M0,60 Q25,30 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path d="M0,70 Q25,40 50,70 T100,70" fill="none" stroke="currentColor" strokeWidth="3" />
                 </svg>
                 {/* Floating Particles */}
                 <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-20 animate-[ping_3s_ease-in-out_infinite]" />
                 <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-purple-500 rounded-full opacity-20 animate-[ping_4s_ease-in-out_infinite_1s]" />
                 
                 {/* Blur Blobs */}
                 <div className="absolute -top-[100px] -left-[100px] bg-cyan/80" style={{ width: '400px', height: '400px', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15 }} />
                 <div className="absolute -bottom-[150px] -right-[50px] bg-primary/80" style={{ width: '400px', height: '400px', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15 }} />
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-mint/80" style={{ width: '400px', height: '400px', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.1 }} />
              </div>
            )}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-xs font-medium text-muted-foreground mb-4 w-fit">
              <Book className="size-3.5" /> Syllabus Overview
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary pb-1">
              {course.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg mb-8 leading-relaxed">
              {course.id === 'quantum-computing' 
                ? "Learn the principles of quantum mechanics, qubits, superposition, entanglement and quantum algorithms."
                : "Explore the fundamentals and advanced concepts of this interactive course."}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 bg-background/50 px-3 py-2 rounded-lg border border-border/50">
                📚 <span>{course.weeks.length} Modules</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-3 py-2 rounded-lg border border-border/50">
                🧪 <span>{allExperiments.length} Experiments</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-3 py-2 rounded-lg border border-border/50">
                ⏱️ <span>{Math.ceil(allExperiments.length * 0.6)} Hours</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-3 py-2 rounded-lg border border-border/50">
                🏆 <span>Certificate Available</span>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="relative z-10 p-6 rounded-2xl border border-border/50 bg-secondary/20 shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="font-semibold text-lg mb-6">Course Progress</h3>
            
            {/* Circular Progress */}
            <div className="relative size-32 mb-4">
              <svg className="size-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  className="text-border"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                {/* Progress circle */}
                <circle
                  className={`${hasCustomBg ? 'text-blue-600 dark:text-blue-400' : 'text-cyan'} transition-all duration-1000 ease-out`}
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * (allExperiments.length > 0 ? (solvedExps.size / allExperiments.length) : 0))}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold font-display text-foreground">
                  {Math.round(allExperiments.length > 0 ? (solvedExps.size / allExperiments.length * 100) : 0)}%
                </span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground font-medium">
              <span className="text-foreground">{solvedExps.size}</span> / {allExperiments.length} Experiments Completed
            </p>
          </div>
        </div>
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

      <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start relative z-10">
        {/* Sidebar */}
        <div className={`sticky top-28 flex flex-col gap-1.5 p-3 md:p-4 rounded-2xl h-fit z-10 transition-all duration-500 border ${hasCustomBg ? 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]' : 'bg-transparent border-transparent border-r-border/50'}`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            const activeClass = hasCustomBg 
              ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/5 dark:from-blue-500/20 dark:to-cyan-500/10 border-l-4 border-blue-500 shadow-sm translate-x-1 text-blue-700 dark:text-blue-300"
              : "bg-secondary shadow-sm translate-x-1 text-foreground";
              
            const inactiveClass = hasCustomBg
              ? "text-slate-500 dark:text-slate-400 hover:bg-blue-500/5 hover:text-blue-700 dark:hover:text-blue-300 hover:translate-x-1 border-l-4 border-transparent"
              : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:translate-x-1 border-l-4 border-transparent";

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 text-left ${isActive ? activeClass : inactiveClass}`}
              >
                <Icon className={`size-4 shrink-0 ${isActive ? (hasCustomBg ? "text-blue-600 dark:text-blue-400" : "text-cyan") : ""}`} />
                <span className={isActive && !hasCustomBg ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary font-bold inline-block" : (isActive ? "font-bold" : "")}>
                  {tab.id}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className={`min-h-[500px] flex flex-col justify-between pb-16 rounded-3xl p-4 md:p-10 relative z-10 transition-all duration-500 border ${hasCustomBg ? 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-white/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]' : 'border-transparent'}`}>
          <div key={currentTab} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
            {currentTab === "Introduction" && course.introduction && (
              <section className={hasCustomBg ? "prose prose-slate dark:prose-invert max-w-none prose-lg" : ""}>
                <h2 className={`text-2xl md:text-3xl font-bold mb-8 w-fit block ${hasCustomBg ? 'text-slate-900 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary'}`}>
                  Introduction
                </h2>
                <div className={`space-y-6 leading-relaxed ${hasCustomBg ? 'text-slate-700 dark:text-slate-300' : 'text-muted-foreground'}`}>
                  {course.introduction.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {currentTab === "Objective" && (
              <section className={hasCustomBg ? "prose prose-slate dark:prose-invert max-w-none prose-lg" : ""}>
                <h2 className={`text-2xl md:text-3xl font-bold mb-8 w-fit block ${hasCustomBg ? 'text-slate-900 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary'}`}>
                  Objective
                </h2>
            
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
              <ul className={`list-disc list-inside space-y-3 leading-relaxed ${hasCustomBg ? 'text-slate-700 dark:text-slate-300' : 'text-muted-foreground'}`}>
                {course.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            ) : (
              <p className={`leading-relaxed ${hasCustomBg ? 'text-slate-700 dark:text-slate-300' : 'text-muted-foreground'}`}>{course.objectives}</p>
            )}
              </section>
            )}

            {currentTab === "Short Notes" && (
              <section className={hasCustomBg ? "prose prose-slate dark:prose-invert max-w-none prose-lg" : ""}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className={`text-2xl md:text-3xl font-bold w-fit block ${hasCustomBg ? 'text-slate-900 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary'}`}>
                    Short Notes
                  </h2>
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
                      if (text === '[START_SQL_CODE]') {
                        inCodeBlock = true;
                        codeLines = [];
                        return null;
                      }
                      
                      // Detect the end of a code block
                      if (text === '[END_SQL_CODE]') {
                        inCodeBlock = false;
                        return (
                          <div key={i} className="my-6 rounded-xl border border-cyan/20 bg-black/80 dark:bg-black/40 font-mono text-sm shadow-md overflow-hidden text-left">
                            <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-cyan/20 to-blue-500/10 border-b border-cyan/20 text-cyan font-semibold text-xs tracking-wider uppercase">
                              SQL Code Snippet
                            </div>
                            <pre className="p-4 overflow-x-auto text-emerald-400 leading-relaxed m-0">
                              <code>{codeLines.join('\n')}</code>
                            </pre>
                          </div>
                        );
                      }
                      // Add this to your render component alongside the SQL handler:

if (text === '[START_CODE_SNIPPET]') {
  inCodeBlock = true;
  codeLines = [];
  return null;
}

if (text === '[END_CODE_SNIPPET]') {
  inCodeBlock = false;
  return (
      <div key={i} className="my-6 rounded-xl border border-cyan/20 bg-black/80 dark:bg-black/40 font-mono text-sm shadow-md overflow-hidden text-left">
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-cyan/20 to-blue-500/10 border-b border-cyan/20 text-cyan font-semibold text-xs tracking-wider uppercase">
              C++ / Java / Python Code Snippet
          </div>
          <pre className="p-4 overflow-x-auto text-emerald-400 leading-relaxed m-0">
              <code>{codeLines.join('\n')}</code>
          </pre>
      </div>
  );
}
                      
                      // If we are currently inside a code block, collect the raw lines instead of parsing them
                      if (inCodeBlock) {
                        codeLines.push(line); // Use raw 'line' instead of trimmed 'text' to preserve indentation
                        return null;
                      }

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
                            <div className="my-8 p-4 bg-white/50 dark:bg-black/20 rounded-2xl border-4 border-dashed border-cyan/40 flex justify-center group relative overflow-hidden max-w-4xl mx-auto">
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              <img src={src} alt={alt} className="w-full h-auto object-contain max-w-full rounded-xl hover:scale-[1.02] transition-transform duration-500 shadow-sm relative z-10" />
                            </div>
                          );
                        }
                      } else if (text.startsWith('[TABLE]:')) {
                        const tableHtml = text.replace('[TABLE]:', '');
                        el = (
                          <div 
                            className="my-6 overflow-x-auto rounded-xl border border-cyan/20 p-2 bg-card/30" 
                            dangerouslySetInnerHTML={{ __html: tableHtml }} 
                          />
                        );
                      }
                      else {
                        // Regular text items as bullet points
                        el = (
                          <div className="flex gap-3 items-start ml-2 md:ml-6 group">
                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan/50 group-hover:bg-cyan transition-colors shrink-0"></div>
                            <p className="text-foreground/80 leading-relaxed text-base md:text-lg">{text}</p>
                          </div>
                        );
                      }
if (text.startsWith('[ER_DIAGRAM_EXAMPLE]')) {
  return (
    <div key={i} className="my-10 p-6 bg-white/50 dark:bg-black/20 rounded-2xl border border-cyan/20 shadow-md animate-in fade-in duration-500">
      <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-500 mb-4">
        Comprehensive ER Diagram Scenario: University Database System
      </h4>
      
      <p className="text-foreground/80 leading-relaxed text-base mb-6">
        This scenario maps a University management system containing standard entities, complex tracking variables, a multi-tier staffing hierarchy, and dependent child units.
      </p>

      <div className="space-y-6">
        <div className="bg-secondary/40 border-l-4 border-cyan p-4 rounded-r-xl">
          <span className="font-bold text-cyan text-lg block mb-1">1. Strong Entities & Complex Attributes</span>
          <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
            <strong className="text-foreground font-semibold">Student (Strong Entity):</strong> Identified uniquely by <span className="underline">RollNo</span> (Key Attribute). Features a composite <span className="italic">Name (FirstName + LastName)</span>, a multi-valued <span className="italic">Phone_No</span> (double oval), and a derived <span className="italic">Age</span> calculated straight from their stored <span className="italic">DOB</span> field (dashed oval).
          </p>
        </div>

        <div className="bg-secondary/40 border-l-4 border-orange-400 p-4 rounded-r-xl">
          <span className="font-bold text-orange-400 text-lg block mb-1">2. Relationships & Cardinality Constraints</span>
          <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
            <strong className="text-foreground font-semibold">Enrolls_In (M:N Relationship):</strong> Connects <span className="italic">Student</span> and <span className="italic">Course</span>. Multiple students enroll in multiple courses simultaneously.
            <br />
            <strong className="text-foreground font-semibold">Manages (1:1 Relationship):</strong> Connects <span className="italic">Faculty</span> to <span className="italic">Department</span>. One professor manages at most one department, displaying <span className="font-semibold text-cyan">Total Participation</span> (double line) from the Department side—every department must have a manager.
          </p>
        </div>

        <div className="bg-secondary/40 border-l-4 border-purple-400 p-4 rounded-r-xl">
          <span className="font-bold text-purple-400 text-lg block mb-1">3. Enhanced ER (EER) Hierarchy</span>
          <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
            <strong className="text-foreground font-semibold">Person (Superclass):</strong> Contains general elements like ID, Email, and Location. Through <span className="font-semibold text-cyan">Specialization</span>, it breaks down into specialized <strong className="text-foreground font-semibold">Student</strong> and <strong className="text-foreground font-semibold">Faculty</strong> subclasses, inheriting all primary roots.
          </p>
        </div>

        <div className="bg-secondary/40 border-l-4 border-rose-400 p-4 rounded-r-xl">
          <span className="font-bold text-rose-400 text-lg block mb-1">4. Weak Entity Architecture</span>
          <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
            <strong className="text-foreground font-semibold">Dependent (Weak Entity):</strong> Tracks faculty family members for health insurance benefits. It has no independent primary identifier; it utilizes a partial key field <span className="border-b border-dashed border-foreground">Dep_Name</span> alongside a double-diamond <span className="font-semibold text-cyan">Identifying Relationship</span> linked back to its strong parent entity (<span className="italic">Faculty</span>).
          </p>
        </div>
      </div>
      
      {/* Injected Schematic Diagram Asset mapping the text block rules exactly */}
      <div className="mt-8 p-4 bg-white/80 dark:bg-black/40 rounded-xl border border-cyan/10 flex justify-center">
        <img 
          src="/dbms_university_er_example.png" 
          alt="Complete University Database System ER Diagram Model" 
          className="max-h-96 object-contain rounded-lg shadow-sm"
        />
      </div>
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
                                 <img src="/python_unit3.png?v=202606141630" alt="Unit 3 Dictionaries, Tuples, and Sets" className="max-w-full rounded-xl hover:scale-105 transition-transform duration-500 shadow-sm relative z-10" />
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
              <section className={hasCustomBg ? "prose prose-slate dark:prose-invert max-w-none prose-lg" : ""}>
                <h2 className={`text-2xl md:text-3xl font-bold mb-8 w-fit block ${hasCustomBg ? 'text-slate-900 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary'}`}>
                  Target Audience
                </h2>
                <div className={`space-y-8 ${hasCustomBg ? 'text-slate-700 dark:text-slate-300' : 'text-muted-foreground'}`}>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3 text-lg">Primary Audience</h3>
                    <p>{course.targetAudience.primary}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3 text-lg">Pre-requisites</h3>
                    <ul className="list-disc list-inside space-y-1.5">
                      {course.targetAudience.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3 text-lg">Also Useful For</h3>
                    <ul className="list-disc list-inside space-y-1.5">
                      {course.targetAudience.usefulFor.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {currentTab === "Course Alignment" && course.alignment && (
              <section className={hasCustomBg ? "prose prose-slate dark:prose-invert max-w-none prose-lg" : ""}>
                <h2 className={`text-2xl md:text-3xl font-bold mb-8 w-fit block ${hasCustomBg ? 'text-slate-900 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary'}`}>
                  Course Alignment
                </h2>
                <div className="overflow-hidden rounded-xl border border-border bg-card">
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
                  <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card">
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
              <section className={hasCustomBg ? "prose prose-slate dark:prose-invert max-w-none prose-lg" : ""}>
                <h2 className={`text-2xl md:text-3xl font-bold mb-8 w-fit block ${hasCustomBg ? 'text-slate-900 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary'}`}>
                  List of Experiments
                </h2>
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
              <section className={hasCustomBg ? "prose prose-slate dark:prose-invert max-w-none prose-lg" : ""}>
                <h2 className={`text-2xl md:text-3xl font-bold mb-8 w-fit block ${hasCustomBg ? 'text-slate-900 dark:text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary'}`}>
                  Feedback & Analytics
                </h2>
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
    </>
  );
}
