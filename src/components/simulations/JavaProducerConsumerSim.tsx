import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, ShoppingCart, Bell, PauseCircle, Play } from 'lucide-react';

export function JavaProducerConsumerSim() {
  const [buffer, setBuffer] = useState<number | null>(null);
  const [producerState, setProducerState] = useState<'idle' | 'working' | 'waiting' | 'notifying'>('idle');
  const [consumerState, setConsumerState] = useState<'idle' | 'working' | 'waiting' | 'notifying'>('idle');
  
  const [log, setLog] = useState<string[]>([]);

  const addToLog = (msg: string) => setLog(l => [msg, ...l].slice(0, 5));

  const produce = () => {
    if (buffer !== null) {
      setProducerState('waiting');
      addToLog("Producer: Buffer full. Calling wait()...");
      return;
    }
    
    setProducerState('working');
    setTimeout(() => {
      setBuffer(1);
      setProducerState('notifying');
      addToLog("Producer: Produced [1] into buffer. Calling notify()...");
      
      // If consumer was waiting, wake it up
      if (consumerState === 'waiting') {
        setConsumerState('idle');
        addToLog("Consumer: Woken up by notify()!");
      }

      setTimeout(() => setProducerState('idle'), 1000);
    }, 1000);
  };

  const consume = () => {
    if (buffer === null) {
      setConsumerState('waiting');
      addToLog("Consumer: Buffer empty. Calling wait()...");
      return;
    }
    
    setConsumerState('working');
    setTimeout(() => {
      setBuffer(null);
      setConsumerState('notifying');
      addToLog("Consumer: Consumed [1] from buffer. Calling notify()...");
      
      // If producer was waiting, wake it up
      if (producerState === 'waiting') {
        setProducerState('idle');
        addToLog("Producer: Woken up by notify()!");
      }

      setTimeout(() => setConsumerState('idle'), 1000);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-cyan-100 overflow-hidden text-slate-800 font-sans">
      <div className="bg-cyan-50 border-b border-cyan-100 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-700">
          <Factory className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Producer-Consumer (wait / notify)</h3>
        </div>
        <div className="text-xs font-mono text-cyan-600 bg-cyan-100 px-2 py-1 rounded">
          JVM // THREAD_COMMUNICATION
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg text-sm text-slate-600 flex justify-between items-center">
          <div>
            Threads communicate using the Object monitor methods: <code className="bg-slate-200 px-1 rounded text-cyan-700">wait()</code> releases the lock and suspends execution. <code className="bg-slate-200 px-1 rounded text-cyan-700">notify()</code> wakes up a waiting thread.
          </div>
        </div>

        {/* Animation Stage */}
        <div className="flex-1 bg-slate-800 rounded-xl p-8 flex flex-col items-center justify-center relative border-4 border-slate-700 min-h-[300px]">
          
          <div className="flex justify-between items-center w-full max-w-3xl space-x-12">
            
            {/* PRODUCER */}
            <div className="flex flex-col items-center space-y-4 relative">
              <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Producer Thread</div>
              
              <motion.div 
                animate={{
                  backgroundColor: producerState === 'waiting' ? '#f59e0b' : producerState === 'working' ? '#10b981' : '#3b82f6',
                  scale: producerState === 'working' ? 1.1 : 1
                }}
                className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg border-4 border-white z-10"
              >
                <Factory className="w-8 h-8 mb-1" />
                <span className="text-[10px] font-bold uppercase">{producerState}</span>
              </motion.div>
              
              <button 
                onClick={produce}
                disabled={producerState === 'working' || producerState === 'notifying'}
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50 flex items-center shadow-md transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 mr-2" /> Produce()
              </button>

              {/* Status Icons */}
              <AnimatePresence>
                {producerState === 'waiting' && (
                  <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-amber-500 text-white p-1 rounded-full shadow-lg border-2 border-white">
                    <PauseCircle className="w-4 h-4" />
                  </motion.div>
                )}
                {producerState === 'notifying' && (
                  <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 p-1 rounded-full shadow-lg border-2 border-white">
                    <Bell className="w-4 h-4 animate-bounce" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SHARED BUFFER */}
            <div className="flex flex-col items-center">
              <div className="text-slate-400 font-mono text-xs mb-2">Shared Utility Buffer</div>
              <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-colors duration-500 relative ${buffer !== null ? 'bg-green-900/50 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-slate-900 border-slate-600'}`}>
                <AnimatePresence mode="wait">
                  {buffer !== null ? (
                    <motion.div 
                      key="full"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="w-16 h-16 bg-white rounded flex items-center justify-center text-green-700 font-bold text-2xl shadow-inner border-2 border-green-200"
                    >
                      {buffer}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-slate-500 font-mono text-sm"
                    >
                      EMPTY
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CONSUMER */}
            <div className="flex flex-col items-center space-y-4 relative">
              <div className="text-purple-400 font-bold uppercase tracking-wider text-xs">Consumer Thread</div>
              
              <motion.div 
                animate={{
                  backgroundColor: consumerState === 'waiting' ? '#f59e0b' : consumerState === 'working' ? '#10b981' : '#a855f7',
                  scale: consumerState === 'working' ? 1.1 : 1
                }}
                className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg border-4 border-white z-10"
              >
                <ShoppingCart className="w-8 h-8 mb-1" />
                <span className="text-[10px] font-bold uppercase">{consumerState}</span>
              </motion.div>
              
              <button 
                onClick={consume}
                disabled={consumerState === 'working' || consumerState === 'notifying'}
                className="px-6 py-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 disabled:opacity-50 flex items-center shadow-md transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 mr-2" /> Consume()
              </button>

              {/* Status Icons */}
              <AnimatePresence>
                {consumerState === 'waiting' && (
                  <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-amber-500 text-white p-1 rounded-full shadow-lg border-2 border-white">
                    <PauseCircle className="w-4 h-4" />
                  </motion.div>
                )}
                {consumerState === 'notifying' && (
                  <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 p-1 rounded-full shadow-lg border-2 border-white">
                    <Bell className="w-4 h-4 animate-bounce" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Log */}
        <div className="h-32 bg-slate-900 rounded border border-slate-800 p-4 font-mono text-xs overflow-y-auto flex flex-col-reverse">
          {log.map((entry, i) => (
            <div key={i} className={`mb-1 opacity-${100 - i*20} ${entry.includes('Producer') ? 'text-blue-300' : entry.includes('Consumer') ? 'text-purple-300' : 'text-slate-400'}`}>
              {'>'} {entry}
            </div>
          ))}
          {log.length === 0 && <div className="text-slate-600">{'>'} Ready. Use buttons to simulate threads.</div>}
        </div>
      </div>
    </div>
  );
}
