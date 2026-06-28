import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Play, RefreshCcw, Shield, ShieldX } from 'lucide-react';

export function JavaTryCatchSim() {
  const [useTryCatch, setUseTryCatch] = useState(true);
  const [executionState, setExecutionState] = useState<'idle' | 'running' | 'caught' | 'crashed' | 'done'>('idle');
  const [activeLine, setActiveLine] = useState(-1);

  const startSimulation = () => {
    setExecutionState('running');
    setActiveLine(1);
    
    setTimeout(() => setActiveLine(2), 800);
    setTimeout(() => setActiveLine(3), 1600);
    setTimeout(() => {
      setActiveLine(4); // The division line
      setTimeout(() => {
        if (useTryCatch) {
          setExecutionState('caught');
          setActiveLine(6); // Catch block
          setTimeout(() => {
            setActiveLine(8); // After try-catch
            setTimeout(() => {
              setExecutionState('done');
              setActiveLine(-1);
            }, 1000);
          }, 1500);
        } else {
          setExecutionState('crashed'); // Boom
        }
      }, 500);
    }, 2400);
  };

  const resetSim = () => {
    setExecutionState('idle');
    setActiveLine(-1);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-red-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-red-50 border-b border-red-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-red-700">
          <ShieldAlert className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Exception Net</h3>
        </div>
        <div className="text-xs font-mono text-red-600 bg-red-100 px-2 py-1 rounded">
          OOP_ENGINE // EXCEPTION_HANDLING
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-0 min-h-0 overflow-y-auto">
        
        {/* Code Panel */}
        <div className="bg-slate-900 border-r border-slate-700 p-6 flex flex-col font-mono text-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Source Code</span>
            <button 
              onClick={() => { setUseTryCatch(!useTryCatch); resetSim(); }}
              disabled={executionState !== 'idle' && executionState !== 'done' && executionState !== 'crashed'}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded transition-colors disabled:opacity-50"
            >
              Toggle: {useTryCatch ? 'With Try-Catch' : 'Without Try-Catch'}
            </button>
          </div>

          <div className="flex-1 space-y-1">
            <div className="text-blue-400">public class <span className="text-green-400">Main</span> {'{'}</div>
            <div className={`pl-4 ${activeLine === 1 ? 'bg-slate-800 border-l-2 border-red-500' : 'border-l-2 border-transparent'}`}>
              <span className="text-blue-400">public static void</span> <span className="text-yellow-200">main</span>(String[] args) {'{'}
            </div>
            
            <div className={`pl-8 ${activeLine === 2 ? 'bg-slate-800 border-l-2 border-red-500' : 'border-l-2 border-transparent'}`}>
              <span className="text-blue-400">int</span> a = <span className="text-orange-400">10</span>;
            </div>
            
            {useTryCatch && (
              <div className={`pl-8 text-purple-400 ${activeLine === 3 ? 'bg-slate-800 border-l-2 border-red-500' : 'border-l-2 border-transparent'}`}>try {'{'}</div>
            )}
            
            <div className={`pl-12 ${activeLine === 4 ? 'bg-slate-800 border-l-2 border-red-500' : 'border-l-2 border-transparent'} relative`}>
              <span className="text-blue-400">int</span> result = a / <span className="text-orange-400">0</span>;
              {executionState === 'caught' || executionState === 'crashed' ? (
                <span className="absolute right-4 text-red-500 font-bold animate-pulse">← EXCEPTION THROWN!</span>
              ) : null}
            </div>
            
            {useTryCatch && (
              <>
                <div className="pl-12 text-slate-500">// System.out.println(result);</div>
                <div className={`pl-8 text-purple-400 ${activeLine === 6 ? 'bg-slate-800 border-l-2 border-red-500' : 'border-l-2 border-transparent'}`}>
                  {'}'} catch (ArithmeticException e) {'{'}
                </div>
                <div className={`pl-12 text-slate-300 ${activeLine === 6 ? 'bg-slate-800 border-l-2 border-transparent' : 'border-l-2 border-transparent'}`}>
                  System.out.println(<span className="text-green-300">"Caught exception!"</span>);
                </div>
                <div className="pl-8 text-purple-400">{'}'}</div>
              </>
            )}

            <div className={`pl-8 ${activeLine === 8 ? 'bg-slate-800 border-l-2 border-red-500' : 'border-l-2 border-transparent'} ${executionState === 'crashed' ? 'opacity-30' : ''}`}>
              System.out.println(<span className="text-green-300">"Program continues safely..."</span>);
            </div>

            <div className="pl-4">{'}'}</div>
            <div>{'}'}</div>
          </div>

          <div className="mt-4 flex space-x-2">
            <button 
              onClick={startSimulation}
              disabled={executionState !== 'idle'}
              className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Play className="w-4 h-4" /> <span>Run</span>
            </button>
            <button 
              onClick={resetSim}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded flex items-center justify-center"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Panel */}
        <div className="bg-slate-50 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="text-center z-10 w-full max-w-sm">
            
            {/* The Code Execution Flow */}
            <div className="flex flex-col items-center space-y-4 relative">
              
              <div className={`w-32 py-2 rounded-full border-2 transition-colors ${activeLine >= 1 ? 'bg-slate-200 border-slate-400' : 'bg-white border-slate-200'}`}>Start main()</div>
              <div className="h-4 w-1 bg-slate-300"></div>
              
              <div className={`w-32 py-2 rounded border-2 transition-colors ${activeLine >= 2 ? 'bg-slate-200 border-slate-400' : 'bg-white border-slate-200'}`}>int a = 10</div>
              <div className="h-4 w-1 bg-slate-300"></div>
              
              <div className={`w-40 py-2 rounded border-2 relative transition-colors ${activeLine >= 4 ? 'bg-red-100 border-red-500 shadow-md shadow-red-200' : 'bg-white border-slate-200'}`}>
                10 / 0
                <AnimatePresence>
                  {(executionState === 'caught' || executionState === 'crashed') && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -right-12 -top-6 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg z-20"
                    >
                      ERROR!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* The Exception Drop */}
              <div className="relative h-20 w-32 flex justify-center">
                <AnimatePresence>
                  {(executionState === 'caught' || executionState === 'crashed') && (
                    <motion.div 
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 60, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 100, damping: 10 }}
                      className="absolute z-20 bg-red-500 text-white font-mono text-xs px-2 py-1 rounded shadow-lg border border-red-700"
                    >
                      ArithmeticException
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* The Catch Net */}
                {useTryCatch ? (
                  <div className={`absolute bottom-0 w-48 h-10 border-b-4 border-l-4 border-r-4 rounded-b-xl transition-colors ${executionState === 'caught' ? 'border-green-500 bg-green-100/50' : 'border-slate-300 bg-slate-100/50'} flex items-end justify-center pb-1`}>
                    {executionState === 'caught' ? (
                      <span className="text-xs font-bold text-green-700 flex items-center"><Shield className="w-4 h-4 mr-1" /> Exception Caught!</span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400">catch(Exception e)</span>
                    )}
                  </div>
                ) : (
                  <div className="absolute bottom-0 w-48 h-2 border-b-4 border-dashed border-red-300 flex items-end justify-center pb-2">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2">No Catch Net (JVM Boundary)</span>
                  </div>
                )}
              </div>

              {/* Rest of program */}
              <div className={`w-40 py-2 rounded border-2 transition-colors mt-8 ${executionState === 'crashed' ? 'opacity-20 border-red-300 bg-red-50' : activeLine >= 8 ? 'bg-green-100 border-green-500 text-green-800 font-bold shadow-md' : 'bg-white border-slate-200'}`}>
                {executionState === 'crashed' ? 'Program Terminated' : 'Program Continues'}
              </div>

            </div>
          </div>

          {executionState === 'crashed' && (
            <motion.div initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center text-white p-6 z-50">
              <ShieldX className="w-20 h-20 text-red-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">JVM CRASHED</h2>
              <p className="font-mono text-sm text-red-200 text-center bg-black/50 p-4 rounded border border-red-500">
                Exception in thread "main" java.lang.ArithmeticException: / by zero<br/>
                &nbsp;&nbsp;at Main.main(Main.java:6)
              </p>
              <button onClick={resetSim} className="mt-8 px-6 py-2 bg-white text-red-900 font-bold rounded hover:bg-slate-200">Restart Simulation</button>
            </motion.div>
          )}

        </div>
      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto border-t border-slate-800">
        <div className="text-slate-500 mb-1">// Console Output</div>
        {activeLine >= 6 && useTryCatch && <div>Caught exception!</div>}
        {activeLine >= 8 && useTryCatch && <div>Program continues safely...</div>}
        {executionState === 'crashed' && <div className="text-red-500 font-bold">Exception in thread "main" java.lang.ArithmeticException: / by zero</div>}
      </div>
    </div>
  );
}
