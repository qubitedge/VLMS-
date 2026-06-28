import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, AlertCircle, CheckCircle2 } from 'lucide-react';

export function JavaParabolaPlotterSim() {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-3);
  const [c, setC] = useState<number>(2);

  const [discriminant, setDiscriminant] = useState(0);
  const [root1, setRoot1] = useState<string>('');
  const [root2, setRoot2] = useState<string>('');
  const [status, setStatus] = useState({ color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', text: '' });

  useEffect(() => {
    const d = b * b - 4 * a * c;
    setDiscriminant(d);

    if (a === 0) {
      setStatus({ color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', text: 'Not a quadratic equation (a = 0)' });
      setRoot1('undefined');
      setRoot2('undefined');
      return;
    }

    if (d > 0) {
      const r1 = (-b + Math.sqrt(d)) / (2 * a);
      const r2 = (-b - Math.sqrt(d)) / (2 * a);
      setRoot1(r1.toFixed(2));
      setRoot2(r2.toFixed(2));
      setStatus({ color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200', text: 'Real and distinct roots' });
    } else if (d === 0) {
      const r = -b / (2 * a);
      setRoot1(r.toFixed(2));
      setRoot2(r.toFixed(2));
      setStatus({ color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'Real and equal roots' });
    } else {
      const real = (-b / (2 * a)).toFixed(2);
      const img = (Math.sqrt(-d) / (2 * a)).toFixed(2);
      setRoot1(`${real} + ${img}i`);
      setRoot2(`${real} - ${img}i`);
      setStatus({ color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', text: 'Complex/Imaginary roots' });
    }
  }, [a, b, c]);

  // Generate SVG points for parabola
  const generatePoints = () => {
    let points = "";
    for (let x = -10; x <= 10; x += 0.5) {
      const y = a * x * x + b * x + c;
      // Map to SVG coordinates (200x200 grid, origin at 100,100)
      const svgX = x * 10 + 100;
      const svgY = 200 - (y * 10 + 100);
      points += `${svgX},${svgY} `;
    }
    return points;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-blue-50 border-b border-blue-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-blue-700">
          <Calculator className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Parabola Plotter</h3>
        </div>
        <div className="text-xs font-mono text-blue-600 bg-blue-100 px-2 py-1 rounded">
          MATH_ENGINE // QUADRATIC
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-4 p-4 min-h-0 overflow-y-auto">
        
        {/* Input Panel */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-4">
            <div className="text-sm font-medium text-slate-600 mb-2">Equation Coefficients (ax² + bx + c = 0)</div>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 font-mono mb-1">a =</label>
                <input 
                  type="number" 
                  value={a} 
                  onChange={(e) => setA(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 font-mono text-blue-700 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 font-mono mb-1">b =</label>
                <input 
                  type="number" 
                  value={b} 
                  onChange={(e) => setB(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 font-mono text-blue-700 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 font-mono mb-1">c =</label>
                <input 
                  type="number" 
                  value={c} 
                  onChange={(e) => setC(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 font-mono text-blue-700 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border ${status.bg} ${status.border}`}>
            <div className={`text-sm font-bold flex items-center space-x-2 ${status.color}`}>
              {discriminant >= 0 ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{status.text}</span>
            </div>
            
            <div className="mt-3 space-y-2 font-mono text-xs">
              <div className="text-slate-600">
                <span className="text-slate-400">Discriminant D =</span> {b}² - 4({a})({c}) = <span className="font-bold">{discriminant}</span>
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Root 1 =</span> {root1}
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Root 2 =</span> {root2}
              </div>
            </div>
          </div>
        </div>

        {/* Graph Panel */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 flex flex-col items-center justify-center p-4 relative">
          <div className="absolute top-2 left-2 text-xs font-mono text-slate-400">LIVE GRAPH</div>
          
          <svg viewBox="0 0 200 200" className="w-full max-w-[250px] h-auto border border-slate-200 bg-white rounded shadow-sm">
            {/* Grid lines */}
            <line x1="100" y1="0" x2="100" y2="200" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="0" y1="100" x2="200" y2="100" stroke="#e2e8f0" strokeWidth="1" />
            
            {/* Parabola */}
            {a !== 0 && (
              <polyline
                points={generatePoints()}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Roots (only if real) */}
            {discriminant >= 0 && a !== 0 && (
              <>
                <circle cx={parseFloat(root1) * 10 + 100} cy={100} r="4" fill="#10b981" />
                <circle cx={parseFloat(root2) * 10 + 100} cy={100} r="4" fill="#10b981" />
              </>
            )}
          </svg>
        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto">
        <div className="text-slate-500 mb-1">// Java Code Execution</div>
        <div><span className="text-blue-300">double</span> d = {b} * {b} - 4 * {a} * {c};</div>
        {discriminant > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div><span className="text-purple-400">if</span> (d &gt; 0) {'{'}</div>
            <div className="ml-4"><span className="text-blue-300">double</span> r1 = (-({b}) + Math.sqrt(d)) / (2 * {a});</div>
            <div className="ml-4">System.out.println("Root 1 = " + r1); <span className="text-slate-500">// {root1}</span></div>
            <div>{'}'}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
