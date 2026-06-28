import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Terminal, Lightbulb, PlayCircle, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export function PythonDataTypesPlayground({ expId }: { expId: string }) {
  // Section 1: Dynamic Typing
  const [s1Input, setS1Input] = useState("10");
  const s1Type = s1Input === "" ? "NoneType" : (!isNaN(Number(s1Input)) ? (s1Input.includes(".") ? "float" : "int") : (s1Input === "True" || s1Input === "False" ? "bool" : "str"));

  // Section 2: Variable Naming
  const [s2Selected, setS2Selected] = useState<string[]>([]);
  const s2Options = [
    { name: "age", valid: true, reason: "Valid. Standard naming." },
    { name: "_count", valid: true, reason: "Valid. Can start with underscore." },
    { name: "2name", valid: false, reason: "Invalid. Cannot start with a number." },
    { name: "class", valid: false, reason: "Invalid. 'class' is a reserved keyword." },
    { name: "student_name", valid: true, reason: "Valid. Snake_case is recommended." }
  ];

  // Section 3: Data Type Identification
  const [s3Matches, setS3Matches] = useState<Record<string, string>>({});
  const [s3Active, setS3Active] = useState<string | null>(null);
  const s3Values = ["42", "3.14", '"Python"', "True"];
  const s3Types = ["INT", "FLOAT", "STRING", "BOOLEAN"];
  const s3CorrectMap: any = { "42": "INT", "3.14": "FLOAT", '"Python"': "STRING", "True": "BOOLEAN" };

  // Section 4: Type Detective
  const [s4Opt, setS4Opt] = useState<string | null>(null);

  // Section 5: Arithmetic
  const [s5Q1, setS5Q1] = useState<string | null>(null);
  const [s5Q2, setS5Q2] = useState<string | null>(null);
  const [s5Q3, setS5Q3] = useState<string | null>(null);
  const [s5Q4, setS5Q4] = useState<string | null>(null);

  // Section 6: Operator Builder
  const [s6Op, setS6Op] = useState<string | null>(null);
  const s6Results: any = { "+": 15, "-": 5, "*": 50, "/": 2.0, "//": 2, "%": 0, "**": 100000 };

  // Section 7: Comparison Challenge
  const [s7Op, setS7Op] = useState<string | null>(null);
  const s7Results: any = { "==": false, "!=": true, "<": false, ">": true, "<=": false, ">=": true };

  // Section 8: Boolean Logic
  const [s8Q1, setS8Q1] = useState<string | null>(null);
  const [s8Q2, setS8Q2] = useState<string | null>(null);

  // Section 9: Type Conversion
  const [s9Val, setS9Val] = useState("42");
  const [s9Func, setS9Func] = useState<string | null>(null);

  // Section 10: Conversion Practice
  const [s10Ans, setS10Ans] = useState<string | null>(null);

  // Section 11: String Concatenation
  const [s11Ans, setS11Ans] = useState<string | null>(null);

  // Section 12: Error Explorer
  const [s12Ans, setS12Ans] = useState<string | null>(null);

  // Final Playground
  const [fpX, setFpX] = useState("10");
  const [fpY, setFpY] = useState("3.5");
  const [fpOut, setFpOut] = useState<string[]>([]);
  const runFinalPlayground = () => {
    let tX = isNaN(Number(fpX)) ? "str" : fpX.includes(".") ? "float" : "int";
    let tY = isNaN(Number(fpY)) ? "str" : fpY.includes(".") ? "float" : "int";
    let sum = "Error";
    if (tX === "str" || tY === "str") sum = fpX + fpY;
    else sum = (Number(fpX) + Number(fpY)).toString();
    setFpOut([`<class '${tX}'>`, `<class '${tY}'>`, sum]);
  };

  const SectionTitle = ({ num, title }: { num: number, title: string }) => (
    <div className="flex items-center gap-4 mb-6 mt-16 first:mt-0">
      <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-md">
        {num}
      </div>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans p-8 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl pointer-events-none rounded-full" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 relative z-10">
            Python Variables & Data Types Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Coding Lab</p>
        </div>

        {/* SECTION 1: Dynamic Typing Explorer */}
        <section>
          <SectionTitle num={1} title="Dynamic Typing Explorer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs">Interactive Code</h3>
              <div className="bg-blue-50/50 p-6 rounded-xl font-mono text-lg flex items-center gap-2 border border-blue-100">
                <span className="text-blue-700 font-semibold">x</span>
                <span className="text-slate-400">=</span>
                <input 
                  type="text" 
                  value={s1Input}
                  onChange={e => setS1Input(e.target.value)}
                  className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-32 text-center px-2 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
                <Lightbulb className="inline size-4 mr-2" />
                Python automatically determines variable types. Change the value to see the type change!
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-4">Memory State Panel</h3>
                <div className="grid grid-cols-3 gap-2 font-mono text-sm">
                  <div className="font-bold text-slate-500 pb-2 border-b border-slate-100">Variable</div>
                  <div className="font-bold text-slate-500 pb-2 border-b border-slate-100">Value</div>
                  <div className="font-bold text-slate-500 pb-2 border-b border-slate-100">Type</div>
                  <div className="text-purple-600">x</div>
                  <div className="text-emerald-600">"{s1Input}"</div>
                  <div className="text-blue-600">{s1Type}</div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 font-mono text-emerald-400">
                <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-2 font-sans">Live Output: type(x)</h3>
                &lt;class '{s1Type}'&gt;
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Variable Naming Challenge */}
        <section>
          <SectionTitle num={2} title="Variable Naming Challenge" />
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <p className="text-slate-600 mb-6 font-medium">Select all valid Python variable names:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {s2Options.map(opt => (
                <div 
                  key={opt.name}
                  onClick={() => setS2Selected(prev => prev.includes(opt.name) ? prev.filter(n => n !== opt.name) : [...prev, opt.name])}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    s2Selected.includes(opt.name) 
                      ? opt.valid ? "bg-emerald-50 border-emerald-400" : "bg-red-50 border-red-400"
                      : "bg-slate-50 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <span className="font-mono text-lg text-slate-700">{opt.name}</span>
                  {s2Selected.includes(opt.name) && (
                    <span className={`text-xs font-bold ${opt.valid ? "text-emerald-600" : "text-red-600"}`}>
                      {opt.reason}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Data Type Identification */}
        <section>
          <SectionTitle num={3} title="Data Type Identification" />
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <p className="text-slate-600 mb-6 font-medium">Click a value, then click its corresponding data type.</p>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest text-center">Values</h3>
                {s3Values.map(val => (
                  <div 
                    key={val}
                    onClick={() => {
                      if (!s3Matches[val]) setS3Active(val);
                    }}
                    className={`p-4 rounded-xl font-mono text-center cursor-pointer border-2 transition-all ${
                      s3Matches[val] ? "bg-slate-100 border-slate-200 text-slate-400" :
                      s3Active === val ? "bg-blue-100 border-blue-500 text-blue-700 scale-105" : "bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    {val} {s3Matches[val] && `→ ${s3Matches[val]}`}
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest text-center">Types</h3>
                {s3Types.map(type => (
                  <div 
                    key={type}
                    onClick={() => {
                      if (s3Active) {
                        if (s3CorrectMap[s3Active] === type) {
                          setS3Matches(prev => ({ ...prev, [s3Active]: type }));
                          setS3Active(null);
                        } else {
                          // Flash red maybe? Simple clear active for now
                          setS3Active(null);
                        }
                      }
                    }}
                    className={`p-4 rounded-xl font-bold text-center border-2 transition-all cursor-pointer ${
                      Object.values(s3Matches).includes(type) ? "bg-emerald-50 border-emerald-400 text-emerald-600" :
                      "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Type Detective */}
        <section>
          <SectionTitle num={4} title="Type Detective" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
              <div className="font-mono text-lg bg-blue-50 p-4 rounded-xl border border-blue-100">
                <span className="text-blue-700">value</span> = <span className="text-emerald-600 font-bold bg-white px-2 py-1 rounded shadow-sm">{s4Opt || "_____"}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {["42", "3.14", '"Hello"', "True"].map(opt => (
                  <button key={opt} onClick={() => setS4Opt(opt)} className="px-4 py-2 border rounded-lg hover:bg-blue-50 hover:border-blue-300 font-mono text-sm transition-all">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 font-mono text-emerald-400 flex flex-col justify-center">
              <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-2 font-sans">Live Output: type(value)</h3>
              {s4Opt ? `\n<class '${s4Opt === "42" ? "int" : s4Opt === "3.14" ? "float" : s4Opt === "True" ? "bool" : "str"}'>` : "Awaiting selection..."}
            </div>
          </div>
        </section>

        {/* SECTION 5: Arithmetic Playground */}
        <section>
          <SectionTitle num={5} title="Arithmetic Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="font-mono text-2xl mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center text-slate-700">17 // 5</div>
                <div className="flex gap-2 justify-center mb-6">
                  {["3", "2", "3.4", "17"].map(opt => (
                    <button key={opt} onClick={() => setS5Q1(opt)} className={`px-4 py-2 border rounded-lg font-mono text-sm ${s5Q1 === opt ? "bg-blue-500 text-white" : "hover:bg-slate-50"}`}>{opt}</button>
                  ))}
                </div>
              </div>
              {s5Q1 && (
                <div className={`p-4 rounded-xl text-sm font-bold ${s5Q1 === "3" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                  {s5Q1 === "3" ? "✓ Correct! Floor division (//) removes the decimal part." : "✗ Incorrect. Try again!"}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="font-mono text-2xl mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center text-slate-700">17 % 5</div>
                <div className="flex gap-2 justify-center mb-6">
                  {["0", "1", "2", "5"].map(opt => (
                    <button key={opt} onClick={() => setS5Q2(opt)} className={`px-4 py-2 border rounded-lg font-mono text-sm ${s5Q2 === opt ? "bg-blue-500 text-white" : "hover:bg-slate-50"}`}>{opt}</button>
                  ))}
                </div>
              </div>
              {s5Q2 && (
                <div className={`p-4 rounded-xl text-sm font-bold ${s5Q2 === "2" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                  {s5Q2 === "2" ? "✓ Correct! Modulus (%) returns the remainder." : "✗ Incorrect."}
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="font-mono text-2xl mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center text-slate-700">10 / 5</div>
                <div className="flex gap-2 justify-center mb-6">
                  {["2", "2.0", "float", "int"].map(opt => (
                    <button key={opt} onClick={() => setS5Q4(opt)} className={`px-4 py-2 border rounded-lg font-mono text-sm ${s5Q4 === opt ? "bg-blue-500 text-white" : "hover:bg-slate-50"}`}>{opt}</button>
                  ))}
                </div>
              </div>
              {s5Q4 && (
                <div className={`p-4 rounded-xl text-sm font-bold ${s5Q4 === "2.0" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                  {s5Q4 === "2.0" ? "✓ Correct! Normal division (/) ALWAYS returns a float in Python 3." : "✗ Incorrect. Division always returns a float."}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 6: Operator Builder */}
        <section>
          <SectionTitle num={6} title="Operator Builder" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center gap-6">
              <div className="font-mono text-3xl flex items-center gap-4 text-slate-700">
                <span>10</span>
                <select 
                  className="p-2 border-2 border-blue-200 rounded-lg bg-blue-50 text-blue-700 outline-none focus:border-blue-500 font-bold appearance-none text-center cursor-pointer"
                  onChange={e => setS6Op(e.target.value)}
                  value={s6Op || ""}
                >
                  <option value="" disabled>_</option>
                  {Object.keys(s6Results).map(op => <option key={op} value={op}>{op}</option>)}
                </select>
                <span>5</span>
              </div>
            </div>
            <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 font-mono text-emerald-400 text-4xl flex items-center justify-center">
              {s6Op ? s6Results[s6Op] : "?"}
            </div>
          </div>
        </section>

        {/* SECTION 7: Comparison Challenge & SECTION 8: Boolean Logic Lab */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <SectionTitle num={7} title="Comparisons" />
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center gap-6">
                <div className="font-mono text-3xl flex items-center gap-4 text-slate-700">
                  <span>10</span>
                  <select 
                    className="p-2 border-2 border-purple-200 rounded-lg bg-purple-50 text-purple-700 outline-none font-bold"
                    onChange={e => setS7Op(e.target.value)}
                    value={s7Op || ""}
                  >
                    <option value="" disabled>_</option>
                    {Object.keys(s7Results).map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                  <span>5</span>
                </div>
                <div className={`w-full p-4 rounded-xl text-center font-bold text-2xl font-mono ${s7Op ? (s7Results[s7Op] ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700") : "bg-slate-100 text-slate-400"}`}>
                  {s7Op ? (s7Results[s7Op] ? "True" : "False") : "Result"}
                </div>
              </div>
            </div>

            <div>
              <SectionTitle num={8} title="Boolean Logic Lab" />
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center gap-6">
                <div className="font-mono text-xl flex items-center gap-4 text-slate-700">
                  <span className="text-emerald-600">True</span>
                  <select 
                    className="p-2 border-2 border-indigo-200 rounded-lg bg-indigo-50 text-indigo-700 outline-none font-bold"
                    onChange={e => setS8Q1(e.target.value)}
                    value={s8Q1 || ""}
                  >
                    <option value="" disabled>_</option>
                    <option value="and">and</option>
                    <option value="or">or</option>
                  </select>
                  <span className="text-red-500">False</span>
                </div>
                <div className={`w-full p-4 rounded-xl text-center font-bold text-2xl font-mono ${s8Q1 ? (s8Q1 === "or" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700") : "bg-slate-100 text-slate-400"}`}>
                  {s8Q1 ? (s8Q1 === "or" ? "True" : "False") : "Result"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: Type Conversion Workshop */}
        <section>
          <SectionTitle num={9} title="Type Conversion Workshop" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
              <input 
                type="text" 
                value={s9Val}
                onChange={e => setS9Val(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-center font-mono text-xl outline-none focus:border-blue-400"
              />
              <div className="grid grid-cols-2 gap-4">
                {["int()", "float()", "str()", "bool()"].map(fn => (
                  <button 
                    key={fn} 
                    onClick={() => setS9Func(fn)}
                    className={`p-3 rounded-lg font-mono font-bold transition-all ${s9Func === fn ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
                  >
                    {fn}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 font-mono flex flex-col justify-center items-center text-center">
              <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-4 font-sans w-full text-left">Conversion Result</h3>
              {(() => {
                if (!s9Func) return <span className="text-slate-500 text-2xl">Awaiting conversion...</span>;
                try {
                  if (s9Func === "int()") {
                    if (s9Val === "True") return <span className="text-emerald-400 text-4xl">1</span>;
                    if (s9Val === "False") return <span className="text-emerald-400 text-4xl">0</span>;
                    if (isNaN(Number(s9Val)) || s9Val.trim() === "") throw new Error();
                    return <span className="text-emerald-400 text-4xl">{Math.trunc(Number(s9Val))}</span>;
                  }
                  if (s9Func === "float()") {
                    if (isNaN(Number(s9Val)) || s9Val.trim() === "") throw new Error();
                    return <span className="text-emerald-400 text-4xl">{Number(s9Val).toFixed(1)}</span>;
                  }
                  if (s9Func === "str()") return <span className="text-emerald-400 text-4xl">"{s9Val}"</span>;
                  if (s9Func === "bool()") return <span className="text-emerald-400 text-4xl">{s9Val !== "0" && s9Val !== "False" && s9Val !== "" ? "True" : "False"}</span>;
                } catch {
                  return <span className="text-red-400 text-xl font-bold">ValueError: invalid literal</span>;
                }
              })()}
            </div>
          </div>
        </section>

        {/* SECTION 10, 11, 12: Practice & Errors */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
              <SectionTitle num={10} title="Conversion" />
              <div className="font-mono text-center mb-6 text-lg bg-slate-50 py-3 rounded-lg border border-slate-100">int(3.7)</div>
              <div className="space-y-2 mb-4">
                {["3", "4", "3.7"].map(opt => (
                  <button key={opt} onClick={() => setS10Ans(opt)} className={`w-full py-2 border rounded-lg font-mono ${s10Ans === opt ? "bg-blue-100 border-blue-400" : ""}`}>{opt}</button>
                ))}
              </div>
              {s10Ans && <div className={`text-sm mt-auto ${s10Ans === "3" ? "text-emerald-600 font-bold" : "text-red-500"}`}>{s10Ans === "3" ? "Correct! Truncates decimal." : "Incorrect."}</div>}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
              <SectionTitle num={11} title="Concat" />
              <div className="font-mono text-center mb-6 text-[15px] bg-slate-50 py-3 rounded-lg border border-slate-100">print('Age: ' + ___)</div>
              <div className="space-y-2 mb-4">
                {["25", "str(25)", "float(25)"].map(opt => (
                  <button key={opt} onClick={() => setS11Ans(opt)} className={`w-full py-2 border rounded-lg font-mono ${s11Ans === opt ? "bg-blue-100 border-blue-400" : ""}`}>{opt}</button>
                ))}
              </div>
              {s11Ans && <div className={`text-sm mt-auto ${s11Ans === "str(25)" ? "text-emerald-600 font-bold" : "text-red-500"}`}>{s11Ans === "str(25)" ? "Correct! Strings can only concatenate with strings." : "TypeError!"}</div>}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
              <SectionTitle num={12} title="Errors" />
              <div className="font-mono text-center mb-6 text-lg bg-slate-50 py-3 rounded-lg border border-slate-100">int('hello')</div>
              <div className="space-y-2 mb-4">
                {["0", "hello", "ValueError"].map(opt => (
                  <button key={opt} onClick={() => setS12Ans(opt)} className={`w-full py-2 border rounded-lg font-mono ${s12Ans === opt ? "bg-blue-100 border-blue-400" : ""}`}>{opt}</button>
                ))}
              </div>
              {s12Ans && <div className={`text-sm mt-auto ${s12Ans === "ValueError" ? "text-emerald-600 font-bold" : "text-red-500"}`}>{s12Ans === "ValueError" ? "Correct! Cannot convert words to numbers." : "Incorrect."}</div>}
            </div>
          </div>
        </section>

        {/* FINAL MINI PLAYGROUND */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Mini Playground</h2>
            <p className="text-slate-500">Edit the variables and run the code to see all concepts together.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>Code Editor</span>
                <button onClick={runFinalPlayground} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 transition-colors">
                  <PlayCircle className="size-4" /> Run Code
                </button>
              </div>
              <div className="p-6 font-mono text-lg space-y-2 bg-blue-50/20">
                <div><span className="text-purple-600">x</span> = <input type="text" value={fpX} onChange={e => setFpX(e.target.value)} className="bg-white border-b-2 border-slate-300 w-24 text-center outline-none focus:border-blue-500 text-slate-700" /></div>
                <div><span className="text-purple-600">y</span> = <input type="text" value={fpY} onChange={e => setFpY(e.target.value)} className="bg-white border-b-2 border-slate-300 w-24 text-center outline-none focus:border-blue-500 text-slate-700" /></div>
                <br/>
                <div className="text-slate-500">print(<span className="text-blue-600">type</span>(x))</div>
                <div className="text-slate-500">print(<span className="text-blue-600">type</span>(y))</div>
                <div className="text-slate-500">print(x + y)</div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col overflow-hidden">
              <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-400">
                Output Console
              </div>
              <div className="p-6 font-mono text-emerald-400 space-y-1">
                {fpOut.length > 0 ? fpOut.map((l, i) => <div key={i}>{l}</div>) : <div className="text-slate-600 italic">Click Run Code to see output...</div>}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
