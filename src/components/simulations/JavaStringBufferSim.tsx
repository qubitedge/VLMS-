import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Plus, RefreshCw, Trash2 } from 'lucide-react';

export function JavaStringBufferSim() {
  const [buffer, setBuffer] = useState<string>("Hello");
  const [capacity, setCapacity] = useState<number>(21); // 16 + 5
  
  const [inputValue, setInputValue] = useState("");
  const [insertIdx, setInsertIdx] = useState(0);
  const [delStart, setDelStart] = useState(0);
  const [delEnd, setDelEnd] = useState(0);

  const updateCapacityIfNeeded = (newLength: number) => {
    if (newLength > capacity) {
      setCapacity(Math.max(capacity * 2 + 2, newLength));
    }
  };

  const handleAppend = () => {
    if (!inputValue) return;
    const newStr = buffer + inputValue;
    updateCapacityIfNeeded(newStr.length);
    setBuffer(newStr);
    setInputValue("");
  };

  const handleInsert = () => {
    if (!inputValue) return;
    const idx = Math.min(Math.max(0, insertIdx), buffer.length);
    const newStr = buffer.slice(0, idx) + inputValue + buffer.slice(idx);
    updateCapacityIfNeeded(newStr.length);
    setBuffer(newStr);
    setInputValue("");
  };

  const handleDelete = () => {
    const s = Math.max(0, delStart);
    const e = Math.min(buffer.length, Math.max(s, delEnd));
    const newStr = buffer.slice(0, s) + buffer.slice(e);
    setBuffer(newStr);
  };

  const handleReverse = () => {
    setBuffer(buffer.split('').reverse().join(''));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-green-50 border-b border-green-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-green-700">
          <Scissors className="w-5 h-5" />
          <h3 className="font-semibold text-lg">String Surgery Table</h3>
        </div>
        <div className="text-xs font-mono text-green-600 bg-green-100 px-2 py-1 rounded">
          UTIL_CLASS // STRING_BUFFER
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-4 p-4 min-h-0">
        
        {/* Controls */}
        <div className="flex flex-col space-y-4 overflow-y-auto pr-2">
          
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <div className="text-sm font-bold text-slate-600 flex items-center"><Plus className="w-4 h-4 mr-1"/> Append / Insert</div>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Text..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border border-slate-300 rounded px-2 py-1 font-mono text-sm focus:border-green-500 focus:outline-none"
              />
              <button onClick={handleAppend} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Append</button>
            </div>
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-slate-500">at index</span>
              <input 
                type="number" 
                value={insertIdx}
                onChange={(e) => setInsertIdx(Number(e.target.value))}
                className="w-16 border border-slate-300 rounded px-2 py-1 font-mono text-sm focus:border-green-500 focus:outline-none"
              />
              <button onClick={handleInsert} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Insert</button>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <div className="text-sm font-bold text-slate-600 flex items-center"><Trash2 className="w-4 h-4 mr-1"/> Delete Range</div>
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-slate-500">start:</span>
              <input 
                type="number" 
                value={delStart}
                onChange={(e) => setDelStart(Number(e.target.value))}
                className="w-16 border border-slate-300 rounded px-2 py-1 font-mono text-sm focus:border-green-500 focus:outline-none"
              />
              <span className="text-xs text-slate-500">end:</span>
              <input 
                type="number" 
                value={delEnd}
                onChange={(e) => setDelEnd(Number(e.target.value))}
                className="w-16 border border-slate-300 rounded px-2 py-1 font-mono text-sm focus:border-green-500 focus:outline-none"
              />
              <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="text-sm font-bold text-slate-600 flex items-center mb-2"><RefreshCw className="w-4 h-4 mr-1"/> Operations</div>
            <button onClick={handleReverse} className="w-full bg-slate-700 text-white px-3 py-2 rounded text-sm hover:bg-slate-800 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 mr-2" /> Reverse Buffer
            </button>
          </div>

        </div>

        {/* Visualization */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 flex flex-col p-4 relative overflow-hidden">
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm font-bold text-slate-600">Buffer Memory</div>
            <div className="flex space-x-4 text-xs font-mono">
              <div className="bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">Length: <span className="font-bold text-green-600">{buffer.length}</span></div>
              <div className="bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">Capacity: <span className="font-bold text-blue-600">{capacity}</span></div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-x-auto pb-4">
            <div className="flex flex-wrap gap-1 justify-center max-w-full">
              <AnimatePresence mode="popLayout">
                {buffer.split('').map((char, idx) => (
                  <motion.div
                    key={`${idx}-${char}-${Math.random()}`} // Force new key for animations
                    layout
                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative"
                  >
                    <div className="w-10 h-12 bg-white border-2 border-green-400 rounded shadow-sm flex items-center justify-center text-xl font-bold font-mono text-green-800">
                      {char === ' ' ? '\u00A0' : char}
                    </div>
                    <div className="absolute -bottom-4 left-0 right-0 text-center text-[10px] text-slate-400 font-mono">
                      {idx}
                    </div>
                  </motion.div>
                ))}
                {buffer.length === 0 && (
                  <div className="text-slate-400 font-mono italic p-4">Buffer is empty</div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-24 overflow-y-auto">
        <div className="text-slate-500 mb-1">// StringBuffer State</div>
        <div>StringBuffer sb = new StringBuffer("{buffer}");</div>
        <div className="text-slate-400 mt-1">sb.length() &rarr; {buffer.length}</div>
        <div className="text-slate-400">sb.capacity() &rarr; {capacity}</div>
      </div>
    </div>
  );
}
