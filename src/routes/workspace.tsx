import { useState, useEffect, useRef, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Save, RotateCcw, CheckCircle2, Terminal, ArrowLeft, Lightbulb, Beaker, HelpCircle, Database, Book, Volume2, Square } from "lucide-react";
import { courses } from "@/lib/course-data";
import Editor from "@monaco-editor/react";
import { toast } from "sonner";

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

// Helper to find experiment details
function getExperimentDetails(expId?: string) {
  if (!expId) return null;
  for (const course of Object.values(courses)) {
    for (let wIdx = 0; wIdx < course.weeks.length; wIdx++) {
      const week = course.weeks[wIdx];
      const expIdx = week.experiments.findIndex(e => e.id === expId);
      if (expIdx !== -1) {
        return { course, week, experiment: week.experiments[expIdx] };
      }
    }
  }
  return null;
}

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

function Workspace() {
  const { exp } = Route.useSearch();
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
    } else if (details?.course.id === "machine-learning") {
      setLanguage("python");
    } else {
      setLanguage("c");
    }
  }, [exp]);

  // Reset code on language / experiment change
  useEffect(() => {
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

  // ── C / Java / Python Run (Wandbox) ──────────────────────────────────────
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

      const bodyPayload: any = {
        compiler: compilerMap[language] || "gcc-head",
        code,
        stdin,
        options: "warning",
      };

      if (language === "c") {
        bodyPayload["compiler-option-raw"] = "-lm";
      }

      const response = await fetch("https://wandbox.org/api/compile.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Wandbox HTTP ${response.status}: ${errorText}`);
      }
      const data = await response.json();

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
      setOutput(`Execution failed: ${err.message || "Wandbox server unavailable"}\n\nPlease try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRun = () => {
    if (language === "sql") handleRunSql();
    else handleRunCode();
  };

  const isSql = language === "sql";

  const WORKSPACE_STEPS = ["Aim", "Theory", "Pretest", "Procedure", "Simulation", "Code Test", "Posttest", "References"];
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  
  const [pretestAnswers, setPretestAnswers] = useState<Record<number, number>>({});
  const [posttestAnswers, setPosttestAnswers] = useState<Record<number, number>>({});
  const [pretestReviewed, setPretestReviewed] = useState(false);
  const [posttestReviewed, setPosttestReviewed] = useState(false);

  const currentStepName = WORKSPACE_STEPS[activeStepIndex].toLowerCase();
  const currentContent = details?.experiment?.content as any;
  let isNextEnabled = true;

  const calculateScore = (stepName: "pretest" | "posttest") => {
    const test = currentContent?.[stepName];
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
    } else if (currentStepName === "posttest" && currentContent.posttest) {
      if (Object.keys(posttestAnswers).length < currentContent.posttest.length) {
        isNextEnabled = false;
      }
    }
  }

  const handleSubmit = () => {
    alert("Module Completed Successfully!");
    if (details?.course?.id) {
      window.location.href = `/course/${details.course.id}`;
    } else {
      window.location.href = "/courses";
    }
  };

  const handleNext = () => {
    if (!isNextEnabled) {
      toast.error(`Please answer all questions in the ${currentStepName} before proceeding.`);
      return;
    }
    if (activeStepIndex < WORKSPACE_STEPS.length - 1) setActiveStepIndex(activeStepIndex + 1);
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
                <Link to={`/course/${details.course.id}`} className="hover:text-foreground flex items-center gap-1">
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
              return (
                <button
                  key={step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive ? "bg-cyan/20 text-cyan border border-cyan/30" : 
                    isCompleted ? "bg-secondary text-foreground border border-border" : 
                    "text-muted-foreground hover:bg-secondary/50 border border-transparent"
                  }`}
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
        {activeStepIndex === 5 ? (
          // SIMULATION VIEW (Existing Split Pane for Code Test)
          <div className="h-full grid lg:grid-cols-[1fr_1fr] divide-x divide-border">
            {/* ── Left Pane: Problem Description ─────────────────────────── */}
            <div className="h-full flex flex-col overflow-y-auto bg-card relative pb-20">
              <div className="p-6 border-b border-border bg-secondary/20">
                <h1 className="text-2xl font-bold font-display leading-tight">{title}</h1>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-mint/20 text-mint border border-mint/30">Easy</span>
                  <span className="px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-secondary text-foreground border border-border">Core</span>
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
                      <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
                        <li>What edge cases should you consider for this problem?</li>
                        <li>Can you optimize the time complexity?</li>
                        <li>How would this approach scale for 10^6 inputs?</li>
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

            {/* ── Right Pane: Editor & Console ────────────────────────────── */}
            <div className="h-full flex flex-col bg-[#0f111a]">
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
                    disabled={isLoading || (isSql && !sqlLoaded && !sqlLoadError)}
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
            </div>
          </div>
        ) : (
          // CONTENT VIEWS FOR OTHER MODULES
          <div className="h-full flex flex-col max-w-4xl mx-auto">
            <div className="flex-1 overflow-y-auto p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {(() => {
                const step = WORKSPACE_STEPS[activeStepIndex].toLowerCase();
                // @ts-ignore - content is dynamically added
                const content = details?.experiment?.content;
                
                if (!content || !content[step]) {
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
                  let textContent = content.aim.text + " ";
                  if (content.aim.bullets) {
                    content.aim.bullets.forEach((b: string) => textContent += b + " ");
                  }
                  
                  return (
                    <TTSSection 
                      key="aim"
                      heading="Aim"
                      textContent={textContent}
                      renderContent={(activeCharIndex) => {
                        let offset = 0;
                        
                        const mainText = content.aim.text + " ";
                        const mainStart = offset;
                        offset += mainText.length;
                        
                        return (
                          <div className="space-y-6">
                            <p className="text-lg text-foreground/90 leading-relaxed">
                              <HighlightableText text={mainText} activeCharIndex={activeCharIndex - mainStart} />
                            </p>
                            {content.aim.bullets && (
                              <ul className="list-disc list-inside space-y-3 mt-6 text-muted-foreground">
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
                  content.theory.forEach((section: any) => {
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
                            {content.theory.map((section: any, i: number) => {
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
                                    return (
                                      <p key={j} className="text-muted-foreground leading-relaxed">
                                        <HighlightableText text={pText} activeCharIndex={activeCharIndex - pStart} />
                                      </p>
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
                  content[step].forEach((item: string) => textContent += item + " ");
                  
                  return (
                    <TTSSection
                      key={`procedure-refs-${step}`}
                      heading={WORKSPACE_STEPS[activeStepIndex]}
                      textContent={textContent}
                      renderContent={(activeCharIndex) => {
                        let offset = 0;
                        return (
                          <ul className="list-decimal list-inside space-y-4 text-muted-foreground">
                            {content[step].map((item: string, i: number) => {
                              const itemText = item + " ";
                              const itemStart = offset;
                              offset += itemText.length;
                              return (
                                <li key={i} className="leading-relaxed pl-2">
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
                  return (
                    <div className="h-full">
                      <SimulationPlayer data={content.simulation} />
                    </div>
                  );
                }

                if (step === "pretest" || step === "posttest") {
                  const state = step === "pretest" ? pretestAnswers : posttestAnswers;
                  const setState = step === "pretest" ? setPretestAnswers : setPosttestAnswers;
                  const isReviewed = step === "pretest" ? pretestReviewed : posttestReviewed;
                  return (
                    <div className="space-y-10">
                      <h2 className="text-3xl font-bold font-display mb-6">{WORKSPACE_STEPS[activeStepIndex]}</h2>
                      {content[step].map((mcq: any, i: number) => (
                        <div key={i} className="p-6 rounded-xl border border-border bg-card space-y-4">
                          <div className="font-medium text-foreground">
                            <span className="text-cyan mr-2">Q{i+1}.</span>
                            {mcq.question}
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
                                      if (Object.keys(newState).length === content[step].length) {
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
                {(currentStepName === "pretest" || currentStepName === "posttest") && isNextEnabled && currentContent[currentStepName] && (
                  <div className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-secondary/50 rounded-md border border-border">
                    <span className="text-muted-foreground">Score:</span>
                    <span className="text-mint text-base">{calculateScore(currentStepName)} / {currentContent[currentStepName]?.length || 0}</span>
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
    </div>
  );
}