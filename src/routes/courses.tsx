import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { branches } from "@/lib/lab-data";
import {
  BookOpen, GitBranch, Code, Workflow, Monitor, Database, Brain,
  Sparkles, Bot, Star, Network, Cpu, TerminalSquare, Coffee,
  MessageSquareText, Wifi, Code2, ArrowRight, Share2, Hexagon, Component, ChevronRight
} from "lucide-react";

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
  if (topic === "Algorithms") return <Workflow className={iconClass} />;
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
  return "Comprehensive learning module";
}

function getBgIcon(topic: string) {
  const baseClass = "absolute opacity-10 transition-all duration-700 group-hover:scale-110 pointer-events-none";

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

          {/* Antennas / Wires */}
          <g stroke="url(#mlGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
             {/* Top Center */}
             <path d="M 100 65 L 100 25" />
             {/* Top Left */}
             <path d="M 80 65 L 70 45 L 70 30" />
             {/* Top Right */}
             <path d="M 120 65 L 130 45 L 130 30" />
             
             {/* Mid Left */}
             <path d="M 65 85 L 35 85" />
             {/* Mid Right */}
             <path d="M 135 85 L 165 85" />
             
             {/* Bottom Left */}
             <path d="M 75 105 L 55 125 L 40 125" />
             {/* Bottom Right */}
             <path d="M 125 105 L 145 125 L 160 125" />
          </g>

          {/* Nodes */}
          <g stroke="url(#mlGradient)" strokeWidth="3" fill="#f0fdfa">
             <circle cx="100" cy="25" r="5" />
             <circle cx="70" cy="30" r="5" />
             <circle cx="130" cy="30" r="5" />
             <circle cx="35" cy="85" r="5" />
             <circle cx="165" cy="85" r="5" />
             <circle cx="40" cy="125" r="5" />
             <circle cx="160" cy="125" r="5" />
          </g>

          {/* Robot Head & Body */}
          <g stroke="url(#mlGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="#f0fdfa" opacity="0.95">
             {/* Ears */}
             <path d="M 65 75 Q 55 90 65 105" fill="none" />
             <path d="M 135 75 Q 145 90 135 105" fill="none" />
             
             {/* Face */}
             <rect x="65" y="65" width="70" height="45" rx="8" />
             
             {/* Eyes */}
             <circle cx="85" cy="85" r="4.5" fill="url(#mlGradient)" stroke="none" />
             <circle cx="115" cy="85" r="4.5" fill="url(#mlGradient)" stroke="none" />
             
             {/* Mouth */}
             <path d="M 85 98 H 115" strokeWidth="2" />
             
             {/* Neck */}
             <path d="M 90 110 V 120 M 110 110 V 120" />
             
             {/* Shoulders / Body */}
             <path d="M 60 165 C 60 125 140 125 140 165 Z" />
             
             {/* Chest Emblem */}
             <path d="M 75 145 Q 100 135 125 145 V 160 Q 100 170 75 160 Z" />
             <path d="M 90 150 V 160 M 110 150 V 160" strokeWidth="2" />
          </g>
        </svg>
      </div>
    );
  }

  if (topic.includes("Data Structures")) {
    const IsoNode = ({ cx, cy }: { cx: number, cy: number }) => (
      <g transform={`translate(${cx}, ${cy})`}>
        {/* Left side */}
        <path d="M 0 10 L 15 18 V 30 L 0 22 Z" fill="#0f766e" />
        {/* Right side */}
        <path d="M 30 10 L 15 18 V 30 L 30 22 Z" fill="#115e59" />
        {/* Top lid */}
        <path d="M 0 10 L 15 2 L 30 10 L 15 18 Z" fill="#14b8a6" stroke="#5eead4" strokeWidth="0.5" />
        {/* Center dot */}
        <circle cx="15" cy="10" r="2.5" fill="#ffffff" />
      </g>
    );

    return (
      <div className="absolute right-0 bottom-0 pointer-events-none transition-all duration-700 group-hover:scale-105 overflow-visible opacity-40 group-hover:opacity-70">
        <svg className="w-64 h-64 text-slate-400 translate-x-20 translate-y-8" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Definition for arrowhead */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e40af" stroke="none" opacity="0.6" />
            </marker>
          </defs>

          {/* Arrows/Connections between nodes */}
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

          {/* Draw 3D nodes */}
          <IsoNode cx={85} cy={20} />

          <IsoNode cx={60} cy={55} />
          <IsoNode cx={110} cy={55} />

          <IsoNode cx={35} cy={90} />
          <IsoNode cx={85} cy={90} />
          <IsoNode cx={135} cy={90} />

          <IsoNode cx={60} cy={125} />
          <IsoNode cx={110} cy={125} />

          {/* Floating decorative dots and lines matching screenshot */}
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

          {/* Base Wires */}
          <g stroke="#0f766e" strokeWidth="1.5" opacity="0.6">
            {[40, 110, 180].map((x, colIndex) =>
              [40, 75, 110, 145, 180].map(y1 =>
                [40, 75, 110, 145, 180].map(y2 => (
                  <path key={`wire-${colIndex}-${y1}-${y2}`} d={`M ${x} ${y1} L ${x + 70} ${y2}`} />
                ))
              )
            )}
          </g>

          {/* Glowing Wires */}
          <g stroke="#5eead4" strokeWidth="2.5" opacity="0.8" strokeLinecap="round">
             <path d="M 40 110 L 110 40 L 180 145 L 250 40" />
             <path d="M 110 145 L 180 110 L 250 180" />
             <path d="M 180 75 L 250 110" />
             <path d="M 40 180 L 110 145" />
             <path d="M 110 75 L 180 75" />
             <path d="M 40 40 L 110 75 L 180 40" />
             {/* Diagonal long rays */}
             <path d="M 180 110 L 320 160" />
             <path d="M 180 110 L 140 -10" />
             <path d="M 110 40 L -10 90" />
             <path d="M 110 145 L -10 190" />
             <path d="M 250 110 L 320 60" />
          </g>

          {/* Nodes */}
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
                    {/* Glass highlight */}
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

          {/* Central 3-Layer Stack */}
          <g transform="translate(200, 180) scale(1, 0.5) rotate(-45)">
             {/* Base Layer */}
             <g transform="translate(0, 0)">
               <path d="M -90 -90 L -90 90 L -110 110 L -110 -70 Z" fill="#042f2e" opacity="0.9" />
               <path d="M -90 90 L 90 90 L 70 110 L -110 110 Z" fill="#022c22" opacity="0.9" />
               <rect x="-90" y="-90" width="180" height="180" fill="url(#iotBotLayer)" stroke="#0d9488" strokeWidth="2" />
             </g>

             {/* Middle Layer (Logic & Bus) */}
             <g transform="translate(40, -40)">
               {/* Stand-offs */}
               <path d="M -90 -90 L -130 -50 M 90 -90 L 50 -50 M -90 90 L -130 130 M 90 90 L 50 130" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
               
               {/* Extrusion */}
               <path d="M -90 -90 L -90 90 L -100 100 L -100 -80 Z" fill="#0f766e" opacity="0.9" />
               <path d="M -90 90 L 90 90 L 80 100 L -100 100 Z" fill="#042f2e" opacity="0.9" />
               <rect x="-90" y="-90" width="180" height="180" fill="url(#iotMidLayer)" stroke="#0d9488" strokeWidth="2" />
               
               {/* Logic Gates (Left Side) */}
               <g transform="translate(-70, -60)" stroke="#14b8a6" strokeWidth="2" fill="none">
                 {/* AND Gate */}
                 <path d="M 0 0 H 20 V 30 H 0 Z" fill="#0d9488" opacity="0.3" />
                 <path d="M -10 5 H 0 M -10 25 H 0" />
                 <path d="M 20 0 C 40 0, 40 30, 20 30" fill="#0d9488" opacity="0.3" />
                 <path d="M 35 15 H 50" />
                 
                 {/* OR Gate */}
                 <g transform="translate(0, 50)">
                   <path d="M 0 0 Q 15 15 0 30 Q 30 30 35 15 Q 30 0 0 0" fill="#0d9488" opacity="0.3" />
                   <path d="M -10 5 H 5 M -10 25 H 5 M 35 15 H 50" />
                 </g>
                 
                 {/* NOT Gate */}
                 <g transform="translate(0, 100)">
                   <path d="M 0 0 L 0 30 L 25 15 Z" fill="#0d9488" opacity="0.3" />
                   <circle cx="30" cy="15" r="4" />
                   <path d="M -10 15 H 0 M 34 15 H 50" />
                 </g>
               </g>
               
               {/* Parallel Bus Traces (Right Side) */}
               <g transform="translate(30, -70)" stroke="#14b8a6" strokeWidth="1.5" opacity="0.7" fill="none">
                 {[0, 10, 20, 30, 40, 50, 60, 70, 80].map(i => (
                   <path key={i} d={`M ${i} 0 V 100 L ${i-20} 120 V 150`} />
                 ))}
                 {[10, 30, 50, 70].map(i => (
                   <circle key={`via-${i}`} cx={i - 20} cy="150" r="2" fill="#14b8a6" />
                 ))}
               </g>
             </g>

             {/* Top Layer (Microchip) */}
             <g transform="translate(80, -80)">
               {/* Stand-offs */}
               <path d="M -50 -50 L -90 -10 M 50 -50 L 10 -10 M -50 50 L -90 90 M 50 50 L 10 90" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
               
               {/* Extrusion */}
               <path d="M -50 -50 L -50 50 L -60 60 L -60 -40 Z" fill="#115e59" opacity="0.9" />
               <path d="M -50 50 L 50 50 L 40 60 L -60 60 Z" fill="#042f2e" opacity="0.9" />
               <rect x="-50" y="-50" width="100" height="100" fill="url(#iotTopLayer)" stroke="#0d9488" strokeWidth="3" />
               
               {/* Inner Core */}
               <rect x="-25" y="-25" width="50" height="50" fill="#022c22" stroke="#14b8a6" strokeWidth="1.5" />
               <path d="M -15 -15 L -5 -5 M 15 15 L 5 5" stroke="#5eead4" strokeWidth="2" />
               
               {/* Microchip Pins */}
               <g stroke="#14b8a6" strokeWidth="2">
                  <path d="M -20 -50 V -65 M 0 -50 V -65 M 20 -50 V -65" />
                  <path d="M -20 50 V 65 M 0 50 V 65 M 20 50 V 65" />
                  <path d="M -50 -20 H -65 M -50 0 H -65 M -50 20 H -65" />
                  <path d="M 50 -20 H 65 M 50 0 H 65 M 50 20 H 65" />
               </g>
             </g>
          </g>

          {/* Base Nodes & Connections */}
          <g transform="translate(200, 180)">
            {/* Wires radiating out */}
            <g stroke="#0f766e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
               {/* Top Left */}
               <path d="M -80 -40 L -120 -80 L -140 -80" />
               <path d="M -40 -60 L -60 -110 L -80 -110" />
               {/* Left */}
               <path d="M -100 0 L -150 0" />
               {/* Bottom Left */}
               <path d="M -80 40 L -120 80 L -140 80" />
               <path d="M -40 60 L -70 120 L -90 120" />
               <path d="M -10 80 L -30 150 L -50 150" />
               {/* Bottom */}
               <path d="M 20 80 L 40 160 L 60 160" />
               {/* Bottom Right */}
               <path d="M 60 60 L 100 120 L 120 120" />
               <path d="M 80 40 L 130 80 L 150 80" />
               {/* Right */}
               <path d="M 100 0 L 160 0" />
               {/* Top Right */}
               <path d="M 80 -40 L 120 -80 L 140 -80" />
               <path d="M 40 -60 L 60 -110 L 80 -110" />
            </g>

            {/* Nodes with Icons */}
            {[
              { x: -140, y: -80, type: 'wifi' },
              { x: -80, y: -110, type: 'temp' },
              { x: -150, y: 0, type: 'temp' },
              { x: -140, y: 80, type: 'fire' },
              { x: -90, y: 120, type: 'temp' },
              { x: -50, y: 150, type: 'wave' },
              { x: 60, y: 160, type: 'temp' },
              { x: 120, y: 120, type: 'wifi' },
              { x: 150, y: 80, type: 'wave' },
              { x: 160, y: 0, type: 'sound' },
              { x: 140, y: -80, type: 'wifi' },
              { x: 80, y: -110, type: 'sound' }
            ].map((node, i) => (
              <g key={i} transform={`translate(${node.x}, ${node.y})`}>
                <circle cx="0" cy="0" r="16" fill="#042f2e" stroke="#0d9488" strokeWidth="2" />
                <ellipse cx="0" cy="4" rx="10" ry="4" fill="#022c22" opacity="0.6" />
                <circle cx="0" cy="0" r="12" fill="url(#iotBotLayer)" />
                {node.type === 'wifi' && (
                  <g stroke="#5eead4" strokeWidth="1.5" fill="none" strokeLinecap="round">
                    <path d="M -6 -2 Q 0 -6 6 -2" />
                    <path d="M -3 1 Q 0 -1 3 1" />
                    <circle cx="0" cy="4" r="1" fill="#5eead4" stroke="none" />
                  </g>
                )}
                {node.type === 'temp' && (
                  <g stroke="#5eead4" strokeWidth="1.5" fill="none">
                    <path d="M 0 -5 V 2" />
                    <circle cx="0" cy="4" r="3" fill="#5eead4" />
                  </g>
                )}
                {node.type === 'fire' && (
                  <path d="M 0 -5 C -4 -1 -4 3 0 6 C 4 3 4 -1 0 -5 Z" fill="#5eead4" />
                )}
                {node.type === 'wave' && (
                  <path d="M -5 0 Q -2 -4 0 0 T 5 0" stroke="#5eead4" strokeWidth="1.5" fill="none" />
                )}
                {node.type === 'sound' && (
                  <g stroke="#5eead4" strokeWidth="1.5" fill="none">
                    <path d="M -4 2 V -2 M 0 4 V -4 M 4 2 V -2" />
                  </g>
                )}
              </g>
            ))}
          </g>
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

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Courses — VLMS" }, { name: "description", content: "Technical courses for the curriculum." }] }),
  component: CoursesPage,
});

function CoursesPage() {
  const [profile, setProfile] = useState<{ name: string, interests: string[] } | null>(null);

  useEffect(() => {
    const profileStr = localStorage.getItem('currentUserProfile');
    if (profileStr) {
      try {
        setProfile(JSON.parse(profileStr));
      } catch (e) { }
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

  const renderCard = (t: string, isRecommended: boolean = false) => {
    const slug = t.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');

    let cardBgClass = "bg-[#f0f9fa] dark:bg-cyan-950/30";
    let cardBorderClass = "border-[#14b8a6]/20 dark:border-slate-500";
    let btnBorderClass = "border-[#14b8a6]/40 dark:border-slate-500";

    return (
      <Link
        key={t}
        to={`/course/${slug}`}
        className={`group relative overflow-hidden flex flex-col justify-between p-6 rounded-xl border ${cardBorderClass} ${cardBgClass} transition-all h-[190px] hover:shadow-[0_8px_30px_rgba(20,184,166,0.15)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1`}
      >
        <div className="relative z-10 w-3/4">
          <h3 className="font-display text-[21px] font-bold mb-1 flex items-start gap-2.5 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">
            {getTopicIcon(t) && <div className="mt-1">{getTopicIcon(t)}</div>}
            <span className="leading-tight">{t}</span>
          </h3>
          <p className={`text-[13.5px] text-[#4A5558] dark:text-slate-400 font-medium leading-relaxed mt-1.5 mb-6`}>
            {getSubtitle(t)}
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 w-fit mt-4">
          <div className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-transparent border ${btnBorderClass} rounded-full text-[13px] font-medium text-[#111111] dark:text-slate-300 hover:bg-[#111F22]/5 dark:hover:bg-slate-800 transition-colors`}>
            Explore Course <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Background Icon */}
        {getBgIcon(t)}
      </Link>
    );
  };

  return (
    <div className="px-6 lg:px-10 py-12 max-w-[1150px] mx-auto">
      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary w-fit block">Curriculum</div>
      <h1 className="mt-2 font-display text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary pb-2 w-fit block">Courses</h1>
      {profile?.name && (
        <p className="mt-2 text-cyan font-medium text-lg">Welcome back, {profile.name}!</p>
      )}
      <p className="mt-2 text-muted-foreground max-w-2xl mb-10">Explore the complete syllabus and experiment workspace for your courses.</p>

      {recommendedCourses.length > 0 && (
        <>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-400/50 bg-purple-500/10 text-xs font-medium text-purple-400 mb-6">
            <Star className="size-3.5" /> Recommended for You
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {recommendedCourses.map((t) => renderCard(t, true))}
          </div>
        </>
      )}

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/30 bg-cyan/10 text-xs font-medium text-cyan-600 dark:text-cyan-400 mb-6">
        <BookOpen className="size-3.5" /> All Subjects
      </div>

      {remainingCourses.length === 0 && recommendedCourses.length === 0 ? (
        <div className="text-muted-foreground p-10 border border-dashed border-border rounded-xl text-center">
          No subjects configured yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {remainingCourses.map((t) => renderCard(t, false))}
        </div>
      )}
    </div>
  );
}
