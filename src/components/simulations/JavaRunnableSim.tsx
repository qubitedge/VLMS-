import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ArrowRight, PlayCircle, ShieldAlert } from 'lucide-react';

export function JavaRunnableSim() {
  const [step, setStep] = useState(0); 
  // 0: idle
  // 1: task created
  // 2: attempted start (error)
  // 3: wrapped in thread
  // 4: thread started (running)

  const handleCreateTask = () => setStep(1);
  const handleTryStartTask = () => {
    setStep(2);
    setTimeout(() => setStep(1), 2000);
  };
  const handleWrapThread = () => setStep(3);
  const handleStartThread = () => setStep(4);
  const handleReset = () => setStep(0);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-cyan-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-cyan-50 border-b border-cyan-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-700">
          <Cpu className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Runnable Interface</h3>
        </div>
        <div className="text-xs font-mono text-cyan-600 bg-cyan-100 px-2 py-1 rounded">
          JVM // RUNNABLE
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        
        {/* Execution Area */}
        <div className="flex-1 p-8 bg-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* CPU Area */}
          <div className="absolute top-8 right-8 flex items-center space-x-2 text-slate-400 font-bold">
            <Cpu className="w-6 h-6" /> <span>CPU CORE</span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-12">
            
            {/* The Runnable Object */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  layout
                  initial={{ scale: 0, y: -50 }}
                  animate={{ 
                    scale: 1, 
                    y: step >= 3 ? 60 : 0, // Move into Thread if step >= 3
                    zIndex: 20
                  }}
                  className="bg-white border-2 border-dashed border-cyan-500 rounded-lg p-4 w-48 shadow-lg relative flex flex-col items-center justify-center"
                >
                  <div className="text-cyan-700 font-bold font-mono">MyTask</div>
                  <div className="text-[10px] bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded mt-1">implements Runnable</div>
                  <div className="mt-4 font-mono text-xs text-slate-500 w-full text-center border-t border-slate-100 pt-2">
                    public void run()
                  </div>

                  {/* Error Toast */}
                  <AnimatePresence>
                    {step === 2 && (
                      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="absolute -top-12 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center whitespace-nowrap">
                        <ShieldAlert className="w-3 h-3 mr-1" /> Error: Cannot resolve method 'start()'
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Thread Object */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative w-64 h-40 bg-slate-800 border-4 border-slate-700 rounded-xl flex items-center justify-center shadow-2xl"
                >
                  <div className="absolute top-2 left-3 font-mono text-white font-bold text-sm">Thread</div>
                  <div className="absolute top-2 right-3 flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className={`w-2 h-2 rounded-full ${step === 4 ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-green-800'}`}></div>
                  </div>
                  
                  {step === 4 && (
                    <motion.div 
                      className="absolute inset-0 rounded-xl border-4 border-green-500 opacity-50"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  )}

                  {/* The cutout where Runnable fits */}
                  <div className="w-52 h-24 border-2 border-dashed border-slate-600 rounded-lg bg-slate-900/50 flex items-center justify-center">
                    {step === 3 && <div className="text-slate-500 text-xs font-mono">Runnable target</div>}
                    {step === 4 && (
                      <motion.div 
                        className="text-green-400 font-mono text-xs flex items-center"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" /> Executing target.run()...
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Controls / Code Panel */}
        <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-700 p-6 flex flex-col font-mono text-sm text-slate-300">
          <div className="text-cyan-400 font-bold mb-6">Interactive Code Steps</div>
          
          <div className="space-y-4">
            <button 
              onClick={handleCreateTask}
              disabled={step !== 0}
              className={`w-full text-left p-3 rounded border transition-colors ${step === 0 ? 'bg-cyan-900/30 border-cyan-500 hover:bg-cyan-900/50' : step > 0 ? 'bg-slate-800 border-slate-700 opacity-50' : 'bg-slate-800 border-slate-700 opacity-50'}`}
            >
              <div className="text-white"><span className="text-purple-400">MyTask</span> task = <span className="text-purple-400">new</span> MyTask();</div>
              <div className="text-xs text-slate-500 mt-1">Instantiate the Runnable class.</div>
            </button>

            <button 
              onClick={handleTryStartTask}
              disabled={step !== 1}
              className={`w-full text-left p-3 rounded border transition-colors ${step === 1 ? 'bg-red-900/30 border-red-500 hover:bg-red-900/50' : 'bg-slate-800 border-slate-700 opacity-50'}`}
            >
              <div className="text-red-400 line-through">task.start();</div>
              <div className="text-xs text-slate-500 mt-1">Runnable doesn't have start()!</div>
            </button>

            <button 
              onClick={handleWrapThread}
              disabled={step !== 1}
              className={`w-full text-left p-3 rounded border transition-colors ${step === 1 ? 'bg-cyan-900/30 border-cyan-500 hover:bg-cyan-900/50' : step > 1 ? 'bg-slate-800 border-slate-700 opacity-50' : 'bg-slate-800 border-slate-700 opacity-50'}`}
            >
              <div className="text-white"><span className="text-purple-400">Thread</span> t = <span className="text-purple-400">new</span> Thread(task);</div>
              <div className="text-xs text-slate-500 mt-1">Pass task into Thread constructor.</div>
            </button>

            <button 
              onClick={handleStartThread}
              disabled={step !== 3}
              className={`w-full text-left p-3 rounded border transition-colors ${step === 3 ? 'bg-green-900/30 border-green-500 hover:bg-green-900/50' : step > 3 ? 'bg-slate-800 border-slate-700 opacity-50' : 'bg-slate-800 border-slate-700 opacity-50'}`}
            >
              <div className="text-white">t.start();</div>
              <div className="text-xs text-slate-500 mt-1">Thread allocates CPU and calls run().</div>
            </button>
          </div>

          <button onClick={handleReset} className="mt-auto pt-4 text-center text-xs text-slate-500 hover:text-white transition-colors underline">
            Reset Simulation
          </button>
        </div>

      </div>
    </div>
  );
}
