import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, SkipForward, RotateCcw, FastForward, Lightbulb, ChevronRight, Layers, Plus, Trash2 } from "lucide-react";

/* ─── reusable UI atoms ─── */
const SectionTitle = ({ num, title }: { num: number; title: string }) => (
  <div className="flex items-center gap-4 mb-6 mt-16 first:mt-0">
    <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-md text-sm">{num}</div>
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
  </div>
);

const OutputConsole = ({ lines, label }: { lines: string[]; label?: string }) => (
  <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 font-mono">
    <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-3 font-sans">{label || "Output Console"}</h3>
    <div className="text-emerald-400 text-[15px] space-y-0.5 max-h-48 overflow-y-auto">
      {lines.length > 0 ? lines.map((l, i) => <div key={i}>{l}</div>) : <span className="text-slate-600 italic">No output yet...</span>}
    </div>
  </div>
);

const ScopePanel = ({ title, rows, color }: { title: string; rows: { v: string; val: string }[]; color: "blue" | "purple" | "emerald" }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600 border-blue-200 bg-blue-50",
    purple: "from-purple-500 to-purple-600 border-purple-200 bg-purple-50",
    emerald: "from-emerald-500 to-emerald-600 border-emerald-200 bg-emerald-50",
  };
  return (
    <div className={`rounded-2xl shadow-sm border ${colors[color].split(' ')[1]} overflow-hidden`}>
      <div className={`bg-gradient-to-r ${colors[color].split(' ')[0]} ${colors[color].split(' ')[1].replace('border-', 'to-')} text-white px-4 py-2 font-bold text-xs uppercase tracking-widest`}>{title}</div>
      <div className={`${colors[color].split(' ')[2]} p-4 font-mono text-sm space-y-1`}>
        {rows.length > 0 ? rows.map((r, i) => (
          <div key={i} className="flex justify-between items-center py-1 border-b border-white/50 last:border-none">
            <span className="text-slate-700 font-semibold">{r.v}</span>
            <span className="bg-white/80 px-3 py-0.5 rounded-lg text-slate-800 font-bold">{r.val}</span>
          </div>
        )) : <span className="text-slate-400 italic text-xs">Empty</span>}
      </div>
    </div>
  );
};

const CallStack = ({ frames }: { frames: string[] }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
    <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
      <Layers className="size-3.5" /> Function Call Stack
    </h3>
    <div className="space-y-1 font-mono text-sm">
      {frames.map((f, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
          className="flex items-center gap-2">
          <span className="text-slate-300">{" ".repeat(i * 2)}{"└── "}</span>
          <span className={`px-3 py-1 rounded-lg font-bold ${i === frames.length - 1 ? "bg-blue-100 text-blue-700 border border-blue-200" : "bg-slate-50 text-slate-500 border border-slate-200"}`}>{f}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

const ReturnBadge = ({ value }: { value: string }) => (
  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl px-5 py-2.5 font-bold text-sm inline-flex items-center gap-2 shadow-md font-mono">
    return → {value}
  </div>
);

const Hint = ({ text, show }: { text: string; show: boolean }) =>
  show ? (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-3">
      <Lightbulb className="size-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <span>{text}</span>
    </motion.div>
  ) : null;

const CL = ({ indent, active, children }: { indent: number; active?: boolean; children: React.ReactNode }) => (
  <div className={`transition-all rounded-lg px-2 py-0.5 font-mono text-[15px] ${active ? "bg-emerald-100 border-l-4 border-emerald-500" : ""}`}
    style={{ paddingLeft: `${indent * 1.5 + 0.5}rem` }}>
    {children}
  </div>
);

const RunButton = ({ onClick, label }: { onClick: () => void; label?: string }) => (
  <button onClick={onClick}
    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg font-semibold text-sm w-fit">
    <PlayCircle className="size-4" /> {label || "Run Code"}
  </button>
);

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export function PythonFunctionsPlayground({ expId }: { expId: string }) {

  /* ── SECTION 1: Function Definition & Return ── */
  const [s1a, setS1a] = useState("5");
  const [s1b, setS1b] = useState("3");
  const [s1Ran, setS1Ran] = useState(false);
  const s1A = Number(s1a), s1B = Number(s1b);
  const s1Valid = !isNaN(s1A) && !isNaN(s1B);
  const s1Result = s1Valid ? s1A + s1B : NaN;

  /* ── SECTION 2: Argument types ── */
  const [s2Name, setS2Name] = useState("Alice");
  const [s2Msg, setS2Msg] = useState("");
  const [s2Style, setS2Style] = useState<"pos" | "kw" | "default">("default");
  const [s2Ran, setS2Ran] = useState(false);

  const s2Compute = () => {
    const msg = s2Msg.trim() || "Hello";
    return `${msg} ${s2Name}`;
  };
  const s2MappedMsg = s2Style === "default" ? "Hello" : (s2Msg.trim() || "Hello");

  /* ── SECTION 3: *args and **kwargs ── */
  const [s3Vals, setS3Vals] = useState<string[]>(["10", "20", "30", "40"]);
  const [s3Ran, setS3Ran] = useState(false);
  const s3Nums = s3Vals.map(Number).filter((n) => !isNaN(n));
  const s3Avg = s3Nums.length > 0 ? s3Nums.reduce((a, b) => a + b, 0) / s3Nums.length : 0;

  const [s3kv, setS3kv] = useState<{ k: string; v: string }[]>([
    { k: "name", v: "Alice" },
    { k: "age", v: "20" },
  ]);
  const [s3kRan, setS3kRan] = useState(false);

  /* ── SECTION 4: Local vs Global Scope ── */
  const [s4Step, setS4Step] = useState(0);
  const [s4Error, setS4Error] = useState(false);

  /* ── SECTION 5a: Global keyword ── */
  const [s5Counter, setS5Counter] = useState(0);
  const [s5Calls, setS5Calls] = useState(0);

  /* ── SECTION 5b: Recursive factorial ── */
  const [s5fN, setS5fN] = useState("5");
  const [s5fRan, setS5fRan] = useState(false);
  const [s5fStep, setS5fStep] = useState(0);
  const [s5fAuto, setS5fAuto] = useState(false);
  const s5fTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const s5fNum = Number(s5fN);
  const s5fValid = !isNaN(s5fNum) && s5fNum >= 1 && s5fNum <= 12 && Number.isInteger(s5fNum);

  // build call stack & return values
  const s5fBuildTrace = (n: number) => {
    const calls: string[] = [];
    const returns: { frame: string; val: number }[] = [];
    for (let i = n; i >= 1; i--) calls.push(`factorial(${i})`);
    let val = 1;
    for (let i = 1; i <= n; i++) { val *= i; returns.push({ frame: `factorial(${i})`, val }); }
    return { calls, returns: returns.reverse() };
  };
  const s5fTrace = s5fValid ? s5fBuildTrace(s5fNum) : { calls: [], returns: [] };
  const s5fTotalSteps = s5fTrace.calls.length + s5fTrace.returns.length;

  const s5fNext = useCallback(() => {
    setS5fStep((s) => {
      if (s >= s5fTotalSteps) { setS5fAuto(false); return s; }
      return s + 1;
    });
  }, [s5fTotalSteps]);

  useEffect(() => {
    if (s5fAuto) {
      s5fTimer.current = setInterval(() => {
        setS5fStep((s) => {
          if (s >= s5fTotalSteps) { setS5fAuto(false); return s; }
          return s + 1;
        });
      }, 600);
    }
    return () => { if (s5fTimer.current) clearInterval(s5fTimer.current); };
  }, [s5fAuto, s5fTotalSteps]);

  const s5fReset = () => { setS5fStep(0); setS5fRan(false); setS5fAuto(false); };

  /* ── FINAL SANDBOX ── */
  const [fpFnName, setFpFnName] = useState("greet");
  const [fpParams, setFpParams] = useState("name, greeting=\"Hello\"");
  const [fpBody, setFpBody] = useState("return f\"{greeting}, {name}!\"");
  const [fpCallArgs, setFpCallArgs] = useState("\"World\"");
  const [fpOut, setFpOut] = useState<string[]>([]);
  const [fpStack, setFpStack] = useState<string[]>([]);
  const [fpLocal, setFpLocal] = useState<{ v: string; val: string }[]>([]);
  const [fpGlobal, setFpGlobal] = useState<{ v: string; val: string }[]>([]);
  const [fpRetVal, setFpRetVal] = useState("");

  const runFinal = () => {
    // simple simulation of function call
    const params = fpParams.split(",").map((p) => p.trim());
    const args = fpCallArgs.split(",").map((a) => a.trim());
    const local: { v: string; val: string }[] = [];
    params.forEach((p, i) => {
      const parts = p.split("=");
      const pName = parts[0].trim();
      const defaultVal = parts.length > 1 ? parts[1].trim() : undefined;
      const argVal = args[i] !== undefined ? args[i] : defaultVal || "None";
      local.push({ v: pName, val: argVal });
    });
    setFpLocal(local);
    setFpStack(["main()", `${fpFnName}(${fpCallArgs})`]);
    // simulate return
    const retMatch = fpBody.match(/return\s+(.+)/);
    let retVal = "None";
    if (retMatch) {
      let expr = retMatch[1];
      // try to evaluate f-string
      if (expr.startsWith("f\"") || expr.startsWith("f'")) {
        let fstr = expr.slice(2, -1);
        local.forEach((l) => {
          fstr = fstr.replace(new RegExp(`\\{${l.v}\\}`, "g"), l.val.replace(/^["']|["']$/g, ""));
        });
        retVal = `"${fstr}"`;
      } else {
        // try arithmetic
        let evalExpr = expr;
        local.forEach((l) => { evalExpr = evalExpr.replace(new RegExp(`\\b${l.v}\\b`, "g"), l.val); });
        try { retVal = String(Function(`"use strict";return (${evalExpr})`)()) } catch { retVal = expr; }
      }
    }
    setFpRetVal(retVal);
    setFpGlobal([{ v: "result", val: retVal }]);
    const printMatch = fpBody.match(/print\((.+)\)/);
    if (printMatch) {
      setFpOut([retVal]);
    } else {
      setFpOut([retVal]);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans p-8 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl pointer-events-none rounded-full" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 relative z-10">
            Functions, Arguments & Scope Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Coding Lab</p>
        </div>

        {/* ═══ SECTION 1: Function Definition & Return ═══ */}
        <section>
          <SectionTitle num={1} title="Function Definition & Return" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs">Interactive Code</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">def</span> <span className="text-purple-600 font-bold">add</span>(<span className="text-purple-600">a</span>, <span className="text-purple-600">b</span>):</CL>
                <CL indent={1} active={s1Ran}><span className="text-blue-600 font-bold">return</span> a + b</CL>
                <div className="h-3" />
                <CL indent={0}>
                  <span className="text-purple-600">result</span> = add(
                  <input type="text" value={s1a} onChange={(e) => { setS1a(e.target.value); setS1Ran(false); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-10 text-center font-mono focus:border-blue-500" />,{" "}
                  <input type="text" value={s1b} onChange={(e) => { setS1b(e.target.value); setS1Ran(false); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-10 text-center font-mono focus:border-blue-500" />)
                </CL>
                <CL indent={0} active={s1Ran}><span className="text-blue-600">print</span>(result)</CL>
              </div>
              <RunButton onClick={() => setS1Ran(true)} />
            </div>
            <div className="flex flex-col gap-4">
              {s1Ran && s1Valid && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <CallStack frames={["main()", `add(${s1a}, ${s1b})`]} />
                  <ScopePanel title="Local Scope (add)" color="purple" rows={[
                    { v: "a", val: String(s1A) },
                    { v: "b", val: String(s1B) },
                  ]} />
                  <ReturnBadge value={String(s1Result)} />
                  <ScopePanel title="Global Scope" color="blue" rows={[
                    { v: "result", val: String(s1Result) },
                  ]} />
                  <OutputConsole lines={[String(s1Result)]} />
                  <Hint show text="Functions are defined with def, execute when called, and return values to the caller. The local variables a and b exist only inside add()." />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: Positional, Keyword & Default Arguments ═══ */}
        <section>
          <SectionTitle num={2} title="Positional, Keyword & Default Arguments" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">def</span> <span className="text-purple-600 font-bold">greet</span>(<span className="text-purple-600">name</span>, <span className="text-purple-600">message</span>=<span className="text-amber-600">"Hello"</span>):</CL>
                <CL indent={1} active={s2Ran}><span className="text-blue-600 font-bold">return</span> f"<span className="text-amber-600">{"{"}</span>message<span className="text-amber-600">{"}"}</span> <span className="text-amber-600">{"{"}</span>name<span className="text-amber-600">{"}"}</span>"</CL>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Name</label>
                <input type="text" value={s2Name} onChange={(e) => { setS2Name(e.target.value); setS2Ran(false); }}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2.5 font-mono outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Message <span className="text-slate-300">(leave empty for default)</span></label>
                <input type="text" value={s2Msg} onChange={(e) => { setS2Msg(e.target.value); setS2Ran(false); }}
                  placeholder="Hello" className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2.5 font-mono outline-none focus:border-blue-400" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Argument Style</label>
                <div className="flex gap-2 flex-wrap">
                  {([
                    { id: "default" as const, label: `greet("${s2Name}")`, desc: "Default message" },
                    { id: "pos" as const, label: `greet("${s2Name}", "${s2Msg || "Welcome"}")`, desc: "Positional" },
                    { id: "kw" as const, label: `greet(name="${s2Name}", message="${s2Msg || "Hi"}")`, desc: "Keyword" },
                  ]).map((opt) => (
                    <button key={opt.id} onClick={() => { setS2Style(opt.id); setS2Ran(true); if (opt.id === "pos" && !s2Msg) setS2Msg("Welcome"); if (opt.id === "kw" && !s2Msg) setS2Msg("Hi"); }}
                      className={`px-3 py-2 rounded-xl font-mono text-xs border-2 transition-all ${s2Style === opt.id && s2Ran ? "bg-blue-500 text-white border-blue-500 shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"}`}>
                      {opt.desc}
                    </button>
                  ))}
                </div>
              </div>
              <RunButton onClick={() => setS2Ran(true)} />
            </div>
            <div className="flex flex-col gap-4">
              {s2Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-3">Argument Mapping</h3>
                    <div className="space-y-2 font-mono text-sm">
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                        <span className="text-purple-600 font-bold">name</span>
                        <ChevronRight className="size-4 text-slate-400" />
                        <span className="bg-white px-3 py-1 rounded-lg text-slate-700 font-bold">"{s2Name}"</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                        <span className="text-purple-600 font-bold">message</span>
                        <ChevronRight className="size-4 text-slate-400" />
                        <span className="bg-white px-3 py-1 rounded-lg text-slate-700 font-bold">"{s2MappedMsg}"</span>
                        {s2Style === "default" && <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">DEFAULT</span>}
                      </div>
                    </div>
                  </div>
                  <ScopePanel title="Local Scope (greet)" color="purple" rows={[
                    { v: "name", val: `"${s2Name}"` },
                    { v: "message", val: `"${s2MappedMsg}"` },
                  ]} />
                  <ReturnBadge value={`"${s2MappedMsg} ${s2Name}"`} />
                  <OutputConsole lines={[`${s2MappedMsg} ${s2Name}`]} />
                  <Hint show text={
                    s2Style === "default" ? "When no argument is provided for a default parameter, the default value is used."
                    : s2Style === "pos" ? "Positional arguments are matched left-to-right to parameters."
                    : "Keyword arguments are matched by parameter name — order doesn't matter."
                  } />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: *args and **kwargs ═══ */}
        <section>
          <SectionTitle num={3} title="*args and **kwargs Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* *args */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs">*args — Variable Positional</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">def</span> <span className="text-purple-600 font-bold">average</span>(<span className="text-amber-600">*args</span>):</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">return</span> sum(args) / len(args)</CL>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Values</label>
                <div className="flex flex-wrap gap-2 items-center">
                  {s3Vals.map((v, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <input type="text" value={v} onChange={(e) => { const nv = [...s3Vals]; nv[i] = e.target.value; setS3Vals(nv); setS3Ran(false); }}
                        className="w-14 bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 text-center font-mono text-sm outline-none focus:border-blue-400" />
                      {s3Vals.length > 1 && (
                        <button onClick={() => { setS3Vals(s3Vals.filter((_, j) => j !== i)); setS3Ran(false); }}
                          className="text-red-400 hover:text-red-600 transition-colors"><Trash2 className="size-3.5" /></button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => { setS3Vals([...s3Vals, "0"]); setS3Ran(false); }}
                    className="size-8 rounded-lg bg-blue-50 border-2 border-blue-200 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-all">
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
              <RunButton onClick={() => setS3Ran(true)} />
              {s3Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <ScopePanel title="Local Scope" color="purple" rows={[
                    { v: "args", val: `(${s3Nums.join(", ")})` },
                  ]} />
                  <ReturnBadge value={String(s3Avg)} />
                  <OutputConsole lines={[String(s3Avg)]} />
                </motion.div>
              )}
            </div>

            {/* **kwargs */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-purple-500 uppercase tracking-widest text-xs">**kwargs — Variable Keyword</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">def</span> <span className="text-purple-600 font-bold">profile</span>(<span className="text-amber-600">**kwargs</span>):</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">return</span> kwargs</CL>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Key-Value Pairs</label>
                <div className="space-y-2">
                  {s3kv.map((kv, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="text" value={kv.k} onChange={(e) => { const nkv = [...s3kv]; nkv[i] = { ...nkv[i], k: e.target.value }; setS3kv(nkv); setS3kRan(false); }}
                        className="w-24 bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 font-mono text-sm outline-none focus:border-purple-400" placeholder="key" />
                      <span className="text-slate-400">=</span>
                      <input type="text" value={kv.v} onChange={(e) => { const nkv = [...s3kv]; nkv[i] = { ...nkv[i], v: e.target.value }; setS3kv(nkv); setS3kRan(false); }}
                        className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 font-mono text-sm outline-none focus:border-purple-400" placeholder="value" />
                      {s3kv.length > 1 && (
                        <button onClick={() => { setS3kv(s3kv.filter((_, j) => j !== i)); setS3kRan(false); }}
                          className="text-red-400 hover:text-red-600 transition-colors"><Trash2 className="size-3.5" /></button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => { setS3kv([...s3kv, { k: "", v: "" }]); setS3kRan(false); }}
                    className="px-3 py-1.5 rounded-lg bg-purple-50 border-2 border-purple-200 text-purple-500 hover:bg-purple-100 flex items-center gap-1 text-xs font-bold transition-all">
                    <Plus className="size-3.5" /> Add Pair
                  </button>
                </div>
              </div>
              <RunButton onClick={() => setS3kRan(true)} />
              {s3kRan && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <ScopePanel title="Local Scope" color="purple" rows={[
                    { v: "kwargs", val: `{${s3kv.filter((kv) => kv.k).map((kv) => `"${kv.k}": "${kv.v}"`).join(", ")}}` },
                  ]} />
                  <OutputConsole lines={[`{${s3kv.filter((kv) => kv.k).map((kv) => `'${kv.k}': '${kv.v}'`).join(", ")}}`]} />
                </motion.div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Hint show text="*args collects extra positional arguments as a tuple. **kwargs collects extra keyword arguments as a dictionary. Both allow flexible function signatures." />
          </div>
        </section>

        {/* ═══ SECTION 4: Local Scope vs Global Scope ═══ */}
        <section>
          <SectionTitle num={4} title="Local Scope vs Global Scope" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0} active={s4Step === 1}><span className="text-purple-600">x</span> = <span className="text-amber-600">100</span></CL>
                <div className="h-2" />
                <CL indent={0}><span className="text-blue-600 font-bold">def</span> <span className="text-purple-600 font-bold">test</span>():</CL>
                <CL indent={1} active={s4Step === 2}><span className="text-purple-600">y</span> = <span className="text-amber-600">50</span></CL>
                <CL indent={1} active={s4Step === 3}><span className="text-blue-600">print</span>(y)</CL>
                <div className="h-2" />
                <CL indent={0} active={s4Step === 2 || s4Step === 3}><span className="text-purple-600">test</span>()</CL>
                <div className="h-2" />
                <CL indent={0} active={s4Step === 5}><span className="text-blue-600">print</span>(y)  <span className="text-slate-400"># ← What happens?</span></CL>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setS4Step(1)} className="px-4 py-2 rounded-xl bg-white border-2 border-blue-200 text-blue-700 font-semibold text-sm hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center gap-2">
                  <SkipForward className="size-4" /> Step 1: x = 100
                </button>
                <button onClick={() => { setS4Step(2); setS4Error(false); }} className="px-4 py-2 rounded-xl bg-white border-2 border-blue-200 text-blue-700 font-semibold text-sm hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center gap-2">
                  <SkipForward className="size-4" /> Step 2: Call test()
                </button>
                <button onClick={() => { setS4Step(3); setS4Error(false); }} className="px-4 py-2 rounded-xl bg-white border-2 border-blue-200 text-blue-700 font-semibold text-sm hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center gap-2">
                  <SkipForward className="size-4" /> Step 3: print(y)
                </button>
                <button onClick={() => setS4Step(4)} className="px-4 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                  <SkipForward className="size-4" /> Step 4: Function ends
                </button>
                <button onClick={() => { setS4Step(5); setS4Error(true); }} className="px-4 py-2 rounded-xl bg-white border-2 border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 hover:border-red-400 transition-all flex items-center gap-2">
                  ⚠ Step 5: print(y) outside
                </button>
                <button onClick={() => { setS4Step(0); setS4Error(false); }} className="px-4 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                  <RotateCcw className="size-4" /> Reset
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {s4Step >= 1 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  {s4Step >= 1 && <ScopePanel title="Global Scope" color="blue" rows={[{ v: "x", val: "100" }]} />}
                  {s4Step >= 2 && s4Step < 5 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <CallStack frames={["main()", "test()"]} />
                    </motion.div>
                  )}
                  {s4Step >= 2 && s4Step <= 3 && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <ScopePanel title="Local Scope (test)" color="purple" rows={[{ v: "y", val: "50" }]} />
                    </motion.div>
                  )}
                  {s4Step === 3 && <OutputConsole lines={["50"]} />}
                  {s4Step === 4 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
                        <h3 className="font-bold text-amber-700 text-sm mb-2">🗑️ Local Scope Destroyed</h3>
                        <p className="text-amber-600 text-sm">When <code className="bg-amber-100 px-1.5 rounded">test()</code> finishes, its local scope is destroyed. Variable <code className="bg-amber-100 px-1.5 rounded">y</code> no longer exists.</p>
                      </div>
                    </motion.div>
                  )}
                  {s4Step === 5 && s4Error && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5">
                        <h3 className="font-bold text-red-600 text-sm mb-2 font-mono">❌ NameError: name 'y' is not defined</h3>
                        <p className="text-red-500 text-sm">Variable <code className="bg-red-100 px-1.5 rounded">y</code> was local to <code className="bg-red-100 px-1.5 rounded">test()</code> and cannot be accessed outside.</p>
                      </div>
                      <Hint show text="Local variables exist ONLY inside their function. Once the function returns, the local scope is destroyed and those variables vanish." />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 5: Global Keyword & Recursion ═══ */}
        <section>
          <SectionTitle num={5} title="Global Keyword & Recursive Function" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Part A: global keyword */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs">Part A: global Keyword</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-purple-600">counter</span> = <span className="text-amber-600">0</span></CL>
                <div className="h-2" />
                <CL indent={0}><span className="text-blue-600 font-bold">def</span> <span className="text-purple-600 font-bold">increment</span>():</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">global</span> counter</CL>
                <CL indent={1} active={s5Calls > 0}><span className="text-purple-600">counter</span> += <span className="text-amber-600">1</span></CL>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setS5Counter((c) => c + 1); setS5Calls((c) => c + 1); }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-purple-500 transition-all shadow-md flex items-center gap-2">
                  <PlayCircle className="size-4" /> Call increment()
                </button>
                <button onClick={() => { setS5Counter(0); setS5Calls(0); }}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                  <RotateCcw className="size-4" /> Reset
                </button>
              </div>
              {s5Calls > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <ScopePanel title="Global Scope" color="blue" rows={[{ v: "counter", val: String(s5Counter) }]} />
                  <div className="text-center font-mono text-sm text-slate-500">increment() called <span className="font-bold text-blue-600">{s5Calls}</span> time{s5Calls > 1 ? "s" : ""}</div>
                  <Hint show text="The global keyword tells Python to modify the global variable instead of creating a new local one." />
                </motion.div>
              )}
            </div>

            {/* Part B: Recursive Factorial */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-purple-500 uppercase tracking-widest text-xs">Part B: Recursive Factorial</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700 text-[14px]">
                <CL indent={0}><span className="text-blue-600 font-bold">def</span> <span className="text-purple-600 font-bold">factorial</span>(<span className="text-purple-600">n</span>):</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">if</span> n == <span className="text-amber-600">1</span>:</CL>
                <CL indent={2}><span className="text-blue-600 font-bold">return</span> <span className="text-amber-600">1</span></CL>
                <CL indent={1}><span className="text-blue-600 font-bold">return</span> n * factorial(n-1)</CL>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">n =</label>
                <input type="text" value={s5fN} onChange={(e) => { setS5fN(e.target.value); s5fReset(); }}
                  className="w-16 bg-slate-50 border-2 border-slate-200 rounded-xl p-2 text-center font-mono outline-none focus:border-purple-400" />
                <div className="flex flex-wrap gap-1">
                  {["3", "4", "5", "6"].map((v) => (
                    <button key={v} onClick={() => { setS5fN(v); s5fReset(); }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-purple-400 bg-white font-mono text-xs hover:bg-purple-50 transition-all">{v}</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setS5fRan(true); s5fNext(); }} disabled={!s5fValid || s5fStep >= s5fTotalSteps}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-blue-200 text-blue-700 font-semibold text-sm hover:bg-blue-50 hover:border-blue-400 transition-all disabled:opacity-40 flex items-center gap-2">
                  <SkipForward className="size-4" /> Next Step
                </button>
                <button onClick={() => { setS5fRan(true); setS5fAuto(true); }} disabled={!s5fValid || s5fAuto || s5fStep >= s5fTotalSteps}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-purple-200 text-purple-700 font-semibold text-sm hover:bg-purple-50 hover:border-purple-400 transition-all disabled:opacity-40 flex items-center gap-2">
                  <FastForward className="size-4" /> Auto Run
                </button>
                <button onClick={s5fReset}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                  <RotateCcw className="size-4" /> Reset
                </button>
              </div>

              {s5fRan && s5fValid && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  {/* Call Stack Phase */}
                  {s5fStep <= s5fTrace.calls.length && s5fStep > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                      <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                        <Layers className="size-3.5" /> Call Stack (Building)
                      </h3>
                      <div className="space-y-1 font-mono text-sm">
                        {s5fTrace.calls.slice(0, s5fStep).map((f, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2">
                            <span className="text-slate-300">{" ".repeat(i * 2)}└── </span>
                            <span className={`px-3 py-1 rounded-lg font-bold ${i === Math.min(s5fStep, s5fTrace.calls.length) - 1 ? "bg-blue-100 text-blue-700 border border-blue-200" : "bg-slate-50 text-slate-500 border border-slate-200"}`}>{f}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Return Phase */}
                  {s5fStep > s5fTrace.calls.length && (
                    <div className="bg-white rounded-2xl shadow-sm border border-emerald-200 p-5">
                      <h3 className="font-bold text-emerald-600 uppercase tracking-widest text-xs mb-3">Return Flow (Unwinding)</h3>
                      <div className="space-y-2 font-mono text-sm">
                        {s5fTrace.returns.slice(0, s5fStep - s5fTrace.calls.length).reverse().map((r, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                            className="flex justify-between items-center p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                            <span className="text-slate-600">{r.frame}</span>
                            <span className="bg-emerald-500 text-white px-3 py-0.5 rounded-lg font-bold">→ {r.val}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Final result */}
                  {s5fStep >= s5fTotalSteps && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
                      <OutputConsole lines={[String(s5fTrace.returns[0]?.val || 1)]} />
                      <Hint show text="Each recursive call waits for the next to return. The call stack builds up, then unwinds as each function returns its result." />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ FINAL SANDBOX ═══ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Sandbox</h2>
            <p className="text-slate-500">Create your own function, set parameters, and observe execution.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>Function Editor</span>
                <button onClick={runFinal} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-sm">
                  <PlayCircle className="size-4" /> Run Code
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Function Name</label>
                    <input type="text" value={fpFnName} onChange={(e) => setFpFnName(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2 font-mono outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Parameters</label>
                    <input type="text" value={fpParams} onChange={(e) => setFpParams(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2 font-mono outline-none focus:border-blue-400" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Function Body</label>
                  <input type="text" value={fpBody} onChange={(e) => setFpBody(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2 font-mono outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Call Arguments</label>
                  <input type="text" value={fpCallArgs} onChange={(e) => setFpCallArgs(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2 font-mono outline-none focus:border-blue-400" />
                </div>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-[14px] text-slate-600 leading-loose">
                  <div><span className="text-blue-600 font-bold">def</span> <span className="text-purple-600 font-bold">{fpFnName}</span>({fpParams}):</div>
                  <div className="pl-6">{fpBody}</div>
                  <div className="h-3" />
                  <div><span className="text-purple-600">result</span> = {fpFnName}({fpCallArgs})</div>
                  <div><span className="text-blue-600">print</span>(result)</div>
                </div>

                {/* quick presets */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { l: "add(a,b)", fn: "add", p: "a, b", b: "return a + b", c: "5, 3" },
                    { l: "greet(name)", fn: "greet", p: "name, greeting=\"Hello\"", b: "return f\"{greeting}, {name}!\"", c: "\"World\"" },
                    { l: "square(x)", fn: "square", p: "x", b: "return x * x", c: "7" },
                    { l: "max(a,b)", fn: "maximum", p: "a, b", b: "return a if a > b else b", c: "10, 25" },
                  ].map((p) => (
                    <button key={p.l} onClick={() => { setFpFnName(p.fn); setFpParams(p.p); setFpBody(p.b); setFpCallArgs(p.c); setFpOut([]); setFpStack([]); setFpLocal([]); setFpGlobal([]); setFpRetVal(""); }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs hover:bg-blue-50 transition-all">{p.l}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {fpStack.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <CallStack frames={fpStack} />
                  <ScopePanel title="Local Scope" color="purple" rows={fpLocal} />
                  {fpRetVal && <ReturnBadge value={fpRetVal} />}
                  <ScopePanel title="Global Scope" color="blue" rows={fpGlobal} />
                </motion.div>
              )}
              <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col overflow-hidden">
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-400">
                  Output Console
                </div>
                <div className="p-6 font-mono text-emerald-400 space-y-0.5">
                  {fpOut.length > 0 ? fpOut.map((l, i) => <div key={i}>{l}</div>) : <div className="text-slate-600 italic">Click Run Code...</div>}
                </div>
              </div>
            </div>
          </div>

          {/* Learning summary */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {["def & return", "Arguments", "*args/**kwargs", "Scope & Recursion"].map((label, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <span className="text-emerald-500 font-bold text-lg">✓</span>
                <div className="text-slate-600 text-xs font-bold mt-1 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
