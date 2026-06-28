import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, ArrowRightCircle } from 'lucide-react';

type InputType = 'int' | 'double' | 'String';

export function JavaMethodDispatcherSim() {
  const [selectedType, setSelectedType] = useState<InputType>('int');
  const [val1, setVal1] = useState('5');
  const [val2, setVal2] = useState('10');
  
  const [routingType, setRoutingType] = useState<InputType | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleDispatch = () => {
    setRoutingType(selectedType);
    setTimeout(() => {
      if (selectedType === 'int') {
        setResult((parseInt(val1 || '0') + parseInt(val2 || '0')).toString());
      } else if (selectedType === 'double') {
        setResult((parseFloat(val1 || '0') + parseFloat(val2 || '0')).toFixed(2));
      } else {
        setResult(val1 + val2);
      }
    }, 800); // Wait for animation to "route"
  };

  const handleTypeChange = (t: InputType) => {
    setSelectedType(t);
    setRoutingType(null);
    setResult(null);
    if (t === 'int') { setVal1('5'); setVal2('10'); }
    if (t === 'double') { setVal1('5.5'); setVal2('10.2'); }
    if (t === 'String') { setVal1('Hello'); setVal2('World'); }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-purple-50 border-b border-purple-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-purple-700">
          <Network className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Method Dispatcher</h3>
        </div>
        <div className="text-xs font-mono text-purple-600 bg-purple-100 px-2 py-1 rounded">
          OOP_ENGINE // COMPILE_TIME_POLYMORPHISM
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-8 p-6 min-h-0 overflow-y-auto">
        
        {/* Call Panel */}
        <div className="flex flex-col space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <h4 className="font-bold text-slate-700 mb-4 text-sm">1. Construct Method Call</h4>
            
            <div className="flex space-x-4 mb-4">
              <button onClick={() => handleTypeChange('int')} className={`flex-1 py-2 rounded text-sm font-medium transition-colors border ${selectedType === 'int' ? 'bg-purple-100 border-purple-400 text-purple-800' : 'bg-white border-slate-200 text-slate-600'}`}>Integers</button>
              <button onClick={() => handleTypeChange('double')} className={`flex-1 py-2 rounded text-sm font-medium transition-colors border ${selectedType === 'double' ? 'bg-purple-100 border-purple-400 text-purple-800' : 'bg-white border-slate-200 text-slate-600'}`}>Doubles</button>
              <button onClick={() => handleTypeChange('String')} className={`flex-1 py-2 rounded text-sm font-medium transition-colors border ${selectedType === 'String' ? 'bg-purple-100 border-purple-400 text-purple-800' : 'bg-white border-slate-200 text-slate-600'}`}>Strings</button>
            </div>

            <div className="flex items-center space-x-2 bg-white p-3 border border-slate-200 rounded font-mono text-lg">
              <span className="text-purple-600 font-bold">add</span>
              <span className="text-slate-400">(</span>
              <input 
                type={selectedType === 'String' ? 'text' : 'number'}
                value={val1}
                onChange={e => setVal1(e.target.value)}
                className="w-20 text-center border-b-2 border-purple-300 focus:outline-none focus:border-purple-600"
              />
              <span className="text-slate-400">,</span>
              <input 
                type={selectedType === 'String' ? 'text' : 'number'}
                value={val2}
                onChange={e => setVal2(e.target.value)}
                className="w-20 text-center border-b-2 border-purple-300 focus:outline-none focus:border-purple-600"
              />
              <span className="text-slate-400">)</span>
            </div>

            <button 
              onClick={handleDispatch}
              className="mt-6 w-full py-3 bg-purple-600 text-white rounded font-bold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Dispatch Call</span>
              <ArrowRightCircle className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                <span className="font-bold text-green-800 text-sm">Return Value:</span>
                <span className="font-mono text-xl font-bold text-green-600">{result}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dispatch Router Panel */}
        <div className="relative flex flex-col justify-center space-y-4">
          <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-4 h-full">
            {/* SVG Lines routing */}
            <svg className="w-full h-full overflow-visible pointer-events-none">
              {routingType && (
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  d={`M -20 ${routingType === 'int' ? '50' : routingType === 'double' ? '150' : '250'} C 10 ${routingType === 'int' ? '50' : routingType === 'double' ? '150' : '250'}, 10 ${routingType === 'int' ? '50' : routingType === 'double' ? '150' : '250'}, 30 ${routingType === 'int' ? '50' : routingType === 'double' ? '150' : '250'}`}
                  fill="none" stroke="#9333ea" strokeWidth="4" strokeLinecap="round"
                />
              )}
            </svg>
          </div>

          {(['int', 'double', 'String'] as InputType[]).map((t, idx) => {
            const isActive = routingType === t;
            return (
              <div 
                key={t}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${isActive ? 'bg-purple-50 border-purple-500 scale-105 shadow-md' : 'bg-slate-50 border-slate-200 opacity-60'}`}
              >
                <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Method Definition {idx + 1}</div>
                <div className="font-mono text-sm">
                  <span className="text-purple-600">public</span> {t === 'String' ? 'String' : t} <span className="text-purple-600 font-bold">add</span>({t} a, {t} b) {'{\n'}
                  <div className="ml-4 text-slate-700">
                    <span className="text-purple-600">return</span> a + b;
                  </div>
                  {'}'}
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-24 overflow-y-auto">
        <div className="text-slate-500 mb-1">// Compiler Log</div>
        {routingType ? (
          <div>
            Compiler matches signature <span className="text-purple-400">add({routingType}, {routingType})</span>. Binding at compile time (Static Polymorphism).
          </div>
        ) : (
          <div className="text-slate-600">Awaiting method call...</div>
        )}
      </div>
    </div>
  );
}
