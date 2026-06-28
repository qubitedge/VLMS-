import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitMerge, PlusCircle, ArrowDown } from 'lucide-react';

type Member = 'fieldA' | 'fieldB' | 'methodX' | 'methodY';

export function JavaFamilyTreeSim() {
  const [activeMembers, setActiveMembers] = useState<Member[]>([]);

  const toggleMember = (m: Member) => {
    setActiveMembers(prev => 
      prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-orange-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-orange-50 border-b border-orange-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-orange-700">
          <GitMerge className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Family Tree</h3>
        </div>
        <div className="text-xs font-mono text-orange-600 bg-orange-100 px-2 py-1 rounded">
          OOP_ENGINE // SINGLE_INHERITANCE
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="text-center text-sm text-slate-500 mb-6">
          Click the properties/methods in the Parent class to see them inherited by the Child class.
        </div>

        <div className="flex flex-col items-center space-y-4">
          
          {/* Parent Class */}
          <div className="w-72 bg-slate-50 border-2 border-slate-300 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-slate-200 py-2 text-center font-bold text-slate-700 font-mono border-b-2 border-slate-300">
              class Parent
            </div>
            <div className="p-4 space-y-2 font-mono text-sm">
              <button 
                onClick={() => toggleMember('fieldA')}
                className={`w-full text-left px-3 py-1.5 rounded transition-colors ${activeMembers.includes('fieldA') ? 'bg-orange-100 text-orange-800 border border-orange-300' : 'hover:bg-slate-200 border border-transparent'}`}
              >
                int <span className="font-bold">fieldA</span>;
              </button>
              <button 
                onClick={() => toggleMember('methodX')}
                className={`w-full text-left px-3 py-1.5 rounded transition-colors ${activeMembers.includes('methodX') ? 'bg-orange-100 text-orange-800 border border-orange-300' : 'hover:bg-slate-200 border border-transparent'}`}
              >
                void <span className="font-bold">methodX()</span>
              </button>
            </div>
          </div>

          {/* IS-A Arrow */}
          <div className="flex flex-col items-center text-orange-400">
            <div className="h-8 w-1 bg-orange-400"></div>
            <div className="flex items-center space-x-2 text-xs font-bold bg-orange-100 px-3 py-1 rounded-full border border-orange-300 z-10 -my-2 shadow-sm">
              <ArrowDown className="w-4 h-4" />
              <span>extends (IS-A)</span>
            </div>
            <div className="h-8 w-1 bg-orange-400"></div>
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-orange-400"></div>
          </div>

          {/* Child Class */}
          <div className="w-80 bg-orange-50 border-2 border-orange-400 rounded-lg shadow-md overflow-hidden relative">
            <div className="bg-orange-400 py-2 text-center font-bold text-white font-mono border-b-2 border-orange-500">
              class Child extends Parent
            </div>
            <div className="p-4 space-y-2 font-mono text-sm">
              
              {/* Inherited Members */}
              <div className="text-xs font-bold text-orange-400 uppercase mb-1">Inherited from Parent</div>
              <div className="min-h-[64px] bg-white rounded border border-orange-200 p-2 space-y-2 mb-4">
                {activeMembers.includes('fieldA') && (
                  <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className="text-orange-700 bg-orange-100 px-2 py-1 rounded">
                    int <span className="font-bold">fieldA</span>;
                  </motion.div>
                )}
                {activeMembers.includes('methodX') && (
                  <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className="text-orange-700 bg-orange-100 px-2 py-1 rounded">
                    void <span className="font-bold">methodX()</span>
                  </motion.div>
                )}
                {!activeMembers.includes('fieldA') && !activeMembers.includes('methodX') && (
                  <div className="text-slate-400 text-xs italic">No inherited members selected...</div>
                )}
              </div>

              {/* Own Members */}
              <div className="text-xs font-bold text-slate-500 uppercase mb-1">Child's Own Members</div>
              <button 
                onClick={() => toggleMember('fieldB')}
                className={`w-full text-left px-3 py-1.5 rounded transition-colors ${activeMembers.includes('fieldB') ? 'bg-orange-200 text-orange-900 border border-orange-400 font-bold' : 'bg-white hover:bg-slate-100 border border-slate-200'}`}
              >
                String <span className="font-bold">fieldB</span>;
              </button>
              <button 
                onClick={() => toggleMember('methodY')}
                className={`w-full text-left px-3 py-1.5 rounded transition-colors ${activeMembers.includes('methodY') ? 'bg-orange-200 text-orange-900 border border-orange-400 font-bold' : 'bg-white hover:bg-slate-100 border border-slate-200'}`}
              >
                void <span className="font-bold">methodY()</span>
              </button>

            </div>
          </div>
        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto">
        <div className="text-slate-500 mb-1">// Object Instantiation</div>
        <div><span className="text-orange-400">Child</span> obj = <span className="text-orange-400">new</span> Child();</div>
        <div className="mt-2 text-slate-400">
          {activeMembers.includes('fieldA') ? <div>obj.fieldA = 10; <span className="text-slate-500">// Valid (Inherited)</span></div> : <div className="text-slate-600 italic">// fieldA not added to Parent</div>}
          {activeMembers.includes('methodX') ? <div>obj.methodX(); <span className="text-slate-500">// Valid (Inherited)</span></div> : <div className="text-slate-600 italic">// methodX not added to Parent</div>}
          {activeMembers.includes('fieldB') ? <div>obj.fieldB = "Test"; <span className="text-slate-500">// Valid (Own member)</span></div> : <div className="text-slate-600 italic">// fieldB not defined in Child</div>}
          {activeMembers.includes('methodY') ? <div>obj.methodY(); <span className="text-slate-500">// Valid (Own member)</span></div> : <div className="text-slate-600 italic">// methodY not defined in Child</div>}
        </div>
      </div>
    </div>
  );
}
