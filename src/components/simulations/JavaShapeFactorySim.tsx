import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shapes, Hexagon, Circle, Square, TriangleAlert } from 'lucide-react';

type ShapeType = 'Abstract' | 'Circle' | 'Rectangle' | 'Triangle';

export function JavaShapeFactorySim() {
  const [activeShape, setActiveShape] = useState<ShapeType | null>(null);
  
  const [dim1, setDim1] = useState(5); // radius or width or base
  const [dim2, setDim2] = useState(5); // height for rect/tri
  
  const [errorShake, setErrorShake] = useState(false);

  const handleSelect = (shape: ShapeType) => {
    if (shape === 'Abstract') {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
      setActiveShape('Abstract');
      return;
    }
    setActiveShape(shape);
    if (shape === 'Circle') setDim1(50);
    if (shape === 'Rectangle') { setDim1(100); setDim2(60); }
    if (shape === 'Triangle') { setDim1(100); setDim2(80); }
  };

  const getArea = () => {
    if (activeShape === 'Circle') return (Math.PI * dim1 * dim1).toFixed(2);
    if (activeShape === 'Rectangle') return (dim1 * dim2).toFixed(2);
    if (activeShape === 'Triangle') return (0.5 * dim1 * dim2).toFixed(2);
    return '0.00';
  };

  const getPerimeter = () => {
    if (activeShape === 'Circle') return (2 * Math.PI * dim1).toFixed(2);
    if (activeShape === 'Rectangle') return (2 * (dim1 + dim2)).toFixed(2);
    if (activeShape === 'Triangle') {
      // Assuming isosceles for visual simplicity
      const side = Math.sqrt((dim1/2)**2 + dim2**2);
      return (dim1 + 2 * side).toFixed(2);
    }
    return '0.00';
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-orange-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-orange-50 border-b border-orange-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-orange-700">
          <Shapes className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Shape Factory</h3>
        </div>
        <div className="text-xs font-mono text-orange-600 bg-orange-100 px-2 py-1 rounded">
          OOP_ENGINE // ABSTRACT_CLASSES
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-[200px_1fr] gap-4 p-4 overflow-y-auto">
        
        {/* Class Selector Panel */}
        <div className="flex flex-col space-y-4 border-r border-slate-200 pr-4">
          
          <motion.button 
            animate={errorShake ? { x: [-5, 5, -5, 5, 0] } : {}}
            onClick={() => handleSelect('Abstract')}
            className={`flex flex-col items-center p-3 border-2 border-dashed rounded bg-slate-100 text-slate-400 ${activeShape === 'Abstract' ? 'border-red-400 bg-red-50 text-red-500' : 'hover:bg-slate-200 border-slate-300'}`}
          >
            <Hexagon className="w-8 h-8 mb-1" />
            <div className="text-xs font-bold font-mono">abstract class Shape</div>
          </motion.button>

          <div className="h-4 border-l-2 border-orange-300 mx-auto"></div>

          <button 
            onClick={() => handleSelect('Circle')}
            className={`flex flex-col items-center p-3 border-2 rounded transition-colors ${activeShape === 'Circle' ? 'border-orange-500 bg-orange-50 shadow-md text-orange-700' : 'border-slate-200 hover:border-orange-300 bg-white'}`}
          >
            <Circle className="w-6 h-6 mb-1" />
            <div className="text-xs font-bold font-mono">class Circle</div>
          </button>

          <button 
            onClick={() => handleSelect('Rectangle')}
            className={`flex flex-col items-center p-3 border-2 rounded transition-colors ${activeShape === 'Rectangle' ? 'border-orange-500 bg-orange-50 shadow-md text-orange-700' : 'border-slate-200 hover:border-orange-300 bg-white'}`}
          >
            <Square className="w-6 h-6 mb-1" />
            <div className="text-xs font-bold font-mono">class Rectangle</div>
          </button>

          <button 
            onClick={() => handleSelect('Triangle')}
            className={`flex flex-col items-center p-3 border-2 rounded transition-colors ${activeShape === 'Triangle' ? 'border-orange-500 bg-orange-50 shadow-md text-orange-700' : 'border-slate-200 hover:border-orange-300 bg-white'}`}
          >
            <TriangleAlert className="w-6 h-6 mb-1" />
            <div className="text-xs font-bold font-mono">class Triangle</div>
          </button>

        </div>

        {/* Studio Panel */}
        <div className="flex flex-col">
          
          <AnimatePresence mode="wait">
            {activeShape === 'Abstract' && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-red-100 text-red-600 p-4 rounded-full mb-4">
                  <Shapes className="w-12 h-12" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">Cannot Instantiate Abstract Class</h4>
                <p className="text-sm text-slate-600 max-w-sm">
                  The <code className="bg-slate-100 px-1 rounded">Shape</code> class is an abstract template. It contains abstract methods like <code className="bg-slate-100 px-1 rounded">area()</code> that have no body. You must instantiate a concrete subclass instead.
                </p>
              </motion.div>
            )}

            {activeShape && activeShape !== 'Abstract' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col">
                
                <div className="flex space-x-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">{activeShape === 'Circle' ? 'Radius' : activeShape === 'Rectangle' ? 'Width' : 'Base'}</label>
                    <input type="range" min="10" max="150" value={dim1} onChange={e => setDim1(Number(e.target.value))} className="accent-orange-500" />
                    <div className="text-center text-xs font-mono font-bold mt-1 text-orange-600">{dim1} px</div>
                  </div>
                  {activeShape !== 'Circle' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Height</label>
                      <input type="range" min="10" max="150" value={dim2} onChange={e => setDim2(Number(e.target.value))} className="accent-orange-500" />
                      <div className="text-center text-xs font-mono font-bold mt-1 text-orange-600">{dim2} px</div>
                    </div>
                  )}
                </div>

                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center relative overflow-hidden p-4">
                  {/* Grid background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  
                  {activeShape === 'Circle' && (
                    <motion.div className="bg-orange-400 rounded-full border-4 border-orange-500 shadow-lg flex items-center justify-center" style={{ width: dim1 * 2, height: dim1 * 2 }}>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="h-px bg-white/50 w-1/2 ml-auto"></div>
                    </motion.div>
                  )}
                  {activeShape === 'Rectangle' && (
                    <motion.div className="bg-orange-400 border-4 border-orange-500 shadow-lg" style={{ width: dim1, height: dim2 }}></motion.div>
                  )}
                  {activeShape === 'Triangle' && (
                    <motion.div 
                      className="border-b-orange-400"
                      style={{ 
                        width: 0, 
                        height: 0, 
                        borderLeft: `${dim1/2}px solid transparent`,
                        borderRight: `${dim1/2}px solid transparent`,
                        borderBottom: `${dim2}px solid #f97316`,
                        filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.1))'
                      }}
                    ></motion.div>
                  )}
                </div>

                <div className="flex justify-between mt-4 bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div>
                    <div className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">Method call: area()</div>
                    <div className="text-2xl font-mono font-bold text-slate-800">{getArea()} px²</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">Method call: perimeter()</div>
                    <div className="text-2xl font-mono font-bold text-slate-800">{getPerimeter()} px</div>
                  </div>
                </div>

              </motion.div>
            )}

            {!activeShape && (
              <div className="flex-1 flex items-center justify-center text-slate-400 font-medium">Select a class to instantiate</div>
            )}
          </AnimatePresence>

        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto">
        <div className="text-slate-500 mb-1">// JVM Execution Logs</div>
        {activeShape === 'Abstract' && (
          <div className="text-red-400 font-bold">
            error: Shape is abstract; cannot be instantiated<br/>
            <span className="text-slate-400 font-normal">Shape s = new Shape();</span>
          </div>
        )}
        {activeShape && activeShape !== 'Abstract' && (
          <div>
            <div><span className="text-orange-400">Shape</span> s = <span className="text-orange-400">new</span> {activeShape}(...);</div>
            <div className="mt-2">System.out.println(s.area()); <span className="text-slate-500">// {getArea()}</span></div>
            <div>System.out.println(s.perimeter()); <span className="text-slate-500">// {getPerimeter()}</span></div>
            <div className="text-slate-500 mt-2">// The abstract method was overridden and implemented by the concrete subclass.</div>
          </div>
        )}
      </div>
    </div>
  );
}
