import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Play, RefreshCcw, Printer } from 'lucide-react';

export function JavaThreadSyncSim() {
  const [isSync, setIsSync] = useState(true);
  const [step, setStep] = useState(0); 
  // 0: idle
  // 1: T1 and T2 start
  // 2: T1 enters (if sync, locks). T2 tries to enter
  // 3: T1 printing line 1. T2 behavior depends
  // 4: T1 printing line 2. T2 behavior depends
  // 5: T1 leaves (unlocks). T2 enters
  // 6: T2 printing line 1
  // 7: T2 printing line 2
  // 8: done

  const [log, setLog] = useState<string[]>([]);

  const startSim = () => {
    setStep(1);
    setLog(["T1 and T2 spawned."]);
    
    setTimeout(() => {
      setStep(2);
      setLog(l => [...l, "T1 calls print(). T2 calls print()."]);
      
      setTimeout(() => {
        setStep(3);
        if (isSync) {
          setLog(l => [...l, "T1 acquires LOCK. T1 prints '[Hello]'. T2 is BLOCKED."]);
        } else {
          setLog(l => [...l, "T1 prints '[Hello]'. T2 prints '[World]'. (RACE CONDITION)"]);
        }

        setTimeout(() => {
          setStep(4);
          if (isSync) {
            setLog(l => [...l, "T1 prints 'World]'. (T1 still holds lock)."]);
          } else {
            setLog(l => [...l, "T1 prints 'World]'. T2 prints 'Hello]'. (OUTPUT MANGLED)"]);
          }

          setTimeout(() => {
            setStep(5);
            if (isSync) {
              setLog(l => [...l, "T1 finishes, releases LOCK. T2 acquires LOCK."]);
            } else {
              setLog(l => [...l, "Both threads finish."]);
            }

            setTimeout(() => {
              setStep(6);
              if (isSync) {
                setLog(l => [...l, "T2 prints '[World]'. "]);
              }
              
              setTimeout(() => {
                setStep(7);
                if (isSync) {
                  setLog(l => [...l, "T2 prints 'Hello]'. "]);
                }

                setTimeout(() => {
                  setStep(8);
                  if (isSync) {
                    setLog(l => [...l, "T2 releases LOCK. Both threads terminated."]);
                  }
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1000);
  };

  const resetSim = () => {
    setStep(0);
    setLog([]);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-cyan-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-cyan-50 border-b border-cyan-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-700">
          <Lock className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Shared Lock (Synchronization)</h3>
        </div>
        <div className="text-xs font-mono text-cyan-600 bg-cyan-100 px-2 py-1 rounded">
          JVM // SYNCHRONIZED
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-[1fr_300px] gap-0 min-h-0 overflow-y-auto">
        
        {/* Main Stage */}
        <div className="p-8 bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
          
          <div className="absolute top-4 right-4 flex space-x-2">
            <button onClick={() => { setIsSync(!isSync); resetSim(); }} disabled={step > 0 && step < 8} className="px-3 py-1.5 bg-slate-200 text-slate-700 font-medium text-xs rounded hover:bg-slate-300 disabled:opacity-50">
              Toggle: {isSync ? 'Synchronized' : 'Not Synchronized'}
            </button>
            <button onClick={startSim} disabled={step > 0} className="px-3 py-1.5 bg-cyan-600 text-white font-bold text-xs rounded hover:bg-cyan-700 disabled:opacity-50 flex items-center">
              <Play className="w-3 h-3 mr-1" /> Run
            </button>
            <button onClick={resetSim} className="px-2 py-1.5 bg-slate-200 text-slate-700 rounded hover:bg-slate-300"><RefreshCcw className="w-3 h-3" /></button>
          </div>

          <div className="flex space-x-32 relative">
            
            {/* Thread 1 */}
            <motion.div 
              animate={{ 
                y: step >= 2 && step <= 4 ? 150 : step >= 5 ? 300 : 0,
                opacity: step >= 8 ? 0.3 : 1
              }}
              className="flex flex-col items-center z-20"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white">T1</div>
              <div className="mt-2 bg-white text-xs px-2 py-1 rounded border border-slate-200 font-mono shadow-sm">"Hello"</div>
              {step >= 3 && step <= 4 && isSync && <Lock className="w-4 h-4 text-amber-500 mt-2" />}
            </motion.div>

            {/* Thread 2 */}
            <motion.div 
              animate={{ 
                y: step >= 2 && step <= 4 ? (isSync ? 50 : 150) : step >= 5 && step <= 7 ? 150 : step >= 8 ? 300 : 0,
                x: step >= 2 && step <= 4 && isSync ? -30 : 0, // Gets bumped into blocked state
                opacity: step >= 8 ? 0.3 : 1
              }}
              className="flex flex-col items-center z-20"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white">T2</div>
              <div className="mt-2 bg-white text-xs px-2 py-1 rounded border border-slate-200 font-mono shadow-sm">"World"</div>
              {step >= 2 && step <= 4 && isSync && <div className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">Blocked</div>}
            </motion.div>

          </div>

          {/* The Shared Resource (Printer) */}
          <div className="absolute top-[250px] w-64 h-32 bg-slate-800 rounded-xl border-4 border-slate-600 flex flex-col items-center justify-center shadow-2xl z-10">
            <Printer className="w-8 h-8 text-slate-400 mb-2" />
            <div className="text-white font-bold font-mono text-sm">Printer Object</div>
            {isSync ? (
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                {step >= 3 && step <= 7 ? <Lock className="w-4 h-4 text-white" /> : <Unlock className="w-4 h-4 text-white" />}
              </div>
            ) : (
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <Unlock className="w-4 h-4 text-white" />
              </div>
            )}

            {/* Print output visual */}
            <div className="mt-2 w-48 h-6 bg-slate-900 border border-slate-700 rounded flex items-center px-2 text-[10px] font-mono text-green-400 overflow-hidden">
              {isSync ? (
                <>
                  {step === 3 && <span>[Hello</span>}
                  {step === 4 && <span>[Hello]</span>}
                  {step === 5 && <span>[Hello]</span>}
                  {step === 6 && <span>[Hello] [World</span>}
                  {step >= 7 && <span>[Hello] [World]</span>}
                </>
              ) : (
                <>
                  {step === 3 && <span>[Hello [World</span>}
                  {step >= 4 && <span className="text-red-400">[Hello [World ] ]</span>}
                </>
              )}
            </div>
          </div>

        </div>

        {/* Code / Output Panel */}
        <div className="border-l border-slate-200 flex flex-col font-mono text-xs">
          
          <div className="p-4 bg-slate-100 border-b border-slate-200">
            <div className="text-cyan-700 font-bold mb-2 uppercase">class Printer</div>
            <div className={`p-2 rounded ${isSync ? 'bg-cyan-50 border border-cyan-200' : 'bg-white border border-slate-200'}`}>
              <span className={isSync ? "text-cyan-600 font-bold" : "hidden"}>synchronized </span>
              <span className="text-blue-600">void</span> print(String s) {'{\n'}
              <div className="ml-2">
                System.out.print("[" + s);<br/>
                Thread.sleep(1000);<br/>
                System.out.println("]");
              </div>
              {'}'}
            </div>
          </div>

          <div className="flex-1 bg-slate-900 text-slate-300 p-4 overflow-y-auto">
            <div className="text-slate-500 mb-2">// Console Output</div>
            
            {isSync ? (
              <>
                {step >= 3 && <div>[Hello</div>}
                {step >= 4 && <div>]</div>}
                {step >= 6 && <div>[World</div>}
                {step >= 7 && <div>]</div>}
              </>
            ) : (
              <>
                {step >= 3 && <div>[Hello</div>}
                {step >= 3 && <div>[World</div>}
                {step >= 4 && <div>]</div>}
                {step >= 4 && <div>]</div>}
              </>
            )}

            {step >= 8 && !isSync && (
              <div className="mt-4 text-red-400 font-bold p-2 border border-red-500 rounded bg-red-900/30">
                RACE CONDITION OCCURRED.<br/>Both threads entered the method simultaneously.
              </div>
            )}
            {step >= 8 && isSync && (
              <div className="mt-4 text-green-400 font-bold p-2 border border-green-500 rounded bg-green-900/30">
                THREAD SAFE.<br/>T1 locked the monitor. T2 waited in Blocked state until T1 released it.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
