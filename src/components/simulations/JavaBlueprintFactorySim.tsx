import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, FileCode2, PackagePlus, Box } from 'lucide-react';

interface DogObject {
  id: string;
  name: string;
  breed: string;
  age: number;
}

export function JavaBlueprintFactorySim() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState<number | ''>('');
  
  const [objects, setObjects] = useState<DogObject[]>([]);

  const handleManufacture = () => {
    if (!name || !breed || age === '') return;
    
    const newDog: DogObject = {
      id: `Dog@${Math.floor(Math.random() * 1000).toString(16).padStart(3, '0')}`,
      name,
      breed,
      age: Number(age)
    };
    
    setObjects(prev => [newDog, ...prev]);
    setName('');
    setBreed('');
    setAge('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-purple-50 border-b border-purple-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-purple-700">
          <Factory className="w-5 h-5" />
          <h3 className="font-semibold text-lg">The Blueprint Factory</h3>
        </div>
        <div className="text-xs font-mono text-purple-600 bg-purple-100 px-2 py-1 rounded">
          OOP_ENGINE // CLASS_INSTANTIATION
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-[300px_1fr] gap-4 p-4 min-h-0 overflow-y-auto">
        
        {/* Left Panel: Blueprint */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col">
          <div className="flex items-center space-x-2 text-slate-600 mb-4 pb-2 border-b border-slate-200">
            <FileCode2 className="w-4 h-4" />
            <span className="font-bold text-sm">Class Blueprint (Dog)</span>
          </div>
          
          <div className="font-mono text-sm text-purple-800 mb-6 bg-purple-100/50 p-3 rounded border border-purple-200">
            <span className="text-purple-600">class</span> Dog {'{\n'}
            <div className="ml-4 text-slate-600">
              <span className="text-purple-600">String</span> name;<br/>
              <span className="text-purple-600">String</span> breed;<br/>
              <span className="text-purple-600">int</span> age;
            </div>
            {'}'}
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configure Instance</div>
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-purple-500" placeholder="e.g. Buddy" />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">breed</label>
              <input type="text" value={breed} onChange={e => setBreed(e.target.value)} className="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-purple-500" placeholder="e.g. Golden Retriever" />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">age</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value ? Number(e.target.value) : '')} className="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-purple-500" placeholder="e.g. 3" />
            </div>
            
            <button 
              onClick={handleManufacture}
              disabled={!name || !breed || age === ''}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium text-sm transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <PackagePlus className="w-4 h-4" />
              <span>Instantiate Object</span>
            </button>
          </div>
        </div>

        {/* Right Panel: Manufactured Objects */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#9333ea 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 relative z-10">
            <div className="flex items-center space-x-2 text-slate-600">
              <Box className="w-4 h-4" />
              <span className="font-bold text-sm">Heap Memory (Objects)</span>
            </div>
            <span className="text-xs bg-purple-100 text-purple-700 font-mono px-2 py-1 rounded">Count: {objects.length}</span>
          </div>

          <div className="flex-1 overflow-y-auto relative z-10 flex flex-wrap gap-4 content-start">
            <AnimatePresence>
              {objects.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-center py-10 text-slate-400 font-medium text-sm">
                  Waiting for instantiation. Fill the fields and click "Instantiate Object".
                </motion.div>
              )}
              {objects.map((obj) => (
                <motion.div
                  key={obj.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-white border-2 border-purple-200 rounded-lg shadow-sm p-3 w-48 flex flex-col"
                >
                  <div className="bg-purple-600 text-white text-[10px] font-mono px-2 py-1 rounded mb-2 text-center">
                    {obj.id}
                  </div>
                  <div className="text-xs font-mono space-y-1">
                    <div className="flex justify-between"><span className="text-slate-400">name:</span><span className="text-slate-800 font-bold">"{obj.name}"</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">breed:</span><span className="text-slate-800 font-bold truncate max-w-[90px]" title={obj.breed}>"{obj.breed}"</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">age:</span><span className="text-purple-600 font-bold">{obj.age}</span></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>

      <div className="bg-slate-900 text-green-400 font-mono p-4 text-sm h-32 overflow-y-auto">
        <div className="text-slate-500 mb-1">// Console Log</div>
        {objects.map((obj, i) => (
          <div key={obj.id}>
            <span className="text-purple-400">Dog</span> obj{objects.length - i} = <span className="text-purple-400">new</span> Dog();<br/>
            obj{objects.length - i}.name = "{obj.name}";<br/>
            obj{objects.length - i}.breed = "{obj.breed}";<br/>
            obj{objects.length - i}.age = {obj.age};
          </div>
        ))}
      </div>
    </div>
  );
}
