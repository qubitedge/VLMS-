import React, { useState, useEffect } from 'react';
import { Flag, Play, RefreshCcw } from 'lucide-react';

export function JavaThreadPrioritySim() {
  const [running, setRunning] = useState(false);
  
  const [t1Progress, setT1Progress] = useState(0); // MIN
  const [t2Progress, setT2Progress] = useState(0); // NORM
  const [t3Progress, setT3Progress] = useState(0); // MAX
  
  const [log, setLog] = useState<string[]>([]);

  const resetRace = () => {
    setRunning(false);
    setT1Progress(0);
    setT2Progress(0);
    setT3Progress(0);
    setLog([]);
  };

  const startRace = () => {
    resetRace();
    setRunning(true);
    setLog(["Race started! OS Thread Scheduler allocates CPU slices..."]);
  };

  useEffect(() => {
    if (!running) return;

    let finishedCount = 0;
    
    const raceInterval = setInterval(() => {
      setT1Progress(p => {
        if (p >= 100) return 100;
        const inc = Math.random() * 2; // slow
        if (p + inc >= 100 && p < 100) { finishedCount++; setLog(l => [...l, `MIN_PRIORITY Thread finished! (Position: ${finishedCount})`]); }
        return p + inc;
      });
      
      setT2Progress(p => {
        if (p >= 100) return 100;
        const inc = Math.random() * 3.5; // medium
        if (p + inc >= 100 && p < 100) { finishedCount++; setLog(l => [...l, `NORM_PRIORITY Thread finished! (Position: ${finishedCount})`]); }
        return p + inc;
      });

      setT3Progress(p => {
        if (p >= 100) return 100;
        const inc = Math.random() * 6; // fast
        if (p + inc >= 100 && p < 100) { finishedCount++; setLog(l => [...l, `MAX_PRIORITY Thread finished! (Position: ${finishedCount})`]); }
        return p + inc;
      });

    }, 100);

    return () => clearInterval(raceInterval);
  }, [running]);

  // Check end
  useEffect(() => {
    if (running && t1Progress >= 100 && t2Progress >= 100 && t3Progress >= 100) {
      setRunning(false);
      setLog(l => [...l, "All threads terminated."]);
    }
  }, [t1Progress, t2Progress, t3Progress, running]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-cyan-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-cyan-50 border-b border-cyan-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-700">
          <Flag className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Thread Race (Priorities)</h3>
        </div>
        <div className="text-xs font-mono text-cyan-600 bg-cyan-100 px-2 py-1 rounded">
          JVM // THREAD_SCHEDULER
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-8 overflow-y-auto">
        
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex justify-between items-center">
          <div className="text-sm text-slate-600">
            <strong>Thread Priorities:</strong> Java priorities range from 1 to 10. Higher priority threads generally get more CPU time slices from the OS scheduler, finishing faster.
          </div>
          <div className="flex space-x-2">
            <button onClick={startRace} disabled={running} className="px-4 py-2 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700 disabled:opacity-50 flex items-center shadow-sm">
              <Play className="w-4 h-4 mr-2" /> Start Race
            </button>
            <button onClick={resetRace} className="px-3 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors">
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Race Track */}
        <div className="flex-1 bg-slate-800 rounded-xl p-6 relative overflow-hidden flex flex-col justify-around shadow-inner border-4 border-slate-700">
          
          {/* Finish Line */}
          <div className="absolute top-0 bottom-0 right-[40px] w-2 border-r-4 border-dashed border-white/50 z-0"></div>
          
          {/* Track 1: MIN */}
          <div className="relative z-10 flex items-center">
            <div className="w-32 text-white font-mono text-xs flex flex-col">
              <span className="font-bold text-red-400">Thread t1</span>
              <span className="text-[10px] text-slate-400">setPriority(1)</span>
              <span className="text-[10px] text-slate-400">MIN_PRIORITY</span>
            </div>
            <div className="flex-1 h-8 bg-slate-900 rounded-full mx-4 relative border border-slate-700 overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-red-500 rounded-full transition-all duration-100 ease-linear" style={{ width: `${t1Progress}%` }}></div>
            </div>
            <div className="w-12 text-right text-white font-mono text-xs">{Math.floor(t1Progress)}%</div>
          </div>

          {/* Track 2: NORM */}
          <div className="relative z-10 flex items-center">
            <div className="w-32 text-white font-mono text-xs flex flex-col">
              <span className="font-bold text-yellow-400">Thread t2</span>
              <span className="text-[10px] text-slate-400">setPriority(5)</span>
              <span className="text-[10px] text-slate-400">NORM_PRIORITY</span>
            </div>
            <div className="flex-1 h-8 bg-slate-900 rounded-full mx-4 relative border border-slate-700 overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-yellow-500 rounded-full transition-all duration-100 ease-linear" style={{ width: `${t2Progress}%` }}></div>
            </div>
            <div className="w-12 text-right text-white font-mono text-xs">{Math.floor(t2Progress)}%</div>
          </div>

          {/* Track 3: MAX */}
          <div className="relative z-10 flex items-center">
            <div className="w-32 text-white font-mono text-xs flex flex-col">
              <span className="font-bold text-green-400">Thread t3</span>
              <span className="text-[10px] text-slate-400">setPriority(10)</span>
              <span className="text-[10px] text-slate-400">MAX_PRIORITY</span>
            </div>
            <div className="flex-1 h-8 bg-slate-900 rounded-full mx-4 relative border border-slate-700 overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-green-500 rounded-full transition-all duration-100 ease-linear" style={{ width: `${t3Progress}%` }}></div>
            </div>
            <div className="w-12 text-right text-white font-mono text-xs">{Math.floor(t3Progress)}%</div>
          </div>

        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto flex flex-col">
        <div className="text-slate-500 mb-1">// OS Scheduler Log</div>
        <div className="flex-1 space-y-1">
          {log.map((entry, idx) => (
            <div key={idx} className={entry.includes('MAX') ? 'text-green-300 font-bold' : entry.includes('MIN') ? 'text-red-300' : 'text-yellow-300'}>{entry}</div>
          ))}
          {log.length === 0 && <div className="text-slate-600">Waiting for start...</div>}
        </div>
      </div>
    </div>
  );
}
