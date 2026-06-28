// QuantumWorkspace.tsx
// The interactive Python editor + output pane for quantum computing experiments.
// Handles: plain stdout, matplotlib PNG plots, and error display.

import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Terminal, ImageIcon, Loader2, Atom } from "lucide-react";
import { runQuantumExperiment } from "@/lib/runQuantumExperiment";

interface QuantumWorkspaceProps {
  experimentCode: string;
  isLoaded: boolean;
  loadError: string | null;
  pyodideRef: React.MutableRefObject<any>;
  shimRef: React.MutableRefObject<string | null>;
}

export function QuantumWorkspace({
  experimentCode,
  isLoaded,
  loadError,
  pyodideRef,
  shimRef,
}: QuantumWorkspaceProps) {
  const [code, setCode] = useState(experimentCode);
  const [isRunning, setIsRunning] = useState(false);
  const [stdout, setStdout] = useState('');
  const [plots, setPlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'output' | 'plots'>('output');
  const [isMounted, setIsMounted] = useState(false);

  // Monaco requires client-side mount
  useEffect(() => { setIsMounted(true); }, []);

  // Reset editor content whenever the experiment changes
  useEffect(() => {
    setCode(experimentCode);
    setStdout('');
    setPlots([]);
    setError(null);
    setActiveTab('output');
  }, [experimentCode]);

  const handleRun = async () => {
    if (!pyodideRef.current || !shimRef.current) return;

    setIsRunning(true);
    setStdout('');
    setPlots([]);
    setError(null);

    const result = await runQuantumExperiment(
      pyodideRef.current,
      shimRef.current,
      code
    );

    setStdout(result.stdout);
    setPlots(result.plots);
    setError(result.error ?? null);
    setIsRunning(false);

    // Auto-switch to plots tab if any figures were generated
    setActiveTab(result.plots.length > 0 ? 'plots' : 'output');
  };

  const handleReset = () => {
    setCode(experimentCode);
    setStdout('');
    setPlots([]);
    setError(null);
    setActiveTab('output');
  };

  // ── Engine status indicator ───────────────────────────────────────────────
  const statusDot = loadError
    ? 'bg-red-400'
    : isLoaded
    ? 'bg-green-400'
    : 'bg-yellow-400 animate-pulse';

  const statusText = loadError
    ? 'Engine failed'
    : isLoaded
    ? 'Engine ready'
    : 'Loading engine…';

  const canRun = isLoaded && !isRunning && !loadError;

  return (
    <div className="h-full flex flex-col bg-[#0f111a]">

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/30 shrink-0">
        <div className="flex items-center gap-3 text-xs font-mono">
          {/* macOS-style window dots */}
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-yellow-400/70" />
          <span className="size-2.5 rounded-full bg-green-400/70" />

          <span className="ml-2 text-white/50">experiment.py</span>

          <span className="text-white/20 mx-1">|</span>

          {/* Engine status */}
          <span className="flex items-center gap-1.5">
            <span className={`size-1.5 rounded-full ${statusDot}`} />
            <span className={loadError ? 'text-red-400' : isLoaded ? 'text-green-400/80' : 'text-yellow-400/80'}>
              {statusText}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <RotateCcw className="size-3" />
            Reset
          </button>

          <button
            onClick={handleRun}
            disabled={!canRun}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs rounded font-medium transition-colors
              bg-cyan/20 text-cyan border border-cyan/30 hover:bg-cyan/30
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isRunning
              ? <><Loader2 className="size-3 animate-spin" /> Running…</>
              : <><Play className="size-3" /> Run</>
            }
          </button>
        </div>
      </div>

      {/* ── Monaco editor ────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden min-h-0">
        {isMounted ? (
          <Editor
            height="100%"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={v => setCode(v ?? '')}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineHeight: 20,
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              wordWrap: 'on',
              padding: { top: 12 },
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-white/30 text-sm font-mono">
            Loading editor…
          </div>
        )}
      </div>

      {/* ── Output pane ──────────────────────────────────────────────────── */}
      <div className="h-60 border-t border-white/10 flex flex-col shrink-0 bg-black/50">

        {/* Tab bar */}
        <div className="flex items-center border-b border-white/10 bg-black/20 shrink-0">
          {[
            { id: 'output' as const, label: 'Console', icon: <Terminal className="size-3" /> },
            { id: 'plots'  as const, label: 'Plots',   icon: <ImageIcon className="size-3" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-mono uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-cyan border-cyan'
                  : 'text-white/40 border-transparent hover:text-white/60'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'plots' && plots.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-cyan/30 text-cyan text-[10px] leading-none">
                  {plots.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-auto p-4">

          {/* Console tab */}
          {activeTab === 'output' && (
            <>
              {isRunning && (
                <p className="text-white/30 font-mono text-xs italic animate-pulse">
                  Executing…
                </p>
              )}
              {!isRunning && error && (
                <pre className="text-red-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                  {error}
                </pre>
              )}
              {!isRunning && stdout && (
                <pre className="text-green-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                  {stdout}
                </pre>
              )}
              {!isRunning && !stdout && !error && (
                <p className="text-white/25 font-mono text-xs italic">
                  Output will appear here — click Run to execute the experiment.
                </p>
              )}
            </>
          )}

          {/* Plots tab */}
          {activeTab === 'plots' && (
            <>
              {isRunning && (
                <p className="text-white/30 font-mono text-xs italic animate-pulse">
                  Generating plots…
                </p>
              )}
              {!isRunning && plots.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <Atom className="size-8 text-white/15" />
                  <p className="text-white/25 font-mono text-xs italic">
                    No plots yet. Run an experiment that calls <code className="text-white/40">plt.show()</code>.
                  </p>
                </div>
              )}
              {!isRunning && plots.length > 0 && (
                <div className="flex flex-col gap-4">
                  {plots.map((b64, i) => (
                    <div
                      key={i}
                      className="rounded-lg overflow-hidden border border-white/10 bg-white shadow-lg"
                    >
                      <img
                        src={`data:image/png;base64,${b64}`}
                        alt={`Plot ${i + 1}`}
                        className="w-full h-auto block"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}