import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Terminal, Lightbulb, ChevronRight, CheckCircle2 } from "lucide-react";

type CampaignProps = {
  expId: string;
};

export function PythonInterpreterCampaign({ expId }: CampaignProps) {
  const [currentActivity, setCurrentActivity] = useState(0);

  // Activity 1 State
  const [act1Input, setAct1Input] = useState("");

  // Activity 2 State
  const [act2Option, setAct2Option] = useState<string | null>(null);
  const act2Choices = ["space", "-", "_", "*"];

  // Activity 3 State
  const [act3Option, setAct3Option] = useState<string | null>(null);
  const act3Choices = [
    { label: "\"Python\"", value: "Python" },
    { label: "100", value: "100" },
    { label: "True", value: "True" }
  ];

  const handleNext = () => {
    if (currentActivity < 3) {
      setCurrentActivity(prev => prev + 1);
    }
  };

  // Content for each activity
  const activities = [
    {
      title: "1. Your First Program",
      instruction: "Type anything inside the blank.",
      hint: "The print() function sends whatever is inside the parentheses to the standard output screen.",
      isComplete: act1Input.length > 0
    },
    {
      title: "2. The Separator",
      instruction: "What should be placed between Hello and World?",
      hint: "When you pass multiple arguments to print(), they are automatically separated. The default is a space, but you can change it with the 'sep' parameter.",
      isComplete: act2Option !== null
    },
    {
      title: "3. Printing Different Data Types",
      instruction: "Choose what should be printed.",
      hint: "print() works with strings (text), integers (numbers), and booleans (True/False). It converts them all to text automatically.",
      isComplete: act3Option !== null
    },
    {
      title: "Simulation Complete",
      instruction: "You have mastered the basics of the print() function!",
      hint: "You learned how to output text, format separators, and print different data types.",
      isComplete: true
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans select-none overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-100/50 via-purple-100/30 to-transparent pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 z-10 shrink-0">
        <div>
          <h1 className="font-extrabold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {activities[currentActivity].title}
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Interactive Python Learning Lab</p>
        </div>
        
        {/* Progress Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((idx) => (
            <div 
              key={idx} 
              className={`h-2.5 rounded-full transition-all duration-500 ${
                idx === currentActivity 
                  ? "w-8 bg-blue-500" 
                  : idx < currentActivity 
                    ? "w-3 bg-purple-400" 
                    : "w-3 bg-slate-200"
              }`} 
            />
          ))}
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 min-h-0 px-8 pb-8 overflow-y-auto z-10">
        
        <AnimatePresence mode="wait">
          {currentActivity < 3 ? (
            <motion.div 
              key={currentActivity}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto h-full"
            >
              
              {/* Left Column: Interactive Code Editor */}
              <div className="flex flex-col gap-6">
                
                {/* Editor Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                  <div className="px-5 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center gap-2">
                    <Code2 className="size-4 text-blue-500" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interactive Code Editor</span>
                  </div>
                  
                  <div className="p-8 font-mono text-lg text-slate-700 bg-white min-h-[200px] flex flex-col justify-center">
                    
                    {currentActivity === 0 && (
                      <div className="flex items-center flex-wrap gap-1">
                        <span className="text-purple-600 font-semibold">print</span>
                        <span className="text-slate-400">(</span>
                        <span className="text-blue-600">"</span>
                        <input 
                          type="text" 
                          placeholder="_____"
                          value={act1Input}
                          onChange={(e) => setAct1Input(e.target.value)}
                          className="bg-blue-50/50 border-b-2 border-blue-300 text-blue-700 outline-none px-2 py-1 text-center w-40 focus:border-blue-500 transition-colors placeholder:text-blue-300"
                          autoFocus
                        />
                        <span className="text-blue-600">"</span>
                        <span className="text-slate-400">)</span>
                      </div>
                    )}

                    {currentActivity === 1 && (
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center flex-wrap gap-1">
                          <span className="text-purple-600 font-semibold">print</span>
                          <span className="text-slate-400">(</span>
                          <span className="text-blue-600">"Hello</span>
                          <span className={`px-2 py-1 rounded font-bold border ${act2Option ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'}`}>
                            {act2Option === "space" ? " " : act2Option || "_____"}
                          </span>
                          <span className="text-blue-600">World"</span>
                          <span className="text-slate-400">)</span>
                        </div>
                        
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 font-sans">
                          <p className="text-sm font-semibold text-slate-700 mb-3">{activities[1].instruction}</p>
                          <div className="flex flex-wrap gap-3">
                            {act2Choices.map(opt => (
                              <button
                                key={opt}
                                onClick={() => setAct2Option(opt)}
                                className={`px-4 py-2 rounded-lg font-mono text-sm border transition-all ${
                                  act2Option === opt 
                                    ? "bg-blue-50 border-blue-400 text-blue-700 shadow-[0_0_0_2px_rgba(59,130,246,0.2)]" 
                                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentActivity === 2 && (
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center flex-wrap gap-1">
                          <span className="text-purple-600 font-semibold">print</span>
                          <span className="text-slate-400">(</span>
                          <span className={`px-2 py-1 rounded font-bold border ${act3Option ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'}`}>
                            {act3Option || "_____"}
                          </span>
                          <span className="text-slate-400">)</span>
                        </div>
                        
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 font-sans">
                          <p className="text-sm font-semibold text-slate-700 mb-3">{activities[2].instruction}</p>
                          <div className="flex flex-wrap gap-3">
                            {act3Choices.map(opt => (
                              <button
                                key={opt.label}
                                onClick={() => setAct3Option(opt.label)}
                                className={`px-4 py-2 rounded-lg font-mono text-sm border transition-all ${
                                  act3Option === opt.label 
                                    ? "bg-blue-50 border-blue-400 text-blue-700 shadow-[0_0_0_2px_rgba(59,130,246,0.2)]" 
                                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50"
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Hint/Explanation Card */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Lightbulb className="size-16 text-blue-600" />
                  </div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-blue-800 mb-2 uppercase tracking-wider">
                    <Lightbulb className="size-4" /> Academic Insight
                  </h3>
                  <p className="text-blue-900/80 text-sm leading-relaxed">
                    {activities[currentActivity].hint}
                  </p>
                </div>

              </div>

              {/* Right Column: Live Output Console */}
              <div className="flex flex-col gap-6">
                
                {/* Console Card */}
                <div className="bg-slate-800 rounded-2xl shadow-xl flex flex-col overflow-hidden flex-1 relative border border-slate-700">
                  <div className="px-5 py-3 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="size-4 text-emerald-400" />
                      <span className="text-xs font-bold text-slate-300 font-mono tracking-widest uppercase">Live Output</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="size-3 rounded-full bg-slate-700" />
                      <div className="size-3 rounded-full bg-slate-700" />
                      <div className="size-3 rounded-full bg-slate-700" />
                    </div>
                  </div>
                  
                  <div className="p-8 font-mono text-lg text-emerald-400 flex-1 relative">
                    <AnimatePresence mode="popLayout">
                      {currentActivity === 0 && act1Input && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {act1Input}
                        </motion.div>
                      )}
                      
                      {currentActivity === 1 && act2Option && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          Hello{act2Option === "space" ? " " : act2Option}World
                        </motion.div>
                      )}

                      {currentActivity === 2 && act3Option && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {act3Choices.find(c => c.label === act3Option)?.value}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Placeholder when empty */}
                    {((currentActivity === 0 && !act1Input) || 
                      (currentActivity === 1 && !act2Option) || 
                      (currentActivity === 2 && !act3Option)) && (
                      <span className="text-slate-600 italic text-sm absolute top-8">
                        Awaiting input...
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!activities[currentActivity].isComplete}
                    className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                      activities[currentActivity].isComplete 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-95" 
                        : "bg-slate-300 text-slate-500 shadow-none cursor-not-allowed"
                    }`}
                  >
                    {currentActivity === 2 ? "Complete Simulation" : "Continue"}
                    {activities[currentActivity].isComplete && <ChevronRight className="size-5" />}
                  </button>
                </div>

              </div>

            </motion.div>
          ) : (
            /* Completion Screen */
            <motion.div 
              key="completion"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center"
            >
              <div className="size-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="size-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">Interactive Lab Complete!</h2>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                You successfully programmed your first Python commands and learned how to format text and handle different data types.
              </p>
              
              <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-left">
                <h3 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Key Takeaways</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-600">
                    <div className="mt-1 size-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span><code className="bg-slate-100 text-purple-600 px-1.5 py-0.5 rounded text-sm font-mono mr-1">print()</code> is a built-in function used to display information to the standard output.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <div className="mt-1 size-1.5 rounded-full bg-purple-500 shrink-0" />
                    <span>The <code className="bg-slate-100 text-purple-600 px-1.5 py-0.5 rounded text-sm font-mono mr-1">sep</code> parameter controls the character inserted between multiple strings.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <div className="mt-1 size-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Python automatically converts variables like Integers (<code className="font-mono text-sm">100</code>) and Booleans (<code className="font-mono text-sm">True</code>) to text when printing.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setCurrentActivity(0);
                  setAct1Input("");
                  setAct2Option(null);
                  setAct3Option(null);
                }}
                className="mt-8 px-6 py-3 text-blue-600 font-bold hover:bg-blue-50 rounded-xl transition-colors"
              >
                Restart Simulation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
