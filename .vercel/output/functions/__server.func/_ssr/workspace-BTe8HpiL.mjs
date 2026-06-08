import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as courses } from "./course-data-BYldHNCF.mjs";
import { F as Ft } from "../_libs/monaco-editor__react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Route$4 } from "./router-DMzmU1BD.mjs";
import { A as ArrowLeft, C as CircleCheck, B as Beaker, b as Lightbulb, c as CircleQuestionMark, S as Sparkles, E as ExternalLink, D as Database, T as Terminal, R as RotateCcw, d as Save, P as Play, e as Book, f as Square, V as Volume2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/monaco-editor__loader.mjs";
import "../_libs/state-local.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/lottie-react.mjs";
import "../_libs/lottie-web.mjs";
function getExperimentDetails(expId) {
  if (!expId) return null;
  for (const course of Object.values(courses)) {
    for (const week of course.weeks) {
      for (const exp of week.experiments) {
        if (exp.id === expId) return {
          course,
          week,
          experiment: exp
        };
      }
    }
  }
  return null;
}
const getAILogoUrl = (expId) => {
  if (!expId) return null;
  const map = {
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
let sqlJsPromise = null;
function loadSqlJs() {
  if (sqlJsPromise) return sqlJsPromise;
  sqlJsPromise = new Promise((resolve, reject) => {
    if (window.initSqlJs) {
      window.initSqlJs({
        locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
      }).then(resolve).catch(reject);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js";
    script.onload = () => {
      window.initSqlJs({
        locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
      }).then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error("Failed to load sql.js from CDN"));
    document.head.appendChild(script);
  });
  return sqlJsPromise;
}
let pyodidePromise = null;
function loadPyodide() {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/"
      }).then(resolve).catch(reject);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";
    script.onload = () => {
      window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/"
      }).then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error("Failed to load Pyodide from CDN"));
    document.head.appendChild(script);
  });
  return pyodidePromise;
}
function runSqlQuery(SQL, dbRef, query) {
  try {
    if (dbRef.current) {
      try {
        dbRef.current.close();
      } catch {
      }
    }
    dbRef.current = new SQL.Database();
    const db = dbRef.current;
    const tables = [];
    const messages = [];
    const results = db.exec(query);
    if (results.length === 0) {
      messages.push("Query executed successfully. No rows returned.");
    } else {
      for (const result of results) {
        tables.push({
          columns: result.columns,
          rows: result.values
        });
      }
    }
    return {
      tables,
      messages
    };
  } catch (err) {
    return {
      tables: [],
      messages: [],
      error: err.message || "Unknown SQL error"
    };
  }
}
function SqlResultView({
  tables,
  messages,
  error
}) {
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("pre", { className: "text-red-400 text-[12px] font-mono whitespace-pre-wrap p-1", children: [
      "ERROR: ",
      error
    ] });
  }
  if (messages.length > 0 && tables.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-green-400 text-[12px] font-mono p-1", children: messages.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      "✓ ",
      m
    ] }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 overflow-auto", children: tables.map((t, ti) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] font-mono", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white/40 mb-1", children: [
      t.rows.length,
      " row",
      t.rows.length !== 1 ? "s" : "",
      " returned"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: t.columns.map((col, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-1.5 bg-white/10 text-white/80 border border-white/10 font-semibold uppercase tracking-wider text-[10px]", children: col }, ci)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: t.rows.map((row, ri) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: row.map((cell, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5 text-green-300 border-x border-white/5", children: cell === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30 italic", children: "NULL" }) : String(cell) }, ci)) }, ri)) })
    ] })
  ] }, ti)) });
}
function SimulationPlayer({
  data
}) {
  const [stepIdx, setStepIdx] = reactExports.useState(0);
  const step = data.steps[stepIdx];
  if (!step) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 grid grid-cols-[1fr_250px_1fr] divide-x divide-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 overflow-y-auto bg-[#1e1e1e] font-mono text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground mb-4 font-sans text-[10px] uppercase tracking-wider", children: "Source Code" }),
        data.code.split("\n").map((line, i) => {
          const lineNum = i + 1;
          const isActive = step.line === lineNum;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex px-2 py-0.5 transition-colors ${isActive ? "bg-yellow-500/20 border-y border-yellow-500/30" : "border-y border-transparent"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-muted-foreground/50 select-none text-right mr-4 text-xs", children: lineNum }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isActive ? "text-yellow-100" : "text-gray-300", children: line })
          ] }, lineNum);
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card overflow-y-auto flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border text-muted-foreground font-sans text-[10px] uppercase tracking-wider", children: "Memory State" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex-1", children: step.memory && step.memory.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-[10px] text-muted-foreground uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium", children: "Var" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium", children: "Val" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "text-xs font-mono", children: step.memory.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-cyan truncate pr-2 max-w-[80px]", title: `${m.type} ${m.variable}`, children: m.variable }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-mint truncate max-w-[80px]", title: m.value, children: m.value })
          ] }, i)) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground/50 text-xs italic text-center mt-10", children: "Empty memory" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border/20 text-muted-foreground font-sans text-[10px] uppercase tracking-wider bg-[#0f111a]", children: "Console Output" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex-1 font-mono text-sm text-[#3fb950] whitespace-pre-wrap overflow-y-auto bg-[#0a0a0a]", children: step.output })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border bg-secondary/30 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 bg-cyan/20 text-cyan rounded-full text-xs font-medium border border-cyan/30 whitespace-nowrap", children: [
          "Step ",
          stepIdx + 1,
          " / ",
          data.steps.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90 font-medium", children: step.annotation })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStepIdx(0), disabled: stepIdx === 0, className: "px-3 py-1.5 bg-secondary text-foreground text-xs font-medium rounded border border-border hover:bg-secondary/80 disabled:opacity-50 transition-colors", children: "Reset" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStepIdx((s) => s - 1), disabled: stepIdx === 0, className: "px-3 py-1.5 bg-secondary text-foreground text-xs font-medium rounded border border-border hover:bg-secondary/80 disabled:opacity-50 transition-colors", children: "Step Back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStepIdx((s) => s + 1), disabled: stepIdx === data.steps.length - 1, className: "px-4 py-1.5 bg-cyan text-cyan-foreground text-xs font-medium rounded hover:bg-cyan/90 disabled:opacity-50 transition-colors", children: "Next" })
      ] })
    ] })
  ] });
}
function HighlightableText({
  text,
  activeCharIndex
}) {
  const tokens = reactExports.useMemo(() => {
    const parts = text.split(/(\s+)/);
    let currentIdx = 0;
    return parts.map((part) => {
      const start = currentIdx;
      const end = currentIdx + part.length;
      currentIdx = end;
      return {
        part,
        start,
        end,
        isWord: /\S/.test(part)
      };
    });
  }, [text]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: tokens.map((t, i) => {
    const isActive = activeCharIndex >= t.start && activeCharIndex < t.end && t.isWord;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isActive ? "text-fuchsia-400 bg-fuchsia-400/20 rounded px-0.5 transition-colors duration-75" : "", children: t.part }, i);
  }) });
}
function TTSSection({
  heading,
  textContent,
  renderContent
}) {
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [activeCharIndex, setActiveCharIndex] = reactExports.useState(-1);
  const getFemaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return voices.find((v) => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("girl") || v.name.toLowerCase().includes("samantha") || v.name.toLowerCase().includes("victoria") || v.name.toLowerCase().includes("zira")) || voices[0];
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
        if (e.name === "word") {
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
  reactExports.useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, [textContent]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold font-display", children: heading }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: toggleSpeak, className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-400/10 text-fuchsia-400 hover:bg-fuchsia-400/20 transition-colors border border-fuchsia-400/30 text-xs font-medium", children: [
        isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "size-3" }),
        isPlaying ? "Stop" : "Speak"
      ] })
    ] }),
    renderContent(activeCharIndex)
  ] });
}
function HintTooltip({
  hint
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), onClick: () => setOpen((o) => !o), className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary border border-border text-muted-foreground hover:bg-purple-500/10 hover:border-purple-400/50 hover:text-purple-400 transition-colors", "aria-label": "Show hint", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "size-4" }) }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), className: "absolute right-0 top-9 w-72 z-50 bg-card border border-purple-400/40 rounded-lg p-4 shadow-lg text-sm leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-[5px] right-2.5 w-2.5 h-2.5 bg-card border-l border-t border-purple-400/40 rotate-45" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2 text-purple-400 text-[11px] font-medium uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "size-3.5" }),
        "Hint"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 text-[13px]", children: hint })
    ] })
  ] });
}
function Workspace() {
  const {
    exp
  } = Route$4.useSearch();
  const details = getExperimentDetails(exp);
  const title = details?.experiment.title || "Experiment Workspace";
  const courseTitle = details?.course.title || "Sandbox";
  const weekTitle = details?.week.title || "";
  const [language, setLanguage] = reactExports.useState("c");
  const [code, setCode] = reactExports.useState("");
  const [stdin, setStdin] = reactExports.useState("");
  const [output, setOutput] = reactExports.useState("");
  const [isError, setIsError] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isMounted, setIsMounted] = reactExports.useState(false);
  const [sqlLoaded, setSqlLoaded] = reactExports.useState(false);
  const [sqlLoadError, setSqlLoadError] = reactExports.useState(null);
  const [sqlResult, setSqlResult] = reactExports.useState(null);
  const sqlRef = reactExports.useRef(null);
  const sqlDbRef = reactExports.useRef(null);
  const [pyodideLoaded, setPyodideLoaded] = reactExports.useState(false);
  const [pyodideLoadError, setPyodideLoadError] = reactExports.useState(null);
  const pyodideRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setIsMounted(true);
  }, []);
  reactExports.useEffect(() => {
    if (language === "sql" && !sqlLoaded) {
      loadSqlJs().then((SQL) => {
        sqlRef.current = SQL;
        setSqlLoaded(true);
      }).catch((err) => {
        setSqlLoadError(err.message || "Failed to load SQL engine");
      });
    }
  }, [language, sqlLoaded]);
  reactExports.useEffect(() => {
    if (language === "python" && details?.course.id === "python" && !pyodideLoaded) {
      loadPyodide().then((pyodide) => {
        pyodideRef.current = pyodide;
        setPyodideLoaded(true);
      }).catch((err) => {
        setPyodideLoadError(err.message || "Failed to load Python engine");
      });
    }
  }, [language, pyodideLoaded, details]);
  const templates = {
    c: {
      file: "main.c",
      version: "10.2.0",
      code: `#include <stdio.h>

int main() {
    // Write your solution here
    
    printf("Hello World\\n");
    
    return 0;
}`
    },
    java: {
      file: "Main.java",
      version: "15.0.2",
      code: `public class Main {
    public static void main(String[] args) {
        // Write your solution here
        
        System.out.println("Hello World");
    }
}`
    },
    python: {
      file: "main.py",
      version: "3.10.0",
      code: `def solve():
    # Write your solution here
    print("Hello World")

if __name__ == "__main__":
    solve()`
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
ORDER  BY grade DESC;`
    }
  };
  reactExports.useEffect(() => {
    if (details?.course.id === "dbms") {
      setLanguage("sql");
    } else if (details?.course.id === "machine-learning" || details?.course.id === "python") {
      setLanguage("python");
    } else if (details?.course.id === "advanced-data-structures") {
      setLanguage("java");
    } else {
      setLanguage("c");
    }
  }, [exp]);
  reactExports.useEffect(() => {
    let newCode = templates[language].code;
    if (language === "c" && details?.experiment.title === "Hello World") {
      newCode = `#include<stdio.h>
int main(){
  printf("Hello World");
  return 0;
}`;
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
  const handleRunSql = () => {
    if (!sqlRef.current) {
      setSqlResult({
        tables: [],
        messages: [],
        error: sqlLoadError || "SQL engine not loaded yet. Please wait…"
      });
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
        batched: (str) => {
          stdoutBuffer += str + "\n";
        }
      });
      pyodide.setStderr({
        batched: (str) => {
          stderrBuffer += str + "\n";
        }
      });
      const runCode = `
import sys
import io
import builtins
import traceback
import json

def _run_wrapper():
    stdout_capture = io.StringIO()
    stderr_capture = io.StringIO()
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    sys.stdout = stdout_capture
    sys.stderr = stderr_capture
    
    sys.stdin = io.StringIO(${JSON.stringify(stdin || "")})
    
    def custom_input(prompt=""):
        if prompt:
            sys.stdout.write(prompt)
        line = sys.stdin.readline()
        if not line:
            raise EOFError("EOF when reading a line")
        return line.rstrip('\\r\\n')
    
    builtins.input = custom_input
    
    try:
        user_code = ${JSON.stringify(code)}
        globals_dict = {"__builtins__": builtins}
        exec(user_code, globals_dict)
    except BaseException as e:
        traceback.print_exc(file=stderr_capture)
    finally:
        sys.stdout = old_stdout
        sys.stderr = old_stderr
        
    return json.dumps({
        "stdout": stdout_capture.getvalue(),
        "stderr": stderr_capture.getvalue()
    })

_run_wrapper()
`;
      const resultJson = await pyodide.runPythonAsync(runCode);
      const result = JSON.parse(resultJson);
      const stdout = result.stdout;
      const stderr = result.stderr;
      if (stderr) {
        setIsError(true);
        setOutput(stderr);
      } else {
        setIsError(false);
        setOutput(stdout.replace(/\n$/, "") || "Program exited with no output.");
      }
    } catch (err) {
      setIsError(true);
      setOutput(err.message || "An error occurred during local python execution.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput("Executing...");
    setIsError(false);
    try {
      const compilerMap = {
        c: "gcc-head-c",
        java: "openjdk-jdk-22+36",
        python: "cpython-head"
      };
      let finalCode = code;
      if (language === "java") {
        finalCode = code.replace(/public\s+class\s+/, "class ");
      }
      const bodyPayload = {
        compiler: compilerMap[language] || "gcc-head",
        code: finalCode,
        // Send the treated code directly here
        stdin,
        options: language === "c" ? "warning" : ""
      };
      if (language === "c") {
        bodyPayload["compiler-option-raw"] = "-lm";
      }
      const response = await fetch("https://wandbox.org/api/compile.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyPayload)
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
    } catch (err) {
      setIsError(true);
      setOutput(`Execution failed: ${err.message || "Wandbox server unavailable"}

Please try again.`);
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
  const WORKSPACE_STEPS = isAITools ? ["Aim", "Theory", "Pretest", "Procedure", "Solve", "Posttest", "References"] : ["Aim", "Theory", "Pretest", "Procedure", "Simulation", "Code Test", "Posttest", "References"];
  const [activeStepIndex, setActiveStepIndex] = reactExports.useState(0);
  const [pretestAnswers, setPretestAnswers] = reactExports.useState({});
  const [posttestAnswers, setPosttestAnswers] = reactExports.useState({});
  const [pretestReviewed, setPretestReviewed] = reactExports.useState(false);
  const [posttestReviewed, setPosttestReviewed] = reactExports.useState(false);
  const currentStepName = WORKSPACE_STEPS[activeStepIndex].toLowerCase();
  const currentContent = details?.experiment?.content;
  let isNextEnabled = true;
  const calculateScore = (stepName) => {
    const test = currentContent?.[stepName];
    if (!test) return 0;
    const answers = stepName === "pretest" ? pretestAnswers : posttestAnswers;
    let score = 0;
    test.forEach((q, i) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen flex flex-col pt-[4.5rem] bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground", children: [
          details ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/course/${details.course.id}`, className: "hover:text-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-3.5" }),
            " Back to ",
            courseTitle
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", className: "hover:text-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-3.5" }),
            " Back"
          ] }),
          details && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
          details && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: weekTitle })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-mono text-muted-foreground", children: [
          "Step ",
          activeStepIndex + 1,
          " of ",
          WORKSPACE_STEPS.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-2 overflow-x-auto", children: WORKSPACE_STEPS.map((step, idx) => {
        const isCompleted = idx < activeStepIndex;
        const isActive = idx === activeStepIndex;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveStepIndex(idx), className: `flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${isActive ? "bg-cyan/20 text-cyan border border-cyan/30" : isCompleted ? "bg-secondary text-foreground border border-border" : "text-muted-foreground hover:bg-secondary/50 border border-transparent"}`, children: [
          isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3.5 text-mint" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isActive || isCompleted ? "" : "opacity-70", children: step })
        ] }, step);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-secondary rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-cyan transition-all duration-300", style: {
        width: `${(activeStepIndex + 1) / WORKSPACE_STEPS.length * 100}%`
      } }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: currentStepName === "code test" || currentStepName === "solve" ? (
      // SIMULATION VIEW (Existing Split Pane for Code Test) OR AI LAB SOLVE VIEW
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full grid lg:grid-cols-[1fr_1fr] divide-x divide-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col overflow-y-auto bg-card relative pb-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-border bg-secondary/20 flex items-center gap-4", children: [
            isAITools && getAILogoUrl(details?.experiment.id) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 rounded-xl bg-white border border-border flex items-center justify-center p-2 shadow-sm overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getAILogoUrl(details?.experiment.id), alt: "Tool Logo", className: "w-full h-full object-contain", onError: (e) => e.currentTarget.style.display = "none" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display leading-tight", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-mint/20 text-mint border border-mint/30", children: "Easy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-secondary text-foreground border border-border", children: "Core" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 flex-1 text-sm text-foreground/90 space-y-6", children: details ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-base mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Beaker, { className: "size-4 text-cyan" }),
                " Problem Statement"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: details.experiment.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: details.week.objective })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-base mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "size-4 text-mint" }),
                " Expected Output"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-secondary/30 border border-border rounded-lg p-4 font-mono text-xs space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#3fb950] font-medium", children: details.experiment.expected }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-base mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "size-4 text-primary" }),
                " Mini Questions"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1.5 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "What edge cases should you consider for this problem?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Can you optimize the time complexity?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "How would this approach scale for 10^6 inputs?" })
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Select a specific experiment from a course to view details here." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-t border-border bg-secondary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3", children: "Evaluation Criteria" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["Compiles successfully", "Passes base test cases", "Memory efficient"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-mint" }),
              " ",
              t
            ] }, t)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handlePrev, className: "px-4 py-2 rounded-md border border-border bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors", children: "Previous: Procedure" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleNext, className: "px-4 py-2 rounded-md bg-cyan text-cyan-foreground font-medium text-sm hover:bg-cyan/90 transition-colors", children: "Next: Posttest" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex flex-col bg-[#0f111a]", children: isAITools ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center p-10 bg-card/50 text-center relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan/5 to-fuchsia-400/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 rounded-2xl bg-secondary/80 border border-border flex items-center justify-center mb-6 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-10 text-cyan animate-pulse" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold font-display mb-3", children: "AI Tool Workspace" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: "This experiment requires you to use an external AI tool. Click the button below to launch the tool in a new secure tab. Keep this virtual lab open to refer to the procedure and complete the posttest." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              const links = {
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
            }, className: "px-6 py-3 rounded-full bg-cyan text-cyan-foreground font-semibold text-sm hover:bg-cyan/90 transition-all hover:scale-105 shadow-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-4" }),
              " Launch External Tool"
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 border-b border-border/10 bg-black/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-mono text-muted-foreground ml-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-destructive/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-cyan/80" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-mint" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: language, onChange: (e) => setLanguage(e.target.value), className: "ml-2 bg-transparent border-none text-muted-foreground focus:ring-0 cursor-pointer hover:text-foreground transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "c", children: "C" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "java", children: "Java" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "python", children: "Python 3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sql", children: "SQL" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-white/40", children: "|" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: templates[language].file }),
              isSql && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-white/40", children: "|" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 flex items-center gap-1 text-cyan/70", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "size-3" }),
                  sqlLoaded ? "SQLite ready" : sqlLoadError ? "Load failed" : "Loading…"
                ] })
              ] }),
              language === "python" && details?.course.id === "python" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-white/40", children: "|" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 flex items-center gap-1 text-cyan/70", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "size-3" }),
                  pyodideLoaded ? "Pyodide ready" : pyodideLoadError ? "Load failed" : "Loading…"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleReset, className: "inline-flex items-center gap-2 rounded-md border border-border/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-3.5" }),
                " Reset"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 rounded-md border border-border/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-3.5" }),
                " Save"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleRun, disabled: isLoading || isSql && !sqlLoaded && !sqlLoadError || language === "python" && details?.course.id === "python" && !pyodideLoaded && !pyodideLoadError, className: "inline-flex items-center gap-2 rounded-md bg-mint/20 text-mint border border-mint/20 px-4 py-1.5 text-xs font-medium hover:bg-mint/30 transition-colors disabled:opacity-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-3.5" }),
                " ",
                isLoading ? "Running…" : "Run Code"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden relative", children: isMounted && /* @__PURE__ */ jsxRuntimeExports.jsx(Ft, { height: "100%", language: language === "python" ? "python" : language === "java" ? "java" : language === "sql" ? "sql" : "c", theme: "vs-dark", value: code, onChange: (val) => setCode(val || ""), options: {
            minimap: {
              enabled: false
            },
            fontSize: 14,
            scrollBeyondLastLine: false
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 border-t border-border/10 bg-black/40 flex flex-col", children: isSql ? (
            /* SQL: full-width result pane (no stdin) */
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 border-b border-border/10 text-xs font-mono uppercase tracking-wider text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "size-3.5" }),
                " Query Results"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto p-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30 text-[13px] font-mono italic", children: "Executing…" }) : sqlResult ? /* @__PURE__ */ jsxRuntimeExports.jsx(SqlResultView, { ...sqlResult }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30 text-[13px] font-mono italic", children: "Results will appear here after you run a query…" }) })
            ] })
          ) : (
            /* C / Java / Python: split stdin + stdout */
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 h-full divide-x divide-border/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 border-b border-border/10 text-xs font-mono uppercase tracking-wider text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "size-3.5" }),
                  " stdin"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: stdin, onChange: (e) => setStdin(e.target.value), placeholder: "Enter inputs here (e.g. for scanf)...", className: "flex-1 p-4 bg-transparent border-none outline-none resize-none text-[13px] font-mono text-white/80" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 border-b border-border/10 text-xs font-mono uppercase tracking-wider text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "size-3.5" }),
                  " Console Output"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto p-4", children: output ? /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: `text-[13px] font-mono whitespace-pre-wrap ${isError ? "text-red-400" : "text-green-400"}`, children: output }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30 text-[13px] font-mono italic", children: "Output will appear here…" }) })
              ] })
            ] })
          ) })
        ] }) })
      ] })
    ) : (
      // CONTENT VIEWS FOR OTHER MODULES
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-10 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
          isAITools && getAILogoUrl(details?.experiment.id) && currentStepName !== "pretest" && currentStepName !== "posttest" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-24 rounded-2xl bg-white border border-border/50 flex items-center justify-center p-4 shadow-xl overflow-hidden animate-in zoom-in-95 duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getAILogoUrl(details?.experiment.id), alt: "Tool Logo", className: "w-full h-full object-contain drop-shadow-md", onError: (e) => e.currentTarget.style.display = "none" }) }) }),
          (() => {
            const step = WORKSPACE_STEPS[activeStepIndex].toLowerCase();
            const content = details?.experiment?.content;
            if (!content || !content[step]) {
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-display font-bold mb-4", children: WORKSPACE_STEPS[activeStepIndex] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-lg max-w-lg mb-8", children: [
                  "Content for ",
                  WORKSPACE_STEPS[activeStepIndex],
                  " has not been added yet for this module."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center size-24 rounded-full bg-secondary/50 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Book, { className: "size-8 text-muted-foreground/50" }) })
              ] });
            }
            if (step === "aim") {
              let textContent = content.aim.text + " ";
              if (content.aim.bullets) {
                content.aim.bullets.forEach((b) => textContent += b + " ");
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsx(TTSSection, { heading: "Aim", textContent, renderContent: (activeCharIndex) => {
                let offset = 0;
                const mainText = content.aim.text + " ";
                const mainStart = offset;
                offset += mainText.length;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-foreground/90 leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightableText, { text: mainText, activeCharIndex: activeCharIndex - mainStart }) }),
                  content.aim.bullets && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-outside pl-5 space-y-3 mt-6 text-muted-foreground", children: content.aim.bullets.map((b, i) => {
                    const bText = b + " ";
                    const bStart = offset;
                    offset += bText.length;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightableText, { text: bText, activeCharIndex: activeCharIndex - bStart }) }, i);
                  }) })
                ] });
              } }, "aim");
            }
            if (step === "theory") {
              let textContent = "";
              content.theory.forEach((section) => {
                textContent += section.title + ". ";
                section.body.forEach((p) => textContent += p + " ");
              });
              return /* @__PURE__ */ jsxRuntimeExports.jsx(TTSSection, { heading: "Theory", textContent, renderContent: (activeCharIndex) => {
                let offset = 0;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: content.theory.map((section, i) => {
                  const titleText = section.title + ". ";
                  const titleStart = offset;
                  offset += titleText.length;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightableText, { text: titleText, activeCharIndex: activeCharIndex - titleStart }) }),
                    section.body.map((p, j) => {
                      const pText = p + " ";
                      const pStart = offset;
                      offset += pText.length;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightableText, { text: pText, activeCharIndex: activeCharIndex - pStart }) }, j);
                    })
                  ] }, i);
                }) });
              } }, "theory");
            }
            if (step === "procedure" || step === "references") {
              let textContent = "";
              content[step].forEach((item) => textContent += item + " ");
              return /* @__PURE__ */ jsxRuntimeExports.jsx(TTSSection, { heading: WORKSPACE_STEPS[activeStepIndex], textContent, renderContent: (activeCharIndex) => {
                let offset = 0;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-decimal list-outside pl-5 space-y-4 text-muted-foreground", children: content[step].map((item, i) => {
                  const itemText = item + " ";
                  const itemStart = offset;
                  offset += itemText.length;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "leading-relaxed pl-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightableText, { text: itemText, activeCharIndex: activeCharIndex - itemStart }) }, i);
                }) });
              } }, `procedure-refs-${step}`);
            }
            if (step === "simulation") {
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SimulationPlayer, { data: content.simulation }) });
            }
            if (step === "pretest" || step === "posttest") {
              const state = step === "pretest" ? pretestAnswers : posttestAnswers;
              const setState = step === "pretest" ? setPretestAnswers : setPosttestAnswers;
              const isReviewed = step === "pretest" ? pretestReviewed : posttestReviewed;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold font-display mb-6", children: WORKSPACE_STEPS[activeStepIndex] }),
                content[step].map((mcq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-xl border border-border bg-card space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-foreground flex items-start justify-between gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cyan mr-2", children: [
                        "Q",
                        i + 1,
                        "."
                      ] }),
                      mcq.question
                    ] }),
                    !isReviewed && mcq.hint && /* @__PURE__ */ jsxRuntimeExports.jsx(HintTooltip, { hint: mcq.hint })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pl-6", children: mcq.options.map((opt, j) => {
                    const isCorrect = j === mcq.answerIndex;
                    const isSelected = state[i] === j;
                    let labelClass = `flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/50 cursor-pointer transition-colors ${isSelected ? "border-cyan bg-cyan/10" : "border-border/50"}`;
                    if (isReviewed) {
                      if (isCorrect) {
                        labelClass = "flex items-center gap-3 p-3 rounded-lg border border-mint/50 bg-mint/10 pointer-events-none";
                      } else if (isSelected) {
                        labelClass = "flex items-center gap-3 p-3 rounded-lg border border-destructive/50 bg-destructive/10 pointer-events-none";
                      } else {
                        labelClass = "flex items-center gap-3 p-3 rounded-lg border border-border/50 opacity-50 pointer-events-none";
                      }
                    }
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: labelClass, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: `${step}-q${i}`, className: "accent-cyan", checked: isSelected, onChange: () => {
                        if (isReviewed) return;
                        const newState = {
                          ...state,
                          [i]: j
                        };
                        setState(newState);
                        if (Object.keys(newState).length === content[step].length) {
                          if (step === "pretest") setPretestReviewed(true);
                          else setPosttestReviewed(true);
                        }
                      }, disabled: isReviewed }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: opt }),
                      isReviewed && isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-mint ml-auto" })
                    ] }, j);
                  }) })
                ] }, i))
              ] });
            }
            return null;
          })()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border p-6 bg-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handlePrev, disabled: activeStepIndex === 0, className: "px-5 py-2.5 rounded-md border border-border bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none", children: "Previous" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            (currentStepName === "pretest" || currentStepName === "posttest") && isNextEnabled && currentContent[currentStepName] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium px-4 py-2 bg-secondary/50 rounded-md border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Score:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-mint text-base", children: [
                calculateScore(currentStepName),
                " / ",
                currentContent[currentStepName]?.length || 0
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: activeStepIndex === WORKSPACE_STEPS.length - 1 ? handleSubmit : handleNext, className: "px-5 py-2.5 rounded-md bg-cyan text-cyan-foreground font-medium text-sm hover:bg-cyan/90 transition-colors", children: activeStepIndex === WORKSPACE_STEPS.length - 1 ? "Submit" : "Next" })
          ] })
        ] })
      ] })
    ) })
  ] });
}
export {
  Workspace as component
};
