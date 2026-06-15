import { useState, useEffect, useRef, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Play, Save, RotateCcw, CheckCircle2, Terminal, ArrowLeft, Lightbulb, Beaker, HelpCircle, Database, Book, Volume2, Square, Sparkles, ExternalLink, Cpu } from "lucide-react";
import { courses } from "@/lib/course-data";
import Editor from "@monaco-editor/react";
import { toast } from "sonner";
import { supabase, awardBadge, markExperimentComplete, migrateGuestProgress} from "@/lib/supabase";
import { MemoryManagerSim } from "@/components/simulations/MemoryManagerSim";
import { MirrorPortalSim } from "@/components/simulations/MirrorPortalSim";
import { LinearSearchSim } from "@/components/simulations/LinearSearchSim";
import { BinarySearchSim } from "@/components/simulations/BinarySearchSim";
import { BubbleSortSim } from "@/components/simulations/BubbleSortSim";
import { SelectionSortSim } from "@/components/simulations/SelectionSortSim";
import { InsertionSortSim } from "@/components/simulations/InsertionSortSim";
import { LinkedCityCampaign } from "@/components/simulations/LinkedCityCampaign";
import { StackTowerCampaign } from "@/components/simulations/StackTowerCampaign";
import { TransitDistrictCampaign } from "@/components/simulations/TransitDistrictCampaign";
import { IntelligenceCenterCampaign } from "@/components/simulations/IntelligenceCenterCampaign";
import { CommandTreeCampaign } from "@/components/simulations/CommandTreeCampaign";
import { DataVaultCampaign } from "@/components/simulations/DataVaultCampaign";
import { GenesisTerminalCampaign } from "@/components/simulations/GenesisTerminalCampaign";
import { AlgorithmForestCampaign } from "@/components/simulations/AlgorithmForestCampaign";
import { ExpressionLaboratoryCampaign } from "@/components/simulations/ExpressionLaboratoryCampaign";
import { DecisionKingdomCampaign } from "@/components/simulations/DecisionKingdomCampaign";
import { TimeLoopValleyCampaign } from "@/components/simulations/TimeLoopValleyCampaign";
import { ArrayWarehouseDistrictCampaign } from "@/components/simulations/ArrayWarehouseDistrictCampaign";
import { MatrixCitadelCampaign } from "@/components/simulations/MatrixCitadelCampaign";
import { MemoryNexusCampaign } from "@/components/simulations/MemoryNexusCampaign";
import { DataArchitectDistrictCampaign } from "@/components/simulations/DataArchitectDistrictCampaign";
import { FunctionTempleCampaign } from "@/components/simulations/FunctionTempleCampaign";
import { RecursiveCavernsCampaign } from "@/components/simulations/RecursiveCavernsCampaign";
import { PointerDimensionCampaign } from "@/components/simulations/PointerDimensionCampaign";
import { ArchiveKingdomCampaign } from "@/components/simulations/ArchiveKingdomCampaign";
import { DataDetectiveLabCampaign } from "@/components/simulations/DataDetectiveLabCampaign";
import { DataCleaningLabCampaign } from "@/components/simulations/DataCleaningLabCampaign";
import { SimilarityLabCampaign } from "@/components/simulations/SimilarityLabCampaign";
import { DecisionLabCampaign } from "@/components/simulations/DecisionLabCampaign";
import { PredictionLabCampaign } from "@/components/simulations/PredictionLabCampaign";
import { EnsembleIntelligenceLabCampaign } from "@/components/simulations/EnsembleIntelligenceLabCampaign";
import { ProbabilityLabCampaign } from "@/components/simulations/ProbabilityLabCampaign";
import { BoundaryLabCampaign } from "@/components/simulations/BoundaryLabCampaign";
import { SimpleRegressionLabCampaign } from "@/components/simulations/SimpleRegressionLabCampaign";
import { ClassificationLabCampaign } from "@/components/simulations/ClassificationLabCampaign";
import { NeuralNetworkLabCampaign } from "@/components/simulations/NeuralNetworkLabCampaign";
import { CustomerSegmentationLabCampaign } from "@/components/simulations/CustomerSegmentationLabCampaign";
import { MembershipIntelligenceLabCampaign } from "@/components/simulations/MembershipIntelligenceLabCampaign";
import { HiddenPatternLabCampaign } from "@/components/simulations/HiddenPatternLabCampaign";
import { DBMSConstraintsSim } from "@/components/simulations/DBMSConstraintsSim";
import { DBMSSubqueriesSim } from "@/components/simulations/DBMSSubqueriesSim";
import { DBMSQueryquestSim } from "@/components/simulations/DBMSQueryquestSim";
import { DBMSDatacitySim } from "@/components/simulations/DBMSDatacitySim";
import { PLSQLQuestSim } from "@/components/simulations/PLSQLQuestSim";
import { LogicKingdomSim } from "@/components/simulations/LogicKingdomSim";
import { LoopVerseSim } from "@/components/simulations/LoopVerseSim";
import { PLSQLCommandCenterSim } from "@/components/simulations/PLSQLCommandCenterSim";
import { SQLKingdomSim } from "@/components/simulations/SQLKingdomSim";
import { CursorQuestSim } from "@/components/simulations/CursorQuestSim";
import { TriggerCitySim } from "@/components/simulations/TriggerCitySim";
import { DataKingdomSim } from "@/components/simulations/DataKingdomSim";
import { JDBCOdysseySim } from "@/components/simulations/JDBCOdysseySim";
import { SQLDefenseAcademySim } from "@/components/simulations/SQLDefenseAcademySim";
import { DatabaseAssassinSim } from "@/components/simulations/DatabaseAssassinSim";
import { AVLTreeSim } from "@/components/simulations/AVLTreeSim";
import { AVLDeletionSim } from "@/components/simulations/AVLDeletionSim";
import { RedBlackSim } from "@/components/simulations/RedBlackSim";
import { BTreeSim } from "@/components/simulations/BTreeSim";
import { PythonInterpreterCampaign } from "@/components/simulations/PythonInterpreterCampaign";
import { PythonTalentShowCampaign } from "@/components/simulations/PythonTalentShowCampaign";
import { BurgerOrderCampaign } from "@/components/simulations/BurgerOrderCampaign";
import { TrafficSignalCampaign } from "@/components/simulations/TrafficSignalCampaign";
import { BPlusTreeSim } from "@/components/simulations/BPlusTreeSim";
import { SegmentTreeSim } from "@/components/simulations/SegmentTreeSim";
import { FenwickCitySim } from "@/components/simulations/FenwickCitySim";
import { HeapCitySim } from "@/components/simulations/HeapCitySim";
import { UnionVerseSim } from "@/components/simulations/UnionVerseSim";
import { HashCitySim } from "@/components/simulations/HashCitySim";
import { CuckooKingdomSim } from "@/components/simulations/CuckooKingdomSim";
import { TrieSim } from "@/components/simulations/TrieSim";
import { PathfinderSim } from "@/components/simulations/PathfinderSim";
import { BellmanFordSim } from "@/components/simulations/BellmanFordSim";
import { KruskalSim } from "@/components/simulations/KruskalSim";
import { PrimAlgorithmSim } from "@/components/simulations/PrimSim";
import { GraphRaidersSim } from "@/components/simulations/GraphRaidersSim";
import { JavaMemoryInspectorSim } from "@/components/simulations/JavaMemoryInspectorSim";
import { JavaParabolaPlotterSim } from "@/components/simulations/JavaParabolaPlotterSim";
import { JavaBinarySearchSim } from "@/components/simulations/JavaBinarySearchSim";
import { JavaBubbleSortSim } from "@/components/simulations/JavaBubbleSortSim";
import { JavaStringBufferSim } from "@/components/simulations/JavaStringBufferSim";
import { JavaBlueprintFactorySim } from "@/components/simulations/JavaBlueprintFactorySim";
import { JavaMethodDispatcherSim } from "@/components/simulations/JavaMethodDispatcherSim";
import { JavaObjectAssemblySim } from "@/components/simulations/JavaObjectAssemblySim";
import { JavaConstructorSelectorSim } from "@/components/simulations/JavaConstructorSelectorSim";
import { JavaFamilyTreeSim } from "@/components/simulations/JavaFamilyTreeSim";
import { JavaInheritanceChainSim } from "@/components/simulations/JavaInheritanceChainSim";
import { JavaShapeFactorySim } from "@/components/simulations/JavaShapeFactorySim";
import { JavaTryCatchSim } from "@/components/simulations/JavaTryCatchSim";
import { JavaMultipleCatchSim } from "@/components/simulations/JavaMultipleCatchSim";
import { JavaThrowsSim } from "@/components/simulations/JavaThrowsSim";
import { JavaThreadLifecycleSim } from "@/components/simulations/JavaThreadLifecycleSim";
import { JavaRunnableSim } from "@/components/simulations/JavaRunnableSim";
import { JavaThreadPrioritySim } from "@/components/simulations/JavaThreadPrioritySim";
import { JavaThreadSyncSim } from "@/components/simulations/JavaThreadSyncSim";
import { JavaIsAliveSim } from "@/components/simulations/JavaIsAliveSim";
import { JavaInterruptSim } from "@/components/simulations/JavaInterruptSim";
import { JavaDaemonSim } from "@/components/simulations/JavaDaemonSim";
import { JavaProducerConsumerSim } from "@/components/simulations/JavaProducerConsumerSim";
import { JavaPackageSim } from "@/components/simulations/JavaPackageSim";
import { JavaFXLabelImageSim } from "@/components/simulations/JavaFXLabelImageSim";
import { JavaFXTipCalcSim } from "@/components/simulations/JavaFXTipCalcSim";
import { JavaJDBCConnectSim } from "@/components/simulations/JavaJDBCConnectSim";
import { JavaJDBCInsertSim } from "@/components/simulations/JavaJDBCInsertSim";
import { JavaJDBCDeleteSim } from "@/components/simulations/JavaJDBCDeleteSim";
import { PostSolveAuthModal } from '@/components/PostSolveAuthModal';
import { markGuestSolved, hasGuestSolved } from '@/lib/guestProgress';
type WorkspaceSearch = {
  exp?: string;
};

export const Route = createFileRoute("/workspace")({
  validateSearch: (search: Record<string, unknown>): WorkspaceSearch => {
    return {
      exp: search.exp as string | undefined,
    };
  },
  head: () => ({ meta: [{ title: "Workspace — VLMS" }, { name: "description", content: "Isolated runtime workspace for student experiments." }] }),
  component: Workspace,
});

function getExperimentDetails(expId?: string) {
  if (!expId) return null;
  for (const course of Object.values(courses)) {
    for (const week of course.weeks) {
      for (const exp of week.experiments) {
        if (exp.id === expId) return { course, week, experiment: exp };
      }
    }
  }
  return null;
}

const getAILogoUrl = (expId?: string) => {
  if (!expId) return null;
  const map: Record<string, string> = {
    "ai-m1-1": "/Logos/googlegemini.svg", 
    "ai-m1-2": "/Logos/chatgpt-4.svg", 
    "ai-m1-3": "/Logos/leonardo-ai-seeklogo.svg", 
    "ai-m1-4": "/Logos/midjourney-seeklogo.svg", 
    "ai-m2-1": "/Logos/chatgpt-4.svg", 
    "ai-m2-2": "/Logos/claude-seeklogo.svg", 
    "ai-m2-3": "/Logos/googlegemini.svg", 
    "ai-m2-4": "https://logo.clearbit.com/perplexity.ai", 
    "ai-m3-1": "/Logos/claudecode.svg", 
    "ai-m3-2": "/Logos/cursor.svg", 
    "ai-m3-3": "/Logos/githubcopilot.svg", 
    "ai-m3-4": "/Logos/replit-seeklogo.svg", 
    "ai-m4-1": "/Logos/lovable-color.svg", 
    "ai-m4-2": "https://logo.clearbit.com/stackblitz.com", 
    "ai-m4-3": "/Logos/v0-seeklogo.svg", 
    "ai-m4-4": "/Logos/figma.svg", 
    "ai-m5-1": "/Logos/notebooklm.svg", 
    "ai-m5-2": "https://tse3.mm.bing.net/th/id/OIP.Efys2NIOKWykw5OUjsUjkAHaFj?pid=Api&P=0&h=180", 
    "ai-m5-3": "https://logo.clearbit.com/napkin.ai", 
    "ai-m5-4": "https://logo.clearbit.com/elicit.com" 
  };
  return map[expId];
};


// ── SQL execution via sql.js (SQLite WASM, loaded from CDN) ──────────────────
let sqlJsPromise: Promise<any> | null = null;

function loadSqlJs(): Promise<any> {
  if (sqlJsPromise) return sqlJsPromise;
  sqlJsPromise = new Promise((resolve, reject) => {
    // Inject sql.js script from CDN if not already present
    if ((window as any).initSqlJs) {
      (window as any).initSqlJs({
        locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`,
      }).then(resolve).catch(reject);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js";
    script.onload = () => {
      (window as any).initSqlJs({
        locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`,
      }).then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error("Failed to load sql.js from CDN"));
    document.head.appendChild(script);
  });
  return sqlJsPromise;
}

// ── Pyodide execution via CDN ───────────────────────────────────────────────
let pyodidePromise: Promise<any> | null = null;

function loadPyodide(): Promise<any> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = new Promise((resolve, reject) => {
    if ((window as any).loadPyodide) {
      (window as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
      }).then(resolve).catch(reject);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";
    script.onload = () => {
      (window as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
      }).then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error("Failed to load Pyodide from CDN"));
    document.head.appendChild(script);
  });
  return pyodidePromise;
}

interface SqlResultTable {
  columns: string[];
  rows: any[][];
}

function runSqlQuery(SQL: any, dbRef: React.MutableRefObject<any>, query: string): { tables: SqlResultTable[]; messages: string[]; error?: string } {
  try {
    // Create a fresh in-memory DB each run so state is predictable
    if (dbRef.current) {
      try { dbRef.current.close(); } catch {}
    }
    dbRef.current = new SQL.Database();
    const db = dbRef.current;

    const tables: SqlResultTable[] = [];
    const messages: string[] = [];

    const results = db.exec(query);

    if (results.length === 0) {
      // DML / DDL statements return empty results
      messages.push("Query executed successfully. No rows returned.");
    } else {
      for (const result of results) {
        tables.push({ columns: result.columns, rows: result.values });
      }
    }

    return { tables, messages };
  } catch (err: any) {
    return { tables: [], messages: [], error: err.message || "Unknown SQL error" };
  }
}

// ── SQL Result Renderer ──────────────────────────────────────────────────────
function SqlResultView({ tables, messages, error }: { tables: SqlResultTable[]; messages: string[]; error?: string }) {
  if (error) {
    return (
      <pre className="text-red-400 text-[12px] font-mono whitespace-pre-wrap p-1">
        ERROR: {error}
      </pre>
    );
  }

  if (messages.length > 0 && tables.length === 0) {
    return (
      <div className="text-green-400 text-[12px] font-mono p-1">
        {messages.map((m, i) => <div key={i}>✓ {m}</div>)}
      </div>
    );
  }

  return (
    <div className="space-y-3 overflow-auto">
      {tables.map((t, ti) => (
        <div key={ti} className="text-[11px] font-mono">
          <div className="text-white/40 mb-1">{t.rows.length} row{t.rows.length !== 1 ? "s" : ""} returned</div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {t.columns.map((col, ci) => (
                  <th
                    key={ci}
                    className="text-left px-3 py-1.5 bg-white/10 text-white/80 border border-white/10 font-semibold uppercase tracking-wider text-[10px]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-1.5 text-green-300 border-x border-white/5">
                      {cell === null ? <span className="text-white/30 italic">NULL</span> : String(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
function SimulationPlayer({ data }: { data: any }) {
  const [stepIdx, setStepIdx] = useState(0);
  const step = data.steps[stepIdx];
  if (!step) return null;

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex-1 grid grid-cols-[1fr_250px_1fr] divide-x divide-border overflow-hidden">
        {/* Code Panel */}
        <div className="p-4 overflow-y-auto bg-[#1e1e1e] font-mono text-sm">
          <div className="text-muted-foreground mb-4 font-sans text-[10px] uppercase tracking-wider">Source Code</div>
          {data.code.split('\n').map((line: string, i: number) => {
            const lineNum = i + 1;
            const isActive = step.line === lineNum;
            return (
              <div key={lineNum} className={`flex px-2 py-0.5 transition-colors ${isActive ? 'bg-yellow-500/20 border-y border-yellow-500/30' : 'border-y border-transparent'}`}>
                <span className="w-6 text-muted-foreground/50 select-none text-right mr-4 text-xs">{lineNum}</span>
                <span className={isActive ? 'text-yellow-100' : 'text-gray-300'}>{line}</span>
              </div>
            );
          })}
        </div>
        {/* Memory Panel */}
        <div className="bg-card overflow-y-auto flex flex-col">
          <div className="p-4 border-b border-border text-muted-foreground font-sans text-[10px] uppercase tracking-wider">Memory State</div>
          <div className="p-4 flex-1">
            {step.memory && step.memory.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead className="text-[10px] text-muted-foreground uppercase">
                  <tr>
                    <th className="pb-2 font-medium">Var</th>
                    <th className="pb-2 font-medium">Val</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-mono">
                  {step.memory.map((m: any, i: number) => (
                    <tr key={i} className="border-t border-border/30">
                      <td className="py-2 text-cyan truncate pr-2 max-w-[80px]" title={`${m.type} ${m.variable}`}>{m.variable}</td>
                      <td className="py-2 text-mint truncate max-w-[80px]" title={m.value}>{m.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-muted-foreground/50 text-xs italic text-center mt-10">Empty memory</div>
            )}
          </div>
        </div>
        {/* Output Panel */}
        <div className="bg-black flex flex-col">
          <div className="p-4 border-b border-border/20 text-muted-foreground font-sans text-[10px] uppercase tracking-wider bg-[#0f111a]">Console Output</div>
          <div className="p-4 flex-1 font-mono text-sm text-[#3fb950] whitespace-pre-wrap overflow-y-auto bg-[#0a0a0a]">
            {step.output}
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-between">
        <div className="flex-1 flex items-center gap-4">
          <span className="px-3 py-1 bg-cyan/20 text-cyan rounded-full text-xs font-medium border border-cyan/30 whitespace-nowrap">Step {stepIdx + 1} / {data.steps.length}</span>
          <p className="text-sm text-foreground/90 font-medium">{step.annotation}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setStepIdx(0)} disabled={stepIdx === 0} className="px-3 py-1.5 bg-secondary text-foreground text-xs font-medium rounded border border-border hover:bg-secondary/80 disabled:opacity-50 transition-colors">Reset</button>
          <button onClick={() => setStepIdx(s => s - 1)} disabled={stepIdx === 0} className="px-3 py-1.5 bg-secondary text-foreground text-xs font-medium rounded border border-border hover:bg-secondary/80 disabled:opacity-50 transition-colors">Step Back</button>
          <button onClick={() => setStepIdx(s => s + 1)} disabled={stepIdx === data.steps.length - 1} className="px-4 py-1.5 bg-cyan text-cyan-foreground text-xs font-medium rounded hover:bg-cyan/90 disabled:opacity-50 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}

// ── TTS Components ───────────────────────────────────────────────────────────
function HighlightableText({ text, activeCharIndex }: { text: string, activeCharIndex: number }) {
  const tokens = useMemo(() => {
    const parts = text.split(/(\s+)/);
    let currentIdx = 0;
    return parts.map(part => {
      const start = currentIdx;
      const end = currentIdx + part.length;
      currentIdx = end;
      return { part, start, end, isWord: /\S/.test(part) };
    });
  }, [text]);

  return (
    <>
      {tokens.map((t, i) => {
        const isActive = activeCharIndex >= t.start && activeCharIndex < t.end && t.isWord;
        return (
          <span key={i} className={isActive ? "text-fuchsia-400 bg-fuchsia-400/20 rounded px-0.5 transition-colors duration-75" : ""}>
            {t.part}
          </span>
        );
      })}
    </>
  );
}

function TTSSection({ heading, textContent, renderContent }: { heading: string, textContent: string, renderContent: (activeCharIndex: number) => React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCharIndex, setActiveCharIndex] = useState(-1);

  const getFemaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('girl') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('victoria') || v.name.toLowerCase().includes('zira')) || voices[0];
  };

  const toggleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setActiveCharIndex(-1);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textContent);
      const voice = getFemaleVoice();
      if (voice) utterance.voice = voice;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        setActiveCharIndex(-1);
      };
      utterance.onboundary = (e) => {
        if (e.name === 'word') {
          setActiveCharIndex(e.charIndex);
        }
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setActiveCharIndex(-1);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, [textContent]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold font-display">{heading}</h2>
        <button 
          onClick={toggleSpeak}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-400/10 text-fuchsia-400 hover:bg-fuchsia-400/20 transition-colors border border-fuchsia-400/30 text-xs font-medium"
        >
          {isPlaying ? <Square className="size-3" /> : <Volume2 className="size-3" />}
          {isPlaying ? "Stop" : "Speak"}
        </button>
      </div>
      {renderContent(activeCharIndex)}
    </div>
  );
}

function HintTooltip({ hint }: { hint: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary border border-border text-muted-foreground hover:bg-purple-500/10 hover:border-purple-400/50 hover:text-purple-400 transition-colors"
        aria-label="Show hint"
      >
        <HelpCircle className="size-4" />
      </button>

      {open && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="absolute right-0 top-9 w-72 z-50 bg-card border border-purple-400/40 rounded-lg p-4 shadow-lg text-sm leading-relaxed"
        >
          <div className="absolute -top-[5px] right-2.5 w-2.5 h-2.5 bg-card border-l border-t border-purple-400/40 rotate-45" />
          <div className="flex items-center gap-1.5 mb-2 text-purple-400 text-[11px] font-medium uppercase tracking-wider">
            <Lightbulb className="size-3.5" />
            Hint
          </div>
          <p className="text-foreground/80 text-[13px]">{hint}</p>
        </div>
      )}
    </div>
  );
}

function Workspace() {
  const { exp } = Route.useSearch();
  const navigate = useNavigate();
  const details = getExperimentDetails(exp);

  const title = details?.experiment.title || "Experiment Workspace";
  const courseTitle = details?.course.title || "Sandbox";
  const weekTitle = details?.week.title || "";

  const [language, setLanguage] = useState("c");
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // SQL-specific state
  const [sqlLoaded, setSqlLoaded] = useState(false);
  const [sqlLoadError, setSqlLoadError] = useState<string | null>(null);
  const [sqlResult, setSqlResult] = useState<{ tables: SqlResultTable[]; messages: string[]; error?: string } | null>(null);
  const sqlRef = useRef<any>(null);    // sql.js SQL instance
  const sqlDbRef = useRef<any>(null);  // current in-memory DB

  // Pyodide-specific state
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [pyodideLoadError, setPyodideLoadError] = useState<string | null>(null);
  const pyodideRef = useRef<any>(null); // pyodide instance

  const [showPostSolveModal, setShowPostSolveModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Pre-load sql.js when SQL tab is selected
  useEffect(() => {
    if (language === "sql" && !sqlLoaded) {
      loadSqlJs()
        .then((SQL) => {
          sqlRef.current = SQL;
          setSqlLoaded(true);
        })
        .catch((err) => {
          setSqlLoadError(err.message || "Failed to load SQL engine");
        });
    }
  }, [language, sqlLoaded]);

  // Pre-load pyodide when python is active for the Python course
  useEffect(() => {
    if (language === "python" && details?.course.id === "python" && !pyodideLoaded) {
      loadPyodide()
        .then((pyodide) => {
          pyodideRef.current = pyodide;
          setPyodideLoaded(true);
        })
        .catch((err) => {
          setPyodideLoadError(err.message || "Failed to load Python engine");
        });
    }
  }, [language, pyodideLoaded, details]);

  const templates: Record<string, { file: string; code: string; version: string }> = {
    c: {
      file: "main.c",
      version: "10.2.0",
      code: `#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    \n    printf("Hello World\\n");\n    \n    return 0;\n}`,
    },
    java: {
      file: "Main.java",
      version: "15.0.2",
      code: `public class Main {\n    public static void main(String[] args) {\n        // Write your solution here\n        \n        System.out.println("Hello World");\n    }\n}`,
    },
    python: {
      file: "main.py",
      version: "3.10.0",
      code: `def solve():\n    # Write your solution here\n    print("Hello World")\n\nif __name__ == "__main__":\n    solve()`,
    },
    sql: {
      file: "query.sql",
      version: "SQLite 3.x",
      code: `-- SQL Sandbox (SQLite — in-memory, resets on each run)
-- Every run starts with a fresh database.

-- 1. Create a table
CREATE TABLE students (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  name    TEXT    NOT NULL,
  grade   INTEGER,
  city    TEXT
);

-- 2. Insert rows
INSERT INTO students (name, grade, city) VALUES
  ('Alice',  92, 'Hyderabad'),
  ('Bob',    78, 'Chennai'),
  ('Charlie',85, 'Bangalore'),
  ('Diana',  95, 'Hyderabad');

-- 3. Query
SELECT name, grade, city
FROM   students
WHERE  grade >= 85
ORDER  BY grade DESC;`,
    },
  };

  useEffect(() => {
    if (details?.course.id === "dbms") {
      setLanguage("sql");
    } else if (
      details?.course.id === "machine-learning" ||
      details?.course.id === "llms" ||
      details?.course.id === "python"
    ) {
      setLanguage("python");
    } else if (details?.course.id === "advanced-data-structures" || details?.course.id === "java") {
      setLanguage("java");
    } 
    else {
      setLanguage("c");
    }
  }, [exp]);

  // Reset code on language / experiment change
  useEffect(() => {
    experimentStartTime.current = Date.now();
    let newCode = templates[language].code;
    if (language === "c" && details?.experiment.title === "Hello World") {
      newCode = `#include<stdio.h>\nint main(){\n  printf("Hello World");\n  return 0;\n}`;
    }
    setCode(newCode);
    setOutput("");
    setSqlResult(null);
    setIsError(false);
  }, [language, exp]);

  const handleReset = () => {
    setCode(templates[language].code);
    setOutput("");
    setSqlResult(null);
    setIsError(false);
  };

  // ── SQL Run ──────────────────────────────────────────────────────────────
  const handleRunSql = () => {
    if (!sqlRef.current) {
      setSqlResult({ tables: [], messages: [], error: sqlLoadError || "SQL engine not loaded yet. Please wait…" });
      return;
    }
    setIsLoading(true);
    setSqlResult(null);
    try {
      const result = runSqlQuery(sqlRef.current, sqlDbRef, code);
      setSqlResult(result);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Pyodide Python execution in-browser ───────────────────────────────────
  const handleRunPyodide = async () => {
    if (!pyodideRef.current) {
      setOutput(pyodideLoadError || "Python engine is loading, please wait…");
      setIsError(true);
      return;
    }
    setIsLoading(true);
    setOutput("Executing locally in browser...");
    setIsError(false);

    try {
      const pyodide = pyodideRef.current;
      let stdoutBuffer = "";
      let stderrBuffer = "";

      pyodide.setStdout({
        batched: (str: string) => {
          stdoutBuffer += str + "\n";
        },
      });

      pyodide.setStderr({
        batched: (str: string) => {
          stderrBuffer += str + "\n";
        },
      });

      // Run user code directly — Pyodide captures print() output via the
      // JS-level setStdout/setStderr callbacks registered above.
      // Do NOT redirect sys.stdout inside Python; Pyodide bypasses it.
      const runCode = `
import sys, io, builtins, traceback

sys.stdin = io.StringIO(${JSON.stringify(stdin || "")})

def _custom_input(prompt=""):
    if prompt:
        print(prompt, end="")
    line = sys.stdin.readline()
    if not line:
        raise EOFError("EOF when reading a line")
    return line.rstrip('\\r\\n')

builtins.input = _custom_input

try:
    exec(${JSON.stringify(code)}, {"__builtins__": builtins, "__name__": "__main__"})
except SystemExit:
    pass
except BaseException:
    traceback.print_exc()
`;
      await pyodide.runPythonAsync(runCode);

      if (stderrBuffer) {
        setIsError(true);
        setOutput(stderrBuffer.replace(/\n$/, ""));
      } else {
        setIsError(false);
        setOutput(stdoutBuffer.replace(/\n$/, "") || "Program exited with no output.");
      }
    } catch (err: any) {
      setIsError(true);
      setOutput(err.message || "An error occurred during local python execution.");
    } finally {
      setIsLoading(false);
    }
  };

  // ── C / Java / Python Run (Wandbox + Paiza fallback) ─────────────────────
  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput("Executing...");
    setIsError(false);
  
    try {
      const compilerMap: Record<string, string> = {
        c: "gcc-head-c",
        java: "openjdk-jdk-22+36",
        python: "cpython-head",
      };
  
      let finalCode = code;
  
      // Fix for Java compilation on Wandbox
      if (language === "java") {
        finalCode = code.replace(/public\s+class\s+/, "class ");
      }
  
      const bodyPayload: any = {
        compiler: compilerMap[language] || "gcc-head",
        code: finalCode,
        stdin,
        options: language === "c" ? "warning" : "",
      };
  
      if (language === "c") {
        bodyPayload["compiler-option-raw"] = "-lm";
      }

      // --- Attempt Wandbox with 1 retry ---
      let wandboxOk = false;
      let data: any = null;

      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await fetch("https://wandbox.org/api/compile.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyPayload),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Wandbox HTTP ${response.status}: ${errorText}`);
          }
          data = await response.json();

          // Check for OCI / container runtime errors in compiler_error or program_error
          const combinedErr = (data.compiler_error || "") + (data.program_error || "");
          if (combinedErr.includes("OCI runtime") || combinedErr.includes("crun:") || combinedErr.includes("Resource temporarily unavailable")) {
            throw new Error("Wandbox container overloaded");
          }

          wandboxOk = true;
          break;
        } catch (e: any) {
          if (attempt === 0) {
            setOutput("Server busy, retrying...");
            await new Promise(r => setTimeout(r, 1500));
          }
        }
      }

      // --- If Wandbox failed, try Paiza.io as fallback for Java ---
      if (!wandboxOk && language === "java") {
        setOutput("Wandbox unavailable. Using backup compiler...");
        try {
          // Paiza.io create endpoint
          const createRes = await fetch("https://api.paiza.io/runners/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              source_code: code, // Paiza supports public class
              language: "java",
              input: stdin || "",
              api_key: "guest",
            }),
          });
          const createData = await createRes.json();
          const sessionId = createData.id;

          // Poll for result
          let result: any = null;
          for (let i = 0; i < 20; i++) {
            await new Promise(r => setTimeout(r, 1000));
            const statusRes = await fetch(`https://api.paiza.io/runners/get_details?id=${sessionId}&api_key=guest`);
            result = await statusRes.json();
            if (result.status === "completed") break;
          }

          if (result && result.status === "completed") {
            if (result.build_stderr) {
              setIsError(true);
              setOutput(result.build_stderr);
            } else if (result.stderr) {
              setIsError(true);
              setOutput(result.stderr);
            } else {
              setIsError(false);
              setOutput(result.stdout || "Program exited with no output.");
            }
            return;
          } else {
            throw new Error("Backup compiler timed out");
          }
        } catch (paizaErr: any) {
          throw new Error(`Both compilers unavailable. Please try again in a moment.\n\n${paizaErr.message}`);
        }
      }

      // --- If Wandbox still failed for non-Java, throw ---
      if (!wandboxOk) {
        throw new Error("Compiler server is temporarily overloaded. Please try again in a few seconds.");
      }

      // --- Process successful Wandbox response ---
      if (data.compiler_error) {
        setIsError(true);
        setOutput(data.compiler_error);
      } else if (data.program_error) {
        setIsError(true);
        setOutput(data.program_error);
      } else {
        setIsError(false);
        setOutput(data.program_output || "Program exited with no output.");
      }
    } catch (err: any) {
      setIsError(true);
      setOutput(`Execution failed: ${err.message || "Compiler server unavailable"}\n\nPlease try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRun = () => {
    if (language === "sql") {
      handleRunSql();
    } else if (language === "python" && details?.course.id === "python") {
      handleRunPyodide();
    } else {
      handleRunCode();
    }
  };

  const isSql = language === "sql";
  const isAITools = details?.course.id === "ai-tools";
  const isIot = details?.course.id === "iot";
  const isQuantum = details?.course.id === "quantum-computing";

  const WORKSPACE_STEPS = isAITools 
    ? ["Aim", "Theory", "Pretest", "Procedure", "Solve", "Posttest", "References"]
    : isIot
    ? ["Aim", "Theory", "Pretest", "Procedure", "Tinkercad", "Posttest", "References"]
    : isQuantum
    ? ["Aim", "Theory", "Visualization", "Interactive Experiment", "Quiz"]
    : ["Aim", "Theory", "Pretest", "Procedure", "Simulation", "Code Test", "Posttest", "References"];
  const experimentStartTime = useRef<number>(Date.now());
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  
  const [pretestAnswers, setPretestAnswers] = useState<Record<number, number>>({});
  const [posttestAnswers, setPosttestAnswers] = useState<Record<number, number>>({});
  const [pretestReviewed, setPretestReviewed] = useState(false);
  const [posttestReviewed, setPosttestReviewed] = useState(false);

  const currentStepName = WORKSPACE_STEPS[activeStepIndex].toLowerCase();
  const currentContent = details?.experiment?.content as any;
  let isNextEnabled = true;

  const calculateScore = (stepName: "pretest" | "posttest" | "quiz") => {
    const dataKey = stepName === "quiz" ? "posttest" : stepName;
    const test = currentContent?.[dataKey];
    if (!test) return 0;
    const answers = stepName === "pretest" ? pretestAnswers : posttestAnswers;
    let score = 0;
    test.forEach((q: any, i: number) => {
      if (answers[i] === q.answerIndex) score++;
    });
    return score;
  };

  if (currentContent) {
    if (currentStepName === "pretest" && currentContent.pretest) {
      if (Object.keys(pretestAnswers).length < currentContent.pretest.length) {
        isNextEnabled = false;
      }
    } else if ((currentStepName === "posttest" || currentStepName === "quiz") && currentContent.posttest) {
      if (Object.keys(posttestAnswers).length < currentContent.posttest.length) {
        isNextEnabled = false;
      }
    }
  }

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
  
    if (!user) {
      // ── GUEST PATH: Check if they've already skipped once for this experiment ──
      const alreadyShown = sessionStorage.getItem('vlms_popup_shown') === 'true';
if (alreadyShown) {
  toast.success("Experiment Completed! 🎉");
  if (details?.course?.id) {
    navigate({ to: `/course/${details.course.id}`, hash: 'experiments' });
  } else {
    navigate({ to: '/courses' });
  }
  return;
}
  
      // First time completing without login — show the prompt modal
      setShowPostSolveModal(true);
      return;
    }
  
    // ── LOGGED-IN PATH (unchanged from your original) ─────────────────────────
    if (details?.experiment?.id && details?.course?.id) {
      const saved = await markExperimentComplete(user.id, details.experiment.id, details.course.id);
      if (saved) console.log(`✅ Saved: ${details.experiment.id}`);
    }
  
    // Keep localStorage in sync for logged-in users too (optional, harmless)
    if (details?.experiment?.id) {
      const solved = JSON.parse(localStorage.getItem('solved_experiments') || '{}');
      solved[details.experiment.id] = true;
      localStorage.setItem('solved_experiments', JSON.stringify(solved));
    }
  
    // Badge logic (your existing code, unchanged)
    try {
      const badgePromises: Promise<void>[] = [];
      const { data: completions } = await supabase
        .from('experiment_completions')
        .select('experiment_id, course_id')
        .eq('user_id', user.id);
  
      const totalSolved = completions?.length ?? 0;
      const solvedIds = new Set(completions?.map((c: any) => c.experiment_id) ?? []);
  
      if (totalSolved === 1) badgePromises.push(awardBadge(user.id, 'first_solve'));
  
      const elapsedMs = Date.now() - experimentStartTime.current;
      if (elapsedMs < 2 * 60 * 1000) badgePromises.push(awardBadge(user.id, 'speed_coder'));
  
      const posttest = (details?.experiment?.content as any)?.posttest;
      if (posttest?.length > 0) {
        const correct = posttest.filter((q: any, i: number) => posttestAnswers[i] === q.answerIndex).length;
        if (correct === posttest.length) badgePromises.push(awardBadge(user.id, 'perfect_score'));
      }
  
      if (details?.course) {
        const allExpIds: string[] = details.course.weeks.flatMap(
          (w: any) => w.experiments.map((e: any) => e.id)
        );
        if (allExpIds.every(id => solvedIds.has(id))) badgePromises.push(awardBadge(user.id, 'all_courses'));
      }
  
      const uniqueCourses = new Set(completions?.map((c: any) => c.course_id) ?? []);
      if (uniqueCourses.size >= 3) badgePromises.push(awardBadge(user.id, 'curious_mind'));
  
      await Promise.all(badgePromises);
    } catch (err) {
      console.error('Badge error:', err);
    }
  
    toast.success("Experiment Completed Successfully! 🎉");
    if (details?.course?.id) {
      navigate({ to: `/course/${details.course.id}`, hash: 'experiments' });
    } else {
      navigate({ to: '/courses' });
    }
  };

  // Called when guest clicks "Skip for now"
const handlePostSolveSkip = () => {
  setShowPostSolveModal(false);
  if (details?.experiment?.id && details?.course?.id) {
    sessionStorage.setItem('vlms_popup_shown', 'true');
  }
  toast.success("Experiment saved locally! Sign in anytime to sync. 🎉");
  if (details?.course?.id) {
    navigate({ to: `/course/${details.course.id}`, hash: 'experiments' });
  } else {
    navigate({ to: '/courses' });
  }
};

// Called when guest successfully logs in / signs up from the post-solve modal
const handlePostSolveAuthenticated = async (userId: string) => {
  setShowPostSolveModal(false);

  await migrateGuestProgress(userId);

  if (details?.experiment?.id && details?.course?.id) {
    await markExperimentComplete(userId, details.experiment.id, details.course.id);
  }

  try {
    const { data: completions } = await supabase
      .from('experiment_completions')
      .select('experiment_id')
      .eq('user_id', userId);
    if ((completions?.length ?? 0) === 1) {
      await awardBadge(userId, 'first_solve');
    }
  } catch (err) {
    console.error('Badge error on post-solve auth:', err);
  }

  toast.success("Progress saved! Welcome to VLMS 🎉");

  // Wait for Supabase session to be fully written before reloading
  await new Promise(r => setTimeout(r, 800));

  window.location.href = details?.course?.id
    ? `/course/${details.course.id}#experiments`
    : '/courses';
};


  const handleNext = () => {
    if (!isNextEnabled) {
      toast.error(`Please answer all questions in the ${currentStepName} before proceeding.`);
      return;
    }
    if (activeStepIndex < WORKSPACE_STEPS.length - 1) {
      const nextIdx = activeStepIndex + 1;
      setActiveStepIndex(nextIdx);
      setMaxStepReached(prev => Math.max(prev, nextIdx));
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) setActiveStepIndex(activeStepIndex - 1);
  };

  return (
    <div className="h-screen flex flex-col pt-[4.5rem] bg-background">
      {/* Top Bar / Stepper */}
      <div className="border-b border-border bg-card">
        <div className="px-6 py-4 flex flex-col gap-4">
          {/* Back button and title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              {details ? (
                <Link to={`/course/${details.course.id}` as any} hash="experiments" className="hover:text-foreground flex items-center gap-1">
                  <ArrowLeft className="size-3.5" /> Back to {courseTitle}
                </Link>
              ) : (
                <Link to="/courses" className="hover:text-foreground flex items-center gap-1">
                  <ArrowLeft className="size-3.5" /> Back
                </Link>
              )}
              {details && <span>/</span>}
              {details && <span>{weekTitle}</span>}
            </div>
            <div className="font-semibold">{title}</div>
            <div className="text-sm font-mono text-muted-foreground">
              Step {activeStepIndex + 1} of {WORKSPACE_STEPS.length}
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {WORKSPACE_STEPS.map((step, idx) => {
              const isCompleted = idx < activeStepIndex;
              const isActive = idx === activeStepIndex;
              const isLocked = idx > maxStepReached && idx !== activeStepIndex;
              
              return (
                <button
                  key={step}
                  onClick={() => {
                    if (idx <= maxStepReached) {
                      setActiveStepIndex(idx);
                    } else if (idx === activeStepIndex + 1) {
                      handleNext();
                    } else {
                      toast.error(`Please complete the ${WORKSPACE_STEPS[activeStepIndex]} step first.`);
                    }
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive ? "bg-cyan/20 text-cyan border border-cyan/30" : 
                    isCompleted ? "bg-secondary text-foreground border border-border" : 
                    "text-muted-foreground hover:bg-secondary/50 border border-transparent"
                  } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isCompleted && <CheckCircle2 className="size-3.5 text-mint" />}
                  <span className={isActive || isCompleted ? "" : "opacity-70"}>{step}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan transition-all duration-300" 
              style={{ width: `${((activeStepIndex + 1) / WORKSPACE_STEPS.length) * 100}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {currentStepName === "code test" || currentStepName === "solve" || currentStepName === "tinkercad" || currentStepName === "interactive experiment" ? (
          // SIMULATION VIEW (Existing Split Pane for Code Test) OR AI LAB SOLVE VIEW OR TINKERCAD
          <div className="h-full grid lg:grid-cols-[1fr_1fr] divide-x divide-border">
            {/* ── Left Pane: Problem Description ─────────────────────────── */}
            <div className="h-full flex flex-col overflow-y-auto bg-card relative pb-24">
              <div className="p-6 border-b border-border bg-secondary/20 flex items-center gap-4">
                {isAITools && getAILogoUrl(details?.experiment.id) && (
                  <div className="size-16 rounded-xl bg-white border border-border flex items-center justify-center p-2 shadow-sm overflow-hidden shrink-0">
                    <img src={getAILogoUrl(details?.experiment.id)!} alt="Tool Logo" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold font-display leading-tight">{title}</h1>
                  <div className="mt-4 flex gap-2">
                    <span className="px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-mint/20 text-mint border border-mint/30">Easy</span>
                    <span className="px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-secondary text-foreground border border-border">Core</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 text-sm text-foreground/90 space-y-6">
                {details ? (
                  <>
                    <section>
                      <h2 className="font-semibold text-base mb-2 flex items-center gap-2"><Beaker className="size-4 text-cyan" /> Problem Statement</h2>
                      <p className="leading-relaxed">{details.experiment.desc}</p>
                      <p className="mt-3 text-muted-foreground leading-relaxed">{details.week.objective}</p>
                    </section>
                    <section>
                      <h2 className="font-semibold text-base mb-2 flex items-center gap-2"><Lightbulb className="size-4 text-mint" /> Expected Output</h2>
                      <div className="bg-secondary/30 border border-border rounded-lg p-4 font-mono text-xs space-y-3">
                        <div className="text-[#3fb950] font-medium">{details.experiment.expected}</div>
                      </div>
                    </section>
                    <section>
                      <h2 className="font-semibold text-base mb-2 flex items-center gap-2"><HelpCircle className="size-4 text-primary" /> Mini Questions</h2>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground text-xs leading-relaxed">
                        {details.experiment.content?.pretest?.slice(0, 3).map((q: any, i: number) => (
                          <li key={i} className="pl-1">{q.question}</li>
                        )) || (
                          <>
                            <li>What edge cases should you consider for this problem?</li>
                            <li>Can you optimize the time complexity?</li>
                            <li>How would this approach scale for large inputs?</li>
                          </>
                        )}
                      </ul>
                    </section>
                  </>
                ) : (
                  <div className="text-muted-foreground">Select a specific experiment from a course to view details here.</div>
                )}
              </div>

              <div className="p-6 border-t border-border bg-secondary/20">
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3">Evaluation Criteria</div>
                <div className="space-y-2">
                  {["Compiles successfully", "Passes base test cases", "Memory efficient"].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-mint" /> {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Next/Prev Buttons for Simulation Pane */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border flex items-center justify-between">
                <button onClick={handlePrev} className="px-4 py-2 rounded-md border border-border bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors">
                  Previous: Procedure
                </button>
                <button onClick={handleNext} className="px-4 py-2 rounded-md bg-cyan text-cyan-foreground font-medium text-sm hover:bg-cyan/90 transition-colors">
                  Next: Posttest
                </button>
              </div>
            </div>

            {/* ── Right Pane: Editor & Console OR Tool Launch ────────────────────────────── */}
            <div className="h-full flex flex-col bg-[#0f111a]">
              {isAITools ? (
                <div className="h-full flex flex-col items-center justify-center p-10 bg-card/50 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-fuchsia-400/5" />
                  <div className="relative z-10 flex flex-col items-center max-w-md">
                    <div className="size-20 rounded-2xl bg-secondary/80 border border-border flex items-center justify-center mb-6 shadow-xl">
                      <Sparkles className="size-10 text-cyan animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-bold font-display mb-3">AI Tool Workspace</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                      This experiment requires you to use an external AI tool. Click the button below to launch the tool in a new secure tab. Keep this virtual lab open to refer to the procedure and complete the posttest.
                    </p>
                    <button
                      onClick={() => {
                        const links: Record<string, string> = {
                          "ai-m1-1": "https://gemini.google.com/advanced",
                          "ai-m1-2": "https://chatgpt.com",
                          "ai-m1-3": "https://leonardo.ai",
                          "ai-m1-4": "https://midjourney.com",
                          "ai-m2-1": "https://chatgpt.com",
                          "ai-m2-2": "https://claude.ai",
                          "ai-m2-3": "https://gemini.google.com",
                          "ai-m2-4": "https://perplexity.ai",
                          "ai-m3-1": "https://claude.ai",
                          "ai-m3-2": "https://cursor.sh",
                          "ai-m3-3": "https://github.com/features/copilot",
                          "ai-m3-4": "https://replit.com",
                          "ai-m4-1": "https://lovable.dev",
                          "ai-m4-2": "https://bolt.new",
                          "ai-m4-3": "https://v0.dev",
                          "ai-m4-4": "https://figma.com",
                          "ai-m5-1": "https://notebooklm.google.com",
                          "ai-m5-2": "https://gamma.app",
                          "ai-m5-3": "https://napkin.ai",
                          "ai-m5-4": "https://elicit.com"
                        };
                        const url = details?.experiment.id ? links[details.experiment.id] : null;
                        if (url) {
                          window.open(url, "_blank");
                        } else {
                          toast.error("Tool link not found for this experiment.");
                        }
                      }}
                      className="px-6 py-3 rounded-full bg-cyan text-cyan-foreground font-semibold text-sm hover:bg-cyan/90 transition-all hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                      <ExternalLink className="size-4" /> Launch External Tool
                    </button>
                  </div>
                </div>
              ) : isIot ? (
                <div className="h-full flex flex-col items-center justify-center bg-slate-50/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-fuchsia-400/5" />
                  <div className="relative z-10 w-full h-full p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between px-4 py-3 bg-secondary/80 border border-border rounded-xl">
                      <div className="flex items-center gap-3">
                        <Cpu className="size-5 text-cyan" />
                        <div>
                          <h3 className="font-semibold text-sm">Tinkercad Workspace</h3>
                          <p className="text-xs text-muted-foreground">Complete your circuit and code inside Tinkercad</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => window.open("https://www.tinkercad.com/dashboard", "_blank")}
                        className="px-4 py-1.5 rounded-lg border border-border hover:bg-secondary/80 text-xs font-medium transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="size-3.5" /> Open in New Tab
                      </button>
                    </div>
                    <div className="flex-1 rounded-xl border border-border overflow-hidden bg-white flex flex-col items-center justify-center p-8 text-center shadow-sm">
                      <div className="size-20 rounded-2xl bg-cyan/10 text-cyan grid place-items-center mb-6 ring-1 ring-cyan/20">
                        <ExternalLink className="size-10" />
                      </div>
                      <h2 className="text-2xl font-bold mb-3 font-display text-slate-900">Tinkercad Requires a New Window</h2>
                      <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
                        For security reasons, Tinkercad cannot be embedded directly within the Virtual Lab. Please open it in a separate tab to continue your experiment.
                      </p>
                      <button 
                        onClick={() => window.open("https://www.tinkercad.com/dashboard", "_blank")}
                        className="px-8 py-3 rounded-full bg-cyan text-cyan-foreground font-semibold hover:bg-cyan/90 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 flex items-center gap-2"
                      >
                        Launch Tinkercad Workspace <ExternalLink className="size-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Toolbar */}
              <div className="flex items-center justify-between p-3 border-b border-border/10 bg-black/20">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground ml-2">
                  <span className="size-2 rounded-full bg-destructive/70" />
                  <span className="size-2 rounded-full bg-cyan/80" />
                  <span className="size-2 rounded-full bg-mint" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="ml-2 bg-transparent border-none text-muted-foreground focus:ring-0 cursor-pointer hover:text-foreground transition-colors"
                  >
                    <option value="c">C</option>
                    <option value="java">Java</option>
                    <option value="python">Python 3</option>
                    <option value="sql">SQL</option>
                  </select>
                  <span className="ml-2 text-white/40">|</span>
                  <span className="ml-2">{templates[language].file}</span>
                  {isSql && (
                    <>
                      <span className="ml-2 text-white/40">|</span>
                      <span className="ml-2 flex items-center gap-1 text-cyan/70">
                        <Database className="size-3" />
                        {sqlLoaded ? "SQLite ready" : sqlLoadError ? "Load failed" : "Loading…"}
                      </span>
                    </>
                  )}
                  {language === "python" && details?.course.id === "python" && (
                    <>
                      <span className="ml-2 text-white/40">|</span>
                      <span className="ml-2 flex items-center gap-1 text-cyan/70">
                        <Terminal className="size-3" />
                        {pyodideLoaded ? "Pyodide ready" : pyodideLoadError ? "Load failed" : "Loading…"}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={handleReset} className="inline-flex items-center gap-2 rounded-md border border-border/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                    <RotateCcw className="size-3.5" /> Reset
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-md border border-border/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                    <Save className="size-3.5" /> Save
                  </button>
                  <button
                    onClick={handleRun}
                    disabled={
                      isLoading ||
                      (isSql && !sqlLoaded && !sqlLoadError) ||
                      (language === "python" && details?.course.id === "python" && !pyodideLoaded && !pyodideLoadError)
                    }
                    className="inline-flex items-center gap-2 rounded-md bg-mint/20 text-mint border border-mint/20 px-4 py-1.5 text-xs font-medium hover:bg-mint/30 transition-colors disabled:opacity-50"
                  >
                    <Play className="size-3.5" /> {isLoading ? "Running…" : "Run Code"}
                  </button>
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 overflow-hidden relative">
                {isMounted && (
                  <Editor
                    height="100%"
                    language={
                      language === "python" ? "python"
                      : language === "java"   ? "java"
                      : language === "sql"    ? "sql"
                      : "c"
                    }
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => setCode(val || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      scrollBeyondLastLine: false,
                    }}
                  />
                )}
              </div>

              {/* Bottom Panel: stdin / output — adapts for SQL */}
              <div className="h-64 border-t border-border/10 bg-black/40 flex flex-col">
                {isSql ? (
                  /* SQL: full-width result pane (no stdin) */
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-border/10 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      <Database className="size-3.5" /> Query Results
                    </div>
                    <div className="flex-1 overflow-auto p-4">
                      {isLoading ? (
                        <span className="text-white/30 text-[13px] font-mono italic">Executing…</span>
                      ) : sqlResult ? (
                        <SqlResultView {...sqlResult} />
                      ) : (
                        <span className="text-white/30 text-[13px] font-mono italic">Results will appear here after you run a query…</span>
                      )}
                    </div>
                  </div>
                ) : (
                  /* C / Java / Python: split stdin + stdout */
                  <div className="grid grid-cols-2 h-full divide-x divide-border/10">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-2 px-4 py-2 border-b border-border/10 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        <Terminal className="size-3.5" /> stdin
                      </div>
                      <textarea
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                        placeholder="Enter inputs here (e.g. for scanf)..."
                        className="flex-1 p-4 bg-transparent border-none outline-none resize-none text-[13px] font-mono text-white/80"
                      />
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-2 px-4 py-2 border-b border-border/10 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        <Terminal className="size-3.5" /> Console Output
                      </div>
                      <div className="flex-1 overflow-auto p-4">
                        {output ? (
                          <pre className={`text-[13px] font-mono whitespace-pre-wrap ${isError ? "text-red-400" : "text-green-400"}`}>
                            {output}
                          </pre>
                        ) : (
                          <span className="text-white/30 text-[13px] font-mono italic">Output will appear here…</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
                </>
              )}
            </div>
          </div>
        ) : (
          // CONTENT VIEWS FOR OTHER MODULES
          <div className="h-full flex flex-col max-w-4xl mx-auto">
            <div className="flex-1 overflow-y-auto p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {isAITools && getAILogoUrl(details?.experiment.id) && currentStepName !== "pretest" && currentStepName !== "posttest" && (
                <div className="mb-8 flex justify-center">
                  <div className="size-24 rounded-2xl bg-white border border-border/50 flex items-center justify-center p-4 shadow-xl overflow-hidden animate-in zoom-in-95 duration-500">
                    <img 
                      src={getAILogoUrl(details?.experiment.id)!} 
                      alt="Tool Logo" 
                      className="w-full h-full object-contain drop-shadow-md" 
                      onError={(e) => e.currentTarget.style.display = 'none'} 
                    />
                  </div>
                </div>
              )}
              {(() => {
                const step = WORKSPACE_STEPS[activeStepIndex].toLowerCase();
                // @ts-ignore - content is dynamically added
                const content = details?.experiment?.content;
                
                const dataKey = step === "quiz" ? "posttest" : step === "visualization" ? "theory" : step;
                if (!content || !(content as any)[dataKey]) {
                  return (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <h2 className="text-4xl font-display font-bold mb-4">{WORKSPACE_STEPS[activeStepIndex]}</h2>
                      <p className="text-muted-foreground text-lg max-w-lg mb-8">
                        Content for {WORKSPACE_STEPS[activeStepIndex]} has not been added yet for this module.
                      </p>
                      <div className="grid place-items-center size-24 rounded-full bg-secondary/50 border border-border">
                        <Book className="size-8 text-muted-foreground/50" />
                      </div>
                    </div>
                  );
                }

                if (step === "aim") {
                  let textContent = (content.aim?.text ?? "") + " ";
                  if (content.aim?.bullets) {
                    content.aim.bullets.forEach((b: string) => textContent += b + " ");
                  }
                  
                  return (
                    <TTSSection 
                      key="aim"
                      heading="Aim"
                      textContent={textContent}
                      renderContent={(activeCharIndex) => {
                        let offset = 0;
                        
                        const mainText = (content.aim?.text ?? "") + " ";
                        const mainStart = offset;
                        offset += mainText.length;
                        
                        return (
                          <div className="space-y-6">
                            <p className="text-lg text-foreground/90 leading-relaxed">
                              <HighlightableText text={mainText} activeCharIndex={activeCharIndex - mainStart} />
                            </p>
                            {content.aim?.bullets && (
                              <ul className="list-disc list-outside pl-5 space-y-3 mt-6 text-muted-foreground">
                                {content.aim.bullets.map((b: string, i: number) => {
                                  const bText = b + " ";
                                  const bStart = offset;
                                  offset += bText.length;
                                  return (
                                    <li key={i} className="leading-relaxed">
                                      <HighlightableText text={bText} activeCharIndex={activeCharIndex - bStart} />
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        );
                      }}
                    />
                  );
                }
                
                if (step === "theory") {
                  let textContent = "";
                  (content.theory ?? []).forEach((section: any) => {
                    textContent += section.title + ". ";
                    section.body.forEach((p: string) => textContent += p + " ");
                  });
                  
                  return (
                    <TTSSection
                      key="theory"
                      heading="Theory"
                      textContent={textContent}
                      renderContent={(activeCharIndex) => {
                        let offset = 0;
                        return (
                          <div className="space-y-10">
                            {(content.theory ?? []).map((section: any, i: number) => {
                              const titleText = section.title + ". ";
                              const titleStart = offset;
                              offset += titleText.length;
                              
                              return (
                                <div key={i} className="space-y-3">
                                  <h3 className="text-xl font-semibold text-foreground">
                                    <HighlightableText text={titleText} activeCharIndex={activeCharIndex - titleStart} />
                                  </h3>
                                  {section.body.map((p: string, j: number) => {
                                    const pText = p + " ";
                                    const pStart = offset;
                                    offset += pText.length;
                                    
                                    // Check for a markdown image ![alt](url)
                                    const imgMatch = pText.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                                    
                                    if (imgMatch && imgMatch.index !== undefined) {
                                      const textBefore = pText.substring(0, imgMatch.index);
                                      const textAfter = pText.substring(imgMatch.index + imgMatch[0].length);
                                      if (isQuantum) {
                                        return (
                                          <div key={j} className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                            {textBefore && <HighlightableText text={textBefore} activeCharIndex={activeCharIndex - pStart} />}
                                            {textAfter && <HighlightableText text={textAfter} activeCharIndex={activeCharIndex - pStart - imgMatch.index - imgMatch[0].length} />}
                                          </div>
                                        );
                                      }
                                      return (
                                        <div key={j} className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                          {textBefore && <HighlightableText text={textBefore} activeCharIndex={activeCharIndex - pStart} />}
                                          <img src={imgMatch[2]} alt={imgMatch[1]} className="rounded-xl shadow-md my-4 max-h-72 object-contain bg-white/5 border border-slate-200/20" />
                                          {textAfter && <HighlightableText text={textAfter} activeCharIndex={activeCharIndex - pStart - imgMatch.index - imgMatch[0].length} />}
                                        </div>
                                      );
                                    }

                                    return (
                                      <div key={j} className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        <HighlightableText text={pText} activeCharIndex={activeCharIndex - pStart} />
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        );
                      }}
                    />
                  );
                }

                if (step === "procedure" || step === "references") {
                  let textContent = "";
                  ((content as any)[step] as string[] ?? []).forEach((item: string) => textContent += item + " ");
                  
                  return (
                    <TTSSection
                      key={`procedure-refs-${step}`}
                      heading={WORKSPACE_STEPS[activeStepIndex]}
                      textContent={textContent}
                      renderContent={(activeCharIndex) => {
                        let offset = 0;
                        return (
                          <ul className="list-decimal list-outside pl-5 space-y-4 text-muted-foreground">
                            {(content[step as keyof typeof content] as string[] ?? []).map((item: string, i: number) => {
                              const itemText = item + " ";
                              const itemStart = offset;
                              offset += itemText.length;
                              return (
                                <li key={i} className="leading-relaxed pl-1">
                                  <HighlightableText text={itemText} activeCharIndex={activeCharIndex - itemStart} />
                                </li>
                              );
                            })}
                          </ul>
                        );
                      }}
                    />
                  );
                }

                if (step === "simulation") {
                  if (details?.experiment.id === "java-e1-1") {
                    return <div className="h-full bg-background"><JavaMemoryInspectorSim /></div>;
                  }
                  if (details?.experiment.id === "java-e1-2") {
                    return <div className="h-full bg-background"><JavaParabolaPlotterSim /></div>;
                  }
                  if (details?.experiment.id === "java-e2-1") {
                    return <div className="h-full bg-background"><JavaBinarySearchSim /></div>;
                  }
                  if (details?.experiment.id === "java-e2-2") {
                    return <div className="h-full bg-background"><JavaBubbleSortSim /></div>;
                  }
                  if (details?.experiment.id === "java-e2-3") {
                    return <div className="h-full bg-background"><JavaStringBufferSim /></div>;
                  }
                  if (details?.experiment.id === "java-e3-1") {
                    return <div className="h-full bg-background"><JavaBlueprintFactorySim /></div>;
                  }
                  if (details?.experiment.id === "java-e3-2") {
                    return <div className="h-full bg-background"><JavaMethodDispatcherSim /></div>;
                  }
                  if (details?.experiment.id === "java-e3-3") {
                    return <div className="h-full bg-background"><JavaObjectAssemblySim /></div>;
                  }
                  if (details?.experiment.id === "java-e3-4") {
                    return <div className="h-full bg-background"><JavaConstructorSelectorSim /></div>;
                  }
                  if (details?.experiment.id === "java-e4-1") {
                    return <div className="h-full bg-background"><JavaFamilyTreeSim /></div>;
                  }
                  if (details?.experiment.id === "java-e4-2") {
                    return <div className="h-full bg-background"><JavaInheritanceChainSim /></div>;
                  }
                  if (details?.experiment.id === "java-e4-3") {
                    return <div className="h-full bg-background"><JavaShapeFactorySim /></div>;
                  }
                  if (details?.experiment.id === "java-e5-1") {
                    return <div className="h-full bg-background"><JavaTryCatchSim /></div>;
                  }
                  if (details?.experiment.id === "java-e5-2") {
                    return <div className="h-full bg-background"><JavaMultipleCatchSim /></div>;
                  }
                  if (details?.experiment.id === "java-e5-3") {
                    return <div className="h-full bg-background"><JavaThrowsSim /></div>;
                  }
                  if (details?.experiment.id === "java-e6-1") {
                    return <div className="h-full bg-background"><JavaThreadLifecycleSim /></div>;
                  }
                  if (details?.experiment.id === "java-e6-2") {
                    return <div className="h-full bg-background"><JavaRunnableSim /></div>;
                  }
                  if (details?.experiment.id === "java-e6-3") {
                    return <div className="h-full bg-background"><JavaThreadPrioritySim /></div>;
                  }
                  if (details?.experiment.id === "java-e6-4") {
                    return <div className="h-full bg-background"><JavaThreadSyncSim /></div>;
                  }
                  if (details?.experiment.id === "java-e7-1") {
                    return <div className="h-full bg-background"><JavaIsAliveSim /></div>;
                  }
                  if (details?.experiment.id === "java-e7-2") {
                    return <div className="h-full bg-background"><JavaInterruptSim /></div>;
                  }
                  if (details?.experiment.id === "java-e7-3") {
                    return <div className="h-full bg-background"><JavaDaemonSim /></div>;
                  }
                  if (details?.experiment.id === "java-e7-4") {
                    return <div className="h-full bg-background"><JavaProducerConsumerSim /></div>;
                  }
                  if (details?.experiment.id === "java-e8-1") {
                    return <div className="h-full bg-background"><JavaPackageSim /></div>;
                  }
                  if (details?.experiment.id === "java-e8-2") {
                    return <div className="h-full bg-background"><JavaFXLabelImageSim /></div>;
                  }
                  if (details?.experiment.id === "java-e8-3") {
                    return <div className="h-full bg-background"><JavaFXTipCalcSim /></div>;
                  }
                  if (details?.experiment.id === "java-e9-1") {
                    return <div className="h-full bg-background"><JavaJDBCConnectSim /></div>;
                  }
                  if (details?.experiment.id === "java-e9-2") {
                    return <div className="h-full bg-background"><JavaJDBCInsertSim /></div>;
                  }
                  if (details?.experiment.id === "java-e9-3") {
                    return <div className="h-full bg-background"><JavaJDBCDeleteSim /></div>;
                  }
                  if (details?.experiment.id === "c-w1-2") {
                    return (
                      <div className="h-full">
                        <MemoryManagerSim />
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ds-e1-1") {
                    return (
                      <div className="h-full">
                        <MirrorPortalSim />
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ds-e1-2") {
                    return (
                      <div className="h-full">
                        <LinearSearchSim />
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ds-e1-3") {
                    return (
                      <div className="h-full">
                        <BinarySearchSim />
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ds-e1-4") {
                    return (
                      <div className="h-full bg-background">
                        <BubbleSortSim />
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ds-e1-5") {
                    return (
                      <div className="h-full bg-background">
                        <SelectionSortSim />
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ds-e1-6") {
                    return (
                      <div className="h-full bg-background">
                        <InsertionSortSim />
                      </div>
                    );
                  }
                  if (
                    details?.experiment.id?.startsWith("ds-e2-") ||
                    details?.experiment.id?.startsWith("ds-e3-") ||
                    details?.experiment.id?.startsWith("ds-e4-")
                  ) {
                    return (
                      <div className="h-full bg-background">
                        <LinkedCityCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }
                  if (details?.experiment.id?.startsWith("ds-e5-")) {
                    return (
                      <div className="h-full bg-background">
                        <StackTowerCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }
                  if (details?.experiment.id?.startsWith("ds-e6-")) {
                    return (
                      <div className="h-full bg-background">
                        <TransitDistrictCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }
                  if (details?.experiment.id?.startsWith("ds-e7-")) {
                    return (
                      <div className="h-full bg-background">
                        <IntelligenceCenterCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }
                  if (details?.experiment.id?.startsWith("ds-e8-")) {
                    return (
                      <div className="h-full bg-background">
                        <CommandTreeCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }
                  if (details?.experiment.id?.startsWith("ds-e9-")) {
                    return (
                      <div className="h-full bg-background">
                        <DataVaultCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }
                  
                  if (details?.experiment.id?.startsWith("py-e1-")) {
                    return (
                      <div className="h-full bg-background">
                        <PythonInterpreterCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("py-e2-")) {
                    return (
                      <div className="h-full bg-background">
                        <PythonTalentShowCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("py-e3-")) {
                    return (
                      <div className="h-full bg-background">
                        <BurgerOrderCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("py-e4-")) {
                    return (
                      <div className="h-full bg-background">
                        <TrafficSignalCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w1-")) {
                    return (
                      <div className="h-full bg-background">
                        <GenesisTerminalCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w2-")) {
                    return (
                      <div className="h-full bg-background">
                        <AlgorithmForestCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w4-")) {
                    return (
                      <div className="h-full bg-background">
                        <ExpressionLaboratoryCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w5-")) {
                    return (
                      <div className="h-full bg-background">
                        <DecisionKingdomCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w6-")) {
                    return (
                      <div className="h-full bg-background">
                        <TimeLoopValleyCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w7-")) {
                    return (
                      <div className="h-full bg-background">
                        <ArrayWarehouseDistrictCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w8-")) {
                    return (
                      <div className="h-full bg-background">
                        <MatrixCitadelCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w9-")) {
                    return (
                      <div className="h-full bg-background">
                        <MemoryNexusCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w10-")) {
                    return (
                      <div className="h-full bg-background">
                        <DataArchitectDistrictCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w11-")) {
                    return (
                      <div className="h-full bg-background">
                        <FunctionTempleCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w12-")) {
                    return (
                      <div className="h-full bg-background">
                        <RecursiveCavernsCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w13-")) {
                    return (
                      <div className="h-full bg-background">
                        <PointerDimensionCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("c-w14-")) {
                    return (
                      <div className="h-full bg-background">
                        <ArchiveKingdomCampaign expId={details.experiment.id} />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w1-")) {
                    return (
                      <div className="h-full bg-background">
                        <DataDetectiveLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w2-")) {
                    return (
                      <div className="h-full bg-background">
                        <DataCleaningLabCampaign />
                      </div>
                    );
                  }
                  
                  if (details?.experiment.id?.startsWith("ml-w3-")) {
                    return (
                      <div className="h-full bg-background">
                        <SimilarityLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w4-")) {
                    return (
                      <div className="h-full bg-background">
                        <DecisionLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w5-")) {
                    return (
                      <div className="h-full bg-background">
                        <PredictionLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w6-")) {
                    return (
                      <div className="h-full bg-background">
                        <EnsembleIntelligenceLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w7-")) {
                    return (
                      <div className="h-full bg-background">
                        <ProbabilityLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w8-")) {
                    return (
                      <div className="h-full bg-background">
                        <BoundaryLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w9-")) {
                    return (
                      <div className="h-full bg-background">
                        <SimpleRegressionLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w10-")) {
                    return (
                      <div className="h-full bg-background">
                        <ClassificationLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w11-")) {
                    return (
                      <div className="h-full bg-background">
                        <NeuralNetworkLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w12-")) {
                    return (
                      <div className="h-full bg-background">
                        <CustomerSegmentationLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w13-")) {
                    return (
                      <div className="h-full bg-background">
                        <MembershipIntelligenceLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("ml-w14-")) {
                    return (
                      <div className="h-full bg-background">
                        <HiddenPatternLabCampaign />
                      </div>
                    );
                  }

                  if (details?.experiment.id === "db-exp1") {
                    return (
                      <div className="h-full bg-background">
                        <DBMSConstraintsSim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp2")) {
                    return (
                      <div className="h-full bg-background">
                        <DBMSSubqueriesSim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp3")) {
                    return (
                      <div className="h-full bg-background">
                        <DBMSQueryquestSim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp4")) {
                    return (
                      <div className="h-full bg-background">
                        <DBMSDatacitySim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp5")) {
                    return (
                      <div className="h-full bg-background">
                        <PLSQLQuestSim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp6")) {
                    return (
                      <div className="h-full bg-background">
                        <LogicKingdomSim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp7")) {
                    return (
                      <div className="h-full bg-background">
                        <LoopVerseSim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp8")) {
                    return (
                      <div className="h-full bg-background">
                        <PLSQLCommandCenterSim />
                      </div>
                    );
                  }
                  
                  if (details?.experiment.id?.startsWith("db-exp9")) {
                    return (
                      <div className="h-full bg-background">
                        <SQLKingdomSim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp10")) {
                    return (
                      <div className="h-full bg-background">
                        <CursorQuestSim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp11")) {
                    return (
                      <div className="h-full bg-background">
                        <TriggerCitySim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp12")) {
                    return (
                      <div className="h-full bg-background">
                        <DataKingdomSim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp13")) {
                    return (
                      <div className="h-full bg-background">
                        <JDBCOdysseySim />
                      </div>
                    );
                  }
                  
                  if (details?.experiment.id?.startsWith("db-exp14")) {
                    return (
                      <div className="h-full bg-background">
                        <SQLDefenseAcademySim />
                      </div>
                    );
                  }

                  if (details?.experiment.id?.startsWith("db-exp15")) {
                    return (
                      <div className="h-full bg-background">
                        <DatabaseAssassinSim />
                      </div>
                    );
                  }

                  if (details?.experiment.id === "ads-w1-1") {
                    return (
                      <div className="h-full bg-background">
                        <AVLTreeSim />
                      </div>
                    );
                  }

                  if (details?.experiment.id === "ads-w1-2") {
                    return (
                      <div className="h-full bg-background">
                        <AVLDeletionSim/>
                      </div>
                    );
                  }

                  if (details?.experiment.id === "ads-w2-1") {
                    return (
                      <div className="h-full bg-background">
                        <RedBlackSim/>
                      </div>
                    );
                  }
                  
                  if (details?.experiment.id === "ads-w3-1") {
                    return (
                      <div className="h-full bg-background">
                        <BTreeSim/>
                      </div>
                    );
                  }

                  if (details?.experiment.id === "ads-w4-1") {
                    return (
                      <div className="h-full bg-background">
                        <BPlusTreeSim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w5-1") {
                    return (
                      <div className="h-full bg-background">
                        <SegmentTreeSim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w5-2") {
                    return (
                      <div className="h-full bg-background">
                        <FenwickCitySim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w6-1") {
                    return (
                      <div className="h-full bg-background">
                        <HeapCitySim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w7-1") {
                    return (
                      <div className="h-full bg-background">
                        <UnionVerseSim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w8-1") {
                    return (
                      <div className="h-full bg-background">
                        <HashCitySim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w8-2") {
                    return (
                      <div className="h-full bg-background">
                        <CuckooKingdomSim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w9-1") {
                    return (
                      <div className="h-full bg-background">
                        <TrieSim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w10-1") {
                    return (
                      <div className="h-full bg-background">
                        <PathfinderSim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w10-2") {
                    return (
                      <div className="h-full bg-background">
                        <BellmanFordSim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w11-1") {
                    return (
                      <div className="h-full bg-background">
                        <KruskalSim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w11-2") {
                    return (
                      <div className="h-full bg-background">
                        <PrimAlgorithmSim/>
                      </div>
                    );
                  }
                  if (details?.experiment.id === "ads-w12-1") {
                    return (
                      <div className="h-full bg-background">
                        <GraphRaidersSim/>
                      </div>
                    );
                  }
                  


                  return (
                    <div className="h-full">
                      <SimulationPlayer data={content.simulation} />
                    </div>
                  );
                }

                if (step === "visualization") {
                  const visuals: { alt: string, url: string }[] = [];
                  (content.theory ?? []).forEach((section: any) => {
                    section.body.forEach((p: string) => {
                      const imgMatch = p.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                      if (imgMatch) visuals.push({ alt: imgMatch[1], url: imgMatch[2] });
                    });
                  });

                  if (visuals.length === 0) {
                     return (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <h2 className="text-4xl font-display font-bold mb-4">Visualization</h2>
                        <p className="text-muted-foreground text-lg max-w-lg mb-8">
                          No visualization available for this experiment.
                        </p>
                      </div>
                     );
                  }

                  return (
                    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-12">
                      {visuals.map((v, i) => {
                         const isVideo = v.url.endsWith('.mp4') || v.url.includes('video/upload');
                         return (
                           <div key={i} className="flex flex-col items-center justify-center p-6 bg-secondary/20 rounded-2xl border border-border shadow-sm">
                             <h3 className="text-xl font-display font-semibold mb-6 text-foreground/90">{v.alt}</h3>
                             {isVideo ? (
                               <video src={v.url} controls autoPlay loop muted className="w-full max-w-4xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border" />
                             ) : (
                               <img src={v.url} alt={v.alt} className="w-full max-w-4xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border" />
                             )}
                           </div>
                         );
                      })}
                    </div>
                  );
                }

                if (step === "pretest" || step === "posttest" || step === "quiz") {
                  const state = step === "pretest" ? pretestAnswers : posttestAnswers;
                  const setState = step === "pretest" ? setPretestAnswers : setPosttestAnswers;
                  const isReviewed = step === "pretest" ? pretestReviewed : posttestReviewed;
                  const dataKey = step === "quiz" ? "posttest" : step;
                  return (
                    <div className="space-y-10">
                      <h2 className="text-3xl font-bold font-display mb-6">{WORKSPACE_STEPS[activeStepIndex]}</h2>
                      {((content as any)[dataKey] as any[] ?? []).map((mcq: any, i: number) => (
                        <div key={i} className="p-6 rounded-xl border border-border bg-card space-y-4">
                          <div className="font-medium text-foreground flex items-start justify-between gap-3">
  <div>
    <span className="text-cyan mr-2">Q{i+1}.</span>
    {mcq.question}
  </div>
  {!isReviewed && mcq.hint && (
    <HintTooltip hint={mcq.hint} />
  )}
</div>
                          <div className="space-y-2 pl-6">
                            {mcq.options.map((opt: string, j: number) => {
                              const isCorrect = j === mcq.answerIndex;
                              const isSelected = state[i] === j;
                              
                              let labelClass = `flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/50 cursor-pointer transition-colors ${isSelected ? 'border-cyan bg-cyan/10' : 'border-border/50'}`;
                              
                              if (isReviewed) {
                                if (isCorrect) {
                                  labelClass = "flex items-center gap-3 p-3 rounded-lg border border-mint/50 bg-mint/10 pointer-events-none";
                                } else if (isSelected) {
                                  labelClass = "flex items-center gap-3 p-3 rounded-lg border border-destructive/50 bg-destructive/10 pointer-events-none";
                                } else {
                                  labelClass = "flex items-center gap-3 p-3 rounded-lg border border-border/50 opacity-50 pointer-events-none";
                                }
                              }
                              
                              return (
                                <label key={j} className={labelClass}>
                                  <input 
                                    type="radio" 
                                    name={`${step}-q${i}`} 
                                    className="accent-cyan"
                                    checked={isSelected}
                                    onChange={() => {
                                      if (isReviewed) return;
                                      const newState = { ...state, [i]: j };
                                      setState(newState);
                                      if (Object.keys(newState).length === ((content as any)[dataKey] as any[])?.length) {
                                        if (step === "pretest") setPretestReviewed(true);
                                        else setPosttestReviewed(true);
                                      }
                                    }}
                                    disabled={isReviewed}
                                  />
                                  <span className="text-muted-foreground text-sm">{opt}</span>
                                  {isReviewed && isCorrect && <CheckCircle2 className="size-4 text-mint ml-auto" />}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                return null;
              })()}
            </div>
            
            <div className="flex items-center justify-between border-t border-border p-6 bg-background">
              <button 
                onClick={handlePrev} 
                disabled={activeStepIndex === 0}
                className="px-5 py-2.5 rounded-md border border-border bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-4">
                {(currentStepName === "pretest" || currentStepName === "posttest" || currentStepName === "quiz") && isNextEnabled && currentContent[currentStepName === "quiz" ? "posttest" : currentStepName] && (
                  <div className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-secondary/50 rounded-md border border-border">
                    <span className="text-muted-foreground">Score:</span>
                    <span className="text-mint text-base">{calculateScore(currentStepName as any)} / {currentContent[currentStepName === "quiz" ? "posttest" : currentStepName]?.length || 0}</span>
                  </div>
                )}
                
                <button 
                  onClick={activeStepIndex === WORKSPACE_STEPS.length - 1 ? handleSubmit : handleNext} 
                  className="px-5 py-2.5 rounded-md bg-cyan text-cyan-foreground font-medium text-sm hover:bg-cyan/90 transition-colors"
                >
                  {activeStepIndex === WORKSPACE_STEPS.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <PostSolveAuthModal
  isOpen={showPostSolveModal}
  experimentId={details?.experiment?.id || ''}
  onSkip={handlePostSolveSkip}
  onAuthenticated={handlePostSolveAuthenticated}
/>
    </div>
  );
}