import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, Play, PowerOff, RefreshCcw } from 'lucide-react';

export function JavaDaemonSim() {
  const [step, setStep] = useState(0);
  // 0: idle
  // 1: running
  // 2: main finished -> JVM exit -> daemon dead

  const startSim = () => {
    setStep(1);
    setTimeout(() => {
      setStep(2);
    }, 4000); // main finishes after 4s
  };

  const resetSim = () => setStep(0);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-cyan-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-cyan-50 border-b border-cyan-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-700">
          <Ghost className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Daemon Threads</h3>
        </div>
        <div className="text-xs font-mono text-cyan-600 bg-cyan-100 px-2 py-1 rounded">
          JVM // DAEMON
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        
        <div className="flex justify-between items-center mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-600 max-w-lg">
            <strong>Daemon Threads</strong> are background service threads (like the Garbage Collector). 
            Crucially, the JVM does <em>not</em> wait for daemon threads to finish. When all normal user threads (like <code className="bg-slate-200 px-1 rounded">main</code>) terminate, the JVM shuts down instantly, killing daemons abruptly.
          </div>
          <div className="flex space-x-2">
            <button onClick={startSim} disabled={step !== 0} className="px-4 py-2 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700 disabled:opacity-50 flex items-center">
              <Play className="w-4 h-4 mr-2" /> Run Main
            </button>
            <button onClick={resetSim} className="px-3 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300">
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
          
          {/* Main Thread Space */}
          <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-2 left-2 font-bold text-blue-800 uppercase tracking-wider text-xs">User Thread: main</div>
            
            <motion.div 
              animate={{
                scale: step === 0 ? 1 : step === 1 ? 1.1 : 0,
                opacity: step === 2 ? 0 : 1
              }}
              className="w-32 h-32 bg-blue-500 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-10"
            >
              <span className="font-bold">main()</span>
              {step === 1 && <span className="text-xs mt-1 animate-pulse">Running...</span>}
            </motion.div>

            {step === 2 && (
              <div className="text-blue-800 font-bold flex flex-col items-center">
                <PowerOff className="w-8 h-8 mb-2" />
                Main finished.
              </div>
            )}
          </div>

          {/* Daemon Space */}
          <div className="bg-purple-50 rounded-xl border-2 border-purple-200 p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-2 left-2 font-bold text-purple-800 uppercase tracking-wider text-xs flex items-center">
              Daemon Thread: GarbageCollector <Ghost className="w-3 h-3 ml-1" />
            </div>

            <motion.div 
              animate={{
                x: step === 1 ? [-50, 50, -50] : 0,
                rotate: step === 2 ? 90 : 0,
                backgroundColor: step === 2 ? '#9ca3af' : '#a855f7' // slate-400 : purple-500
              }}
              transition={{ x: { repeat: Infinity, duration: 2, ease: "linear" } }}
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-10 relative"
            >
              <Ghost className={`w-8 h-8 mb-1 ${step === 2 ? 'opacity-50' : ''}`} />
              <span className="font-bold text-xs">{step === 2 ? 'KILLED' : 'Sweeping...'}</span>
              
              {step === 2 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1 rounded transform rotate-12 border border-red-700">
                  ABRUPT EXIT
                </div>
              )}
            </motion.div>
          </div>

        </div>

        {/* Global JVM Container */}
        <div className={`mt-4 border-t-4 p-4 text-center font-bold text-sm transition-colors duration-500 ${step === 2 ? 'border-red-500 bg-red-50 text-red-700' : 'border-green-500 bg-green-50 text-green-700'}`}>
          {step === 0 && "JVM Status: Ready"}
          {step === 1 && "JVM Status: ACTIVE (Waiting for User threads to finish)"}
          {step === 2 && "JVM Status: SHUTTING DOWN. All User threads finished. Daemons instantly terminated."}
        </div>

      </div>
    </div>
  );
}
