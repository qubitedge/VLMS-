import { useState, useEffect, useRef, TouchEvent } from "react";
import { Link } from "@tanstack/react-router";
import { branches } from "@/lib/lab-data";
import { 
  Code, Monitor, Database, Brain, Sparkles, Hexagon, Workflow, 
  ChevronLeft, ChevronRight, ArrowRight, BookOpen 
} from "lucide-react";

// Local Helper for Course Icons
function getTopicIcon(topic: string) {
  const iconClass = "size-6 shrink-0 text-purple-600 dark:text-purple-400";
  if (topic === "C Programming") return <Code className={iconClass} />;
  if (topic === "Python") return <Code className={iconClass} />;
  if (topic === "Java") return <Code className={iconClass} />;
  if (topic === "DBMS") return <Database className={iconClass} />;
  if (topic.includes("Data Structures")) return <Workflow className={iconClass} />;
  if (topic === "OS" || topic === "Operating Systems") return <Monitor className={iconClass} />;
  if (topic === "Machine Learning") return <Brain className={iconClass} />;
  if (topic === "AI Tools") return <Sparkles className={iconClass} />;
  if (topic === "LLMs") return <Sparkles className={iconClass} />;
  if (topic === "IoT") return <Hexagon className={iconClass} />;
  if (topic === "Foundations of Quantum Computing" || topic === "Quantum Computing using Qiskit Lab") return <Hexagon className={iconClass} />;
  if (topic === "Algorithms") return <Workflow className={iconClass} />;
  return <BookOpen className={iconClass} />;
}

// Local Helper for Course Subtitles
function getSubtitle(topic: string) {
  if (topic === "C Programming") return "Master loops, arrays, structures, and pointer math.";
  if (topic === "Python") return "Build scripting power, scientific computing, and logic.";
  if (topic === "Java") return "Unlock object-oriented coding, multithreading, and systems.";
  if (topic === "DBMS") return "Design SQL databases, normal forms, and transaction states.";
  if (topic === "Machine Learning") return "Train neural networks, regressions, and dataset splits.";
  if (topic.includes("Data Structures")) return "Optimize memory pathways using standard stack/heap designs.";
  if (topic === "AI Tools") return "Harness state-of-the-art developer suites and accelerators.";
  if (topic === "LLMs") return "Master prompt engineering, vector stores, and agent pipelines.";
  if (topic === "IoT") return "Program sensors, edge telemetry, and signal pipelines.";
  if (topic === "Foundations of Quantum Computing") return "Study qubit states, superposition, and quantum gates.";
  if (topic === "Quantum Computing using Qiskit Lab") return "Program quantum gates, circuits, and algorithms using IBM Qiskit.";
  if (topic === "Mathematics for Emerging Technologies") return "Linear algebra, probability theory, and discrete optimization.";
  return "Comprehensive computer science laboratory curriculum.";
}

// Local Helper for card themes / gradients
function getCardGradient(topic: string) {
  if (["C Programming", "Python", "Java"].includes(topic)) {
    return "from-blue-500/10 via-cyan-500/5 to-transparent border-blue-500/20 hover:border-blue-500/40 dark:hover:shadow-blue-500/5";
  }
  if (["Machine Learning", "AI Tools", "LLMs"].includes(topic)) {
    return "from-purple-500/10 via-pink-500/5 to-transparent border-purple-500/20 hover:border-purple-500/40 dark:hover:shadow-purple-500/5";
  }
  return "from-teal-500/10 via-emerald-500/5 to-transparent border-teal-500/20 hover:border-teal-500/40 dark:hover:shadow-teal-500/5";
}

// Local Helper for Course Background Logos
function getBgIcon(topic: string) {
  const baseClass = "absolute opacity-[0.08] dark:opacity-[0.06] transition-all duration-700 group-hover:scale-110 pointer-events-none";

  if (topic === "C Programming") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg className="w-48 h-48 translate-x-8 translate-y-8" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          <g className="text-blue-800/40 dark:text-blue-400/50">
            <path d="M80 70 V 40 L 60 20" /><circle cx="60" cy="20" r="2" />
            <path d="M90 70 V 30 L 110 10" /><circle cx="110" cy="10" r="2" />
            <path d="M100 70 V 20" /><circle cx="100" cy="20" r="2" />
            <path d="M110 70 V 50 L 130 30" /><circle cx="130" cy="30" r="2" />
            <path d="M120 70 V 60 L 150 30" />
            <path d="M80 130 V 160 L 60 180" /><circle cx="60" cy="180" r="2" />
            <path d="M90 130 V 170 L 110 190" /><circle cx="110" cy="190" r="2" />
            <path d="M100 130 V 180" /><circle cx="100" cy="180" r="2" />
            <path d="M110 130 V 150 L 130 170" /><circle cx="130" cy="170" r="2" />
            <path d="M120 130 V 140 L 150 170" />
            <path d="M70 80 H 40 L 20 60" /><circle cx="20" cy="60" r="2" />
            <path d="M70 90 H 30 L 10 110" /><circle cx="10" cy="110" r="2" />
            <path d="M70 100 H 20" /><circle cx="20" cy="100" r="2" />
            <path d="M70 110 H 50 L 30 130" /><circle cx="30" cy="130" r="2" />
            <path d="M70 120 H 60 L 30 150" />
            <path d="M130 80 H 160 L 180 60" /><circle cx="180" cy="60" r="2" />
            <path d="M130 90 H 170 L 190 110" /><circle cx="190" cy="110" r="2" />
            <path d="M130 100 H 180" /><circle cx="180" cy="100" r="2" />
            <path d="M130 110 H 150 L 170 130" /><circle cx="170" cy="130" r="2" />
            <path d="M130 120 H 140 L 170 150" />
          </g>
          <g className="drop-shadow-md">
            <rect x="70" y="70" width="60" height="60" rx="4" strokeWidth="2" className="stroke-teal-700 dark:stroke-teal-500 fill-teal-50 dark:fill-teal-900/50" />
            <rect x="80" y="80" width="40" height="40" rx="2" strokeWidth="1.5" className="stroke-teal-800 dark:stroke-teal-400 fill-teal-800 dark:fill-teal-600" />
            <circle cx="90" cy="90" r="2" fill="#ffffff" /><circle cx="100" cy="90" r="2" fill="#ffffff" /><circle cx="110" cy="90" r="2" fill="#ffffff" />
            <circle cx="90" cy="100" r="2" fill="#ffffff" /><circle cx="100" cy="100" r="2" fill="#ffffff" /><circle cx="110" cy="100" r="2" fill="#ffffff" />
            <circle cx="90" cy="110" r="2" fill="#ffffff" /><circle cx="100" cy="110" r="2" fill="#ffffff" /><circle cx="110" cy="110" r="2" fill="#ffffff" />
          </g>
        </svg>
      </div>
    );
  }

  if (topic === "Python") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg className="absolute -right-4 -bottom-4 w-48 h-48 text-cyan-800/20 dark:text-cyan-800/30" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="100" cy="100" r="30" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="45" strokeDasharray="10 4" />
          <circle cx="100" cy="100" r="60" strokeDasharray="2 6" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="75" strokeDasharray="20 5" />
          <circle cx="100" cy="55" r="2" fill="currentColor" /><circle cx="145" cy="100" r="2" fill="currentColor" />
          <circle cx="55" cy="100" r="2" fill="currentColor" /><circle cx="100" cy="145" r="2" fill="currentColor" />
          <path d="M 100 70 L 100 55" /><path d="M 130 100 L 145 100" /><path d="M 100 130 L 100 145" /><path d="M 70 100 L 55 100" />
        </svg>
        <div className="absolute -right-2 bottom-0 w-32 h-32 flex items-center justify-center drop-shadow-md">
          <i className="fab fa-python text-teal-800/80 dark:text-teal-600/80 text-[75px]"></i>
        </div>
      </div>
    );
  }

  if (topic === "Java") {
    return (
      <div className="absolute right-2 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <div className="w-28 h-28 flex items-center justify-center drop-shadow-md opacity-90">
          <i className="fab fa-java text-slate-700/80 dark:text-slate-400/80 text-[95px]"></i>
        </div>
      </div>
    );
  }

  if (topic === "DBMS") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg className="w-36 h-36 translate-x-6 translate-y-6 opacity-95 drop-shadow-[0_0_20px_rgba(45,212,191,0.25)]" viewBox="-20 -20 240 240" fill="none" stroke="currentColor">
          <defs>
             <linearGradient id="dbCylCarousel" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#0d9488" stopOpacity="0.9"/>
               <stop offset="50%" stopColor="#042f2e" stopOpacity="0.7"/>
               <stop offset="100%" stopColor="#022c22" stopOpacity="0.85"/>
             </linearGradient>
          </defs>
          <g stroke="#94a3b8" strokeWidth="1" opacity="0.3">
             <path d="M-20 100 L 50 -20 L 150 20 L 220 -20 L 240 100 L 150 220 L 50 180 Z" />
          </g>
          <g stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
            {[0, 90, 180, 270].map((angle, i) => {
               const r = 90;
               const rad = angle * Math.PI / 180;
               return <line key={i} x1="100" y1="100" x2={100 + r * Math.cos(rad)} y2={100 + r * Math.sin(rad)} />;
            })}
          </g>
          {[125, 95, 65].map((y, i) => (
            <g key={i} transform={`translate(100, ${y})`}>
                <path d="M -30 -12 V 12 C -30 20, 30 20, 30 12 V -12 Z" fill="url(#dbCylCarousel)" stroke="#0d9488" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (topic === "Machine Learning") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg className="w-36 h-36 translate-x-4 translate-y-2 opacity-95 drop-shadow-[0_0_20px_rgba(45,212,191,0.3)]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <defs>
             <linearGradient id="mlGradientCarousel" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#5eead4" />
               <stop offset="100%" stopColor="#0f766e" />
             </linearGradient>
          </defs>
          <g stroke="url(#mlGradientCarousel)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="#f0fdfa" opacity="0.95">
             <rect x="65" y="65" width="70" height="45" rx="8" />
             <circle cx="85" cy="85" r="4.5" fill="url(#mlGradientCarousel)" stroke="none" />
             <circle cx="115" cy="85" r="4.5" fill="url(#mlGradientCarousel)" stroke="none" />
             <path d="M 85 98 H 115" strokeWidth="2" />
             <path d="M 60 165 C 60 125 140 125 140 165 Z" />
          </g>
        </svg>
      </div>
    );
  }

  if (topic.includes("Data Structures")) {
    const IsoNode = ({ cx, cy }: { cx: number, cy: number }) => (
      <g transform={`translate(${cx}, ${cy})`}>
        <path d="M 0 6 L 10 11 V 18 L 0 13 Z" fill="#0f766e" />
        <path d="M 20 6 L 10 11 V 18 L 20 13 Z" fill="#115e59" />
        <path d="M 0 6 L 10 1 L 20 6 L 10 11 Z" fill="#14b8a6" stroke="#5eead4" strokeWidth="0.5" />
      </g>
    );
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg className="w-44 h-44 text-slate-400 translate-x-12 translate-y-6" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          <g stroke="#1e40af" strokeWidth="1.5" opacity="0.6">
            <path d="M 100 45 L 75 60" /><path d="M 100 45 L 125 60" />
            <path d="M 75 80 L 50 95" /><path d="M 75 80 L 100 95" />
          </g>
          <IsoNode cx={85} cy={20} /><IsoNode cx={60} cy={55} /><IsoNode cx={110} cy={55} />
        </svg>
      </div>
    );
  }

  if (topic === "AI Tools" || topic === "LLMs") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg className="w-36 h-36 translate-x-4 translate-y-4 opacity-95" viewBox="0 0 300 220" fill="none" stroke="currentColor">
          <g stroke="#0f766e" strokeWidth="1.5" opacity="0.6">
            <path d="M 40 110 L 110 40 L 180 145 L 250 40" />
            <path d="M 110 145 L 180 110 L 250 180" />
          </g>
          {[40, 110, 180].map(x => (
            <circle key={x} cx={x} cy="110" r="8" fill="#14b8a6" stroke="#0d9488" />
          ))}
        </svg>
      </div>
    );
  }

  if (topic === "IoT") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg className="w-36 h-36 translate-x-4 translate-y-8 opacity-95" viewBox="-40 -40 480 480" fill="none" stroke="currentColor">
          <g transform="translate(200, 180) scale(1, 0.5) rotate(-45)">
            <rect x="-90" y="-90" width="180" height="180" fill="#0f766e" stroke="#0d9488" strokeWidth="2" opacity="0.5" />
            <rect x="-50" y="-50" width="100" height="100" fill="#14b8a6" stroke="#5eead4" strokeWidth="3" />
          </g>
        </svg>
      </div>
    );
  }

  if (topic === "Foundations of Quantum Computing" || topic === "Quantum Computing using Qiskit Lab") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg className="w-36 h-36 translate-x-4 translate-y-4 opacity-95 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <g stroke="#d8b4fe" strokeWidth="0.5" opacity="0.4">
            <ellipse cx="100" cy="100" rx="80" ry="20" transform="rotate(0 100 100)" />
            <ellipse cx="100" cy="100" rx="80" ry="20" transform="rotate(60 100 100)" />
            <ellipse cx="100" cy="100" rx="80" ry="20" transform="rotate(120 100 100)" />
          </g>
          <circle cx="100" cy="100" r="10" fill="#a855f7" />
        </svg>
      </div>
    );
  }

  if (topic === "Mathematics for Emerging Technologies") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg className="w-36 h-36 translate-x-4 translate-y-4" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <path d="M 140 40 L 60 40 L 100 100 L 60 160 L 140 160" stroke="#0d9488" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${baseClass} -right-6 -bottom-6 opacity-[0.08]`}>
      <BookOpen className="w-24 h-24 text-slate-500" strokeWidth={0.5} />
    </div>
  );
}

export function CourseCarousel() {
  const allCourses = branches.find(b => b.code === "IT")?.topics || [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  const touchStartRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive logic for slides visible count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = allCourses.length;
  const maxIndex = Math.max(0, totalSlides - visibleCount);

  // Autoplay Logic
  useEffect(() => {
    if (isAutoplay && maxIndex > 0) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000);
    }
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isAutoplay, maxIndex]);

  const handlePrev = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleDotClick = (index: number) => {
    setIsAutoplay(false);
    setCurrentIndex(Math.min(maxIndex, index));
  };

  // Swipe handlers for mobile smoothness
  const handleTouchStart = (e: TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStartRef.current === null) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchStartRef.current - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      touchStartRef.current = null;
    }
  };

  return (
    <div 
      className="relative w-full py-10 overflow-visible select-none"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Upper Title and Side Navigation Controls */}
      <div className="flex items-center justify-between mb-8 px-4 sm:px-6">
        <div className="text-left">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400 font-bold">
            Interactive Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-1">
            Available Labs & Learning Journeys
          </h2>
        </div>

        {/* Carousel Slide buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="size-11 rounded-full border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm flex items-center justify-center text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:scale-105 active:scale-95 disabled:hover:scale-100 transition-all duration-300 shadow-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="size-11 rounded-full border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm flex items-center justify-center text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:scale-105 active:scale-95 disabled:hover:scale-100 transition-all duration-300 shadow-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Slider Viewport */}
      <div 
        className="w-full overflow-hidden px-4 sm:px-6 py-2 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div 
          className="flex transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
          }}
        >
          {allCourses.map((topic, index) => {
            const slug = topic.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            const isActive = index >= currentIndex && index < currentIndex + visibleCount;

            return (
              <div 
                key={topic}
                className="px-3 shrink-0 transition-all duration-500"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <Link
                  to={`/course/${slug}` as any}
                  className={`group relative flex flex-col justify-between h-[230px] p-7 rounded-2xl border bg-white/40 dark:bg-slate-900/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-lg dark:shadow-black/20 ${getCardGradient(topic)} ${
                    isActive ? "opacity-100 scale-100" : "opacity-60 scale-95"
                  }`}
                >
                  {/* Subtle dynamic background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none -z-10" />

                  {/* Course Header */}
                  <div className="flex flex-col gap-3.5">
                    <div className="size-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                      {getTopicIcon(topic)}
                    </div>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                        {topic}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-2 line-clamp-2">
                        {getSubtitle(topic)}
                      </p>
                    </div>
                  </div>

                  {/* Footer Arrow Explore */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Module Sandbox
                    </span>
                    <div className="inline-flex size-9 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 shadow-sm">
                      <ArrowRight className="size-4" />
                    </div>
                  </div>

                  {/* Dynamic background logo decoration */}
                  {getBgIcon(topic)}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator Progress */}
      {maxIndex > 0 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                currentIndex === idx 
                  ? "w-7 bg-purple-600 dark:bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]" 
                  : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
