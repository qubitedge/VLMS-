import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, PlusCircle, ArrowRight, Play, RefreshCcw, Table } from 'lucide-react';

export function JavaJDBCInsertSim() {
  const [step, setStep] = useState(0);
  const [rows, setRows] = useState([{ id: 100, name: 'Alice' }]);
  
  const runInsert = () => {
    setStep(1); // ExecuteUpdate
    
    setTimeout(() => {
      setStep(2); // Database processing
      setTimeout(() => {
        setRows([...rows, { id: 101, name: 'Raj' }]);
        setStep(3); // Result returned
        setTimeout(() => setStep(4), 1000); // Output
      }, 1500);
    }, 1000);
  };

  const reset = () => {
    setStep(0);
    setRows([{ id: 100, name: 'Alice' }]);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-indigo-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-indigo-50 border-b border-indigo-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-indigo-700">
          <PlusCircle className="w-5 h-5" />
          <h3 className="font-semibold text-lg">JDBC Insert (DML)</h3>
        </div>
        <div className="text-xs font-mono text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
          JDBC // STATEMENT
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-8 overflow-y-auto">
        
        {/* Architecture Diagram */}
        <div className="flex-1 bg-slate-800 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden border-4 border-slate-700">
          
          <div className="flex w-full max-w-2xl justify-between items-center relative z-10">
            
            {/* Java Statement Object */}
            <div className="flex flex-col items-center z-10">
              <div className="text-indigo-300 font-mono text-xs mb-2">Statement Object</div>
              <div className="bg-indigo-900 border-2 border-indigo-500 rounded-lg p-4 shadow-lg text-white w-48 text-center relative">
                <span className="font-bold text-sm">executeUpdate()</span>
                
                {/* Outgoing Query Packet */}
                <AnimatePresence>
                  {step === 1 && (
                    <motion.div 
                      initial={{ x: 0, opacity: 1 }}
                      animate={{ x: 250, opacity: 0 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="absolute top-1/2 -translate-y-1/2 left-full ml-4 bg-white text-indigo-900 font-mono text-[10px] font-bold px-2 py-1 rounded border-2 border-indigo-500 shadow-xl whitespace-nowrap z-30"
                    >
                      "INSERT INTO student..."
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Incoming Result Packet */}
                <AnimatePresence>
                  {step === 3 && (
                    <motion.div 
                      initial={{ x: 250, opacity: 1 }}
                      animate={{ x: 0, opacity: 0 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="absolute top-1/2 -translate-y-1/2 left-full ml-4 bg-green-500 text-white font-mono text-xs font-bold px-3 py-1 rounded-full shadow-xl z-30 flex items-center"
                    >
                      <ArrowRight className="w-3 h-3 mr-1 transform rotate-180" /> return 1
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Connection Wire */}
            <div className="flex-1 h-2 bg-slate-700 rounded-full mx-4"></div>

            {/* Database Table */}
            <div className="flex flex-col items-center z-10 w-64">
              <div className="text-slate-300 font-mono text-xs mb-2 flex items-center">
                <Database className="w-4 h-4 mr-1" /> MySQL Database
              </div>
              
              <div className="bg-white rounded-lg border-2 border-slate-300 overflow-hidden shadow-2xl w-full">
                <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center text-xs font-bold text-slate-600">
                  <Table className="w-3 h-3 mr-1" /> student_table
                </div>
                <div className="p-0">
                  <table className="w-full text-xs font-mono text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-1 border-r border-slate-200">ID</th>
                        <th className="px-3 py-1">NAME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, idx) => (
                        <motion.tr 
                          key={idx}
                          initial={idx === 1 ? { backgroundColor: '#10b981', color: '#ffffff' } : {}}
                          animate={idx === 1 ? { backgroundColor: '#ffffff', color: '#1e293b' } : {}}
                          transition={{ duration: 2 }}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-3 py-2 border-r border-slate-100 font-bold">{row.id}</td>
                          <td className="px-3 py-2">{row.name}</td>
                        </motion.tr>
                      ))}
                      {rows.length === 1 && step >= 2 && step < 3 && (
                        <tr className="bg-indigo-50 border-2 border-dashed border-indigo-300 animate-pulse">
                          <td className="px-3 py-2 border-r border-indigo-200 text-indigo-400">...</td>
                          <td className="px-3 py-2 text-indigo-400">Inserting...</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Code Visualizer */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-4">
          
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex justify-between items-center">
            <div className="flex space-x-2 w-full">
              <button 
                onClick={runInsert} 
                disabled={step !== 0} 
                className="flex-1 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center shadow-sm"
              >
                <Play className="w-4 h-4 mr-2" /> Execute SQL
              </button>
              <button onClick={reset} className="px-3 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300">
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-6 font-mono text-xs text-slate-300 overflow-y-auto">
            <div className="text-indigo-400 font-bold mb-4 uppercase tracking-wider">// DML Operations</div>
            
            <div className="space-y-4">
              <div>
                <span className="text-blue-400">String</span> sql = <span className="text-green-300">"INSERT INTO student VALUES(101, 'Raj')"</span>;
              </div>

              <div className={`p-2 rounded border transition-colors duration-500 ${step >= 1 ? 'bg-indigo-900/50 border-indigo-500 text-white shadow-inner' : 'border-transparent'}`}>
                <div className="text-slate-500 mb-1">// executeUpdate returns int (rows affected)</div>
                <span className="text-blue-400">int</span> count = stmt.executeUpdate(sql);
              </div>

              <div className={`p-2 rounded border transition-colors duration-500 ${step >= 4 ? 'bg-green-900/30 border-green-500 text-white' : 'border-transparent opacity-50'}`}>
                <span className="text-blue-400">if</span> (count {'>'} <span className="text-orange-400">0</span>) {'{\n'}
                <div className="ml-4">
                  System.out.println(<span className="text-green-300">"Row inserted! count = "</span> + count);
                </div>
                {'}'}
              </div>

            </div>

            {/* Console Output */}
            {step >= 4 && (
              <div className="mt-8 p-4 bg-black/50 text-green-400 rounded border border-slate-800">
                <div className="text-slate-500 mb-1">// Console</div>
                Row inserted successfully! count = 1
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
