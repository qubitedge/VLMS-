import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Server, CheckCircle2 } from 'lucide-react';

const PRIMITIVES = [
  { name: 'boolean', size: '1 bit*', default: 'false', desc: 'Logical true/false' },
  { name: 'char', size: '16 bits', default: "'\\u0000'", desc: 'Unicode character' },
  { name: 'byte', size: '8 bits', default: '0', desc: '8-bit signed integer' },
  { name: 'short', size: '16 bits', default: '0', desc: '16-bit signed integer' },
  { name: 'int', size: '32 bits', default: '0', desc: '32-bit signed integer' },
  { name: 'long', size: '64 bits', default: '0L', desc: '64-bit signed integer' },
  { name: 'float', size: '32 bits', default: '0.0f', desc: 'Single-precision floating point' },
  { name: 'double', size: '64 bits', default: '0.0d', desc: 'Double-precision floating point' }
];

export function JavaMemoryInspectorSim() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [ramSlots, setRamSlots] = useState<Array<{ type: string; value: string; size: string }>>([]);

  const handleSelect = (primitive: any) => {
    setActiveType(primitive.name);
    if (ramSlots.length >= 4) {
      setRamSlots((prev) => [...prev.slice(1), { type: primitive.name, value: primitive.default, size: primitive.size }]);
    } else {
      setRamSlots((prev) => [...prev, { type: primitive.name, value: primitive.default, size: primitive.size }]);
    }
  };

  const clearMemory = () => setRamSlots([]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden text-slate-800 font-sans">
      {/* Header */}
      <div className="bg-blue-50 border-b border-blue-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-blue-700">
          <Server className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Java Memory Inspector</h3>
        </div>
        <div className="text-xs font-mono text-blue-600 bg-blue-100 px-2 py-1 rounded">
          SYSTEM_BOOT // PRMITIVE_DEFAULTS
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-4 p-4 min-h-0">
        
        {/* Controls Panel */}
        <div className="flex flex-col space-y-4">
          <div className="text-sm text-slate-600 mb-2 font-medium">
            Select a primitive type to allocate in memory:
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {PRIMITIVES.map((p) => (
              <button
                key={p.name}
                onClick={() => handleSelect(p)}
                className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                  activeType === p.name 
                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div className="font-mono font-bold text-blue-700 mb-1">{p.name}</div>
                <div className="text-xs text-slate-500">{p.size}</div>
              </button>
            ))}
          </div>

          <div className="mt-auto pt-4 flex justify-between items-center">
            <button 
              onClick={clearMemory}
              className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            >
              Flush Memory
            </button>
          </div>
        </div>

        {/* Visualization Panel */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 opacity-50"></div>
          
          <div className="flex items-center justify-between mb-4 text-slate-600">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span className="font-medium text-sm">Heap Allocation (Static Fields)</span>
            </div>
            <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200">
              SLOTS: {ramSlots.length}/4
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-end space-y-3">
            <AnimatePresence>
              {ramSlots.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-medium"
                >
                  Memory unallocated. Select a type.
                </motion.div>
              )}
              {ramSlots.map((slot, i) => (
                <motion.div
                  key={i + "-" + slot.type}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white border-l-4 border-l-blue-500 rounded-r-lg shadow-sm p-3 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-700 font-mono text-xs px-2 py-1 rounded">
                      {slot.size}
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono">static {slot.type}</div>
                      <div className="font-mono font-bold text-slate-800 text-lg">
                        {slot.value}
                      </div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500 opacity-80" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Code Console */}
      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto">
        <div className="text-slate-500 mb-1">// Console Output</div>
        {ramSlots.map((slot, i) => (
          <div key={i}>
            <span className="text-blue-300">System.out.println</span>
            <span className="text-slate-300">(</span>
            "{slot.type}: " + {slot.value}
            <span className="text-slate-300">);</span>
            <span className="text-slate-500 ml-4">// Prints: {slot.type}: {slot.value}</span>
          </div>
        ))}
        {ramSlots.length === 0 && <div className="text-slate-600">Waiting for allocation...</div>}
      </div>
    </div>
  );
}
