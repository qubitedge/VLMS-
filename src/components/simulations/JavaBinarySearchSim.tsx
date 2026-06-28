import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw } from 'lucide-react';

export function JavaBinarySearchSim() {
  const initialArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const [target, setTarget] = useState<number>(40);
  
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(initialArray.length - 1);
  const [mid, setMid] = useState<number | null>(null);
  
  const [status, setStatus] = useState<string>("Waiting to start...");
  const [isFound, setIsFound] = useState<boolean | null>(null);
  const [comparisons, setComparisons] = useState(0);

  const reset = () => {
    setLow(0);
    setHigh(initialArray.length - 1);
    setMid(null);
    setStatus("Waiting to start...");
    setIsFound(null);
    setComparisons(0);
  };

  const nextStep = () => {
    if (isFound !== null || low > high) return;

    const currentMid = Math.floor((low + high) / 2);
    setMid(currentMid);
    setComparisons(c => c + 1);

    if (initialArray[currentMid] === target) {
      setStatus(`Found ${target} at index ${currentMid}!`);
      setIsFound(true);
    } else if (initialArray[currentMid] < target) {
      setStatus(`${initialArray[currentMid]} is less than ${target}. Searching right half.`);
      setLow(currentMid + 1);
    } else {
      setStatus(`${initialArray[currentMid]} is greater than ${target}. Searching left half.`);
      setHigh(currentMid - 1);
    }
  };

  useEffect(() => {
    if (low > high && isFound === null) {
      setIsFound(false);
      setStatus(`Target ${target} not found in array.`);
      setMid(null);
    }
  }, [low, high, isFound, target]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-green-50 border-b border-green-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-green-700">
          <Search className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Sorted Array Scanner</h3>
        </div>
        <div className="text-xs font-mono text-green-600 bg-green-100 px-2 py-1 rounded">
          SEARCH_ALGO // BINARY
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-6 overflow-y-auto">
        
        {/* Controls */}
        <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Target Element:</label>
            <input 
              type="number" 
              value={target}
              onChange={(e) => { setTarget(Number(e.target.value)); reset(); }}
              className="w-24 bg-white border border-slate-300 rounded p-2 font-mono text-green-700 focus:outline-none focus:border-green-500"
            />
          </div>
          <button 
            onClick={nextStep}
            disabled={isFound !== null}
            className="mt-5 px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Next Step
          </button>
          <button 
            onClick={reset}
            className="mt-5 px-4 py-2 bg-slate-200 text-slate-700 rounded font-medium hover:bg-slate-300 transition-colors flex items-center space-x-1"
          >
            <RotateCcw className="w-4 h-4" /> <span>Reset</span>
          </button>
          
          <div className="ml-auto text-right">
            <div className="text-xs font-bold text-slate-400">Comparisons</div>
            <div className="text-xl font-mono font-bold text-green-600">{comparisons}</div>
          </div>
        </div>

        {/* Status */}
        <div className={`p-3 rounded border font-mono text-sm ${
          isFound === true ? 'bg-green-100 border-green-300 text-green-800' :
          isFound === false ? 'bg-red-100 border-red-300 text-red-800' :
          'bg-slate-100 border-slate-300 text-slate-700'
        }`}>
          {'>'} {status}
        </div>

        {/* Visualization */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {initialArray.map((val, idx) => {
              const isEliminated = idx < low || idx > high;
              const isMid = idx === mid;
              const isTarget = isFound && isMid;

              return (
                <div key={idx} className="relative flex flex-col items-center">
                  <span className="text-xs text-slate-400 font-mono mb-1">{idx}</span>
                  <motion.div 
                    layout
                    className={`w-12 h-12 flex items-center justify-center rounded border-2 font-bold text-lg transition-colors duration-300 ${
                      isTarget ? 'bg-green-500 border-green-600 text-white shadow-lg' :
                      isMid ? 'bg-yellow-200 border-yellow-400 text-yellow-800 scale-110 z-10' :
                      isEliminated ? 'bg-slate-100 border-slate-200 text-slate-300 opacity-50' :
                      'bg-white border-green-200 text-green-800'
                    }`}
                  >
                    {val}
                  </motion.div>
                  {/* Indicators */}
                  <div className="h-4 mt-1 text-[10px] font-bold text-slate-500">
                    {idx === low && "L"}
                    {idx === high && idx !== low && " H"}
                    {idx === mid && " M"}
                  </div>
                  
                  {isEliminated && (
                    <div className="absolute top-[28px] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-14 h-0.5 bg-red-400 rotate-45 absolute" />
                      <div className="w-14 h-0.5 bg-red-400 -rotate-45 absolute" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto">
        <div className="text-slate-500 mb-1">// Java Array Pointers</div>
        <div>int low = {low};</div>
        <div>int high = {high};</div>
        {mid !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div>int mid = (low + high) / 2; <span className="text-slate-500">// {mid}</span></div>
            <div>arr[mid] == {initialArray[mid]}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
