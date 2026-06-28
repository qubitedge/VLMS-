import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, MousePointerClick, Zap, RefreshCcw } from 'lucide-react';

export function JavaFXTipCalcSim() {
  const [bill, setBill] = useState('100');
  const [tipPercent, setTipPercent] = useState(15);
  const [tipAmt, setTipAmt] = useState<string | null>(null);
  const [totalAmt, setTotalAmt] = useState<string | null>(null);
  const [isFiring, setIsFiring] = useState(false);

  const calculate = () => {
    setIsFiring(true);
    const b = parseFloat(bill);
    
    setTimeout(() => {
      if (isNaN(b)) {
        setTipAmt('Error');
        setTotalAmt('Error');
      } else {
        const t = b * (tipPercent / 100);
        setTipAmt(t.toFixed(2));
        setTotalAmt((b + t).toFixed(2));
      }
      setTimeout(() => setIsFiring(false), 800);
    }, 500);
  };

  const reset = () => {
    setBill('100');
    setTipPercent(15);
    setTipAmt(null);
    setTotalAmt(null);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-emerald-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-emerald-50 border-b border-emerald-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-emerald-700">
          <Calculator className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Event-Driven UI (Tip Calculator)</h3>
        </div>
        <div className="text-xs font-mono text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
          JAVAFX // EVENT_HANDLING
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-8 overflow-y-auto">
        
        {/* Mock JavaFX App Window */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="bg-slate-800 w-full max-w-sm rounded-xl overflow-hidden shadow-2xl border-4 border-slate-700 relative">
            <div className="h-6 bg-slate-700 flex items-center px-2 space-x-1 border-b border-slate-900">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="text-[10px] text-slate-400 font-mono ml-4">Tip Calculator</div>
            </div>

            <div className="bg-slate-50 p-6 flex flex-col space-y-4">
              
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-slate-600">Bill Amount ($)</label>
                <input 
                  type="number" 
                  value={bill}
                  onChange={e => setBill(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex justify-between">
                  <label className="text-xs font-bold text-slate-600">Tip Percentage</label>
                  <span className="text-xs font-bold text-emerald-600">{tipPercent}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="30" step="1"
                  value={tipPercent}
                  onChange={e => setTipPercent(parseInt(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <button 
                onClick={calculate}
                className="w-full py-2 bg-emerald-600 text-white font-bold rounded shadow-md hover:bg-emerald-700 active:scale-95 transition-transform flex items-center justify-center relative overflow-hidden"
              >
                <Calculator className="w-4 h-4 mr-2" /> Calculate Tip
                {/* Click ripple */}
                <AnimatePresence>
                  {isFiring && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0.5 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute bg-white rounded-full w-20 h-20 pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </button>

              <div className="bg-white border-2 border-slate-200 rounded p-4 flex flex-col space-y-2 mt-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-slate-500 text-sm">Tip:</span>
                  <span className="font-mono font-bold text-emerald-600 text-lg">${tipAmt || '0.00'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-800 font-bold">Total:</span>
                  <span className="font-mono font-bold text-slate-800 text-xl">${totalAmt || '0.00'}</span>
                </div>
              </div>

            </div>
          </div>

          <button onClick={reset} className="mt-6 flex items-center text-slate-500 hover:text-slate-700 text-sm">
            <RefreshCcw className="w-4 h-4 mr-1" /> Reset Fields
          </button>
        </div>

        {/* Code Visualizer */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-4">
          <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <strong>Event Handlers</strong> connect UI interactions (like button clicks) to Java code. 
            We use a lambda expression <code className="bg-slate-200 px-1 rounded">e -{'>'} {'{ ... }'}</code> to define what happens when the button fires an <code className="bg-slate-200 px-1 rounded">ActionEvent</code>.
          </div>

          <div className="bg-slate-900 flex-1 rounded-lg border border-slate-700 p-6 font-mono text-sm relative overflow-hidden">
            
            {/* The Event Binding line */}
            <div className="flex items-center space-x-2 text-slate-400 mb-2">
              <MousePointerClick className="w-4 h-4 text-emerald-500" />
              <span>Button Click Event Listener:</span>
            </div>

            <div className="bg-slate-800 p-4 rounded border border-slate-700 relative z-10">
              <div className="text-white">calcBtn.<span className="text-blue-400">setOnAction</span>(e -{'>'} {'{\n'}</div>
              
              <div className="ml-4 relative">
                {/* Execution highlight overlay */}
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: isFiring ? 1 : 0, 
                    height: isFiring ? '100%' : '100%' 
                  }}
                  className="absolute -left-2 -right-2 inset-y-0 bg-emerald-900/40 border-l-4 border-emerald-500 rounded-r -z-10"
                />

                <div className="text-slate-300">
                  <span className="text-blue-400">double</span> b = Double.parseDouble(billInput.getText());<br/>
                  <span className="text-blue-400">double</span> t = b * ({tipPercent / 100});<br/>
                  <br/>
                  tipLabel.setText(String.format(<span className="text-green-300">"%.2f"</span>, t));<br/>
                  totalLabel.setText(String.format(<span className="text-green-300">"%.2f"</span>, b + t));
                </div>
              </div>
              <div className="text-white">{'});'}</div>
            </div>

            {/* Lightning bolt indicator */}
            <AnimatePresence>
              {isFiring && (
                <motion.div 
                  initial={{ opacity: 0, scale: 2, y: -20, x: -20 }}
                  animate={{ opacity: [0, 1, 0], scale: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-1/2 left-4 text-yellow-400 z-20"
                >
                  <Zap className="w-12 h-12 fill-current" />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
}
