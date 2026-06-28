import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Lightbulb, Keyboard, ArrowDown, Check, X } from "lucide-react";

/* ─── helpers ─── */
type CondRow = { expr: string; result: string; hit: boolean };

function evalGrade(score: number): { grade: string; conditions: CondRow[] } {
  const conds: CondRow[] = [];
  if (score >= 90) {
    conds.push({ expr: `${score} >= 90`, result: "True", hit: true });
    return { grade: "A", conditions: conds };
  }
  conds.push({ expr: `${score} >= 90`, result: "False", hit: false });
  if (score >= 80) {
    conds.push({ expr: `${score} >= 80`, result: "True", hit: true });
    return { grade: "B", conditions: conds };
  }
  conds.push({ expr: `${score} >= 80`, result: "False", hit: false });
  if (score >= 70) {
    conds.push({ expr: `${score} >= 70`, result: "True", hit: true });
    return { grade: "C", conditions: conds };
  }
  conds.push({ expr: `${score} >= 70`, result: "False", hit: false });
  conds.push({ expr: "else", result: "—", hit: true });
  return { grade: "F", conditions: conds };
}

export function PythonConditionalsPlayground({ expId }: { expId: string }) {
  /* ── Section 1 ── */
  const [s1Blank, setS1Blank] = useState("18");
  const [s1Ran, setS1Ran] = useState(false);
  const s1Age = 20;
  const s1Pass = !isNaN(Number(s1Blank)) && s1Age >= Number(s1Blank);
  const s1CondExpr = `${s1Age} >= ${s1Blank}`;

  /* ── Section 2 ── */
  const [s2Score, setS2Score] = useState("45");
  const [s2Ran, setS2Ran] = useState(false);
  const s2Num = Number(s2Score);
  const s2Valid = !isNaN(s2Num);
  const s2Pass = s2Valid && s2Num >= 50;

  /* ── Section 3 ── */
  const [s3Score, setS3Score] = useState("90");
  const [s3Ran, setS3Ran] = useState(false);
  const s3Num = Number(s3Score);
  const s3Result = useMemo(() => (!isNaN(s3Num) ? evalGrade(s3Num) : null), [s3Num, s3Score]);

  /* ── Section 4 ── */
  const [s4Num, setS4Num] = useState("15");
  const [s4Ran1, setS4Ran1] = useState(false);
  const s4NumVal = Number(s4Num);
  const s4InRange = !isNaN(s4NumVal) && s4NumVal >= 10 && s4NumVal <= 20;

  const [s4Op, setS4Op] = useState<"and" | "or" | "not">("and");

  /* ── Section 5 ── */
  const [s5Num, setS5Num] = useState("8");
  const [s5Ran, setS5Ran] = useState(false);
  const s5NumVal = Number(s5Num);
  const s5Valid = !isNaN(s5NumVal);

  /* ── Final ── */
  const [fpScore, setFpScore] = useState("85");
  const [fpOut, setFpOut] = useState<string[]>([]);
  const [fpConds, setFpConds] = useState<CondRow[]>([]);
  const runFinal = () => {
    const n = Number(fpScore);
    if (isNaN(n)) {
      setFpOut(["ValueError: invalid literal for int()"]);
      setFpConds([]);
      return;
    }
    const r = evalGrade(n);
    setFpOut([r.grade]);
    setFpConds(r.conditions);
  };

  /* ── reusable UI ── */
  const SectionTitle = ({ num, title }: { num: number; title: string }) => (
    <div className="flex items-center gap-4 mb-6 mt-16 first:mt-0">
      <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-md text-sm">
        {num}
      </div>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    </div>
  );

  const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-50/50 p-5 rounded-xl font-mono text-[15px] border border-blue-100 leading-relaxed text-slate-700 whitespace-pre">
      {children}
    </div>
  );

  const OutputConsole = ({ children, label }: { children: React.ReactNode; label?: string }) => (
    <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 font-mono">
      <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-3 font-sans">{label || "Output Console"}</h3>
      <div className="text-emerald-400 text-lg">{children}</div>
    </div>
  );

  const ConditionPanel = ({ rows }: { rows: CondRow[] }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-4">Condition Evaluation</h3>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div
            key={i}
            className={`flex items-center justify-between p-3 rounded-xl font-mono text-sm border-2 transition-all ${
              r.hit
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-slate-50 border-slate-200 text-slate-400"
            }`}
          >
            <span>{r.expr}</span>
            <span className="flex items-center gap-2 font-bold">
              {r.result}
              {r.hit ? <Check className="size-4" /> : <X className="size-4" />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const MemoryPanel = ({ rows }: { rows: { variable: string; value: string; type: string }[] }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-4">Memory State</h3>
      <div className="grid grid-cols-3 gap-2 font-mono text-sm">
        <div className="font-bold text-slate-500 pb-2 border-b border-slate-100">Variable</div>
        <div className="font-bold text-slate-500 pb-2 border-b border-slate-100">Value</div>
        <div className="font-bold text-slate-500 pb-2 border-b border-slate-100">Type</div>
        {rows.map((r, i) => (
          <React.Fragment key={i}>
            <div className="text-purple-600 py-1">{r.variable}</div>
            <div className="text-emerald-600 py-1">{r.value}</div>
            <div className="text-blue-600 py-1">{r.type}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const RunButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg font-semibold text-sm"
    >
      <PlayCircle className="size-4" /> Run Code
    </button>
  );

  const Hint = ({ text, show }: { text: string; show: boolean }) =>
    show ? (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-3"
      >
        <Lightbulb className="size-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <span>{text}</span>
      </motion.div>
    ) : null;

  /* code line with highlighted path */
  const CodeLine = ({
    indent,
    children,
    active,
  }: {
    indent: number;
    children: React.ReactNode;
    active?: boolean;
  }) => (
    <div
      className={`transition-all rounded-lg px-2 py-0.5 ${active ? "bg-emerald-100 border-l-4 border-emerald-500 pl-3" : ""}`}
      style={{ paddingLeft: `${indent * 1.5 + (active ? 0.75 : 0.5)}rem` }}
    >
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
            Python Conditional Statements Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Coding Lab</p>
        </div>

        {/* ══════════ SECTION 1: IF Statement Builder ══════════ */}
        <section>
          <SectionTitle num={1} title="IF Statement Builder" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs">Interactive Code</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl font-mono text-[15px] border border-blue-100 leading-loose text-slate-700">
                <div><span className="text-purple-600">age</span> = <span className="text-amber-600">20</span></div>
                <div className="mt-1">
                  <span className="text-blue-600 font-bold">if</span>{" "}
                  <span className="text-purple-600">age</span> {">="}
                  <input
                    type="text"
                    value={s1Blank}
                    onChange={(e) => { setS1Blank(e.target.value); setS1Ran(false); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-14 text-center px-1 font-mono focus:border-blue-500 transition-colors mx-1"
                  />
                  :
                </div>
                <div className="pl-8"><span className="text-blue-600">print</span>(<span className="text-amber-600">"Adult"</span>)</div>
              </div>
              <RunButton onClick={() => setS1Ran(true)} />
            </div>

            <div className="flex flex-col gap-6">
              {s1Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  <ConditionPanel
                    rows={[
                      { expr: s1CondExpr, result: s1Pass ? "True" : "False", hit: s1Pass },
                    ]}
                  />
                  <OutputConsole>
                    {s1Pass ? "Adult" : <span className="text-slate-500 italic">No output (condition is False)</span>}
                  </OutputConsole>
                  <MemoryPanel rows={[{ variable: "age", value: "20", type: "int" }]} />
                  <Hint show={true} text="The if block only executes when the condition evaluates to True. Try changing the threshold value!" />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 2: IF-ELSE Decision Playground ══════════ */}
        <section>
          <SectionTitle num={2} title="IF-ELSE Decision Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl font-mono text-[15px] border border-blue-100 leading-loose text-slate-700">
                <div>
                  <span className="text-purple-600">score</span> ={" "}
                  <input
                    type="text"
                    value={s2Score}
                    onChange={(e) => { setS2Score(e.target.value); setS2Ran(false); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-16 text-center font-mono focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="mt-2"><span className="text-blue-600 font-bold">if</span> <span className="text-purple-600">score</span> {">="} <span className="text-amber-600">50</span>:</div>
                <CodeLine indent={1} active={s2Ran && s2Pass}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"Pass"</span>)
                </CodeLine>
                <div><span className="text-blue-600 font-bold">else</span>:</div>
                <CodeLine indent={1} active={s2Ran && s2Valid && !s2Pass}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"Fail"</span>)
                </CodeLine>
              </div>
              <div className="flex flex-wrap gap-2">
                {["30", "50", "80", "100"].map((v) => (
                  <button
                    key={v}
                    onClick={() => { setS2Score(v); setS2Ran(true); }}
                    className="px-4 py-2 rounded-lg border-2 border-slate-200 hover:border-blue-400 bg-white font-mono text-sm hover:bg-blue-50 transition-all"
                  >
                    Try {v}
                  </button>
                ))}
              </div>
              <RunButton onClick={() => setS2Ran(true)} />
            </div>

            <div className="flex flex-col gap-6">
              {s2Ran && s2Valid && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  <ConditionPanel
                    rows={[{ expr: `${s2Num} >= 50`, result: s2Pass ? "True" : "False", hit: s2Pass }]}
                  />
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-3">Execution Path</h3>
                    <div className="flex items-center gap-3">
                      <div className={`px-4 py-2 rounded-xl font-mono text-sm font-bold border-2 ${s2Pass ? "bg-emerald-50 border-emerald-400 text-emerald-700" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                        if block
                      </div>
                      <ArrowDown className="size-4 text-slate-300 rotate-[-90deg]" />
                      <div className={`px-4 py-2 rounded-xl font-mono text-sm font-bold border-2 ${!s2Pass ? "bg-emerald-50 border-emerald-400 text-emerald-700" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                        else block
                      </div>
                    </div>
                  </div>
                  <OutputConsole>{s2Pass ? "Pass" : "Fail"}</OutputConsole>
                  <MemoryPanel rows={[{ variable: "score", value: `${s2Num}`, type: "int" }]} />
                  <Hint show={true} text="With if-else, exactly ONE branch always executes. If the condition is True → if block runs. Otherwise → else block runs." />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 3: Grade Calculator (if-elif-else) ══════════ */}
        <section>
          <SectionTitle num={3} title="Grade Calculator (if-elif-else)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl font-mono text-[15px] border border-blue-100 leading-loose text-slate-700">
                <div>
                  <span className="text-purple-600">score</span> ={" "}
                  <input
                    type="text"
                    value={s3Score}
                    onChange={(e) => { setS3Score(e.target.value); setS3Ran(false); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-16 text-center font-mono focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="mt-2"><span className="text-blue-600 font-bold">if</span> score {">="} <span className="text-amber-600">90</span>:</div>
                <CodeLine indent={1} active={s3Ran && s3Result?.grade === "A"}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"A"</span>)
                </CodeLine>
                <div><span className="text-blue-600 font-bold">elif</span> score {">="} <span className="text-amber-600">80</span>:</div>
                <CodeLine indent={1} active={s3Ran && s3Result?.grade === "B"}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"B"</span>)
                </CodeLine>
                <div><span className="text-blue-600 font-bold">elif</span> score {">="} <span className="text-amber-600">70</span>:</div>
                <CodeLine indent={1} active={s3Ran && s3Result?.grade === "C"}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"C"</span>)
                </CodeLine>
                <div><span className="text-blue-600 font-bold">else</span>:</div>
                <CodeLine indent={1} active={s3Ran && s3Result?.grade === "F"}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"F"</span>)
                </CodeLine>
              </div>
              <div className="flex flex-wrap gap-2">
                {["95", "90", "89", "80", "70", "0"].map((v) => (
                  <button
                    key={v}
                    onClick={() => { setS3Score(v); setS3Ran(true); }}
                    className="px-4 py-2 rounded-lg border-2 border-slate-200 hover:border-blue-400 bg-white font-mono text-sm hover:bg-blue-50 transition-all"
                  >
                    {v}
                  </button>
                ))}
              </div>
              <RunButton onClick={() => setS3Ran(true)} />
            </div>

            <div className="flex flex-col gap-6">
              {s3Ran && s3Result && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  <ConditionPanel rows={s3Result.conditions} />
                  <OutputConsole>
                    <span className="text-4xl font-black">{s3Result.grade}</span>
                  </OutputConsole>
                  <MemoryPanel rows={[{ variable: "score", value: `${s3Num}`, type: "int" }]} />
                  <Hint show={true} text="In an if-elif-else chain, Python checks conditions from top to bottom. The FIRST True condition executes — all remaining branches are skipped." />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 4: Logical Operators Lab ══════════ */}
        <section>
          <SectionTitle num={4} title="Logical Operators Lab" />

          {/* Challenge 1: Range check */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest">Challenge 1 — Range Check</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl font-mono text-[15px] border border-blue-100 leading-loose text-slate-700">
                <div>
                  <span className="text-purple-600">num</span> ={" "}
                  <input
                    type="text"
                    value={s4Num}
                    onChange={(e) => { setS4Num(e.target.value); setS4Ran1(false); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-14 text-center font-mono focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="mt-2"><span className="text-blue-600 font-bold">if</span> <span className="text-amber-600">10</span> {"<="} num {"<="} <span className="text-amber-600">20</span>:</div>
                <CodeLine indent={1} active={s4Ran1 && s4InRange}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"Inside Range"</span>)
                </CodeLine>
                <div><span className="text-blue-600 font-bold">else</span>:</div>
                <CodeLine indent={1} active={s4Ran1 && !isNaN(s4NumVal) && !s4InRange}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"Outside Range"</span>)
                </CodeLine>
              </div>
              <RunButton onClick={() => setS4Ran1(true)} />
              {s4Ran1 && !isNaN(s4NumVal) && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <ConditionPanel
                    rows={[
                      { expr: `10 <= ${s4NumVal} <= 20`, result: s4InRange ? "True" : "False", hit: s4InRange },
                    ]}
                  />
                  <div className="bg-slate-800 rounded-xl p-4 font-mono text-emerald-400">
                    {s4InRange ? "Inside Range" : "Outside Range"}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Challenge 2: Interactive operator switch */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest">Challenge 2 — Operator Switch</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                <div className="font-mono text-[15px] text-slate-700 leading-loose">
                  <div><span className="text-purple-600">age</span> = <span className="text-amber-600">20</span></div>
                  <div><span className="text-purple-600">has_license</span> = <span className="text-amber-600">True</span></div>
                  <div className="mt-2">
                    <span className="text-blue-600 font-bold">if</span> age {">="} 18{" "}
                    <span className="text-blue-700 font-bold">{s4Op === "not" ? "" : s4Op}</span>{" "}
                    {s4Op === "not" ? "" : "has_license"}:
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Switch Operator</label>
                <div className="flex gap-3">
                  {(["and", "or", "not"] as const).map((op) => (
                    <button
                      key={op}
                      onClick={() => setS4Op(op)}
                      className={`px-5 py-2.5 rounded-xl font-mono font-bold text-sm border-2 transition-all ${
                        s4Op === op
                          ? "bg-blue-500 text-white border-blue-500 shadow-md"
                          : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-slate-200 p-5 space-y-3">
                <h4 className="font-bold text-slate-600 text-xs uppercase tracking-widest">Truth Table</h4>
                <div className="space-y-2 font-mono text-sm">
                  {s4Op === "and" && (
                    <>
                      <div className="flex justify-between p-2 bg-emerald-50 rounded-lg"><span>True <strong>and</strong> True</span><span className="text-emerald-600 font-bold">True</span></div>
                      <div className="flex justify-between p-2 bg-red-50 rounded-lg"><span>True <strong>and</strong> False</span><span className="text-red-500 font-bold">False</span></div>
                      <div className="flex justify-between p-2 bg-red-50 rounded-lg"><span>False <strong>and</strong> True</span><span className="text-red-500 font-bold">False</span></div>
                      <div className="flex justify-between p-2 bg-red-50 rounded-lg"><span>False <strong>and</strong> False</span><span className="text-red-500 font-bold">False</span></div>
                    </>
                  )}
                  {s4Op === "or" && (
                    <>
                      <div className="flex justify-between p-2 bg-emerald-50 rounded-lg"><span>True <strong>or</strong> True</span><span className="text-emerald-600 font-bold">True</span></div>
                      <div className="flex justify-between p-2 bg-emerald-50 rounded-lg"><span>True <strong>or</strong> False</span><span className="text-emerald-600 font-bold">True</span></div>
                      <div className="flex justify-between p-2 bg-emerald-50 rounded-lg"><span>False <strong>or</strong> True</span><span className="text-emerald-600 font-bold">True</span></div>
                      <div className="flex justify-between p-2 bg-red-50 rounded-lg"><span>False <strong>or</strong> False</span><span className="text-red-500 font-bold">False</span></div>
                    </>
                  )}
                  {s4Op === "not" && (
                    <>
                      <div className="flex justify-between p-2 bg-red-50 rounded-lg"><span><strong>not</strong> True</span><span className="text-red-500 font-bold">False</span></div>
                      <div className="flex justify-between p-2 bg-emerald-50 rounded-lg"><span><strong>not</strong> False</span><span className="text-emerald-600 font-bold">True</span></div>
                    </>
                  )}
                </div>
              </div>
              <Hint show={true} text={
                s4Op === "and" ? "and → Both conditions must be True for the result to be True."
                : s4Op === "or" ? "or → At least one condition must be True for the result to be True."
                : "not → Reverses the truth value. True becomes False, False becomes True."
              } />
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 5: Nested Conditional Challenge ══════════ */}
        <section>
          <SectionTitle num={5} title="Nested Conditional Challenge" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl font-mono text-[15px] border border-blue-100 leading-loose text-slate-700">
                <div>
                  <span className="text-purple-600">num</span> ={" "}
                  <input
                    type="text"
                    value={s5Num}
                    onChange={(e) => { setS5Num(e.target.value); setS5Ran(false); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-14 text-center font-mono focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="mt-2"><span className="text-blue-600 font-bold">if</span> num {">"} <span className="text-amber-600">0</span>:</div>
                <div className="pl-6"><span className="text-blue-600 font-bold">if</span> num % <span className="text-amber-600">2</span> == <span className="text-amber-600">0</span>:</div>
                <CodeLine indent={2} active={s5Ran && s5Valid && s5NumVal > 0 && s5NumVal % 2 === 0}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"Positive Even"</span>)
                </CodeLine>
                <div className="pl-6"><span className="text-blue-600 font-bold">else</span>:</div>
                <CodeLine indent={2} active={s5Ran && s5Valid && s5NumVal > 0 && s5NumVal % 2 !== 0}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"Positive Odd"</span>)
                </CodeLine>
                <div><span className="text-blue-600 font-bold">else</span>:</div>
                <CodeLine indent={1} active={s5Ran && s5Valid && s5NumVal <= 0}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"Not Positive"</span>)
                </CodeLine>
              </div>
              <div className="flex flex-wrap gap-2">
                {["7", "8", "-3", "0"].map((v) => (
                  <button
                    key={v}
                    onClick={() => { setS5Num(v); setS5Ran(true); }}
                    className="px-4 py-2 rounded-lg border-2 border-slate-200 hover:border-blue-400 bg-white font-mono text-sm hover:bg-blue-50 transition-all"
                  >
                    {v}
                  </button>
                ))}
              </div>
              <RunButton onClick={() => setS5Ran(true)} />
            </div>

            <div className="flex flex-col gap-6">
              {s5Ran && s5Valid && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  {/* Condition Evaluation Tree */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-4">Condition Evaluation Tree</h3>
                    <div className="space-y-2">
                      <div className={`p-3 rounded-xl font-mono text-sm border-2 flex justify-between ${s5NumVal > 0 ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-red-50 border-red-300 text-red-600"}`}>
                        <span>num {">"} 0 → {s5NumVal} {">"} 0</span>
                        <span className="font-bold">{s5NumVal > 0 ? "True" : "False"}</span>
                      </div>
                      {s5NumVal > 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-6 space-y-2">
                          <div className="w-px h-4 bg-slate-300 ml-4" />
                          <div className={`p-3 rounded-xl font-mono text-sm border-2 flex justify-between ${s5NumVal % 2 === 0 ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-red-50 border-red-300 text-red-600"}`}>
                            <span>num % 2 == 0 → {s5NumVal} % 2 == 0</span>
                            <span className="font-bold">{s5NumVal % 2 === 0 ? "True" : "False"}</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <OutputConsole>
                    <span className="text-2xl font-bold">
                      {s5NumVal > 0
                        ? s5NumVal % 2 === 0
                          ? "Positive Even"
                          : "Positive Odd"
                        : "Not Positive"}
                    </span>
                  </OutputConsole>
                  <MemoryPanel rows={[{ variable: "num", value: `${s5NumVal}`, type: "int" }]} />
                  <Hint show={true} text="Nested if statements let you check additional conditions inside an outer if block. The inner condition is only checked if the outer condition is True." />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════ FINAL MINI PLAYGROUND ══════════ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Mini Playground</h2>
            <p className="text-slate-500">Edit the score and run the code to see conditionals in action.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>Code Editor</span>
                <button onClick={runFinal} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-sm">
                  <PlayCircle className="size-4" /> Run Code
                </button>
              </div>
              <div className="p-6 font-mono text-[15px] space-y-1 bg-blue-50/20 leading-relaxed">
                <div>
                  <span className="text-purple-600">score</span> ={" "}
                  <span className="text-blue-600">int</span>(<span className="text-blue-600">input</span>(<span className="text-amber-600">"Enter Score: "</span>))
                  <span className="text-slate-400 ml-4">→</span>
                  <input type="text" value={fpScore} onChange={(e) => setFpScore(e.target.value)}
                    className="bg-white border-b-2 border-slate-300 w-16 text-center outline-none focus:border-blue-500 text-slate-700 ml-2 font-mono" />
                </div>
                <br />
                <div><span className="text-blue-600 font-bold">if</span> score {">="} <span className="text-amber-600">90</span>:</div>
                <CodeLine indent={1} active={fpOut.length > 0 && fpOut[0] === "A"}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"A"</span>)
                </CodeLine>
                <div><span className="text-blue-600 font-bold">elif</span> score {">="} <span className="text-amber-600">80</span>:</div>
                <CodeLine indent={1} active={fpOut.length > 0 && fpOut[0] === "B"}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"B"</span>)
                </CodeLine>
                <div><span className="text-blue-600 font-bold">elif</span> score {">="} <span className="text-amber-600">70</span>:</div>
                <CodeLine indent={1} active={fpOut.length > 0 && fpOut[0] === "C"}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"C"</span>)
                </CodeLine>
                <div><span className="text-blue-600 font-bold">else</span>:</div>
                <CodeLine indent={1} active={fpOut.length > 0 && fpOut[0] === "F"}>
                  <span className="text-blue-600">print</span>(<span className="text-amber-600">"F"</span>)
                </CodeLine>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col overflow-hidden">
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-400">
                  Output Console
                </div>
                <div className="p-6 font-mono text-emerald-400 space-y-1">
                  {fpOut.length > 0
                    ? fpOut.map((l, i) => (
                        <div key={i} className={l.startsWith("ValueError") ? "text-red-400 font-bold" : "text-4xl font-black"}>
                          {l}
                        </div>
                      ))
                    : <div className="text-slate-600 italic">Click Run Code...</div>}
                </div>
              </div>
              {fpConds.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <ConditionPanel rows={fpConds} />
                </motion.div>
              )}
              {fpOut.length > 0 && !fpOut[0].startsWith("ValueError") && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <MemoryPanel rows={[{ variable: "score", value: fpScore, type: "int" }]} />
                </motion.div>
              )}
            </div>
          </div>

          {/* Learning summary */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { icon: "✓", label: "if" },
              { icon: "✓", label: "if-else" },
              { icon: "✓", label: "if-elif-else" },
              { icon: "✓", label: "Logical Ops" },
              { icon: "✓", label: "Nested if" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <span className="text-emerald-500 font-bold text-lg">{item.icon}</span>
                <div className="text-slate-600 text-xs font-bold mt-1 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
