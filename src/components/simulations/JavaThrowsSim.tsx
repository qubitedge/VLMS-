import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Play, ArrowUpCircle } from 'lucide-react';

export function JavaThrowsSim() {
  const [activeStep, setActiveStep] = useState(0); 
  // 0: idle
  // 1: main calls A
  // 2: A calls B
  // 3: B throws Exception (Hot Potato appears)
  // 4: Potato thrown to A
  // 5: Potato thrown to main
  // 6: Potato caught by main's catch block

  const runSim = () => {
    setActiveStep(1);
    setTimeout(() => setActiveStep(2), 1000);
    setTimeout(() => setActiveStep(3), 2000);
    setTimeout(() => setActiveStep(4), 3500);
    setTimeout(() => setActiveStep(5), 5000);
    setTimeout(() => setActiveStep(6), 6500);
    setTimeout(() => setActiveStep(0), 9000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-red-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-red-50 border-b border-red-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-red-700">
          <Flame className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Hot Potato (throws keyword)</h3>
        </div>
        <div className="text-xs font-mono text-red-600 bg-red-100 px-2 py-1 rounded">
          OOP_ENGINE // THROWS_CLAUSE
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        
        <div className="flex justify-between items-center bg-slate-50 border border-slate-200 p-4 rounded-lg">
          <div className="text-sm text-slate-600">
            <strong>Concept:</strong> When a method doesn't want to handle an exception itself, it declares <code className="bg-slate-200 px-1 rounded text-red-600">throws</code> in its signature. This tosses the "hot potato" exception up to whoever called it.
          </div>
          <button 
            onClick={runSim}
            disabled={activeStep !== 0}
            className="px-6 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center"
          >
            <Play className="w-4 h-4 mr-2" /> Start Call Stack
          </button>
        </div>

        {/* Call Stack Visualization */}
        <div className="flex-1 relative bg-slate-100 rounded-lg border-2 border-slate-300 p-8 flex flex-col items-center justify-end space-y-6 min-h-[400px]">
          
          {/* Main Method Block */}
          <div className={`w-80 border-2 rounded-lg p-4 relative transition-all duration-300 ${activeStep >= 1 ? 'border-slate-800 bg-white shadow-md' : 'border-slate-300 bg-slate-50 opacity-50'}`}>
            <div className="absolute -left-24 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase tracking-wider text-right w-20">Call Stack Level 1</div>
            <div className="font-mono text-sm mb-2 font-bold text-slate-700">main()</div>
            <div className="font-mono text-xs space-y-1">
              <div className="text-purple-600">try {'{'}</div>
              <div className={`pl-4 ${activeStep === 1 ? 'bg-yellow-100 font-bold' : ''}`}>methodA();</div>
              <div className="text-purple-600">{'}'} catch (Exception e) {'{'}</div>
              <div className={`pl-4 ${activeStep === 6 ? 'bg-green-100 text-green-700 font-bold border border-green-400 p-1 rounded' : 'text-slate-500'}`}>System.out.println("Caught it!");</div>
              <div className="text-purple-600">{'}'}</div>
            </div>
            
            {/* Catch net for potato */}
            {activeStep === 6 && (
              <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-6 left-1/2 -translate-x-1/2">
                <Flame className="w-12 h-12 text-red-500" />
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
              </motion.div>
            )}
          </div>

          <div className="text-slate-400"><ArrowUpCircle className={`w-6 h-6 ${activeStep >= 1 && activeStep < 6 ? 'text-blue-500 animate-pulse' : ''}`} /></div>

          {/* Method A Block */}
          <div className={`w-80 border-2 rounded-lg p-4 relative transition-all duration-300 ${activeStep >= 2 && activeStep < 6 ? 'border-slate-800 bg-white shadow-md' : 'border-slate-300 bg-slate-50 opacity-50'}`}>
            <div className="absolute -left-24 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase tracking-wider text-right w-20">Call Stack Level 2</div>
            <div className="font-mono text-sm mb-2 font-bold text-slate-700">
              void methodA() <span className="text-red-500 bg-red-50 px-1 rounded border border-red-200">throws Exception</span>
            </div>
            <div className="font-mono text-xs space-y-1">
              <div className={`pl-4 ${activeStep === 2 ? 'bg-yellow-100 font-bold' : ''}`}>methodB();</div>
            </div>

            {/* Potato tossed to A */}
            {activeStep >= 4 && activeStep < 6 && (
              <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute -top-8 right-4 bg-red-100 text-red-600 px-2 py-1 rounded shadow-sm border border-red-300 text-[10px] font-bold flex items-center">
                <Flame className="w-3 h-3 mr-1" /> Tossed to A!
              </motion.div>
            )}
          </div>

          <div className="text-slate-400"><ArrowUpCircle className={`w-6 h-6 ${activeStep >= 2 && activeStep < 5 ? 'text-blue-500 animate-pulse' : ''}`} /></div>

          {/* Method B Block */}
          <div className={`w-80 border-2 rounded-lg p-4 relative transition-all duration-300 ${activeStep >= 3 && activeStep < 5 ? 'border-slate-800 bg-white shadow-md border-red-400' : 'border-slate-300 bg-slate-50 opacity-50'}`}>
            <div className="absolute -left-24 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase tracking-wider text-right w-20">Call Stack Level 3</div>
            <div className="font-mono text-sm mb-2 font-bold text-slate-700">
              void methodB() <span className="text-red-500 bg-red-50 px-1 rounded border border-red-200">throws Exception</span>
            </div>
            <div className="font-mono text-xs space-y-1">
              <div className={`pl-4 ${activeStep === 3 ? 'bg-red-100 text-red-700 font-bold' : ''}`}>throw new Exception("Boom");</div>
            </div>

            {/* Initial Potato Spawn */}
            {activeStep === 3 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-8 right-4 bg-red-600 text-white px-2 py-1 rounded shadow-lg border border-red-800 text-xs font-bold flex items-center">
                <Flame className="w-4 h-4 mr-1 animate-pulse" /> HOT POTATO!
              </motion.div>
            )}
          </div>

        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-24 overflow-y-auto border-t border-slate-800">
        <div className="text-slate-500 mb-1">// JVM Stack Trace Log</div>
        {activeStep === 1 && <div>main() pushed to stack. Calling methodA()...</div>}
        {activeStep === 2 && <div>methodA() pushed to stack. Calling methodB()...</div>}
        {activeStep === 3 && <div className="text-red-400">Exception thrown in methodB()!</div>}
        {activeStep === 4 && <div>methodB() doesn't catch it. It <span className="text-red-400">throws</span> it down the stack to methodA()...</div>}
        {activeStep === 5 && <div>methodA() doesn't catch it either. It <span className="text-red-400">throws</span> it down the stack to main()...</div>}
        {activeStep === 6 && <div className="text-green-400 font-bold">main() catches the exception in its try-catch block! Stack unwinding complete.</div>}
      </div>
    </div>
  );
}
