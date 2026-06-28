import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowDown } from 'lucide-react';

export function JavaInheritanceChainSim() {
  const [selectedClass, setSelectedClass] = useState<'A' | 'B' | 'C' | null>('C');

  const methodsA = [{ name: 'methodA()', origin: 'A', inherited: false }];
  const methodsB = [...methodsA.map(m => ({ ...m, inherited: true })), { name: 'methodB()', origin: 'B', inherited: false }];
  const methodsC = [...methodsB.map(m => ({ ...m, inherited: true })), { name: 'methodC()', origin: 'C', inherited: false }];

  const currentMethods = selectedClass === 'A' ? methodsA : selectedClass === 'B' ? methodsB : selectedClass === 'C' ? methodsC : [];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-orange-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-orange-50 border-b border-orange-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-orange-700">
          <Layers className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Inheritance Chain</h3>
        </div>
        <div className="text-xs font-mono text-orange-600 bg-orange-100 px-2 py-1 rounded">
          OOP_ENGINE // MULTILEVEL_INHERITANCE
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-8 p-6 overflow-y-auto">
        
        {/* Class Hierarchy Tree */}
        <div className="flex flex-col items-center space-y-2 py-4">
          
          <button 
            onClick={() => setSelectedClass('A')}
            className={`w-64 border-2 rounded-lg p-3 transition-all ${selectedClass === 'A' ? 'bg-orange-100 border-orange-500 shadow-md scale-105' : 'bg-slate-50 border-slate-300 hover:border-orange-300'}`}
          >
            <div className="font-bold text-center mb-1">Class A (Grandparent)</div>
            <div className="font-mono text-xs text-slate-600 text-center">void methodA()</div>
          </button>

          <ArrowDown className="w-6 h-6 text-orange-400" />

          <button 
            onClick={() => setSelectedClass('B')}
            className={`w-64 border-2 rounded-lg p-3 transition-all ${selectedClass === 'B' ? 'bg-orange-100 border-orange-500 shadow-md scale-105' : 'bg-slate-50 border-slate-300 hover:border-orange-300'}`}
          >
            <div className="font-bold text-center mb-1">Class B extends A</div>
            <div className="font-mono text-xs text-slate-600 text-center">void methodB()</div>
          </button>

          <ArrowDown className="w-6 h-6 text-orange-400" />

          <button 
            onClick={() => setSelectedClass('C')}
            className={`w-64 border-2 rounded-lg p-3 transition-all ${selectedClass === 'C' ? 'bg-orange-100 border-orange-500 shadow-md scale-105' : 'bg-slate-50 border-slate-300 hover:border-orange-300'}`}
          >
            <div className="font-bold text-center mb-1">Class C extends B</div>
            <div className="font-mono text-xs text-slate-600 text-center">void methodC()</div>
          </button>

        </div>

        {/* Visibility Panel */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 flex flex-col">
          <h4 className="font-bold text-slate-700 mb-4 text-center">
            What does <span className="text-orange-600 font-mono">Class {selectedClass || "?"}</span> see?
          </h4>

          {selectedClass ? (
            <div className="flex-1 space-y-3">
              {currentMethods.map((m, idx) => (
                <motion.div 
                  key={`${selectedClass}-${m.name}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-3 rounded border font-mono flex items-center justify-between ${m.inherited ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-white border-slate-300 text-slate-800 font-bold'}`}
                >
                  <span>{m.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${m.inherited ? 'bg-orange-200 text-orange-700' : 'bg-slate-200 text-slate-600'}`}>
                    {m.inherited ? `Inherited from ${m.origin}` : 'Own Method'}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-sm">
              Select a class from the hierarchy tree.
            </div>
          )}

          <div className="mt-6 p-4 bg-orange-100 border border-orange-300 rounded text-sm text-orange-800">
            <strong>Transitive Inheritance:</strong> Because C extends B, and B extends A, Class C implicitly inherits all members of A via B.
          </div>
        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto">
        <div className="text-slate-500 mb-1">// Object Instantiation</div>
        {selectedClass && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <div><span className="text-orange-400">{selectedClass}</span> obj = <span className="text-orange-400">new</span> {selectedClass}();</div>
            {currentMethods.map(m => (
              <div key={m.name}>obj.{m.name}; <span className="text-slate-500">// OK</span></div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
