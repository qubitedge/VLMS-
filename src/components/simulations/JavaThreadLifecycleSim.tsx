import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Play, PauseCircle, StopCircle, RefreshCcw, BellRing } from 'lucide-react';

type ThreadState = 'NEW' | 'RUNNABLE' | 'TIMED_WAITING' | 'WAITING' | 'BLOCKED' | 'TERMINATED';

export function JavaThreadLifecycleSim() {
  const [threadState, setThreadState] = useState<ThreadState>('NEW');

  // Helper to determine position based on state
  const getCoordinates = (state: ThreadState) => {
    switch(state) {
      case 'NEW': return { x: '10%', y: '50%' };
      case 'RUNNABLE': return { x: '40%', y: '50%' };
      case 'TIMED_WAITING': return { x: '70%', y: '20%' };
      case 'WAITING': return { x: '70%', y: '50%' };
      case 'BLOCKED': return { x: '70%', y: '80%' };
      case 'TERMINATED': return { x: '40%', y: '85%' };
      default: return { x: '10%', y: '50%' };
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-cyan-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-cyan-50 border-b border-cyan-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-700">
          <Activity className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Thread Lifecycle</h3>
        </div>
        <div className="text-xs font-mono text-cyan-600 bg-cyan-100 px-2 py-1 rounded">
          JVM // MULTITHREADING
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        
        {/* State Machine Diagram */}
        <div className="relative flex-1 bg-slate-50 border-2 border-slate-200 rounded-lg min-h-[400px] overflow-hidden">
          
          {/* Connecting Lines (Simplified) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-300 stroke-2 fill-none">
            {/* NEW -> RUNNABLE */}
            <path d="M 20% 50% L 30% 50%" markerEnd="url(#arrow)" />
            {/* RUNNABLE -> TERMINATED */}
            <path d="M 40% 60% L 40% 75%" markerEnd="url(#arrow)" />
            
            {/* RUNNABLE <-> TIMED_WAITING */}
            <path d="M 45% 45% L 60% 25%" markerEnd="url(#arrow)" strokeDasharray="5,5" />
            <path d="M 60% 20% L 45% 40%" markerEnd="url(#arrow)" strokeDasharray="5,5" stroke="#06b6d4" />

            {/* RUNNABLE <-> WAITING */}
            <path d="M 50% 50% L 60% 50%" markerEnd="url(#arrow)" strokeDasharray="5,5" />
            <path d="M 60% 55% L 50% 55%" markerEnd="url(#arrow)" strokeDasharray="5,5" stroke="#06b6d4" />

            {/* RUNNABLE <-> BLOCKED */}
            <path d="M 45% 55% L 60% 75%" markerEnd="url(#arrow)" strokeDasharray="5,5" />
            <path d="M 60% 80% L 45% 60%" markerEnd="url(#arrow)" strokeDasharray="5,5" stroke="#06b6d4" />
            
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#cbd5e1" />
              </marker>
            </defs>
          </svg>

          {/* Nodes */}
          <div className="absolute inset-0">
            {/* NEW */}
            <div className={`absolute transform -translate-x-1/2 -translate-y-1/2 left-[10%] top-[50%] w-24 h-24 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors ${threadState === 'NEW' ? 'border-cyan-500 bg-cyan-100 text-cyan-800' : 'border-slate-300 bg-white text-slate-500'}`}>NEW</div>
            
            {/* RUNNABLE */}
            <div className={`absolute transform -translate-x-1/2 -translate-y-1/2 left-[40%] top-[50%] w-28 h-28 rounded-full flex flex-col items-center justify-center font-bold text-sm border-4 transition-colors ${threadState === 'RUNNABLE' ? 'border-cyan-500 bg-cyan-100 text-cyan-800 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'border-slate-300 bg-white text-slate-500'}`}>
              RUNNABLE
              <span className="text-[9px] font-normal text-slate-400 text-center mt-1">(Ready or<br/>Running)</span>
            </div>

            {/* TIMED_WAITING */}
            <div className={`absolute transform -translate-x-1/2 -translate-y-1/2 left-[70%] top-[20%] w-32 h-24 rounded-lg flex items-center justify-center font-bold text-xs text-center border-4 transition-colors ${threadState === 'TIMED_WAITING' ? 'border-amber-500 bg-amber-50 text-amber-800' : 'border-slate-300 bg-white text-slate-500'}`}>TIMED_WAITING</div>

            {/* WAITING */}
            <div className={`absolute transform -translate-x-1/2 -translate-y-1/2 left-[70%] top-[50%] w-32 h-24 rounded-lg flex items-center justify-center font-bold text-xs text-center border-4 transition-colors ${threadState === 'WAITING' ? 'border-amber-500 bg-amber-50 text-amber-800' : 'border-slate-300 bg-white text-slate-500'}`}>WAITING</div>

            {/* BLOCKED */}
            <div className={`absolute transform -translate-x-1/2 -translate-y-1/2 left-[70%] top-[80%] w-32 h-24 rounded-lg flex items-center justify-center font-bold text-xs text-center border-4 transition-colors ${threadState === 'BLOCKED' ? 'border-red-500 bg-red-50 text-red-800' : 'border-slate-300 bg-white text-slate-500'}`}>BLOCKED</div>

            {/* TERMINATED */}
            <div className={`absolute transform -translate-x-1/2 -translate-y-1/2 left-[40%] top-[85%] w-28 h-20 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors ${threadState === 'TERMINATED' ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-300 bg-white text-slate-500'}`}>TERMINATED</div>
          </div>

          {/* The Thread Token */}
          <motion.div
            layout
            initial={false}
            animate={{ 
              left: getCoordinates(threadState).x, 
              top: getCoordinates(threadState).y,
              scale: threadState === 'TERMINATED' ? 0 : 1 
            }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="absolute w-8 h-8 bg-cyan-500 rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </motion.div>

        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button 
            onClick={() => setThreadState('RUNNABLE')}
            disabled={threadState !== 'NEW'}
            className="p-3 border rounded-lg bg-slate-50 hover:bg-cyan-50 disabled:opacity-50 text-left transition-colors"
          >
            <div className="font-mono text-cyan-600 font-bold mb-1 flex items-center"><Play className="w-4 h-4 mr-1" /> t.start()</div>
            <div className="text-xs text-slate-500">Moves from NEW to RUNNABLE.</div>
          </button>

          <button 
            onClick={() => setThreadState('TIMED_WAITING')}
            disabled={threadState !== 'RUNNABLE'}
            className="p-3 border rounded-lg bg-slate-50 hover:bg-amber-50 disabled:opacity-50 text-left transition-colors"
          >
            <div className="font-mono text-amber-600 font-bold mb-1 flex items-center"><PauseCircle className="w-4 h-4 mr-1" /> Thread.sleep(1000)</div>
            <div className="text-xs text-slate-500">Pauses execution for a specific time.</div>
          </button>

          <button 
            onClick={() => setThreadState('RUNNABLE')}
            disabled={threadState !== 'TIMED_WAITING'}
            className="p-3 border rounded-lg bg-slate-50 hover:bg-cyan-50 disabled:opacity-50 text-left transition-colors"
          >
            <div className="font-mono text-cyan-600 font-bold mb-1">Timeout expires</div>
            <div className="text-xs text-slate-500">Sleep time finishes; returns to RUNNABLE.</div>
          </button>

          <button 
            onClick={() => setThreadState('WAITING')}
            disabled={threadState !== 'RUNNABLE'}
            className="p-3 border rounded-lg bg-slate-50 hover:bg-amber-50 disabled:opacity-50 text-left transition-colors"
          >
            <div className="font-mono text-amber-600 font-bold mb-1 flex items-center"><PauseCircle className="w-4 h-4 mr-1" /> object.wait()</div>
            <div className="text-xs text-slate-500">Waits indefinitely until notified.</div>
          </button>

          <button 
            onClick={() => setThreadState('RUNNABLE')}
            disabled={threadState !== 'WAITING'}
            className="p-3 border rounded-lg bg-slate-50 hover:bg-cyan-50 disabled:opacity-50 text-left transition-colors"
          >
            <div className="font-mono text-cyan-600 font-bold mb-1 flex items-center"><BellRing className="w-4 h-4 mr-1" /> object.notify()</div>
            <div className="text-xs text-slate-500">Wakes up waiting thread.</div>
          </button>

          <button 
            onClick={() => setThreadState('BLOCKED')}
            disabled={threadState !== 'RUNNABLE'}
            className="p-3 border rounded-lg bg-slate-50 hover:bg-red-50 disabled:opacity-50 text-left transition-colors"
          >
            <div className="font-mono text-red-600 font-bold mb-1">Waiting for Lock</div>
            <div className="text-xs text-slate-500">Fails to acquire synchronized lock.</div>
          </button>

          <button 
            onClick={() => setThreadState('RUNNABLE')}
            disabled={threadState !== 'BLOCKED'}
            className="p-3 border rounded-lg bg-slate-50 hover:bg-cyan-50 disabled:opacity-50 text-left transition-colors"
          >
            <div className="font-mono text-cyan-600 font-bold mb-1">Lock acquired</div>
            <div className="text-xs text-slate-500">Other thread releases lock.</div>
          </button>

          <button 
            onClick={() => setThreadState('TERMINATED')}
            disabled={threadState !== 'RUNNABLE'}
            className="p-3 border rounded-lg bg-slate-50 hover:bg-slate-200 disabled:opacity-50 text-left transition-colors"
          >
            <div className="font-mono text-slate-800 font-bold mb-1 flex items-center"><StopCircle className="w-4 h-4 mr-1" /> run() completes</div>
            <div className="text-xs text-slate-500">Thread finishes execution.</div>
          </button>

          <button 
            onClick={() => setThreadState('NEW')}
            className="p-3 border-2 border-cyan-500 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-left transition-colors"
          >
            <div className="font-mono text-cyan-800 font-bold mb-1 flex items-center"><RefreshCcw className="w-4 h-4 mr-1" /> Reset Sim</div>
            <div className="text-xs text-cyan-600">Create new thread instance.</div>
          </button>
        </div>
      </div>
    </div>
  );
}
