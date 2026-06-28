import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileCode2, PackageOpen, Play, ChevronRight, FileOutput } from 'lucide-react';

export function JavaPackageSim() {
  const [step, setStep] = useState(0);
  // 0: idle
  // 1: compiling -d
  // 2: directory structure created
  // 3: importing

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-emerald-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-emerald-50 border-b border-emerald-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-emerald-700">
          <PackageOpen className="w-5 h-5" />
          <h3 className="font-semibold text-lg">User Defined Packages</h3>
        </div>
        <div className="text-xs font-mono text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
          COMPILER // NAMESPACE
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        
        {/* Code Editor Side */}
        <div className="w-full lg:w-1/2 bg-slate-900 border-r border-slate-700 p-6 flex flex-col font-mono text-sm overflow-y-auto">
          
          <div className="text-emerald-400 font-bold mb-4 uppercase tracking-wider text-xs">File 1: Message.java</div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-6 relative group">
            <div className={`absolute -left-2 top-4 w-1 h-full rounded ${step >= 2 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : ''}`}></div>
            <span className="text-emerald-400 font-bold">package</span> mypack;<br/><br/>
            <span className="text-blue-400">public class</span> Message {'{\n'}
            <div className="ml-4">
              <span className="text-blue-400">public static void</span> display() {'{\n'}
              <div className="ml-4 text-slate-300">System.out.println("Hello from package!");</div>
              {'}'}
            </div>
            {'}'}
          </div>

          <div className="text-emerald-400 font-bold mb-4 uppercase tracking-wider text-xs">File 2: Main.java</div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 relative">
            <div className={`absolute -left-2 top-4 w-1 h-full rounded ${step >= 3 ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : ''}`}></div>
            <span className="text-emerald-400 font-bold">import</span> mypack.Message;<br/><br/>
            <span className="text-blue-400">public class</span> Main {'{\n'}
            <div className="ml-4">
              <span className="text-blue-400">public static void</span> main(String[] args) {'{\n'}
              <div className="ml-4 text-slate-300">Message.display();</div>
              {'}'}
            </div>
            {'}'}
          </div>

        </div>

        {/* File System Visualizer */}
        <div className="w-full lg:w-1/2 p-6 bg-slate-50 flex flex-col relative overflow-hidden">
          
          <div className="bg-white p-4 rounded-lg border shadow-sm mb-6 flex flex-col space-y-2">
            <button 
              onClick={() => setStep(1)} 
              disabled={step !== 0}
              className={`px-4 py-2 text-left rounded font-mono text-xs transition-colors ${step === 0 ? 'bg-emerald-100 border-emerald-300 text-emerald-800 hover:bg-emerald-200 border' : 'bg-slate-100 text-slate-400'}`}
            >
              $ javac -d . Message.java
              {step === 0 && <span className="block mt-1 text-emerald-600 font-sans text-xs">Compile and generate package folders</span>}
            </button>
            <button 
              onClick={() => setStep(3)} 
              disabled={step !== 2}
              className={`px-4 py-2 text-left rounded font-mono text-xs transition-colors ${step === 2 ? 'bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200 border' : 'bg-slate-100 text-slate-400'}`}
            >
              $ java Main
              {step === 2 && <span className="block mt-1 text-blue-600 font-sans text-xs">Run program. Imports load from folders.</span>}
            </button>
          </div>

          {/* Directory Tree */}
          <div className="flex-1 bg-white border-2 border-slate-200 rounded-lg p-6 relative">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 border-b pb-2">File System Memory</div>
            
            <div className="flex flex-col space-y-4 font-mono text-sm">
              
              <div className="flex items-center text-slate-700">
                <Folder className="w-5 h-5 mr-2 text-blue-400" />
                <span>workspace/</span>
              </div>

              <div className="ml-6 flex items-center text-slate-600">
                <FileCode2 className="w-4 h-4 mr-2 text-yellow-500" />
                <span>Message.java</span>
              </div>

              <div className="ml-6 flex items-center text-slate-600">
                <FileCode2 className="w-4 h-4 mr-2 text-yellow-500" />
                <span>Main.java</span>
              </div>

              <AnimatePresence>
                {(step === 1 || step === 2 || step === 3) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    onAnimationComplete={() => { if(step === 1) setTimeout(() => setStep(2), 1000) }}
                    className="ml-6 mt-4"
                  >
                    <div className="flex items-center text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200 w-max">
                      <Folder className="w-4 h-4 mr-2 text-emerald-500" />
                      <span>mypack/</span>
                      <span className="ml-2 text-[10px] bg-emerald-200 text-emerald-800 px-1 rounded uppercase tracking-widest">Auto-generated</span>
                    </div>

                    <AnimatePresence>
                      {step >= 2 && (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          className="ml-6 mt-2 flex items-center text-emerald-600"
                        >
                          <FileOutput className="w-4 h-4 mr-2 text-emerald-400" />
                          <span>Message.class</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {step >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="mt-8 p-4 bg-slate-900 text-green-400 rounded-lg shadow-inner border border-slate-700"
                  >
                    <div className="text-slate-500 mb-1 text-xs">// Output</div>
                    Hello from package!
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Animation lines */}
            {step === 3 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ strokeDasharray: "4 4" }}>
                <motion.path 
                  d="M 60 210 Q 30 210, 30 180 T 60 110" 
                  stroke="#3b82f6" strokeWidth="2" fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />
              </svg>
            )}

          </div>

          <button onClick={() => setStep(0)} className="mt-4 text-slate-400 hover:text-slate-600 text-xs text-center w-full">
            Reset System
          </button>
        </div>

      </div>
    </div>
  );
}
