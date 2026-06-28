import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, SkipForward, RotateCcw, FastForward, Lightbulb, Keyboard, Pause } from "lucide-react";

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

const MemoryPanel = ({ rows }: { rows: { v: string; val: string; t: string }[] }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
    <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-3">Memory State</h3>
    <div className="grid grid-cols-3 gap-1 font-mono text-sm">
      <div className="font-bold text-slate-500 pb-1 border-b border-slate-100 text-xs">Variable</div>
      <div className="font-bold text-slate-500 pb-1 border-b border-slate-100 text-xs">Value</div>
      <div className="font-bold text-slate-500 pb-1 border-b border-slate-100 text-xs">Type</div>
      {rows.map((r, i) => (
        <React.Fragment key={i}>
          <div className="text-purple-600 py-0.5">{r.v}</div>
          <div className="text-emerald-600 py-0.5">{r.val}</div>
          <div className="text-blue-600 py-0.5">{r.t}</div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const IterBadge = ({ n, total }: { n: number; total?: number }) => (
  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl px-4 py-2 font-bold text-sm inline-flex items-center gap-2 shadow-md">
    Iteration {n}{total ? ` / ${total}` : ""}
  </div>
);

const Hint = ({ text, show }: { text: string; show: boolean }) =>
  show ? (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-3">
      <Lightbulb className="size-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <span>{text}</span>
    </motion.div>
  ) : null;

const CondChip = ({ expr, result }: { expr: string; result: boolean }) => (
  <div className={`flex items-center justify-between p-3 rounded-xl font-mono text-sm border-2 ${result ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-red-50 border-red-300 text-red-600"}`}>
    <span>{expr}</span>
    <span className="font-bold">{result ? "True → Continue" : "False → Stop"}</span>
  </div>
);

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export function PythonLoopsPlayground({ expId }: { expId: string }) {

  /* ── STEP 1: While Loop ── */
  const [w1Count, setW1Count] = useState(1);
  const [w1Out, setW1Out] = useState<string[]>([]);
  const [w1Done, setW1Done] = useState(false);
  const [w1Auto, setW1Auto] = useState(false);
  const w1Timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const w1Next = useCallback(() => {
    if (w1Count <= 5) {
      setW1Out((p) => [...p, String(w1Count)]);
      setW1Count((c) => c + 1);
    }
    if (w1Count >= 5) { setW1Done(true); setW1Auto(false); }
  }, [w1Count]);

  const w1Reset = () => { setW1Count(1); setW1Out([]); setW1Done(false); setW1Auto(false); };

  useEffect(() => {
    if (w1Auto && !w1Done) {
      w1Timer.current = setInterval(() => {
        setW1Count((c) => {
          if (c <= 5) {
            setW1Out((p) => [...p, String(c)]);
            if (c >= 5) { setW1Done(true); setW1Auto(false); }
            return c + 1;
          }
          setW1Auto(false);
          return c;
        });
      }, 700);
    }
    return () => { if (w1Timer.current) clearInterval(w1Timer.current); };
  }, [w1Auto, w1Done]);

  /* ── STEP 2: For Loop + Range ── */
  const [r2Start, setR2Start] = useState("1");
  const [r2Stop, setR2Stop] = useState("10");
  const [r2Step, setR2Step] = useState("2");
  const [r2Ran, setR2Ran] = useState(false);

  const r2Seq = (() => {
    const a = parseInt(r2Start), b = parseInt(r2Stop), s = parseInt(r2Step);
    if (isNaN(a) || isNaN(b) || isNaN(s) || s === 0) return [];
    const arr: number[] = [];
    if (s > 0) { for (let i = a; i < b; i += s) arr.push(i); }
    else { for (let i = a; i > b; i += s) arr.push(i); }
    return arr.slice(0, 50);
  })();

  /* ── STEP 3: String Iteration ── */
  const [s3Word, setS3Word] = useState("PYTHON");
  const [s3Idx, setS3Idx] = useState(0);
  const [s3Out, setS3Out] = useState<string[]>([]);
  const [s3Started, setS3Started] = useState(false);

  const s3Next = () => {
    if (s3Idx < s3Word.length) {
      setS3Out((p) => [...p, s3Word[s3Idx]]);
      setS3Idx((i) => i + 1);
      setS3Started(true);
    }
  };
  const s3Reset = () => { setS3Idx(0); setS3Out([]); setS3Started(false); };

  /* ── STEP 4: Break & Continue ── */
  const [s4BreakAt, setS4BreakAt] = useState("5");
  const [s4ContAt, setS4ContAt] = useState("5");
  const s4BrkN = parseInt(s4BreakAt);
  const s4CntN = parseInt(s4ContAt);

  const s4BreakOut = (() => {
    if (isNaN(s4BrkN)) return [];
    const arr: string[] = [];
    for (let i = 1; i <= 10; i++) { if (i === s4BrkN) break; arr.push(String(i)); }
    return arr;
  })();

  const s4ContOut = (() => {
    if (isNaN(s4CntN)) return [];
    const arr: string[] = [];
    for (let i = 1; i <= 10; i++) { if (i === s4CntN) continue; arr.push(String(i)); }
    return arr;
  })();

  /* ── STEP 5: Prime Checker ── */
  const [s5Num, setS5Num] = useState("7");
  const [s5Step, setS5Step] = useState(0);
  const [s5Out, setS5Out] = useState<string[]>([]);
  const [s5Trace, setS5Trace] = useState<{ i: number; mod: number; broke: boolean }[]>([]);
  const [s5Done, setS5Done] = useState(false);

  const s5N = parseInt(s5Num);
  const s5RunAll = () => {
    if (isNaN(s5N) || s5N < 2) { setS5Out(["Enter a number >= 2"]); setS5Trace([]); setS5Done(true); return; }
    const trace: { i: number; mod: number; broke: boolean }[] = [];
    let broke = false;
    for (let i = 2; i < s5N; i++) {
      const mod = s5N % i;
      if (mod === 0) { trace.push({ i, mod, broke: true }); broke = true; break; }
      trace.push({ i, mod, broke: false });
    }
    setS5Trace(trace);
    setS5Out([broke ? "Not Prime" : "Prime"]);
    setS5Done(true);
    setS5Step(trace.length);
  };
  const s5StepNext = () => {
    if (isNaN(s5N) || s5N < 2) { setS5Out(["Enter a number >= 2"]); setS5Done(true); return; }
    const i = s5Step + 2; // divisor = step_index + 2
    if (i >= s5N) { // loop exhausted
      setS5Out(["Prime"]);
      setS5Done(true);
      return;
    }
    const mod = s5N % i;
    const broke = mod === 0;
    setS5Trace((p) => [...p, { i, mod, broke }]);
    setS5Step((s) => s + 1);
    if (broke) { setS5Out(["Not Prime"]); setS5Done(true); }
  };
  const s5Reset = () => { setS5Step(0); setS5Out([]); setS5Trace([]); setS5Done(false); };

  /* ── FINAL ── */
  const [fpCode, setFpCode] = useState("for");
  const [fpStart, setFpStart] = useState("1");
  const [fpStop, setFpStop] = useState("6");
  const [fpStep, setFpStep] = useState("1");
  const [fpOut, setFpOut] = useState<string[]>([]);
  const [fpMem, setFpMem] = useState<{ v: string; val: string; t: string }[]>([]);

  const runFinal = () => {
    const a = parseInt(fpStart), b = parseInt(fpStop), s = parseInt(fpStep);
    if (isNaN(a) || isNaN(b) || isNaN(s) || s === 0) { setFpOut(["Error: invalid inputs"]); setFpMem([]); return; }
    const out: string[] = [];
    const arr: number[] = [];
    if (fpCode === "for") {
      if (s > 0) { for (let i = a; i < b; i += s) arr.push(i); }
      else { for (let i = a; i > b; i += s) arr.push(i); }
      arr.slice(0, 50).forEach((v) => out.push(String(v)));
      setFpMem([{ v: "i", val: arr.length > 0 ? String(arr[arr.length - 1]) : "—", t: "int" }]);
    } else {
      let c = a;
      while (c < b && out.length < 50) { out.push(String(c)); c += s; }
      setFpMem([{ v: "count", val: String(c), t: "int" }]);
    }
    setFpOut(out);
  };

  /* ── code line helper ── */
  const CL = ({ indent, active, children }: { indent: number; active?: boolean; children: React.ReactNode }) => (
    <div className={`transition-all rounded-lg px-2 py-0.5 font-mono text-[15px] ${active ? "bg-emerald-100 border-l-4 border-emerald-500" : ""}`}
      style={{ paddingLeft: `${indent * 1.5 + 0.5}rem` }}>
      {children}
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans p-8 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl pointer-events-none rounded-full" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 relative z-10">
            Python Loops & Iteration Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Coding Lab</p>
        </div>

        {/* ═══ STEP 1: While Loop ═══ */}
        <section>
          <SectionTitle num={1} title="While Loop Execution" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs">Code</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-purple-600">count</span> = <span className="text-amber-600">1</span></CL>
                <CL indent={0} active={!w1Done && w1Out.length > 0}><span className="text-blue-600 font-bold">while</span> count {"<="} <span className="text-amber-600">5</span>:</CL>
                <CL indent={1} active={!w1Done && w1Out.length > 0}><span className="text-blue-600">print</span>(count)</CL>
                <CL indent={1}><span className="text-purple-600">count</span> += <span className="text-amber-600">1</span></CL>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => { if (!w1Done) w1Next(); }} disabled={w1Done}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-blue-200 text-blue-700 font-semibold text-sm hover:bg-blue-50 hover:border-blue-400 transition-all disabled:opacity-40 flex items-center gap-2">
                  <SkipForward className="size-4" /> Next Iteration
                </button>
                <button onClick={() => { if (!w1Done) setW1Auto(true); }} disabled={w1Done || w1Auto}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-purple-200 text-purple-700 font-semibold text-sm hover:bg-purple-50 hover:border-purple-400 transition-all disabled:opacity-40 flex items-center gap-2">
                  <FastForward className="size-4" /> Auto Run
                </button>
                <button onClick={w1Reset}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center gap-2">
                  <RotateCcw className="size-4" /> Reset
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <IterBadge n={Math.min(w1Out.length + (w1Done ? 0 : 1), 6)} total={5} />
                <CondChip expr={`${w1Count} <= 5`} result={w1Count <= 5} />
              </div>
              <MemoryPanel rows={[{ v: "count", val: String(w1Count), t: "int" }]} />
              <OutputConsole lines={w1Out} />
              {w1Done && <Hint show text="The while loop checks its condition before each iteration. Once count becomes 6, the condition is False and the loop stops." />}
            </div>
          </div>
        </section>

        {/* ═══ STEP 2: For Loop + Range ═══ */}
        <section>
          <SectionTitle num={2} title="For Loop + Range Explorer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}>
                  <span className="text-blue-600 font-bold">for</span> <span className="text-purple-600">i</span> <span className="text-blue-600 font-bold">in</span>{" "}
                  <span className="text-blue-600">range</span>(
                  <input type="text" value={r2Start} onChange={(e) => { setR2Start(e.target.value); setR2Ran(false); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-10 text-center font-mono focus:border-blue-500" />,{" "}
                  <input type="text" value={r2Stop} onChange={(e) => { setR2Stop(e.target.value); setR2Ran(false); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-10 text-center font-mono focus:border-blue-500" />,{" "}
                  <input type="text" value={r2Step} onChange={(e) => { setR2Step(e.target.value); setR2Ran(false); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-10 text-center font-mono focus:border-blue-500" />):
                </CL>
                <CL indent={1}><span className="text-blue-600">print</span>(i)</CL>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { l: "range(5)", a: "0", b: "5", s: "1" },
                  { l: "range(1,10)", a: "1", b: "10", s: "1" },
                  { l: "range(1,10,2)", a: "1", b: "10", s: "2" },
                  { l: "range(1,20,3)", a: "1", b: "20", s: "3" },
                  { l: "range(10,0,-1)", a: "10", b: "0", s: "-1" },
                ].map((p) => (
                  <button key={p.l} onClick={() => { setR2Start(p.a); setR2Stop(p.b); setR2Step(p.s); setR2Ran(true); }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs hover:bg-blue-50 transition-all">
                    {p.l}
                  </button>
                ))}
              </div>
              <button onClick={() => setR2Ran(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md font-semibold text-sm w-fit">
                <PlayCircle className="size-4" /> Run Code
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {r2Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-3">Generated Sequence</h3>
                    <div className="flex flex-wrap gap-2">
                      {r2Seq.length > 0 ? r2Seq.map((v, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 font-mono font-bold px-3 py-1.5 rounded-lg text-sm">{v}</span>
                      )) : <span className="text-slate-400 italic">Empty sequence</span>}
                    </div>
                  </div>
                  <MemoryPanel rows={[{ v: "i", val: r2Seq.length > 0 ? String(r2Seq[r2Seq.length - 1]) : "—", t: "int" }]} />
                  <OutputConsole lines={r2Seq.map(String)} />
                  <Hint show text={`range(${r2Start}, ${r2Stop}, ${r2Step}) generates numbers from ${r2Start} up to (but NOT including) ${r2Stop}, stepping by ${r2Step}.`} />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ STEP 3: String Iteration ═══ */}
        <section>
          <SectionTitle num={3} title="Iterating Through Strings" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-purple-600">word</span> = <span className="text-amber-600">"{s3Word}"</span></CL>
                <CL indent={0} active={s3Started && s3Idx < s3Word.length}><span className="text-blue-600 font-bold">for</span> <span className="text-purple-600">ch</span> <span className="text-blue-600 font-bold">in</span> word:</CL>
                <CL indent={1} active={s3Started && s3Idx <= s3Word.length}><span className="text-blue-600">print</span>(ch)</CL>
              </div>

              {/* Visual string pointer */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block"><Keyboard className="inline size-3.5 mr-1" /> Word</label>
                <input type="text" value={s3Word}
                  onChange={(e) => { setS3Word(e.target.value.toUpperCase()); s3Reset(); }}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono text-lg outline-none focus:border-blue-400 uppercase tracking-[0.5em]" />
              </div>
              <div className="flex justify-center gap-1">
                {s3Word.split("").map((ch, i) => (
                  <div key={i} className={`w-10 h-12 flex items-center justify-center rounded-lg font-mono font-bold text-lg border-2 transition-all ${
                    i === s3Idx && s3Started ? "bg-blue-500 text-white border-blue-500 scale-110 shadow-lg"
                    : i < s3Idx ? "bg-emerald-50 border-emerald-300 text-emerald-600"
                    : "bg-white border-slate-200 text-slate-600"
                  }`}>
                    {ch}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={s3Next} disabled={s3Idx >= s3Word.length}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-blue-200 text-blue-700 font-semibold text-sm hover:bg-blue-50 hover:border-blue-400 transition-all disabled:opacity-40 flex items-center gap-2">
                  <SkipForward className="size-4" /> Next Character
                </button>
                <button onClick={s3Reset}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                  <RotateCcw className="size-4" /> Reset
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {s3Started && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <IterBadge n={s3Idx} total={s3Word.length} />
                  <MemoryPanel rows={[
                    { v: "word", val: `"${s3Word}"`, t: "str" },
                    { v: "ch", val: `"${s3Idx > 0 ? s3Word[s3Idx - 1] : ""}"`, t: "str" },
                  ]} />
                  <OutputConsole lines={s3Out} />
                  {s3Idx >= s3Word.length && <Hint show text="A for loop on a string visits each character one by one. This is called sequence iteration." />}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ STEP 4: Break & Continue ═══ */}
        <section>
          <SectionTitle num={4} title="Break & Continue Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* BREAK */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-red-500 uppercase tracking-widest text-xs">break</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700 text-[14px]">
                <CL indent={0}><span className="text-blue-600 font-bold">for</span> i <span className="text-blue-600 font-bold">in</span> range(1, 11):</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">if</span> i == <span className="text-red-500 font-bold">{s4BreakAt}</span>:</CL>
                <CL indent={2}><span className="text-red-600 font-bold">break</span></CL>
                <CL indent={1}><span className="text-blue-600">print</span>(i)</CL>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Break at:</label>
                <input type="text" value={s4BreakAt} onChange={(e) => setS4BreakAt(e.target.value)}
                  className="w-20 bg-slate-50 border-2 border-slate-200 rounded-xl p-2 text-center font-mono outline-none focus:border-red-400" />
              </div>
              <OutputConsole lines={s4BreakOut} />
              {!isNaN(s4BrkN) && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 font-bold flex items-center gap-2">
                  ⛔ BREAK at i={s4BrkN} — Loop terminated.
                </div>
              )}
            </div>

            {/* CONTINUE */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-amber-500 uppercase tracking-widest text-xs">continue</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700 text-[14px]">
                <CL indent={0}><span className="text-blue-600 font-bold">for</span> i <span className="text-blue-600 font-bold">in</span> range(1, 11):</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">if</span> i == <span className="text-amber-500 font-bold">{s4ContAt}</span>:</CL>
                <CL indent={2}><span className="text-amber-600 font-bold">continue</span></CL>
                <CL indent={1}><span className="text-blue-600">print</span>(i)</CL>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Skip at:</label>
                <input type="text" value={s4ContAt} onChange={(e) => setS4ContAt(e.target.value)}
                  className="w-20 bg-slate-50 border-2 border-slate-200 rounded-xl p-2 text-center font-mono outline-none focus:border-amber-400" />
              </div>
              <OutputConsole lines={s4ContOut} />
              {!isNaN(s4CntN) && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700 font-bold flex items-center gap-2">
                  ⏭ Iteration {s4CntN} skipped.
                </div>
              )}
            </div>
          </div>
          <Hint show text="break exits the entire loop immediately. continue skips only the current iteration and moves to the next one." />
        </section>

        {/* ═══ STEP 5: Prime Checker (for-else) ═══ */}
        <section>
          <SectionTitle num={5} title="Prime Number Checker (for-else)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700 text-[14px]">
                <CL indent={0}>
                  <span className="text-purple-600">num</span> ={" "}
                  <input type="text" value={s5Num} onChange={(e) => { setS5Num(e.target.value); s5Reset(); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-12 text-center font-mono focus:border-blue-500" />
                </CL>
                <CL indent={0}><span className="text-blue-600 font-bold">for</span> i <span className="text-blue-600 font-bold">in</span> range(2, num):</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">if</span> num % i == 0:</CL>
                <CL indent={2}><span className="text-blue-600">print</span>(<span className="text-amber-600">"Not Prime"</span>)</CL>
                <CL indent={2}><span className="text-red-600 font-bold">break</span></CL>
                <CL indent={0}><span className="text-blue-600 font-bold">else</span>:</CL>
                <CL indent={1}><span className="text-blue-600">print</span>(<span className="text-amber-600">"Prime"</span>)</CL>
              </div>
              <div className="flex flex-wrap gap-2">
                {["7", "11", "15", "21", "23", "49"].map((v) => (
                  <button key={v} onClick={() => { setS5Num(v); s5Reset(); }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-sm hover:bg-blue-50 transition-all">
                    {v}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={s5StepNext} disabled={s5Done}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-blue-200 text-blue-700 font-semibold text-sm hover:bg-blue-50 hover:border-blue-400 transition-all disabled:opacity-40 flex items-center gap-2">
                  <SkipForward className="size-4" /> Step
                </button>
                <button onClick={s5RunAll} disabled={s5Done}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-md font-semibold text-sm disabled:opacity-40">
                  <PlayCircle className="size-4" /> Run All
                </button>
                <button onClick={s5Reset}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                  <RotateCcw className="size-4" /> Reset
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {/* Execution Trace */}
              {s5Trace.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-3">Execution Trace</h3>
                    <div className="space-y-2 max-h-52 overflow-y-auto">
                      {s5Trace.map((t, idx) => (
                        <div key={idx} className={`flex items-center justify-between p-3 rounded-xl font-mono text-sm border-2 ${
                          t.broke ? "bg-red-50 border-red-300 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
                        }`}>
                          <span>i={t.i} → {s5N}%{t.i} = {t.mod}</span>
                          <span className="font-bold">{t.broke ? "BREAK" : "Continue"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              {s5Out.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <OutputConsole lines={s5Out} />
                  <Hint show text={
                    s5Out[0] === "Prime"
                      ? "The loop completed without break, so the else block executed → Prime."
                      : "A break was encountered, so the else block is SKIPPED → Not Prime."
                  } />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ FINAL MINI PLAYGROUND ═══ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Mini Playground</h2>
            <p className="text-slate-500">Choose a loop type, set parameters, and run.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>Code Editor</span>
                <button onClick={runFinal}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-sm">
                  <PlayCircle className="size-4" /> Run Code
                </button>
              </div>
              <div className="p-6 space-y-4">
                {/* Loop type toggle */}
                <div className="flex gap-3 mb-2">
                  {(["for", "while"] as const).map((lt) => (
                    <button key={lt} onClick={() => setFpCode(lt)}
                      className={`px-5 py-2 rounded-xl font-mono font-bold text-sm border-2 transition-all ${
                        fpCode === lt ? "bg-blue-500 text-white border-blue-500 shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                      }`}>
                      {lt} loop
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">{fpCode === "for" ? "Start" : "Start"}</label>
                    <input type="text" value={fpStart} onChange={(e) => setFpStart(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2 text-center font-mono outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">{fpCode === "for" ? "Stop" : "Stop (<)"}</label>
                    <input type="text" value={fpStop} onChange={(e) => setFpStop(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2 text-center font-mono outline-none focus:border-blue-400" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Step</label>
                    <input type="text" value={fpStep} onChange={(e) => setFpStep(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2 text-center font-mono outline-none focus:border-blue-400" />
                  </div>
                </div>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-[14px] text-slate-600 leading-loose">
                  {fpCode === "for" ? (
                    <>
                      <div><span className="text-blue-600 font-bold">for</span> i <span className="text-blue-600 font-bold">in</span> range({fpStart}, {fpStop}, {fpStep}):</div>
                      <div className="pl-6"><span className="text-blue-600">print</span>(i)</div>
                    </>
                  ) : (
                    <>
                      <div><span className="text-purple-600">count</span> = {fpStart}</div>
                      <div><span className="text-blue-600 font-bold">while</span> count {"<"} {fpStop}:</div>
                      <div className="pl-6"><span className="text-blue-600">print</span>(count)</div>
                      <div className="pl-6">count += {fpStep}</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col overflow-hidden flex-1">
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-400">
                  Output Console
                </div>
                <div className="p-6 font-mono text-emerald-400 space-y-0.5 max-h-64 overflow-y-auto">
                  {fpOut.length > 0 ? fpOut.map((l, i) => (
                    <div key={i} className={l.startsWith("Error") ? "text-red-400 font-bold" : ""}>{l}</div>
                  )) : <div className="text-slate-600 italic">Click Run Code...</div>}
                </div>
              </div>
              {fpMem.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <MemoryPanel rows={fpMem} />
                </motion.div>
              )}
            </div>
          </div>

          {/* Learning Summary */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {["while loops", "for + range()", "break & continue", "for-else"].map((label, i) => (
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
