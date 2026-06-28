import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Play, RefreshCcw, Hand } from 'lucide-react';

export function JavaIsAliveSim() {
  const [mode, setMode] = useState<'isAlive' | 'join'>('isAlive');
  const [step, setStep] = useState(0); 
  // 0: idle
  // 1: running
  // 2: done

  const [tProgress, setTProgress] = useState(0);
  const [mainChecks, setMainChecks] = useState<string[]>([]);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (step === 1) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setTProgress(progress);
        
        if (mode === 'isAlive' && progress < 100) {
          setMainChecks(prev => [...prev, `t.isAlive() == true. Main continues...`]);
        }
        
        if (progress >= 100) {
          clearInterval(interval);
          setStep(2);
          if (mode === 'isAlive') {
            setMainChecks(prev => [...prev, `t.isAlive() == false. Main finishes.`]);
          } else {
            setIsJoined(false);
            setMainChecks(prev => [...prev, `t finished. Main resumes and finishes.`]);
          }
        }
      }, 400);
      return () => clearInterval(interval);
    }
  }, [step, mode]);

  const startSim = () => {
    setTProgress(0);
    setMainChecks([]);
    setStep(1);
    if (mode === 'join') {
      setIsJoined(true);
      setMainChecks([`Main thread calls t.join(). Main is BLOCKED until t finishes...`]);
    } else {
      setMainChecks([`Main thread starts polling t.isAlive()...`]);
    }
  };

  const resetSim = () => {
    setStep(0);
    setTProgress(0);
    setMainChecks([]);
    setIsJoined(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-cyan-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-cyan-50 border-b border-cyan-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-700">
          <Activity className="w-5 h-5" />
          <h3 className="font-semibold text-lg">isAlive() vs join()</h3>
        </div>
        <div className="text-xs font-mono text-cyan-600 bg-cyan-100 px-2 py-1 rounded">
          JVM // THREAD_SYNC
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="flex space-x-4 mb-6">
          <button 
            onClick={() => { setMode('isAlive'); resetSim(); }}
            disabled={step === 1}
            className={`px-4 py-2 rounded font-bold text-sm transition-colors ${mode === 'isAlive' ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            isAlive() Polling
          </button>
          <button 
            onClick={() => { setMode('join'); resetSim(); }}
            disabled={step === 1}
            className={`px-4 py-2 rounded font-bold text-sm transition-colors ${mode === 'join' ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            join() Blocking
          </button>
          
          <div className="ml-auto flex space-x-2">
            <button onClick={startSim} disabled={step !== 0} className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 disabled:opacity-50 flex items-center">
              <Play className="w-4 h-4 mr-2" /> Start
            </button>
            <button onClick={resetSim} className="px-3 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300">
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-slate-800 rounded-xl p-8 relative flex flex-col justify-center space-y-12 overflow-hidden border-4 border-slate-700">
          
          {/* Main Thread */}
          <div className="relative flex items-center">
            <div className="w-32 text-white font-mono text-sm font-bold">Main Thread</div>
            <div className="flex-1 relative h-4 bg-slate-700 rounded-full overflow-hidden flex items-center">
              <motion.div 
                className={`h-full ${isJoined ? 'bg-amber-500' : 'bg-blue-500'}`}
                animate={{ width: isJoined ? '30%' : '100%' }}
                transition={{ duration: isJoined ? 0.5 : 4, ease: "linear" }}
              />
              {isJoined && (
                <div className="absolute left-[30%] -ml-4 flex items-center text-amber-300 font-bold text-[10px] uppercase bg-slate-900 px-1 rounded z-10">
                  <Hand className="w-3 h-3 mr-1" /> Blocked
                </div>
              )}
            </div>
          </div>

          {/* Connectors */}
          {mode === 'join' && isJoined && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-amber-500 stroke-2 fill-none stroke-dasharray-4 animate-pulse z-0" style={{ strokeDasharray: '4,4' }}>
              <path d="M 30% 35% L 30% 65%" />
            </svg>
          )}

          {/* Child Thread */}
          <div className="relative flex items-center z-10">
            <div className="w-32 text-cyan-400 font-mono text-sm font-bold">Thread t</div>
            <div className="flex-1 h-4 bg-slate-700 rounded-full relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-cyan-500 transition-all duration-300" style={{ width: `${tProgress}%` }}></div>
            </div>
            <div className="w-16 text-right text-cyan-400 font-mono text-sm">{tProgress}%</div>
          </div>

        </div>

        <div className="mt-4 h-40 bg-slate-900 rounded border border-slate-800 p-4 font-mono text-xs overflow-y-auto">
          <div className="text-slate-500 mb-2">// {mode === 'isAlive' ? 'Non-blocking Polling' : 'Blocking Synchronization'}</div>
          {mainChecks.map((log, i) => (
            <div key={i} className={`${log.includes('true') ? 'text-green-400' : log.includes('false') ? 'text-red-400' : log.includes('BLOCKED') ? 'text-amber-400' : 'text-slate-300'}`}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
