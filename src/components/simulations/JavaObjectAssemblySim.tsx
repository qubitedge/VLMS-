import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Settings, Play } from 'lucide-react';

export function JavaObjectAssemblySim() {
  const [model, setModel] = useState('Sedan');
  const [color, setColor] = useState('Blue');
  const [year, setYear] = useState('2024');

  const [assemblyStep, setAssemblyStep] = useState(0); // 0: Idle, 1: Chassis, 2: Paint, 3: Engine/Year, 4: Done
  const [assembledCar, setAssembledCar] = useState<any>(null);

  const startAssembly = () => {
    if (!model || !color || !year) return;
    setAssemblyStep(1);
    setAssembledCar(null);

    setTimeout(() => setAssemblyStep(2), 1000);
    setTimeout(() => setAssemblyStep(3), 2000);
    setTimeout(() => {
      setAssemblyStep(4);
      setAssembledCar({ model, color, year });
      setTimeout(() => setAssemblyStep(0), 1500); // Reset conveyor
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-purple-50 border-b border-purple-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-purple-700">
          <Wrench className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Object Assembly Line</h3>
        </div>
        <div className="text-xs font-mono text-purple-600 bg-purple-100 px-2 py-1 rounded">
          OOP_ENGINE // CONSTRUCTOR
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-6">
        
        {/* Input Form */}
        <div className="flex items-end space-x-4 bg-slate-50 border border-slate-200 p-4 rounded-lg">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 mb-1">Model (String)</label>
            <input type="text" value={model} onChange={e => setModel(e.target.value)} disabled={assemblyStep > 0} className="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-purple-500 disabled:bg-slate-100" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 mb-1">Color (String)</label>
            <input type="text" value={color} onChange={e => setColor(e.target.value)} disabled={assemblyStep > 0} className="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-purple-500 disabled:bg-slate-100" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 mb-1">Year (int)</label>
            <input type="number" value={year} onChange={e => setYear(e.target.value)} disabled={assemblyStep > 0} className="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-purple-500 disabled:bg-slate-100" />
          </div>
          <button 
            onClick={startAssembly}
            disabled={assemblyStep > 0 || !model || !color || !year}
            className="px-6 py-1.5 bg-purple-600 text-white font-medium rounded hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center h-[34px]"
          >
            <Play className="w-4 h-4 mr-2" /> Build
          </button>
        </div>

        {/* Assembly Line */}
        <div className="flex-1 relative bg-slate-100 rounded-lg border-2 border-slate-300 overflow-hidden flex flex-col justify-end p-8">
          
          {/* Conveyor Belt */}
          <div className="absolute bottom-10 left-0 right-0 h-4 bg-slate-800 flex overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i} 
                animate={assemblyStep > 0 && assemblyStep < 4 ? { x: [0, 40] } : { x: 0 }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                className="w-4 h-full border-r-2 border-slate-900 bg-slate-700 shrink-0"
              />
            ))}
          </div>

          {/* Constructor Stations */}
          <div className="absolute bottom-14 left-0 right-0 flex justify-around px-20">
            <div className={`flex flex-col items-center transition-opacity ${assemblyStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
              <Settings className={`w-8 h-8 text-purple-600 ${assemblyStep === 1 ? 'animate-spin' : ''}`} />
              <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase">this.model</div>
            </div>
            <div className={`flex flex-col items-center transition-opacity ${assemblyStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
              <Settings className={`w-8 h-8 text-purple-600 ${assemblyStep === 2 ? 'animate-spin' : ''}`} />
              <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase">this.color</div>
            </div>
            <div className={`flex flex-col items-center transition-opacity ${assemblyStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
              <Settings className={`w-8 h-8 text-purple-600 ${assemblyStep === 3 ? 'animate-spin' : ''}`} />
              <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase">this.year</div>
            </div>
          </div>

          {/* The Object being built */}
          <AnimatePresence>
            {assemblyStep > 0 && assemblyStep < 4 && (
              <motion.div
                initial={{ x: -100, y: 0 }}
                animate={{ x: assemblyStep * 180 - 50 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="absolute bottom-14 w-32 bg-white border-2 border-purple-400 rounded-lg shadow-lg p-3 z-10"
              >
                <div className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1 py-0.5 rounded text-center mb-2">Car Object</div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-400">model</span>
                    <span className="font-bold text-slate-700">{assemblyStep >= 1 ? `"${model}"` : 'null'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-400">color</span>
                    <span className="font-bold text-slate-700">{assemblyStep >= 2 ? `"${color}"` : 'null'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">year</span>
                    <span className="font-bold text-purple-600">{assemblyStep >= 3 ? year : '0'}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Output Garage */}
          <div className="absolute right-4 top-4 flex flex-col space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Instantiated Objects</div>
            <AnimatePresence>
              {assembledCar && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className="bg-green-50 border-2 border-green-400 rounded-lg p-3 w-40 shadow-sm"
                >
                  <div className="text-[10px] bg-green-200 text-green-800 font-bold px-1 py-0.5 rounded text-center mb-2">Ready!</div>
                  <div className="font-mono text-xs text-slate-700 space-y-1">
                    <div>model: "{assembledCar.model}"</div>
                    <div>color: "{assembledCar.color}"</div>
                    <div>year: {assembledCar.year}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto">
        <div className="text-slate-500 mb-1">// Constructor Execution Log</div>
        <div><span className="text-purple-400">public</span> Car(String m, String c, <span className="text-purple-400">int</span> y) {'{'}</div>
        <div className="ml-4 text-slate-500">System.out.println("Building car...");</div>
        <div className={`ml-4 ${assemblyStep >= 1 ? 'text-green-300 font-bold' : 'text-slate-400'}`}>
          <span className="text-purple-300">this</span>.model = m; <span className="text-slate-500">// {assemblyStep >= 1 ? `"${model}"` : 'pending'}</span>
        </div>
        <div className={`ml-4 ${assemblyStep >= 2 ? 'text-green-300 font-bold' : 'text-slate-400'}`}>
          <span className="text-purple-300">this</span>.color = c; <span className="text-slate-500">// {assemblyStep >= 2 ? `"${color}"` : 'pending'}</span>
        </div>
        <div className={`ml-4 ${assemblyStep >= 3 ? 'text-green-300 font-bold' : 'text-slate-400'}`}>
          <span className="text-purple-300">this</span>.year = y;  <span className="text-slate-500">// {assemblyStep >= 3 ? year : 'pending'}</span>
        </div>
        <div>{'}'}</div>
      </div>
    </div>
  );
}
