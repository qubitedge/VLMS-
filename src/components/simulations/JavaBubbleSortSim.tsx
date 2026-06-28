import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, RotateCcw, Play, Square } from 'lucide-react';

export function JavaBubbleSortSim() {
  const INITIAL_ARRAY = [45, 12, 89, 33, 67, 21, 95, 54];
  const [array, setArray] = useState<number[]>([...INITIAL_ARRAY]);
  
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(500);
  
  const [swaps, setSwaps] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  
  const timerRef = useRef<any>(null);

  const reset = () => {
    setIsSorting(false);
    clearTimeout(timerRef.current);
    setArray([...INITIAL_ARRAY]);
    setI(0);
    setJ(0);
    setSwaps(0);
    setComparisons(0);
    setIsSorted(false);
  };

  const stepSort = () => {
    if (isSorted) return;

    setArray((prevArr) => {
      let newArr = [...prevArr];
      
      setComparisons(c => c + 1);
      
      if (newArr[j] > newArr[j + 1]) {
        // Swap
        let temp = newArr[j];
        newArr[j] = newArr[j + 1];
        newArr[j + 1] = temp;
        setSwaps(s => s + 1);
      }

      // Increment logic
      let nextJ = j + 1;
      let nextI = i;

      if (nextJ >= newArr.length - 1 - i) {
        nextJ = 0;
        nextI = i + 1;
      }

      if (nextI >= newArr.length - 1) {
        setIsSorted(true);
        setIsSorting(false);
        setJ(-1); // Remove highlights
      } else {
        setI(nextI);
        setJ(nextJ);
      }

      return newArr;
    });
  };

  useEffect(() => {
    if (isSorting && !isSorted) {
      timerRef.current = setTimeout(() => {
        stepSort();
      }, speed);
    }
    return () => clearTimeout(timerRef.current);
  }, [isSorting, j, isSorted, speed]);

  const maxVal = Math.max(...INITIAL_ARRAY);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-green-50 border-b border-green-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-green-700">
          <BarChart3 className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Bubble Race</h3>
        </div>
        <div className="text-xs font-mono text-green-600 bg-green-100 px-2 py-1 rounded">
          SORT_ALGO // BUBBLE
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 min-h-0">
        
        {/* Controls */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsSorting(!isSorting)}
              disabled={isSorted}
              className={`px-4 py-2 flex items-center space-x-2 text-white rounded font-medium transition-colors disabled:opacity-50 ${isSorting ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isSorting ? <><Square className="w-4 h-4"/> <span>Pause</span></> : <><Play className="w-4 h-4"/> <span>Start Sort</span></>}
            </button>
            <button 
              onClick={reset}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded font-medium hover:bg-slate-300 transition-colors flex items-center space-x-1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Speed</label>
              <input 
                type="range" 
                min="100" max="1000" 
                step="100"
                value={1100 - speed} 
                onChange={(e) => setSpeed(1100 - Number(e.target.value))}
                className="w-24 accent-green-600"
              />
            </div>
            
            <div className="h-8 w-px bg-slate-300 mx-2"></div>

            <div className="text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Comparisons</div>
              <div className="text-lg font-mono font-bold text-slate-700">{comparisons}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Swaps</div>
              <div className="text-lg font-mono font-bold text-green-600">{swaps}</div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="flex-1 flex items-end justify-center space-x-2 pb-8">
          {array.map((val, idx) => {
            const isComparing = idx === j || idx === j + 1;
            const isSortedElement = idx > array.length - 1 - i || isSorted;
            const heightPercent = (val / maxVal) * 100;

            return (
              <motion.div 
                layout
                key={val} // using value as key ensures animation tracks the item swapping
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex flex-col items-center"
              >
                <div className="text-xs font-mono font-bold mb-2 text-slate-500">{val}</div>
                <div 
                  className={`w-10 rounded-t-sm transition-colors duration-200 border-x border-t ${
                    isSortedElement ? 'bg-green-500 border-green-600' :
                    isComparing ? 'bg-yellow-400 border-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.5)] z-10 relative' :
                    'bg-slate-300 border-slate-400'
                  }`}
                  style={{ height: `${heightPercent}px`, minHeight: '20px' }}
                >
                  {/* Bubble effect overlay */}
                  {isComparing && (
                    <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white opacity-60"></div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto">
        <div className="text-slate-500 mb-1">// Execution State</div>
        <div>int i = {i}; <span className="text-slate-500">// Outer pass counter</span></div>
        {j >= 0 ? (
          <div>
            int j = {j}; <span className="text-slate-500">// Inner compare index</span>
            <br />
            <span className={array[j] > array[j+1] ? "text-red-400" : "text-slate-400"}>
              if (arr[{j}] &gt; arr[{j+1}]) &rarr; {array[j]} &gt; {array[j+1]} is {array[j] > array[j+1] ? 'true (Swap)' : 'false'}
            </span>
          </div>
        ) : (
          <div className="text-green-500 font-bold mt-2">Array is fully sorted!</div>
        )}
      </div>
    </div>
  );
}
