import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoorOpen, ArrowRight, UserCircle2 } from 'lucide-react';

type DoorType = 'default' | 'name' | 'all';

export function JavaConstructorSelectorSim() {
  const [activeDoor, setActiveDoor] = useState<DoorType | null>(null);
  
  const [inputName, setInputName] = useState('Alice');
  const [inputAge, setInputAge] = useState('20');
  const [inputGrade, setInputGrade] = useState('A');
  
  const [studentObj, setStudentObj] = useState<any>(null);

  const handleSelectDoor = (door: DoorType) => {
    setActiveDoor(door);
    setStudentObj(null);
    
    setTimeout(() => {
      if (door === 'default') {
        setStudentObj({ name: 'Unknown', age: 0, grade: 'N/A' });
      } else if (door === 'name') {
        setStudentObj({ name: inputName, age: 0, grade: 'N/A' });
      } else {
        setStudentObj({ name: inputName, age: parseInt(inputAge), grade: inputGrade });
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-purple-50 border-b border-purple-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-purple-700">
          <DoorOpen className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Constructor Selector</h3>
        </div>
        <div className="text-xs font-mono text-purple-600 bg-purple-100 px-2 py-1 rounded">
          OOP_ENGINE // CONSTRUCTOR_OVERLOADING
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-8 overflow-y-auto min-h-0">
        
        {/* Input Variables */}
        <div className="flex justify-center space-x-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 mb-1">Available Name</label>
            <input type="text" value={inputName} onChange={e => setInputName(e.target.value)} className="w-32 border border-slate-300 rounded px-2 py-1.5 text-sm focus:border-purple-500 outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 mb-1">Available Age</label>
            <input type="number" value={inputAge} onChange={e => setInputAge(e.target.value)} className="w-24 border border-slate-300 rounded px-2 py-1.5 text-sm focus:border-purple-500 outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 mb-1">Available Grade</label>
            <input type="text" value={inputGrade} onChange={e => setInputGrade(e.target.value)} className="w-24 border border-slate-300 rounded px-2 py-1.5 text-sm focus:border-purple-500 outline-none" />
          </div>
        </div>

        {/* The Doors */}
        <div className="flex justify-center gap-6">
          
          {/* Default Constructor */}
          <button 
            onClick={() => handleSelectDoor('default')}
            className={`relative flex flex-col items-center w-48 h-64 rounded-t-full border-4 border-b-0 transition-all duration-300 overflow-hidden ${activeDoor === 'default' ? 'border-purple-500 shadow-xl' : 'border-slate-300 hover:border-purple-300 hover:bg-slate-50'}`}
          >
            <div className={`absolute inset-0 opacity-20 ${activeDoor === 'default' ? 'bg-purple-400' : 'bg-slate-200'}`}></div>
            <div className="relative z-10 pt-16 flex flex-col items-center">
              <span className="font-mono font-bold text-purple-700 bg-white/80 px-2 py-1 rounded shadow-sm">Student()</span>
              <span className="text-xs text-slate-600 mt-2 text-center px-4 font-medium">Default Constructor (No args)</span>
            </div>
            {activeDoor === 'default' && (
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute bottom-4">
                <UserCircle2 className="w-16 h-16 text-purple-600" />
              </motion.div>
            )}
          </button>

          {/* 1-Arg Constructor */}
          <button 
            onClick={() => handleSelectDoor('name')}
            className={`relative flex flex-col items-center w-48 h-64 rounded-t-full border-4 border-b-0 transition-all duration-300 overflow-hidden ${activeDoor === 'name' ? 'border-purple-500 shadow-xl' : 'border-slate-300 hover:border-purple-300 hover:bg-slate-50'}`}
          >
            <div className={`absolute inset-0 opacity-20 ${activeDoor === 'name' ? 'bg-purple-400' : 'bg-slate-200'}`}></div>
            <div className="relative z-10 pt-16 flex flex-col items-center">
              <span className="font-mono font-bold text-purple-700 bg-white/80 px-2 py-1 rounded shadow-sm text-center">Student(String)</span>
              <span className="text-xs text-slate-600 mt-2 text-center px-4 font-medium">Partial Info (Name only)</span>
            </div>
            {activeDoor === 'name' && (
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute bottom-4">
                <UserCircle2 className="w-16 h-16 text-purple-600" />
              </motion.div>
            )}
          </button>

          {/* 3-Arg Constructor */}
          <button 
            onClick={() => handleSelectDoor('all')}
            className={`relative flex flex-col items-center w-48 h-64 rounded-t-full border-4 border-b-0 transition-all duration-300 overflow-hidden ${activeDoor === 'all' ? 'border-purple-500 shadow-xl' : 'border-slate-300 hover:border-purple-300 hover:bg-slate-50'}`}
          >
            <div className={`absolute inset-0 opacity-20 ${activeDoor === 'all' ? 'bg-purple-400' : 'bg-slate-200'}`}></div>
            <div className="relative z-10 pt-16 flex flex-col items-center">
              <span className="font-mono font-bold text-purple-700 bg-white/80 px-2 py-1 rounded shadow-sm text-center">Student(Str, int, Str)</span>
              <span className="text-xs text-slate-600 mt-2 text-center px-4 font-medium">Full Info (All fields)</span>
            </div>
            {activeDoor === 'all' && (
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute bottom-4">
                <UserCircle2 className="w-16 h-16 text-purple-600" />
              </motion.div>
            )}
          </button>

        </div>

        {/* Output Object */}
        <div className="flex justify-center border-t border-slate-200 pt-6">
          <AnimatePresence mode="wait">
            {studentObj ? (
              <motion.div 
                key={activeDoor}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-purple-50 border-2 border-purple-400 rounded-xl p-6 w-80 shadow-md flex space-x-6 items-center"
              >
                <UserCircle2 className="w-16 h-16 text-purple-500" />
                <div className="flex-1 font-mono text-sm space-y-2">
                  <div className="flex justify-between border-b border-purple-200 pb-1">
                    <span className="text-slate-500">name</span>
                    <span className="font-bold text-purple-800">"{studentObj.name}"</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-200 pb-1">
                    <span className="text-slate-500">age</span>
                    <span className="font-bold text-purple-800">{studentObj.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">grade</span>
                    <span className="font-bold text-purple-800">"{studentObj.grade}"</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-slate-400 font-medium italic h-[116px] flex items-center">
                Click a constructor door to instantiate a Student object...
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto">
        <div className="text-slate-500 mb-1">// Constructor Invocation</div>
        {activeDoor === 'default' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <div><span className="text-purple-400">Student</span> s = <span className="text-purple-400">new</span> Student();</div>
            <div className="text-slate-500 mt-2">// JVM uses default constructor. Uninitialized fields get JVM defaults.</div>
          </motion.div>
        )}
        {activeDoor === 'name' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <div><span className="text-purple-400">Student</span> s = <span className="text-purple-400">new</span> Student("{inputName}");</div>
            <div className="text-slate-500 mt-2">// Name initialized via constructor. Other fields get defaults.</div>
          </motion.div>
        )}
        {activeDoor === 'all' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <div><span className="text-purple-400">Student</span> s = <span className="text-purple-400">new</span> Student("{inputName}", {inputAge}, "{inputGrade}");</div>
            <div className="text-slate-500 mt-2">// All fields initialized via parameterized constructor.</div>
          </motion.div>
        )}
        {!activeDoor && <div className="text-slate-600">Waiting for selection...</div>}
      </div>
    </div>
  );
}
