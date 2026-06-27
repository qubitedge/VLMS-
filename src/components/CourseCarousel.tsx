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
