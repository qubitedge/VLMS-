import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Play, Moon, AlertTriangle } from 'lucide-react';

export function JavaInterruptSim() {
  const [step, setStep] = useState(0);
  // 0: idle
  // 1: T1 running
  // 2: T1 sleeping
  // 3: T1 interrupted (lightning)
  // 4: Exception caught

  const startSim = () => {
    setStep(1);
    setTimeout(() => setStep(2), 2000);
  };

  const triggerInterrupt = () => {
    setStep(3);
    setTimeout(() => setStep(4), 1000);
    setTimeout(() => setStep(0), 4000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-cyan-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-cyan-50 border-b border-cyan-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-700">
          <Zap className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Interrupt Signal</h3>
        </div>
        <div className="text-xs font-mono text-cyan-600 bg-cyan-100 px-2 py-1 rounded">
          JVM // THREAD_INTERRUPT
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 bg-slate-900 overflow-hidden relative">
        
        {/* Main Thread control panel */}
        <div className="absolute top-8 left-8 bg-slate-800 border border-slate-600 p-4 rounded-lg flex flex-col space-y-4 z-20">
          <div className="text-white font-mono text-sm font-bold border-b border-slate-700 pb-2">Main Thread</div>
          <button 
            onClick={startSim} 
            disabled={step !== 0}
            className="px-4 py-2 bg-cyan-600 text-white rounded font-bold hover:bg-cyan-700 disabled:opacity-50 flex items-center"
          >
            <Play className="w-4 h-4 mr-2" /> t.start()
          </button>
          <button 
            onClick={triggerInterrupt} 
            disabled={step !== 2}
            className="px-4 py-2 bg-amber-500 text-white rounded font-bold hover:bg-amber-600 disabled:opacity-50 flex items-center"
          >
            <Zap className="w-4 h-4 mr-2" /> t.interrupt()
          </button>
        </div>

        {/* Thread T */}
        <div className="relative">
          <motion.div 
            animate={{
              scale: step === 1 ? 1.1 : step === 2 ? 0.9 : 1,
              backgroundColor: step === 2 ? '#1e293b' : step === 4 ? '#ef4444' : '#0ea5e9'
            }}
            className={`w-40 h-40 rounded-full flex flex-col items-center justify-center border-4 ${step === 2 ? 'border-slate-500 text-slate-400' : 'border-white text-white'} shadow-2xl z-10 relative`}
          >
            <div className="font-bold text-xl mb-2">Thread t</div>
            
            {step === 1 && <div className="text-xs animate-pulse">Running...</div>}
            
            {step === 2 && (
              <div className="flex items-center text-xs">
                <Moon className="w-4 h-4 mr-1" /> Thread.sleep()
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center">
                <AlertTriangle className="w-6 h-6 mb-1" />
                <div className="text-[10px] text-center px-2">InterruptedException</div>
              </div>
            )}
            
            {/* Zzzs */}
            <AnimatePresence>
              {step === 2 && (
                <motion.div initial={{opacity:0, y:0, x:20}} animate={{opacity:[0,1,0], y:-50, x:40}} transition={{repeat:Infinity, duration:2}} className="absolute top-0 right-0 text-amber-200 font-bold">Z</motion.div>
              )}
              {step === 2 && (
                <motion.div initial={{opacity:0, y:0, x:10}} animate={{opacity:[0,1,0], y:-30, x:30}} transition={{repeat:Infinity, duration:2, delay:0.5}} className="absolute top-4 right-4 text-amber-200 font-bold text-sm">z</motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Lightning Bolt */}
          <AnimatePresence>
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0, y: -100 }}
                animate={{ opacity: 1, scale: 2, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-20 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]"
              >
                <Zap className="w-20 h-20 fill-current" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flash background */}
          <AnimatePresence>
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-white z-0 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 w-full max-w-2xl px-8">
          <div className="bg-slate-800 rounded p-4 font-mono text-sm border border-slate-700 shadow-xl">
            <div className="text-slate-500 mb-1">// Console</div>
            {step >= 1 && <div className="text-cyan-400">t is doing work...</div>}
            {step >= 2 && <div className="text-slate-400">t goes to sleep for 5000ms.</div>}
            {step >= 3 && <div className="text-yellow-400">Main sent interrupt signal!</div>}
            {step >= 4 && <div className="text-red-400 font-bold">Caught InterruptedException! Sleep aborted early.</div>}
          </div>
        </div>

      </div>
    </div>
  );
}
