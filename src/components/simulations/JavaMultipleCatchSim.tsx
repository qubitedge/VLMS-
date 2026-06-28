import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Play, AlertOctagon } from 'lucide-react';

type ExceptionType = 'ArithmeticException' | 'ArrayIndexOutOfBoundsException' | 'Exception';

export function JavaMultipleCatchSim() {
  const [selectedError, setSelectedError] = useState<ExceptionType | null>(null);
  const [fallingError, setFallingError] = useState<ExceptionType | null>(null);
  const [caughtBlock, setCaughtBlock] = useState<ExceptionType | null>(null);

  const triggerException = (type: ExceptionType) => {
    setSelectedError(type);
    setFallingError(null);
    setCaughtBlock(null);

    setTimeout(() => {
      setFallingError(type);
      
      // Calculate delay based on which block catches it
      let catchDelay = 1000; // hits first block
      if (type === 'ArrayIndexOutOfBoundsException') catchDelay = 2000;
      if (type === 'Exception') catchDelay = 3000;

      setTimeout(() => {
        setCaughtBlock(type);
      }, catchDelay);
      
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-red-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-red-50 border-b border-red-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-red-700">
          <Filter className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Multiple Catch Filters</h3>
        </div>
        <div className="text-xs font-mono text-red-600 bg-red-100 px-2 py-1 rounded">
          OOP_ENGINE // MULTIPLE_CATCH
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        
        {/* Trigger Panel */}
        <div className="flex justify-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <button 
            onClick={() => triggerException('ArithmeticException')}
            disabled={fallingError !== null && caughtBlock === null}
            className={`px-4 py-2 rounded text-sm font-bold transition-colors ${selectedError === 'ArithmeticException' ? 'bg-red-600 text-white' : 'bg-white border-2 border-red-200 text-red-700 hover:bg-red-50'}`}
          >
            Trigger 10 / 0
          </button>
          <button 
            onClick={() => triggerException('ArrayIndexOutOfBoundsException')}
            disabled={fallingError !== null && caughtBlock === null}
            className={`px-4 py-2 rounded text-sm font-bold transition-colors ${selectedError === 'ArrayIndexOutOfBoundsException' ? 'bg-red-600 text-white' : 'bg-white border-2 border-red-200 text-red-700 hover:bg-red-50'}`}
          >
            Trigger arr[10]
          </button>
          <button 
            onClick={() => triggerException('Exception')}
            disabled={fallingError !== null && caughtBlock === null}
            className={`px-4 py-2 rounded text-sm font-bold transition-colors ${selectedError === 'Exception' ? 'bg-red-600 text-white' : 'bg-white border-2 border-red-200 text-red-700 hover:bg-red-50'}`}
          >
            Trigger throw new Exception()
          </button>
        </div>

        {/* Filter Visualization */}
        <div className="flex-1 relative bg-slate-100 rounded-lg border-2 border-slate-300 flex flex-col items-center justify-start pt-10 min-h-[400px]">
          
          <AnimatePresence>
            {fallingError && !caughtBlock && (
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 350, opacity: 1 }}
                transition={{ duration: 4, ease: "linear" }}
                className="absolute z-20 bg-red-500 text-white font-mono text-xs px-3 py-2 rounded shadow-lg border-2 border-red-700 flex items-center gap-2"
                style={{
                  top: 0
                }}
              >
                <AlertOctagon className="w-4 h-4" />
                {fallingError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sieve 1: ArithmeticException */}
          <div className="relative w-96 h-20 border-b-4 border-slate-300 flex flex-col items-center justify-end pb-2">
            <div className={`w-64 py-2 rounded border-2 text-center font-mono text-sm transition-colors duration-300 z-10 ${caughtBlock === 'ArithmeticException' ? 'bg-green-100 border-green-500 text-green-800 font-bold shadow-lg shadow-green-200 scale-110' : fallingError && !caughtBlock && fallingError !== 'ArithmeticException' && selectedError ? 'border-dashed border-red-300 text-slate-400 bg-white/50' : 'bg-white border-slate-300'}`}>
              catch (ArithmeticException e)
            </div>
            {/* The gap for unmatching exceptions to pass through */}
            {fallingError && fallingError !== 'ArithmeticException' && (
              <div className="absolute inset-x-0 bottom-0 h-4 bg-slate-100 z-20 opacity-90 mx-32"></div>
            )}
          </div>

          <div className="h-10 w-2 border-l-2 border-r-2 border-dashed border-slate-300"></div>

          {/* Sieve 2: ArrayIndexOutOfBoundsException */}
          <div className="relative w-96 h-20 border-b-4 border-slate-300 flex flex-col items-center justify-end pb-2">
            <div className={`w-80 py-2 rounded border-2 text-center font-mono text-sm transition-colors duration-300 z-10 ${caughtBlock === 'ArrayIndexOutOfBoundsException' ? 'bg-green-100 border-green-500 text-green-800 font-bold shadow-lg shadow-green-200 scale-110' : fallingError && !caughtBlock && fallingError === 'Exception' ? 'border-dashed border-red-300 text-slate-400 bg-white/50' : 'bg-white border-slate-300'}`}>
              catch (ArrayIndexOutOfBoundsException e)
            </div>
            {/* The gap for unmatching exceptions to pass through */}
            {fallingError && fallingError === 'Exception' && (
              <div className="absolute inset-x-0 bottom-0 h-4 bg-slate-100 z-20 opacity-90 mx-32"></div>
            )}
          </div>

          <div className="h-10 w-2 border-l-2 border-r-2 border-dashed border-slate-300"></div>

          {/* Sieve 3: Exception (Base Class) */}
          <div className="relative w-96 h-20 border-b-4 border-slate-800 flex flex-col items-center justify-end pb-2">
            <div className={`w-64 py-2 rounded border-2 text-center font-mono text-sm transition-colors duration-300 z-10 ${caughtBlock === 'Exception' ? 'bg-green-100 border-green-500 text-green-800 font-bold shadow-lg shadow-green-200 scale-110' : 'bg-white border-slate-800'}`}>
              catch (Exception e)
            </div>
            <div className="absolute bottom-[-24px] text-xs font-bold text-slate-500">Base Exception Catcher (Catches Anything Left)</div>
          </div>

        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto">
        <div className="text-slate-500 mb-1">// JVM Execution Logs</div>
        {selectedError && !caughtBlock && (
          <div><span className="text-red-400">Exception thrown:</span> {selectedError}. Searching catch blocks sequentially...</div>
        )}
        {caughtBlock && (
          <div>
            <span className="text-green-400 font-bold">Match found!</span> Executing block: <span className="text-purple-400">catch ({caughtBlock} e)</span>.
          </div>
        )}
      </div>
    </div>
  );
}
