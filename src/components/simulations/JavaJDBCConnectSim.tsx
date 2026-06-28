import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Link, Server, Plug, Play, RefreshCcw, CheckCircle2, XCircle } from 'lucide-react';

export function JavaJDBCConnectSim() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'failed'>('idle');

  const runConnection = (success: boolean) => {
    setStep(1); // Load driver
    setStatus('loading');
    
    setTimeout(() => {
      setStep(2); // Attempt connect
      setTimeout(() => {
        if (success) {
          setStep(3); // Connected
          setStatus('success');
        } else {
          setStep(4); // Failed
          setStatus('failed');
        }
      }, 1500);
    }, 1000);
  };

  const reset = () => {
    setStep(0);
    setStatus('idle');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-indigo-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-indigo-50 border-b border-indigo-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-indigo-700">
          <Link className="w-5 h-5" />
          <h3 className="font-semibold text-lg">JDBC Database Connection</h3>
        </div>
        <div className="text-xs font-mono text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
          JDBC // CONNECTION
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex justify-between items-center">
          <div className="text-sm text-slate-600 max-w-lg">
            <strong>JDBC Architecture:</strong> The Java app uses the <code className="bg-slate-200 px-1 rounded">DriverManager</code> to locate a compatible Database Driver. The Driver then establishes a physical TCP/IP socket connection to the Database server.
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => runConnection(true)} 
              disabled={status !== 'idle'} 
              className="px-4 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 disabled:opacity-50 flex items-center shadow-sm"
            >
              <Play className="w-4 h-4 mr-2" /> Connect (Success)
            </button>
            <button 
              onClick={() => runConnection(false)} 
              disabled={status !== 'idle'} 
              className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 disabled:opacity-50 flex items-center shadow-sm"
            >
              <XCircle className="w-4 h-4 mr-2" /> Connect (Fail)
            </button>
            <button onClick={reset} className="px-3 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300">
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-slate-800 rounded-xl p-8 flex items-center justify-center relative overflow-hidden border-4 border-slate-700 min-h-[300px]">
          
          <div className="flex items-center w-full max-w-4xl justify-between relative z-10">
            
            {/* Java App */}
            <div className={`flex flex-col items-center space-y-2 transition-all ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="text-white font-bold font-mono text-xs">Java App</div>
              <div className="w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg border-2 border-white">
                <Server className="w-10 h-10 text-white" />
              </div>
              <div className="bg-slate-900 text-xs text-blue-300 px-2 py-1 rounded font-mono border border-slate-600">
                DriverManager
              </div>
            </div>

            {/* Connection Wire */}
            <div className="flex-1 relative h-32 flex items-center justify-center mx-4">
              
              {/* Physical Cable */}
              <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-slate-700 rounded-full flex items-center">
                {step >= 3 && <motion.div initial={{width:0}} animate={{width:'100%'}} className="h-full bg-green-500 rounded-full" transition={{duration: 0.5}} />}
                {step === 4 && <div className="h-full w-1/2 bg-red-500 rounded-l-full" />}
              </div>

              {/* Data Packets (Handshake) */}
              <AnimatePresence>
                {step === 2 && (
                  <motion.div 
                    initial={{ x: -100 }}
                    animate={{ x: 100 }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="absolute top-1/2 -translate-y-1/2 flex items-center bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-[0_0_10px_#6366f1]"
                  >
                    <Plug className="w-3 h-3 mr-1" /> Auth Packet
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status Badge */}
              <div className="absolute -top-6">
                {status === 'loading' && <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-bold border border-amber-300 shadow-sm animate-pulse">Negotiating...</span>}
                {status === 'success' && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold border border-green-300 shadow-sm flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Connected</span>}
                {status === 'failed' && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-bold border border-red-300 shadow-sm flex items-center"><XCircle className="w-3 h-3 mr-1"/> Auth Failed</span>}
              </div>

            </div>

            {/* MySQL Database */}
            <div className={`flex flex-col items-center space-y-2 transition-all ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="text-white font-bold font-mono text-xs">MySQL Server</div>
              <div className={`w-24 h-24 rounded-lg flex items-center justify-center shadow-lg border-2 border-white transition-colors duration-500 ${status === 'success' ? 'bg-green-600' : status === 'failed' ? 'bg-red-600' : 'bg-slate-600'}`}>
                <Database className="w-10 h-10 text-white" />
              </div>
              <div className="bg-slate-900 text-xs text-slate-300 px-2 py-1 rounded font-mono border border-slate-600">
                localhost:3306
              </div>
            </div>

          </div>

          {/* Background grid */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>

        {/* Code Visualizer */}
        <div className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-6 font-mono text-sm text-slate-300 overflow-y-auto">
          <div className="text-indigo-400 font-bold mb-4 uppercase tracking-wider text-xs">// JDBC Connection Steps</div>
          
          <div className="space-y-4">
            <div className={`p-2 rounded border transition-colors ${step >= 1 ? 'bg-indigo-900/40 border-indigo-500 text-white' : 'border-transparent opacity-50'}`}>
              <div className="text-xs text-indigo-300 mb-1">// 1. Load the Driver class into JVM memory</div>
              Class.forName(<span className="text-green-300">"com.mysql.cj.jdbc.Driver"</span>);
            </div>

            <div className={`p-2 rounded border transition-colors ${step >= 2 ? (status === 'failed' ? 'bg-red-900/40 border-red-500 text-white' : 'bg-indigo-900/40 border-indigo-500 text-white') : 'border-transparent opacity-50'}`}>
              <div className="text-xs text-indigo-300 mb-1">// 2. Request connection from DriverManager</div>
              <span className="text-blue-400">Connection</span> conn = DriverManager.getConnection(<br/>
              &nbsp;&nbsp;<span className="text-green-300">"jdbc:mysql://localhost:3306/lab"</span>, <span className="text-green-300">"user"</span>, <span className="text-green-300">"pass"</span><br/>
              );
              
              {status === 'failed' && (
                <div className="mt-2 text-red-400 text-xs border border-red-500/50 bg-red-500/10 p-2 rounded">
                  <span className="font-bold">SQLException thrown:</span> Access denied for user 'user'@'localhost' (using password: YES)
                </div>
              )}
            </div>

            <div className={`p-2 rounded border transition-colors ${step >= 3 ? 'bg-green-900/40 border-green-500 text-white' : 'border-transparent opacity-50 hidden'}`}>
              <div className="text-xs text-green-300 mb-1">// 3. Connection successful. Session established.</div>
              System.out.println(<span className="text-green-300">"Database connected successfully!"</span>);
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
