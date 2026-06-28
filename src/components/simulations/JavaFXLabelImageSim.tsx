import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Image as ImageIcon, Type, Square, Layers, Play, RefreshCcw } from 'lucide-react';

export function JavaFXLabelImageSim() {
  const [step, setStep] = useState(0);
  // 0: idle
  // 1: Label
  // 2: ImageView
  // 3: VBox
  // 4: Scene
  // 5: Stage.show()

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const resetSim = () => setStep(0);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-emerald-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-emerald-50 border-b border-emerald-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-emerald-700">
          <Layers className="w-5 h-5" />
          <h3 className="font-semibold text-lg">JavaFX Scene Graph Hierarchy</h3>
        </div>
        <div className="text-xs font-mono text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
          JAVAFX // UI_COMPONENTS
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex justify-between items-center">
          <div className="text-sm text-slate-600 max-w-lg">
            JavaFX uses a hierarchical tree of nodes called a <strong>Scene Graph</strong>. 
            A <code className="bg-slate-200 px-1 rounded">Stage</code> contains a <code className="bg-slate-200 px-1 rounded">Scene</code>, which contains a layout node (like <code className="bg-slate-200 px-1 rounded">VBox</code>), which holds UI controls like <code className="bg-slate-200 px-1 rounded">Label</code> or <code className="bg-slate-200 px-1 rounded">ImageView</code>.
          </div>
          <div className="flex space-x-2">
            <button onClick={nextStep} disabled={step >= 5} className="px-4 py-2 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 disabled:opacity-50 flex items-center shadow-sm">
              <Play className="w-4 h-4 mr-2" /> Next Step
            </button>
            <button onClick={resetSim} className="px-3 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300">
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-8">
          
          {/* Tree Diagram */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center relative">
            <div className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-8">Scene Graph Tree</div>
            
            <div className="flex flex-col items-center space-y-4">
              
              {/* Stage */}
              <div className={`w-40 py-2 border-2 rounded text-center font-bold font-mono transition-colors ${step >= 5 ? 'bg-indigo-100 border-indigo-500 text-indigo-800' : 'bg-white border-slate-300 text-slate-400'}`}>
                Stage
              </div>

              {step >= 5 && <div className="h-6 w-0.5 bg-slate-300"></div>}

              {/* Scene */}
              <div className={`w-40 py-2 border-2 rounded text-center font-bold font-mono transition-colors ${step >= 4 ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-white border-slate-300 text-slate-400'}`}>
                Scene
              </div>

              {step >= 4 && <div className="h-6 w-0.5 bg-slate-300"></div>}

              {/* VBox */}
              <div className={`w-40 py-2 border-2 rounded text-center font-bold font-mono transition-colors ${step >= 3 ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-white border-slate-300 text-slate-400'}`}>
                VBox
              </div>

              {step >= 3 && (
                <div className="flex justify-center w-64 relative h-6">
                  <div className="absolute top-0 w-32 border-t-2 border-slate-300"></div>
                  <div className="absolute top-0 left-16 h-6 w-0.5 bg-slate-300"></div>
                  <div className="absolute top-0 right-16 h-6 w-0.5 bg-slate-300"></div>
                </div>
              )}

              <div className="flex space-x-8">
                {/* Label */}
                <div className={`w-28 py-2 border-2 rounded flex flex-col items-center justify-center font-bold font-mono text-xs transition-colors ${step >= 1 ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-white border-slate-300 text-slate-400'}`}>
                  <Type className="w-4 h-4 mb-1" /> Label
                </div>

                {/* ImageView */}
                <div className={`w-28 py-2 border-2 rounded flex flex-col items-center justify-center font-bold font-mono text-xs transition-colors ${step >= 2 ? 'bg-purple-100 border-purple-500 text-purple-800' : 'bg-white border-slate-300 text-slate-400'}`}>
                  <ImageIcon className="w-4 h-4 mb-1" /> ImageView
                </div>
              </div>

            </div>
          </div>

          {/* Visual Output */}
          <div className="bg-slate-800 border-4 border-slate-700 rounded-xl flex items-center justify-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 inset-x-0 h-6 bg-slate-700 flex items-center px-2 space-x-1 border-b border-slate-900">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="text-[10px] text-slate-400 font-mono ml-4">My JavaFX App</div>
            </div>

            {/* The Window Content */}
            <div className="mt-6 w-full h-full flex flex-col items-center justify-center p-8">
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full bg-white rounded shadow-inner p-4 flex flex-col items-center"
                  >
                    {/* Scene */}
                    <div className={`w-full h-full border-2 border-dashed flex flex-col items-center p-4 transition-colors ${step >= 4 ? 'border-blue-300 bg-blue-50/30' : 'border-transparent'}`}>
                      {/* VBox */}
                      <div className={`flex flex-col space-y-4 p-4 rounded transition-colors ${step >= 3 ? 'bg-emerald-50 border border-emerald-200' : 'bg-transparent'}`}>
                        {step >= 1 && <div className="text-lg font-bold text-slate-800 flex items-center"><Type className="w-4 h-4 mr-2 text-slate-400"/> Welcome to JavaFX!</div>}
                        {step >= 2 && (
                          <div className="w-48 h-32 bg-slate-200 rounded flex flex-col items-center justify-center border border-slate-300 text-slate-400">
                            <ImageIcon className="w-8 h-8 mb-2" />
                            <span className="text-xs">logo.webp</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {step < 5 && (
                <div className="text-slate-500 font-mono text-sm flex items-center">
                  <Square className="w-4 h-4 mr-2" /> Waiting for stage.show()...
                </div>
              )}
            </div>

          </div>

        </div>

        <div className="h-32 bg-slate-900 rounded border border-slate-800 p-4 font-mono text-xs overflow-y-auto">
          <div className="text-slate-500 mb-2">// Code Construction Log</div>
          {step >= 1 && <div><span className="text-blue-400">Label</span> label = <span className="text-purple-400">new</span> Label(<span className="text-green-300">"Welcome to JavaFX!"</span>);</div>}
          {step >= 2 && <div><span className="text-blue-400">ImageView</span> imageView = <span className="text-purple-400">new</span> ImageView(<span className="text-green-300">"logo.webp"</span>);</div>}
          {step >= 3 && <div><span className="text-blue-400">VBox</span> vbox = <span className="text-purple-400">new</span> VBox(label, imageView); <span className="text-slate-500">// Stack vertically</span></div>}
          {step >= 4 && <div><span className="text-blue-400">Scene</span> scene = <span className="text-purple-400">new</span> Scene(vbox, <span className="text-orange-400">300</span>, <span className="text-orange-400">200</span>);</div>}
          {step >= 5 && <div className="mt-2"><span className="text-white">stage.setScene(scene);</span><br/><span className="text-white font-bold">stage.show();</span> <span className="text-emerald-400">// Renders GUI window!</span></div>}
        </div>
      </div>
    </div>
  );
}
