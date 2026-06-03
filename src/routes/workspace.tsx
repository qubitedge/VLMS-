import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Save, RotateCcw, CheckCircle2, Terminal, ArrowLeft, Lightbulb, Beaker, HelpCircle, Database } from "lucide-react";
import { courses } from "@/lib/course-data";
import Editor from "@monaco-editor/react";

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
    if (details?.course.id === "dbms") {   // ← replace "dbms" with your actual course ID
      setLanguage("sql");
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

  return (
    <div className="h-screen flex flex-col pt-[5.5rem] bg-background">
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid lg:grid-cols-[1fr_1fr] divide-x divide-border">

          {/* ── Left Pane: Problem Description ─────────────────────────── */}
          <div className="h-full flex flex-col overflow-y-auto bg-card">
            <div className="p-6 border-b border-border bg-secondary/20">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                {details ? (
                  <Link to={`/course/${details.course.id}`} className="hover:text-foreground flex items-center gap-1">
                    <ArrowLeft className="size-3.5" /> Back to {courseTitle}
                  </Link>
                ) : (
                  <Link to="/branches" className="hover:text-foreground flex items-center gap-1">
                    <ArrowLeft className="size-3.5" /> Back
                  </Link>
                )}
                {details && <span>/</span>}
                {details && <span>{weekTitle}</span>}
              </div>
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
      </div>
    </div>
  );
}