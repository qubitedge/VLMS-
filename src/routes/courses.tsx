import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { branches } from "@/lib/lab-data";
import {
  BookOpen, GitBranch, Code, Workflow, Monitor, Database, Brain,
  Sparkles, Bot, Star, Network, Cpu, TerminalSquare, Coffee,
  MessageSquareText, Wifi, Code2, ArrowRight, Share2, Hexagon,
  Component, ChevronRight, Calculator, Sigma, FlaskConical,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getTopicIcon(topic: string) {
  const iconClass = "size-5 shrink-0 text-[#111F22] dark:text-slate-300";
  if (topic === "C Programming") return null;
  if (topic === "Python") return null;
  if (topic === "Java") return null;
  if (topic === "DBMS") return null;
  if (topic.includes("Data Structures")) return null;
  if (topic === "OS" || topic === "Operating Systems") return <Monitor className={iconClass} />;
  if (topic === "Machine Learning") return null;
  if (topic === "AI Tools") return null;
  if (topic === "LLMs") return null;
  if (topic === "IoT") return null;
  if (
    topic === "Foundations of Quantum Computing" ||
    topic === "Quantum Computing using Qiskit Lab"
  ) return <Hexagon className={iconClass} />;
  if (topic === "Algorithms") return <Workflow className={iconClass} />;

  // ── Mathematics (NEW) ────────────────────────────────────────────
  if (topic === "Mathematics for Emerging Technologies")
    return <Sigma className={iconClass} />;
  if (topic === "Classical Mechanics and Electromagnetism")
    return <FlaskConical className={iconClass} />;
  if (topic === "Computer Architecture and Digital Logic")
    return <Cpu className={iconClass} />;

  return null;
}

function getSubtitle(topic: string) {
  if (topic === "C Programming") return "From basics to advanced applications";
  if (topic === "Python") return "From basics to circuit course";
  if (topic === "Java") return "Prepareeor and coffe learning";
  if (topic === "DBMS") return "Data-base drinking applications";
  if (topic === "Machine Learning") return "Learn how a neucryrited maching";
  if (topic.includes("Data Structures")) return "Advanced data structures";
  if (topic === "AI Tools") return "From basics to advanced pattertons";
  if (topic === "LLMs") return "Learn an text document";
  if (topic === "IoT") return "Circuit-ourot map map sensors";
  if (topic === "Foundations of Quantum Computing")
    return "Foundations of quantum mechanics and algorithms";
  if (topic === "Quantum Computing using Qiskit Lab")
    return "Hands-on quantum circuits with IBM Qiskit";

  // ── Mathematics (NEW) ────────────────────────────────────────────
  if (topic === "Mathematics for Emerging Technologies")
    return "Linear Algebra, Probability & Statistics for AI";
  if (topic === "Classical Mechanics and Electromagnetism")
    return "Lagrangian mechanics, Hamiltonian theory & Maxwell's equations";
  if (topic === "Computer Architecture and Digital Logic")
    return "Number systems, CPU design, microprocessors & Boolean algebra";

  return "Comprehensive learning module";
}

// ─────────────────────────────────────────────────────────────────────────────
// Background decorative icons per card
// ─────────────────────────────────────────────────────────────────────────────

function getMathBgIcon(topic: string) {
  // ── Mathematics for Emerging Technologies ────────────────────────
  if (topic === "Mathematics for Emerging Technologies") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg
          className="w-56 h-56 translate-x-10 translate-y-10"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {/* Grid lines */}
          <g className="text-amber-600/40 dark:text-amber-400/30">
            <line x1="0"   y1="100" x2="200" y2="100" />
            <line x1="100" y1="0"   x2="100" y2="200" />
            {/* Eigenvalue arrow */}
            <line x1="60"  y1="140" x2="140" y2="60" strokeWidth="2" className="text-amber-500" />
            <polygon points="140,60 128,68 134,80" fill="currentColor" className="text-amber-500" />
            {/* Sine wave */}
            <path d="M 10 150 Q 30 120 50 150 T 90 150 T 130 150 T 170 150" strokeWidth="2" className="text-amber-500/70" />
            {/* Sigma symbol approximation */}
            <text x="150" y="50" fontSize="40" fill="currentColor" className="text-amber-400/60" stroke="none">Σ</text>
          </g>
          {/* Matrix brackets */}
          <g className="text-amber-700/50" strokeWidth="2">
            <path d="M 20 20 L 10 20 L 10 80 L 20 80" />
            <path d="M 60 20 L 70 20 L 70 80 L 60 80" />
          </g>
        </svg>
      </div>
    );
  }

  // ── Classical Mechanics and Electromagnetism ──────────────────────
  if (topic === "Classical Mechanics and Electromagnetism") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg
          className="w-56 h-56 translate-x-8 translate-y-8"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {/* EM wave */}
          <path
            d="M 10 100 Q 30 60 50 100 T 90 100 T 130 100 T 170 100"
            strokeWidth="2"
            className="text-violet-500/70"
          />
          {/* B-field (perpendicular wave offset) */}
          <path
            d="M 10 100 Q 30 140 50 100 T 90 100 T 130 100 T 170 100"
            strokeWidth="2"
            className="text-violet-400/50"
            strokeDasharray="4 2"
          />
          {/* Orbit circle (Lagrangian / planetary) */}
          <ellipse cx="100" cy="100" rx="70" ry="35" strokeWidth="1.5" className="text-violet-600/40" />
          <circle cx="155" cy="100" r="7" fill="currentColor" className="text-violet-500/60" />
          <circle cx="100" cy="100" r="10" fill="currentColor" className="text-violet-700/60" />
          {/* Arrow for force */}
          <line x1="100" y1="100" x2="155" y2="100" strokeWidth="1.5" className="text-violet-500/50" />
        </svg>
      </div>
    );
  }

  // ── Computer Architecture and Digital Logic ───────────────────────
  if (topic === "Computer Architecture and Digital Logic") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-30 group-hover:opacity-50">
        <svg
          className="w-56 h-56 translate-x-10 translate-y-10"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {/* CPU die outline */}
          <rect x="60" y="60" width="80" height="80" rx="6" strokeWidth="2" className="text-emerald-500/60" />
          <rect x="75" y="75" width="50" height="50" rx="3" strokeWidth="1.5" className="text-emerald-600/50" fill="currentColor" fillOpacity="0.05" />
          {/* Pins top */}
          <g className="text-emerald-500/50" strokeWidth="1.5">
            <line x1="80"  y1="60" x2="80"  y2="45" />
            <line x1="95"  y1="60" x2="95"  y2="45" />
            <line x1="110" y1="60" x2="110" y2="45" />
            <line x1="125" y1="60" x2="125" y2="45" />
            {/* Pins bottom */}
            <line x1="80"  y1="140" x2="80"  y2="155" />
            <line x1="95"  y1="140" x2="95"  y2="155" />
            <line x1="110" y1="140" x2="110" y2="155" />
            <line x1="125" y1="140" x2="125" y2="155" />
            {/* Pins left */}
            <line x1="60" y1="80"  x2="45" y2="80"  />
            <line x1="60" y1="100" x2="45" y2="100" />
            <line x1="60" y1="120" x2="45" y2="120" />
            {/* Pins right */}
            <line x1="140" y1="80"  x2="155" y2="80"  />
            <line x1="140" y1="100" x2="155" y2="100" />
            <line x1="140" y1="120" x2="155" y2="120" />
          </g>
          {/* Binary text */}
          <text x="78" y="92"  fontSize="9" fill="currentColor" stroke="none" className="text-emerald-400/70" fontFamily="monospace">1010</text>
          <text x="78" y="105" fontSize="9" fill="currentColor" stroke="none" className="text-emerald-400/70" fontFamily="monospace">0110</text>
          <text x="78" y="118" fontSize="9" fill="currentColor" stroke="none" className="text-emerald-400/70" fontFamily="monospace">1101</text>
        </svg>
      </div>
    );
  }

  return null;
}

function getBgIcon(topic: string) {
  // ── Route math topics to the dedicated math bg-icon helper ────────
  if (
    topic === "Mathematics for Emerging Technologies" ||
    topic === "Classical Mechanics and Electromagnetism" ||
    topic === "Computer Architecture and Digital Logic"
  ) {
    return getMathBgIcon(topic);
  }

  const baseClass =
    "absolute transition-all duration-700 group-hover:scale-110 pointer-events-none";

  if (topic === "C Programming") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-40 group-hover:opacity-70">
        <svg className="w-64 h-64 translate-x-12 translate-y-12" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Traces Group - Dark Blue */}
          <g className="text-blue-800/40 dark:text-blue-400/50">
            {/* Top Traces */}
            <path d="M80 70 V 40 L 60 20" />
            <circle cx="60" cy="20" r="2" />
            <path d="M90 70 V 30 L 110 10" />
            <circle cx="110" cy="10" r="2" />
            <path d="M100 70 V 20" />
            <circle cx="100" cy="20" r="2" />
            <path d="M110 70 V 50 L 130 30" />
            <circle cx="130" cy="30" r="2" />
            <path d="M120 70 V 60 L 150 30" />
            {/* Bottom Traces */}
            <path d="M80 130 V 160 L 60 180" />
            <circle cx="60" cy="180" r="2" />
            <path d="M90 130 V 170 L 110 190" />
            <circle cx="110" cy="190" r="2" />
            <path d="M100 130 V 180" />
            <circle cx="100" cy="180" r="2" />
            <path d="M110 130 V 150 L 130 170" />
            <circle cx="130" cy="170" r="2" />
            <path d="M120 130 V 140 L 150 170" />
            {/* Left Traces */}
            <path d="M70 80 H 40 L 20 60" />
            <circle cx="20" cy="60" r="2" />
            <path d="M70 90 H 30 L 10 110" />
            <circle cx="10" cy="110" r="2" />
            <path d="M70 100 H 20" />
            <circle cx="20" cy="100" r="2" />
            <path d="M70 110 H 50 L 30 130" />
            <circle cx="30" cy="130" r="2" />
            <path d="M70 120 H 60 L 30 150" />
            {/* Right Traces */}
            <path d="M130 80 H 160 L 180 60" />
            <circle cx="180" cy="60" r="2" />
            <path d="M130 90 H 170 L 190 110" />
            <circle cx="190" cy="110" r="2" />
            <path d="M130 100 H 180" />
            <circle cx="180" cy="100" r="2" />
            <path d="M130 110 H 150 L 170 130" />
            <circle cx="170" cy="130" r="2" />
            <path d="M130 120 H 140 L 170 150" />
          </g>

          {/* Microchip Group - Solid */}
          <g className="drop-shadow-md group-hover:drop-shadow-lg transition-all duration-700">
            {/* Outer Chip */}
            <rect x="70" y="70" width="60" height="60" rx="4" strokeWidth="2" className="stroke-teal-700 dark:stroke-teal-500 fill-teal-50 dark:fill-teal-900/50" />
            {/* Inner Chip */}
            <rect x="80" y="80" width="40" height="40" rx="2" strokeWidth="1.5" className="stroke-teal-800 dark:stroke-teal-400 fill-teal-800 dark:fill-teal-600" />
            {/* Core Nodes */}
            <circle cx="90" cy="90" r="2" fill="#ffffff" />
            <circle cx="100" cy="90" r="2" fill="#ffffff" />
            <circle cx="110" cy="90" r="2" fill="#ffffff" />
            <circle cx="90" cy="100" r="2" fill="#ffffff" />
            <circle cx="100" cy="100" r="2" fill="#ffffff" />
            <circle cx="110" cy="100" r="2" fill="#ffffff" />
            <circle cx="90" cy="110" r="2" fill="#ffffff" />
            <circle cx="100" cy="110" r="2" fill="#ffffff" />
            <circle cx="110" cy="110" r="2" fill="#ffffff" />
          </g>
        </svg>
      </div>
    );
  }

  if (topic === "Python") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-40 group-hover:opacity-70">
        {/* Concentric traces */}
        <svg className="absolute -right-6 -bottom-6 w-72 h-72 text-[#111F22]/20 dark:text-cyan-800/30" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="100" cy="100" r="30" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="45" strokeDasharray="10 4" />
          <circle cx="100" cy="100" r="60" strokeDasharray="2 6" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="75" strokeDasharray="20 5" />
          <circle cx="100" cy="100" r="90" strokeDasharray="4 8" strokeWidth="0.5" />
          {/* Dots on traces */}
          <circle cx="100" cy="55" r="2" fill="currentColor" />
          <circle cx="145" cy="100" r="2" fill="currentColor" />
          <circle cx="55" cy="100" r="2" fill="currentColor" />
          <circle cx="100" cy="145" r="2" fill="currentColor" />
          <circle cx="100" cy="25" r="2.5" fill="currentColor" />
          <circle cx="175" cy="100" r="2.5" fill="currentColor" />
          <circle cx="25" cy="100" r="2.5" fill="currentColor" />
          <circle cx="100" cy="175" r="2.5" fill="currentColor" />
          {/* Connecting lines */}
          <path d="M 100 70 L 100 55" />
          <path d="M 130 100 L 145 100" />
          <path d="M 100 130 L 100 145" />
          <path d="M 70 100 L 55 100" />
          <path d="M 100 40 L 100 25" />
          <path d="M 160 100 L 175 100" />
        </svg>
        {/* Python Logo in center */}
        <div className="absolute -right-2 bottom-0 w-48 h-48 flex items-center justify-center drop-shadow-md group-hover:drop-shadow-lg transition-all duration-700">
          <i className="fab fa-python text-teal-800 dark:text-teal-600 text-[100px]"></i>
        </div>
      </div>
    );
  }

  if (topic === "Java") {
    return (
      <div className="absolute right-2 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-40 group-hover:opacity-70">
        <div className="w-36 h-36 flex items-center justify-center drop-shadow-[0_8px_16px_rgba(15,23,42,0.4)] opacity-90">
          <i className="fab fa-java text-slate-700 dark:text-slate-400 text-[130px]"></i>
        </div>
      </div>
    );
  }

  if (topic === "DBMS") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-40 group-hover:opacity-70">
        <svg className="w-48 h-48 translate-x-8 translate-y-8 opacity-95 drop-shadow-[0_0_20px_rgba(45,212,191,0.25)]" viewBox="-20 -20 240 240" fill="none" stroke="currentColor">
          <defs>
             <linearGradient id="dbCyl" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#0d9488" stopOpacity="0.9"/>
               <stop offset="50%" stopColor="#042f2e" stopOpacity="0.7"/>
               <stop offset="100%" stopColor="#022c22" stopOpacity="0.85"/>
             </linearGradient>
             <linearGradient id="dbTop" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
               <stop offset="100%" stopColor="#042f2e" stopOpacity="0.4"/>
             </linearGradient>
             <linearGradient id="dbBubble" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#0f766e" stopOpacity="0.9"/>
               <stop offset="100%" stopColor="#022c22" stopOpacity="0.5"/>
             </linearGradient>
          </defs>
          <g stroke="#94a3b8" strokeWidth="1" opacity="0.3">
             <path d="M-20 100 L 50 -20 L 150 20 L 220 -20 L 240 100 L 150 220 L 50 180 Z" />
             <path d="M50 -20 L 100 100 L 150 20" />
             <path d="M-20 100 L 100 100 L 50 180" />
             <path d="M240 100 L 100 100 L 150 220" />
          </g>
          <g stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
               const r = 90;
               const rad = angle * Math.PI / 180;
               const x = 100 + r * Math.cos(rad);
               const y = 100 + r * Math.sin(rad);
               return <line key={i} x1="100" y1="100" x2={x} y2={y} />;
            })}
          </g>
          <g>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
               const r = 90;
               const rad = angle * Math.PI / 180;
               const cx = 100 + r * Math.cos(rad);
               const cy = 100 + r * Math.sin(rad);
               return (
                 <g key={i} transform={`translate(${cx}, ${cy})`}>
                   <circle cx="0" cy="0" r="18" fill="url(#dbBubble)" stroke="#0d9488" strokeWidth="1.5" />
                   <circle cx="0" cy="-3" r="4.5" fill="#ccfbf1" opacity="0.8" />
                   <path d="M -9 9 C -9 4, -4 2, 0 2 C 4 2, 9 4, 9 9 Z" fill="#ccfbf1" opacity="0.8" />
                 </g>
               );
            })}
          </g>
          {[125, 95, 65].map((y, i) => (
            <g key={i} transform={`translate(100, ${y})`}>
               <path d="M -35 -15 V 15 C -35 25, 35 25, 35 15 V -15 Z" fill="url(#dbCyl)" stroke="#0d9488" strokeWidth="1.5" />
               <ellipse cx="0" cy="-15" rx="35" ry="10" fill="url(#dbTop)" stroke="#0d9488" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (topic === "Machine Learning") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-40 group-hover:opacity-70">
        <svg className="w-48 h-48 translate-x-8 translate-y-2 opacity-95 drop-shadow-[0_0_20px_rgba(45,212,191,0.3)]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <defs>
             <linearGradient id="mlGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#5eead4" />
               <stop offset="100%" stopColor="#0f766e" />
             </linearGradient>
          </defs>
          <g stroke="#94a3b8" strokeWidth="0.5" opacity="0.4" fill="none">
             <path d="M 0 50 Q 50 100 100 50 T 200 50 M 0 100 Q 50 150 100 100 T 200 100" />
             <path d="M 50 0 Q 100 50 50 100 T 50 200 M 150 0 Q 100 50 150 100 T 150 200" />
             <line x1="0" y1="0" x2="200" y2="200" />
             <line x1="200" y1="0" x2="0" y2="200" />
             <circle cx="100" cy="100" r="70" />
          </g>
          <g stroke="url(#mlGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
             <path d="M 100 65 L 100 25" />
             <path d="M 80 65 L 70 45 L 70 30" />
             <path d="M 120 65 L 130 45 L 130 30" />
             <path d="M 65 85 L 35 85" />
             <path d="M 135 85 L 165 85" />
             <path d="M 75 105 L 55 125 L 40 125" />
             <path d="M 125 105 L 145 125 L 160 125" />
          </g>
          <g stroke="url(#mlGradient)" strokeWidth="3" fill="#f0fdfa">
             <circle cx="100" cy="25" r="5" />
             <circle cx="70" cy="30" r="5" />
             <circle cx="130" cy="30" r="5" />
             <circle cx="35" cy="85" r="5" />
             <circle cx="165" cy="85" r="5" />
             <circle cx="40" cy="125" r="5" />
             <circle cx="160" cy="125" r="5" />
          </g>
          <g stroke="url(#mlGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="#f0fdfa" opacity="0.95">
             <path d="M 65 75 Q 55 90 65 105" fill="none" />
             <path d="M 135 75 Q 145 90 135 105" fill="none" />
             <rect x="65" y="65" width="70" height="45" rx="8" />
             <circle cx="85" cy="85" r="4.5" fill="url(#mlGradient)" stroke="none" />
             <circle cx="115" cy="85" r="4.5" fill="url(#mlGradient)" stroke="none" />
             <path d="M 85 98 H 115" strokeWidth="2" />
             <path d="M 90 110 V 120 M 110 110 V 120" />
             <path d="M 60 165 C 60 125 140 125 140 165 Z" />
             <path d="M 75 145 Q 100 135 125 145 V 160 Q 100 170 75 160 Z" />
             <path d="M 90 150 V 160 M 110 150 V 160" strokeWidth="2" />
          </g>
        </svg>
      </div>
    );
  }

  if (topic.includes("Data Structures")) {
    const IsoNode = ({ cx, cy }: { cx: number; cy: number }) => (
      <g transform={`translate(${cx}, ${cy})`}>
        <path d="M 0 10 L 15 18 V 30 L 0 22 Z" fill="#0f766e" />
        <path d="M 30 10 L 15 18 V 30 L 30 22 Z" fill="#115e59" />
        <path d="M 0 10 L 15 2 L 30 10 L 15 18 Z" fill="#14b8a6" stroke="#5eead4" strokeWidth="0.5" />
        <circle cx="15" cy="10" r="2.5" fill="#ffffff" />
      </g>
    );
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-40 group-hover:opacity-70">
        <svg className="w-64 h-64 text-slate-400 translate-x-20 translate-y-8" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e40af" stroke="none" opacity="0.6" />
            </marker>
          </defs>
          <g stroke="#1e40af" strokeWidth="1.5" opacity="0.6">
            <path d="M 100 45 L 75 60" markerEnd="url(#arrow)" />
            <path d="M 100 45 L 125 60" markerEnd="url(#arrow)" />
            <path d="M 75 80 L 50 95" markerEnd="url(#arrow)" />
            <path d="M 75 80 L 100 95" markerEnd="url(#arrow)" />
            <path d="M 125 80 L 100 95" markerEnd="url(#arrow)" />
            <path d="M 125 80 L 150 95" markerEnd="url(#arrow)" />
            <path d="M 50 115 L 75 130" markerEnd="url(#arrow)" />
            <path d="M 100 115 L 125 130" markerEnd="url(#arrow)" />
            <path d="M 150 115 L 125 130" markerEnd="url(#arrow)" />
          </g>
          <IsoNode cx={85} cy={20} />
          <IsoNode cx={60} cy={55} />
          <IsoNode cx={110} cy={55} />
          <IsoNode cx={35} cy={90} />
          <IsoNode cx={85} cy={90} />
          <IsoNode cx={135} cy={90} />
          <IsoNode cx={60} cy={125} />
          <IsoNode cx={110} cy={125} />
          <circle cx="45" cy="50" r="3" fill="#0f766e" opacity="0.6" />
          <circle cx="165" cy="45" r="4" fill="#115e59" opacity="0.6" />
          <circle cx="155" cy="85" r="2" fill="#14b8a6" opacity="0.6" />
          <circle cx="160" cy="145" r="3" fill="#0f766e" opacity="0.6" />
          <path d="M 140 25 L 160 40" stroke="#1e40af" strokeWidth="1" opacity="0.3" />
          <path d="M 30 130 L 60 145" stroke="#1e40af" strokeWidth="1" opacity="0.3" />
          <path d="M 140 145 L 170 120" stroke="#1e40af" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>
    );
  }

  if (topic === "AI Tools") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-40 group-hover:opacity-70">
        <svg className="w-56 h-48 translate-x-10 translate-y-6 opacity-95 drop-shadow-[0_0_15px_rgba(45,212,191,0.2)]" viewBox="0 0 300 220" fill="none" stroke="currentColor">
          <defs>
            <radialGradient id="nodeNormal" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ccfbf1" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#14b8a6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#042f2e" stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#5eead4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nodeBright" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="40%" stopColor="#99f6e4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0.8" />
            </radialGradient>
          </defs>
          <g stroke="#0f766e" strokeWidth="1.5" opacity="0.6">
            {[40, 110, 180].map((x, colIndex) =>
              [40, 75, 110, 145, 180].map(y1 =>
                [40, 75, 110, 145, 180].map(y2 => (
                  <path key={`wire-${colIndex}-${y1}-${y2}`} d={`M ${x} ${y1} L ${x + 70} ${y2}`} />
                ))
              )
            )}
          </g>
          <g stroke="#5eead4" strokeWidth="2.5" opacity="0.8" strokeLinecap="round">
             <path d="M 40 110 L 110 40 L 180 145 L 250 40" />
             <path d="M 110 145 L 180 110 L 250 180" />
             <path d="M 180 75 L 250 110" />
             <path d="M 40 180 L 110 145" />
             <path d="M 110 75 L 180 75" />
             <path d="M 40 40 L 110 75 L 180 40" />
             <path d="M 180 110 L 320 160" />
             <path d="M 180 110 L 140 -10" />
             <path d="M 110 40 L -10 90" />
             <path d="M 110 145 L -10 190" />
             <path d="M 250 110 L 320 60" />
          </g>
          <g>
            {[40, 110, 180, 250].map((x, colIndex) =>
              [40, 75, 110, 145, 180].map((y, rowIndex) => {
                const isGlowing =
                  (colIndex === 0 && rowIndex === 2) ||
                  (colIndex === 0 && rowIndex === 4) ||
                  (colIndex === 1 && rowIndex === 0) ||
                  (colIndex === 1 && rowIndex === 1) ||
                  (colIndex === 1 && rowIndex === 3) ||
                  (colIndex === 2 && rowIndex === 1) ||
                  (colIndex === 2 && rowIndex === 2) ||
                  (colIndex === 3 && rowIndex === 0) ||
                  (colIndex === 3 && rowIndex === 4);
                return (
                  <g key={`${x}-${y}`} transform={`translate(${x}, ${y})`}>
                    {isGlowing && <circle cx="0" cy="0" r="18" fill="url(#nodeGlow)" />}
                    <circle cx="0" cy="0" r="10" fill={isGlowing ? "url(#nodeBright)" : "url(#nodeNormal)"} stroke={isGlowing ? "#ccfbf1" : "#14b8a6"} strokeWidth="1.5" />
                    <ellipse cx="-3" cy="-3" rx="4" ry="2.5" transform="rotate(-45 -3 -3)" fill="#ffffff" opacity={isGlowing ? "0.9" : "0.5"} />
                  </g>
                );
              })
            )}
          </g>
        </svg>
      </div>
    );
  }

  if (topic === "LLMs") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-40 group-hover:opacity-70">
        <svg className="w-56 h-56 translate-x-12 translate-y-8 opacity-95 drop-shadow-[0_0_15px_rgba(15,118,110,0.2)]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <defs>
            <linearGradient id="llmGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f766e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#042f2e" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="llmGlassDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#022c22" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <g stroke="#0d9488" strokeWidth="0.5" opacity="0.3">
            <ellipse cx="100" cy="100" rx="80" ry="80" fill="none" />
            <ellipse cx="100" cy="100" rx="40" ry="80" fill="none" />
            <ellipse cx="100" cy="100" rx="80" ry="40" fill="none" />
            <line x1="20" y1="100" x2="180" y2="100" />
            <line x1="100" y1="20" x2="100" y2="180" />
          </g>
          <g stroke="#0f766e" strokeWidth="1.5" opacity="0.8">
            <path d="M 20 80 Q 50 120 100 80 T 180 80" fill="none" />
            <path d="M 20 100 Q 60 140 100 100 T 180 100" fill="none" />
            <path d="M 20 120 Q 70 160 100 120 T 180 120" fill="none" />
          </g>
          <g fill="#022c22" stroke="#0d9488" strokeWidth="1" opacity="0.8">
            <path d="M 20 60 V 140 M 40 60 V 140 M 20 60 H 40 M 20 86 H 40 M 20 113 H 40 M 20 140 H 40" strokeWidth="1.5" />
            <circle cx="20" cy="60" r="3" /><circle cx="40" cy="60" r="3" />
            <circle cx="20" cy="86" r="3" /><circle cx="40" cy="86" r="3" />
            <circle cx="20" cy="113" r="3" /><circle cx="40" cy="113" r="3" />
            <circle cx="20" cy="140" r="3" /><circle cx="40" cy="140" r="3" />
          </g>
          <g fill="#022c22" stroke="#0d9488" strokeWidth="1" opacity="0.8">
            <path d="M 160 60 V 140 M 180 60 V 140 M 160 60 H 180 M 160 86 H 180 M 160 113 H 180 M 160 140 H 180" strokeWidth="1.5" />
            <circle cx="160" cy="60" r="3" /><circle cx="180" cy="60" r="3" />
            <circle cx="160" cy="86" r="3" /><circle cx="180" cy="86" r="3" />
            <circle cx="160" cy="113" r="3" /><circle cx="180" cy="113" r="3" />
            <circle cx="160" cy="140" r="3" /><circle cx="180" cy="140" r="3" />
          </g>
          <g transform="translate(100, 100) skewY(-15) scale(1, 1.2) translate(-100, -100)">
            <path d="M 130 30 L 145 40 V 180 L 130 170 Z" fill="url(#llmGlassDark)" stroke="#0f766e" strokeWidth="1" />
            <rect x="70" y="30" width="60" height="140" fill="url(#llmGlass)" stroke="#0d9488" strokeWidth="2" />
            <g stroke="#5eead4" strokeWidth="2" strokeLinecap="round">
              <path d="M 85 50 H 115" strokeWidth="3" />
              <path d="M 100 50 V 85" strokeWidth="3" />
              <line x1="80" y1="100" x2="120" y2="100" />
              <line x1="80" y1="115" x2="110" y2="115" />
              <line x1="80" y1="130" x2="125" y2="130" />
              <line x1="80" y1="145" x2="100" y2="145" />
            </g>
          </g>
          <g stroke="#99f6e4" strokeWidth="2" opacity="0.9">
            <path d="M 20 80 Q 50 120 100 80 T 180 80" fill="none" />
            <path d="M 20 100 Q 60 140 100 100 T 180 100" fill="none" />
            <path d="M 20 120 Q 70 160 100 120 T 180 120" fill="none" />
          </g>
        </svg>
      </div>
    );
  }

  if (topic === "IoT") {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-40 group-hover:opacity-70">
        <svg className="w-56 h-56 translate-x-8 translate-y-12 opacity-95 drop-shadow-[0_10px_20px_rgba(45,212,191,0.2)]" viewBox="-40 -40 480 480" fill="none" stroke="currentColor">
          <defs>
             <linearGradient id="iotTopLayer" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#0f766e" stopOpacity="0.9" />
               <stop offset="100%" stopColor="#042f2e" stopOpacity="0.8" />
             </linearGradient>
             <linearGradient id="iotMidLayer" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#0d9488" stopOpacity="0.85" />
               <stop offset="100%" stopColor="#022c22" stopOpacity="0.75" />
             </linearGradient>
             <linearGradient id="iotBotLayer" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#115e59" stopOpacity="0.8" />
               <stop offset="100%" stopColor="#022c22" stopOpacity="0.7" />
             </linearGradient>
          </defs>
          <g transform="translate(200, 180) scale(1, 0.5) rotate(-45)">
             <g transform="translate(0, 0)">
               <path d="M -90 -90 L -90 90 L -110 110 L -110 -70 Z" fill="#042f2e" opacity="0.9" />
               <path d="M -90 90 L 90 90 L 70 110 L -110 110 Z" fill="#022c22" opacity="0.9" />
               <rect x="-90" y="-90" width="180" height="180" fill="url(#iotBotLayer)" stroke="#0d9488" strokeWidth="2" />
             </g>
             <g transform="translate(40, -40)">
               <path d="M -90 -90 L -130 -50 M 90 -90 L 50 -50 M -90 90 L -130 130 M 90 90 L 50 130" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
               <path d="M -90 -90 L -90 90 L -100 100 L -100 -80 Z" fill="#0f766e" opacity="0.9" />
               <path d="M -90 90 L 90 90 L 80 100 L -100 100 Z" fill="#042f2e" opacity="0.9" />
               <rect x="-90" y="-90" width="180" height="180" fill="url(#iotMidLayer)" stroke="#0d9488" strokeWidth="2" />
             </g>
             <g transform="translate(80, -80)">
               <path d="M -50 -50 L -90 -10 M 50 -50 L 10 -10 M -50 50 L -90 90 M 50 50 L 10 90" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
               <path d="M -50 -50 L -50 50 L -60 60 L -60 -40 Z" fill="#115e59" opacity="0.9" />
               <path d="M -50 50 L 50 50 L 40 60 L -60 60 Z" fill="#042f2e" opacity="0.9" />
               <rect x="-50" y="-50" width="100" height="100" fill="url(#iotTopLayer)" stroke="#0d9488" strokeWidth="3" />
               <rect x="-25" y="-25" width="50" height="50" fill="#022c22" stroke="#14b8a6" strokeWidth="1.5" />
               <path d="M -15 -15 L -5 -5 M 15 15 L 5 5" stroke="#5eead4" strokeWidth="2" />
               <g stroke="#14b8a6" strokeWidth="2">
                  <path d="M -20 -50 V -65 M 0 -50 V -65 M 20 -50 V -65" />
                  <path d="M -20 50 V 65 M 0 50 V 65 M 20 50 V 65" />
                  <path d="M -50 -20 H -65 M -50 0 H -65 M -50 20 H -65" />
                  <path d="M 50 -20 H 65 M 50 0 H 65 M 50 20 H 65" />
               </g>
             </g>
          </g>
        </svg>
      </div>
    );
  }

  if (
    topic === "Foundations of Quantum Computing" ||
    topic === "Quantum Computing using Qiskit Lab"
  ) {
    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-40 group-hover:opacity-70">
        <svg className="w-56 h-56 translate-x-12 translate-y-8 opacity-95 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <g stroke="#d8b4fe" strokeWidth="0.5" opacity="0.4">
            <ellipse cx="100" cy="100" rx="80" ry="20" transform="rotate(0 100 100)" />
            <ellipse cx="100" cy="100" rx="80" ry="20" transform="rotate(60 100 100)" />
            <ellipse cx="100" cy="100" rx="80" ry="20" transform="rotate(120 100 100)" />
          </g>
          <circle cx="100" cy="100" r="10" fill="#a855f7" />
          <circle cx="178" cy="100" r="4" fill="#d8b4fe" />
          <circle cx="60" cy="169" r="4" fill="#d8b4fe" />
          <circle cx="60" cy="31" r="4" fill="#d8b4fe" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${baseClass} -right-6 -bottom-6 opacity-[0.08]`}>
      <BookOpen className="w-36 h-36 text-[#111F22] dark:text-slate-500" strokeWidth={0.5} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Route
// ─────────────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — VLMS" },
      { name: "description", content: "Technical courses for the curriculum." },
    ],
  }),
  component: CoursesPage,
});

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

function CoursesPage() {
  const [profile, setProfile] = useState<{ name: string; interests: string[] } | null>(null);

  // ── Tab state — now includes "mathematics" ───────────────────────
  const [activeTab, setActiveTab] = useState<
    "programming" | "ai" | "emerging" | "mathematics"
  >("programming");

  useEffect(() => {
    const profileStr = localStorage.getItem("currentUserProfile");
    if (profileStr) {
      try {
        setProfile(JSON.parse(profileStr));
      } catch (e) {}
    }
  }, []);

  const itBranch = branches.find((b) => b.code === "IT");
  const courses = itBranch?.topics || [];

  // ── Existing tab filters ─────────────────────────────────────────
  const programmingCourses = courses.filter((c) =>
    ["c programming", "python", "java", "data structures"].some((p) =>
      c.toLowerCase().includes(p)
    )
  );
  const aiCourses = courses.filter((c) =>
    ["ai tools", "llms", "machine learning", "dbms"].some((p) =>
      c.toLowerCase().includes(p)
    )
  );
  const emergingCourses = courses.filter(
    (c) =>
      !programmingCourses.includes(c) &&
      !aiCourses.includes(c) &&
      // exclude the new math courses from "Emerging"
      c !== "Mathematics for Emerging Technologies" &&
      c !== "Classical Mechanics and Electromagnetism" &&
      c !== "Computer Architecture and Digital Logic"
  );

  // ── NEW: Mathematics tab filter ──────────────────────────────────
  const mathCourses = courses.filter((c) =>
    [
      "mathematics for emerging technologies",
      "classical mechanics and electromagnetism",
      "computer architecture and digital logic",
    ].includes(c.toLowerCase())
  );

  // ── Card renderer (shared across all tabs) ───────────────────────
  const renderCard = (t: string) => {
    const slug = t
      .toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-");

    // ── Card colour theming per tab ──────────────────────────────
    const isMath =
      t === "Mathematics for Emerging Technologies" ||
      t === "Classical Mechanics and Electromagnetism" ||
      t === "Computer Architecture and Digital Logic";

    const cardBgClass = isMath
      ? "bg-amber-50/60 dark:bg-amber-950/20"
      : "bg-[#f0f9fa] dark:bg-cyan-950/30";
    const cardBorderClass = isMath
      ? "border-amber-400/30 dark:border-amber-600/30"
      : "border-[#14b8a6]/20 dark:border-slate-500";
    const btnBorderClass = isMath
      ? "border-amber-400/50 dark:border-amber-600/40"
      : "border-[#14b8a6]/40 dark:border-slate-500";

    return (
      <Link
        key={t}
        to={`/course/${slug}` as any}
        className={`group relative overflow-hidden flex flex-col justify-between p-6 rounded-xl border ${cardBorderClass} ${cardBgClass} transition-all h-[190px] hover:shadow-[0_8px_30px_rgba(20,184,166,0.15)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1`}
      >
        <div className="relative z-10 w-3/4">
          <h3 className="font-display text-[21px] font-bold mb-1 flex items-start gap-2.5 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">
            {getTopicIcon(t) && (
              <div className="mt-1">{getTopicIcon(t)}</div>
            )}
            <span className="leading-tight">{t}</span>
          </h3>
          <p className="text-[13.5px] text-[#4A5558] dark:text-slate-400 font-medium leading-relaxed mt-1.5 mb-6">
            {getSubtitle(t)}
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 w-fit mt-4">
          <div
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-transparent border ${btnBorderClass} rounded-full text-[13px] font-medium text-[#111111] dark:text-slate-300 hover:bg-[#111F22]/5 dark:hover:bg-slate-800 transition-colors`}
          >
            Explore Course <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Background Icon */}
        {getBgIcon(t)}
      </Link>
    );
  };

  // ─────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="px-6 lg:px-10 py-12 max-w-[1150px] mx-auto">
      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary w-fit block">
        Curriculum
      </div>
      <h1 className="mt-2 font-display text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary pb-2 w-fit block">
        Courses
      </h1>
      {profile?.name && (
        <p className="mt-2 text-cyan font-medium text-lg">
          Welcome back, {profile.name}!
        </p>
      )}
      <p className="mt-2 text-muted-foreground max-w-2xl mb-10">
        Explore the complete syllabus and experiment workspace for your courses.
      </p>

      {/* ── Tab Navigation ──────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2">

        {/* Programming */}
        <button
          onClick={() => setActiveTab("programming")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
            activeTab === "programming"
              ? "bg-blue-500/10 text-blue-500 border border-blue-400/50 shadow-sm"
              : "bg-white/5 dark:bg-slate-800/50 text-muted-foreground border border-transparent hover:bg-white/10 dark:hover:bg-slate-800"
          }`}
        >
          <Code className="size-4" /> Programming
        </button>

        {/* Artificial Intelligence */}
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
            activeTab === "ai"
              ? "bg-purple-500/10 text-purple-500 border border-purple-400/50 shadow-sm"
              : "bg-white/5 dark:bg-slate-800/50 text-muted-foreground border border-transparent hover:bg-white/10 dark:hover:bg-slate-800"
          }`}
        >
          <Sparkles className="size-4" /> Artificial Intelligence
        </button>

        {/* Emerging Technologies */}
        <button
          onClick={() => setActiveTab("emerging")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
            activeTab === "emerging"
              ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-400/50 shadow-sm"
              : "bg-white/5 dark:bg-slate-800/50 text-muted-foreground border border-transparent hover:bg-white/10 dark:hover:bg-slate-800"
          }`}
        >
          <Hexagon className="size-4" /> Emerging Technologies
        </button>

        {/* ── Mathematics for Emerging Technologies (NEW) ─────────── */}
        <button
          onClick={() => setActiveTab("mathematics")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
            activeTab === "mathematics"
              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-400/50 shadow-sm"
              : "bg-white/5 dark:bg-slate-800/50 text-muted-foreground border border-transparent hover:bg-white/10 dark:hover:bg-slate-800"
          }`}
        >
          <Calculator className="size-4" /> Mathematics
        </button>
      </div>

      {/* ── Tab Content ─────────────────────────────────────────────── */}

      {activeTab === "programming" && programmingCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {programmingCourses.map((t) => renderCard(t))}
        </div>
      )}

      {activeTab === "ai" && aiCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {aiCourses.map((t) => renderCard(t))}
        </div>
      )}

      {activeTab === "emerging" && emergingCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {emergingCourses.map((t) => renderCard(t))}
        </div>
      )}

      {/* ── Mathematics tab content (NEW) ───────────────────────────── */}
      {activeTab === "mathematics" && mathCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {mathCourses.map((t) => renderCard(t))}
        </div>
      )}
    </div>
  );
}