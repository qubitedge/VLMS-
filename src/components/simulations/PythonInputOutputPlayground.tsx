import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Terminal, Lightbulb, PlayCircle, CheckCircle2, AlertTriangle, ArrowRight, Keyboard } from "lucide-react";

export function PythonInputOutputPlayground({ expId }: { expId: string }) {
  // Section 1: Meet input()
  const [s1Name, setS1Name] = useState("Alice");
  const [s1Ran, setS1Ran] = useState(false);

  // Section 2: What does input() return?
  const [s2Age, setS2Age] = useState("25");
  const [s2Ans, setS2Ans] = useState<string | null>(null);

  // Section 3: Type Detective
  const [s3Ans, setS3Ans] = useState<string | null>(null);

  // Section 4: Why Type Casting?
  const [s4Ans, setS4Ans] = useState<string | null>(null);

  // Section 5: Fix The Code
  const [s5Fix, setS5Fix] = useState<string | null>(null);
  const [s5Input, setS5Input] = useState("25");
  const [s5Ran, setS5Ran] = useState(false);

  // Section 6: Integer Conversion Lab
  const [s6Input, setS6Input] = useState("18");
  const [s6Ran, setS6Ran] = useState(false);

  // Section 7: Float Conversion Lab
  const [s7Input, setS7Input] = useState("1.75");
  const [s7Ran, setS7Ran] = useState(false);

  // Section 8: Name Join Builder
  const [s8First, setS8First] = useState("John");
  const [s8Last, setS8Last] = useState("Smith");
  const [s8Ans, setS8Ans] = useState<string | null>(null);

  // Section 9: F-String Playground
  const [s9Ans, setS9Ans] = useState<string | null>(null);

  // Section 10: Build Your Own Greeting
  const [s10Name, setS10Name] = useState("Alice");
  const [s10Blank, setS10Blank] = useState("");
  const [s10Ran, setS10Ran] = useState(false);

  // Section 11: Rectangle Area Calculator
  const [s11Len, setS11Len] = useState("5");
  const [s11Wid, setS11Wid] = useState("4");
  const [s11Blank, setS11Blank] = useState("");
  const [s11Ran, setS11Ran] = useState(false);

  // Section 12: F-String Formatting
  const [s12Ans, setS12Ans] = useState<string | null>(null);

  // Section 13: format() Method
  const [s13Ans, setS13Ans] = useState<string | null>(null);

  // Section 14: Complete format()
  const [s14Slot1, setS14Slot1] = useState<string | null>(null);
  const [s14Slot2, setS14Slot2] = useState<string | null>(null);

  // Section 15: Error Explorer
  const [s15Ans, setS15Ans] = useState<string | null>(null);

  // Section 16: Memory State Viewer
  const [s16Name, setS16Name] = useState("Alice");
  const [s16Age, setS16Age] = useState("21");
  const [s16Ran, setS16Ran] = useState(false);

  // Final Playground
  const [fpName, setFpName] = useState("Alice");
  const [fpAge, setFpAge] = useState("21");
  const [fpOut, setFpOut] = useState<string[]>([]);
  const runFinal = () => {
    const ageNum = parseInt(fpAge);
    if (isNaN(ageNum)) {
      setFpOut(["ValueError: invalid literal for int()"]);
    } else {
      setFpOut([`Hello ${fpName}`, `Next year you will be ${ageNum + 1}`]);
    }
  };

  const SectionTitle = ({ num, title }: { num: number; title: string }) => (
    <div className="flex items-center gap-4 mb-6 mt-16 first:mt-0">
      <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-md text-sm">
        {num}
      </div>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    </div>
  );

  const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-50/50 p-5 rounded-xl font-mono text-[15px] border border-blue-100 leading-relaxed text-slate-700">
      {children}
    </div>
  );

  const OutputConsole = ({ children, label }: { children: React.ReactNode; label?: string }) => (
    <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 font-mono">
      <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-3 font-sans">
        {label || "Output Console"}
      </h3>
      <div className="text-emerald-400 text-lg">{children}</div>
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

  const OptionButton = ({
    label,
    selected,
    correct,
    answered,
    onClick,
  }: {
    label: string;
    selected: boolean;
    correct: boolean;
    answered: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 font-mono text-sm transition-all ${
        answered && selected
          ? correct
            ? "bg-emerald-50 border-emerald-400 text-emerald-700"
            : "bg-red-50 border-red-400 text-red-700"
          : selected
          ? "bg-blue-50 border-blue-400 text-blue-700"
          : "bg-white border-slate-200 hover:border-blue-300 text-slate-700 hover:bg-blue-50/50"
      }`}
    >
      {label}
    </button>
  );

  const ExplanationCard = ({ text, show }: { text: string; show: boolean }) =>
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

  const RunButton = ({ onClick, label }: { onClick: () => void; label?: string }) => (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg font-semibold text-sm"
    >
      <PlayCircle className="size-4" /> {label || "Run Code"}
    </button>
  );

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans p-8 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl pointer-events-none rounded-full" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 relative z-10">
            Python Input & Output Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Coding Lab</p>
        </div>

        {/* SECTION 1: Meet input() */}
        <section>
          <SectionTitle num={1} title="Meet input()" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs">Interactive Code</h3>
              <CodeBlock>
                <div>
                  <span className="text-purple-600">name</span> ={" "}
                  <span className="text-blue-600">input</span>(
                  <span className="text-amber-600">"Enter your name: "</span>)
                </div>
              </CodeBlock>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                  <Keyboard className="inline size-3.5 mr-1" /> Input Simulator
                </label>
                <input
                  type="text"
                  value={s1Name}
                  onChange={(e) => { setS1Name(e.target.value); setS1Ran(false); }}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono text-lg outline-none focus:border-blue-400 transition-colors"
                  placeholder="Type your name..."
                />
              </div>
              <RunButton onClick={() => setS1Ran(true)} />
            </div>
            <div className="flex flex-col gap-6">
              {s1Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <MemoryPanel rows={[{ variable: "name", value: `"${s1Name}"`, type: "str" }]} />
                </motion.div>
              )}
              <OutputConsole>
                {s1Ran ? <span className="text-slate-500 italic">No output yet</span> : <span className="text-slate-600 italic">Click Run Code...</span>}
              </OutputConsole>
              <ExplanationCard show={s1Ran} text="input() reads user input and stores it in a variable. The value is always stored as a string." />
            </div>
          </div>
        </section>

        {/* SECTION 2: What Does input() Return? */}
        <section>
          <SectionTitle num={2} title="What Does input() Return?" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <CodeBlock>
                <div>
                  <span className="text-purple-600">age</span> ={" "}
                  <span className="text-blue-600">input</span>(
                  <span className="text-amber-600">"Enter age: "</span>)
                </div>
              </CodeBlock>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">User types:</span>
                <div className="font-mono text-2xl text-blue-700 mt-1">{s2Age}</div>
              </div>
              <p className="text-slate-600 font-medium">What is the type of <code className="bg-slate-100 px-2 py-0.5 rounded text-purple-600">age</code>?</p>
              <div className="space-y-3">
                {["int", "float", "str", "bool"].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={s2Ans === opt}
                    correct={opt === "str"}
                    answered={s2Ans !== null}
                    onClick={() => setS2Ans(opt)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {s2Ans && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  <MemoryPanel rows={[{ variable: "age", value: `"${s2Age}"`, type: "str" }]} />
                  <OutputConsole label="Output: type(age)">
                    &lt;class 'str'&gt;
                  </OutputConsole>
                  <ExplanationCard
                    show={true}
                    text="input() ALWAYS returns a string, even if the user types a number. That's why type(age) shows <class 'str'>."
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 3: Type Detective */}
        <section>
          <SectionTitle num={3} title="Type Detective" />
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <CodeBlock>
              <div>
                <span className="text-purple-600">number</span> ={" "}
                <span className="text-blue-600">input</span>(
                <span className="text-amber-600">"Enter a number: "</span>)
              </div>
            </CodeBlock>
            <div className="my-6 bg-slate-50 rounded-xl border border-slate-200 p-4 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">User types:</span>
              <div className="font-mono text-2xl text-blue-700 mt-1">45</div>
            </div>
            <p className="text-slate-600 font-medium mb-4">What is stored in <code className="bg-slate-100 px-2 py-0.5 rounded text-purple-600">number</code>?</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['45', '"45"', '45.0', 'True'].map((opt) => (
                <OptionButton
                  key={opt}
                  label={opt}
                  selected={s3Ans === opt}
                  correct={opt === '"45"'}
                  answered={s3Ans !== null}
                  onClick={() => setS3Ans(opt)}
                />
              ))}
            </div>
            <ExplanationCard
              show={s3Ans !== null}
              text='Input is stored as text (string). Even though the user typed 45, Python stores it as "45" — a string, not a number.'
            />
          </div>
        </section>

        {/* SECTION 4: Why Type Casting? */}
        <section>
          <SectionTitle num={4} title="Why Type Casting?" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <CodeBlock>
                <div><span className="text-purple-600">age</span> = <span className="text-blue-600">input</span>(<span className="text-amber-600">"Enter age: "</span>)</div>
                <div className="mt-2"><span className="text-blue-600">print</span>(<span className="text-purple-600">age</span> + <span className="text-amber-600">5</span>)</div>
              </CodeBlock>
              <p className="text-slate-600 font-medium">Will this code work?</p>
              <div className="grid grid-cols-2 gap-4">
                {["Yes", "No"].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={s4Ans === opt}
                    correct={opt === "No"}
                    answered={s4Ans !== null}
                    onClick={() => setS4Ans(opt)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {s4Ans && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  <OutputConsole>
                    <span className="text-red-400 font-bold">TypeError: can only concatenate str (not "int") to str</span>
                  </OutputConsole>
                  <ExplanationCard
                    show={true}
                    text="Cannot add a string and integer together. Since input() returns a string, you need to convert it first using int() or float()."
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 5: Fix The Code */}
        <section>
          <SectionTitle num={5} title="Fix The Code" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">Broken Code</h4>
                <div className="font-mono text-sm text-slate-700">
                  <div>age = input("Enter age: ")</div>
                  <div>print(age + 5)</div>
                </div>
              </div>
              <p className="text-slate-600 font-medium">Choose the fix:</p>
              <div className="space-y-3">
                {["int(age)", "float(age)", "str(age)"].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={s5Fix === opt}
                    correct={opt === "int(age)"}
                    answered={s5Fix !== null}
                    onClick={() => setS5Fix(opt)}
                  />
                ))}
              </div>
              {s5Fix === "int(age)" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Fixed Code</h4>
                    <div className="font-mono text-sm text-slate-700">
                      <div>age = <span className="text-blue-600 font-bold">int</span>(input("Enter age: "))</div>
                      <div>print(age + 5)</div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                      <Keyboard className="inline size-3.5 mr-1" /> Enter age
                    </label>
                    <input
                      type="text"
                      value={s5Input}
                      onChange={(e) => { setS5Input(e.target.value); setS5Ran(false); }}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono outline-none focus:border-blue-400"
                    />
                  </div>
                  <RunButton onClick={() => setS5Ran(true)} />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              {s5Fix === "int(age)" && s5Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  <OutputConsole>
                    {isNaN(parseInt(s5Input)) ? (
                      <span className="text-red-400 font-bold">ValueError: invalid literal for int()</span>
                    ) : (
                      <span>{parseInt(s5Input) + 5}</span>
                    )}
                  </OutputConsole>
                  <ExplanationCard show={true} text="int() converts the string input to an integer, allowing arithmetic operations like addition." />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 6 & 7: Conversion Labs side by side */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <SectionTitle num={6} title="Integer Conversion Lab" />
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
                <CodeBlock>
                  <div><span className="text-purple-600">age</span> = <span className="text-blue-600">int</span>(<span className="text-blue-600">input</span>(<span className="text-amber-600">"Enter age: "</span>))</div>
                </CodeBlock>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block"><Keyboard className="inline size-3.5 mr-1" /> Input</label>
                  <input
                    type="text"
                    value={s6Input}
                    onChange={(e) => { setS6Input(e.target.value); setS6Ran(false); }}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono outline-none focus:border-blue-400"
                  />
                </div>
                <RunButton onClick={() => setS6Ran(true)} />
                {s6Ran && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                    {isNaN(parseInt(s6Input)) ? (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 font-mono text-red-600 text-sm font-bold">ValueError</div>
                    ) : (
                      <>
                        <MemoryPanel rows={[{ variable: "age", value: `${parseInt(s6Input)}`, type: "int" }]} />
                        <div className="bg-slate-800 rounded-xl p-4 font-mono text-emerald-400 text-sm">
                          &lt;class 'int'&gt;
                        </div>
                      </>
                    )}
                    <ExplanationCard show={true} text="int() converts string input to an integer. If the input isn't a valid number, Python raises a ValueError." />
                  </motion.div>
                )}
              </div>
            </div>
            <div>
              <SectionTitle num={7} title="Float Conversion Lab" />
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
                <CodeBlock>
                  <div><span className="text-purple-600">height</span> = <span className="text-blue-600">float</span>(<span className="text-blue-600">input</span>(<span className="text-amber-600">"Enter height: "</span>))</div>
                </CodeBlock>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block"><Keyboard className="inline size-3.5 mr-1" /> Input</label>
                  <input
                    type="text"
                    value={s7Input}
                    onChange={(e) => { setS7Input(e.target.value); setS7Ran(false); }}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono outline-none focus:border-blue-400"
                  />
                </div>
                <RunButton onClick={() => setS7Ran(true)} />
                {s7Ran && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                    {isNaN(parseFloat(s7Input)) ? (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 font-mono text-red-600 text-sm font-bold">ValueError</div>
                    ) : (
                      <>
                        <MemoryPanel rows={[{ variable: "height", value: `${parseFloat(s7Input)}`, type: "float" }]} />
                        <div className="bg-slate-800 rounded-xl p-4 font-mono text-emerald-400 text-sm">
                          &lt;class 'float'&gt;
                        </div>
                      </>
                    )}
                    <ExplanationCard show={true} text="float() converts string input to a decimal number. Use this when you expect values like height, weight, or temperature." />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Name Join Builder */}
        <section>
          <SectionTitle num={8} title="Name Join Builder" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <CodeBlock>
                <div><span className="text-purple-600">first</span> = <span className="text-blue-600">input</span>(<span className="text-amber-600">"First Name: "</span>)</div>
                <div><span className="text-purple-600">last</span> = <span className="text-blue-600">input</span>(<span className="text-amber-600">"Last Name: "</span>)</div>
                <div className="mt-2"><span className="text-blue-600">print</span>(<span className="text-slate-400">_____</span>)</div>
              </CodeBlock>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">First Name</label>
                  <input type="text" value={s8First} onChange={(e) => setS8First(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Last Name</label>
                  <input type="text" value={s8Last} onChange={(e) => setS8Last(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono outline-none focus:border-blue-400" />
                </div>
              </div>
              <p className="text-slate-600 font-medium">Choose the correct print expression:</p>
              <div className="space-y-3">
                {['first + last', 'first + " " + last', 'first - last'].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={s8Ans === opt}
                    correct={opt === 'first + " " + last'}
                    answered={s8Ans !== null}
                    onClick={() => setS8Ans(opt)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {s8Ans && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  <OutputConsole>
                    {s8Ans === 'first + " " + last'
                      ? `${s8First} ${s8Last}`
                      : s8Ans === "first + last"
                      ? `${s8First}${s8Last}`
                      : <span className="text-red-400 font-bold">TypeError: unsupported operand type(s)</span>}
                  </OutputConsole>
                  <ExplanationCard
                    show={true}
                    text='A space must be added manually between strings. first + " " + last inserts a space between the two names.'
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 9: F-String Playground */}
        <section>
          <SectionTitle num={9} title="F-String Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <CodeBlock>
                <div><span className="text-purple-600">name</span> = <span className="text-amber-600">"Bob"</span></div>
                <div className="mt-2">
                  <span className="text-blue-600">print</span>(
                  <span className="text-emerald-600">f</span>
                  <span className="text-amber-600">"Hello, {'{'}<span className="text-slate-400">_____</span>{'}'}"</span>)
                </div>
              </CodeBlock>
              <p className="text-slate-600 font-medium">What goes inside the curly braces?</p>
              <div className="space-y-3">
                {["name", '"name"', "{name}"].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={s9Ans === opt}
                    correct={opt === "name"}
                    answered={s9Ans !== null}
                    onClick={() => setS9Ans(opt)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {s9Ans && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  <OutputConsole>
                    {s9Ans === "name" ? "Hello, Bob" : s9Ans === '"name"' ? "Hello, name" : "SyntaxError"}
                  </OutputConsole>
                  <ExplanationCard
                    show={true}
                    text="In f-strings, variable names go inside curly braces WITHOUT quotes. Python replaces {name} with the variable's value."
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 10: Build Your Own Greeting */}
        <section>
          <SectionTitle num={10} title="Build Your Own Greeting" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <CodeBlock>
                <div><span className="text-purple-600">name</span> = <span className="text-blue-600">input</span>(<span className="text-amber-600">"Name: "</span>)</div>
                <div className="mt-2">
                  <span className="text-blue-600">print</span>(
                  <span className="text-emerald-600">f</span>
                  <span className="text-amber-600">"Hello, </span>
                  <input
                    type="text"
                    value={s10Blank}
                    onChange={(e) => { setS10Blank(e.target.value); setS10Ran(false); }}
                    placeholder="_____"
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-24 text-center px-1 font-mono focus:border-blue-500 transition-colors"
                  />
                  <span className="text-amber-600">!"</span>)
                </div>
              </CodeBlock>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block"><Keyboard className="inline size-3.5 mr-1" /> Name input</label>
                <input type="text" value={s10Name} onChange={(e) => { setS10Name(e.target.value); setS10Ran(false); }}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono outline-none focus:border-blue-400" />
              </div>
              <RunButton onClick={() => setS10Ran(true)} />
            </div>
            <div className="flex flex-col gap-6">
              {s10Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  <OutputConsole>
                    {s10Blank.includes("name") || s10Blank === "{name}" ? `Hello, ${s10Name}!` : `Hello, ${s10Blank}!`}
                  </OutputConsole>
                  <ExplanationCard
                    show={true}
                    text='Type {name} in the blank. F-strings replace {variable} with its value at runtime.'
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 11: Rectangle Area Calculator */}
        <section>
          <SectionTitle num={11} title="Rectangle Area Calculator" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <CodeBlock>
                <div><span className="text-purple-600">length</span> = <span className="text-blue-600">float</span>(<span className="text-blue-600">input</span>(<span className="text-amber-600">"Length: "</span>))</div>
                <div><span className="text-purple-600">width</span> = <span className="text-blue-600">float</span>(<span className="text-blue-600">input</span>(<span className="text-amber-600">"Width: "</span>))</div>
                <div className="mt-2">
                  <span className="text-purple-600">area</span> ={" "}
                  <input
                    type="text"
                    value={s11Blank}
                    onChange={(e) => { setS11Blank(e.target.value); setS11Ran(false); }}
                    placeholder="_____"
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-36 text-center px-1 font-mono focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="mt-1"><span className="text-blue-600">print</span>(<span className="text-emerald-600">f</span><span className="text-amber-600">"Area = {'{'}<span className="text-purple-500">area</span>{'}'}"</span>)</div>
              </CodeBlock>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Length</label>
                  <input type="text" value={s11Len} onChange={(e) => { setS11Len(e.target.value); setS11Ran(false); }}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Width</label>
                  <input type="text" value={s11Wid} onChange={(e) => { setS11Wid(e.target.value); setS11Ran(false); }}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono outline-none focus:border-blue-400" />
                </div>
              </div>
              <RunButton onClick={() => setS11Ran(true)} />
            </div>
            <div className="flex flex-col gap-6">
              {s11Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  {(() => {
                    const l = parseFloat(s11Len);
                    const w = parseFloat(s11Wid);
                    const isFormula = s11Blank.replace(/\s/g, "").includes("length*width");
                    if (isNaN(l) || isNaN(w)) {
                      return <OutputConsole><span className="text-red-400 font-bold">ValueError</span></OutputConsole>;
                    }
                    const area = l * w;
                    return (
                      <>
                        <OutputConsole>
                          {isFormula ? `Area = ${area}` : <span className="text-amber-400">Hint: Try typing <code>length * width</code></span>}
                        </OutputConsole>
                        {isFormula && (
                          <MemoryPanel rows={[
                            { variable: "length", value: `${l}`, type: "float" },
                            { variable: "width", value: `${w}`, type: "float" },
                            { variable: "area", value: `${area}`, type: "float" },
                          ]} />
                        )}
                      </>
                    );
                  })()}
                  <ExplanationCard show={true} text="Type length * width in the blank. This calculates the area and stores it, then the f-string displays the result." />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 12 & 13: Formatting side by side */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <SectionTitle num={12} title="F-String Formatting" />
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
                <CodeBlock>
                  <div><span className="text-blue-600">print</span>(<span className="text-emerald-600">f</span><span className="text-amber-600">"{'{'}<span className="text-purple-500">3.14159</span><span className="text-blue-600">:.2f</span>{'}'}"</span>)</div>
                </CodeBlock>
                <p className="text-slate-600 font-medium">Predict the output:</p>
                <div className="space-y-3">
                  {["3.14", "3.14159", "3.1", "3"].map((opt) => (
                    <OptionButton
                      key={opt}
                      label={opt}
                      selected={s12Ans === opt}
                      correct={opt === "3.14"}
                      answered={s12Ans !== null}
                      onClick={() => setS12Ans(opt)}
                    />
                  ))}
                </div>
                {s12Ans && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                    <div className="bg-slate-800 rounded-xl p-4 font-mono text-emerald-400 text-center text-xl">3.14</div>
                    <ExplanationCard show={true} text=":.2f means format as a float with 2 decimal places. Python rounds the number accordingly." />
                  </motion.div>
                )}
              </div>
            </div>
            <div>
              <SectionTitle num={13} title="format() Method Explorer" />
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
                <CodeBlock>
                  <div><span className="text-amber-600">"Hello, {'{}'}!"</span>.<span className="text-blue-600">format</span>(<span className="text-amber-600">"Bob"</span>)</div>
                </CodeBlock>
                <p className="text-slate-600 font-medium">What is the output?</p>
                <div className="space-y-3">
                  {["Hello, Bob!", "Hello {}!", "Bob Hello!"].map((opt) => (
                    <OptionButton
                      key={opt}
                      label={opt}
                      selected={s13Ans === opt}
                      correct={opt === "Hello, Bob!"}
                      answered={s13Ans !== null}
                      onClick={() => setS13Ans(opt)}
                    />
                  ))}
                </div>
                {s13Ans && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                    <div className="bg-slate-800 rounded-xl p-4 font-mono text-emerald-400 text-center text-xl">Hello, Bob!</div>
                    <ExplanationCard show={true} text="format() replaces {} placeholders with the values you pass. It's an older alternative to f-strings." />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 14: Complete The format() */}
        <section>
          <SectionTitle num={14} title="Complete The format() Statement" />
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <CodeBlock>
              <div>
                <span className="text-amber-600">"I like {'{'}{'}'}  and {'{'}{'}'}  "</span>.<span className="text-blue-600">format</span>(
                <span className="bg-blue-100 px-2 py-0.5 rounded text-blue-700 font-bold">{s14Slot1 || "_____"}</span>,{" "}
                <span className="bg-purple-100 px-2 py-0.5 rounded text-purple-700 font-bold">{s14Slot2 || "_____"}</span>)
              </div>
            </CodeBlock>
            <p className="text-slate-600 font-medium mt-6 mb-4">Click options to fill the blanks:</p>
            <div className="flex gap-4 flex-wrap mb-6">
              {["apples", "bananas"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    if (!s14Slot1) setS14Slot1(opt);
                    else if (!s14Slot2 && s14Slot1 !== opt) setS14Slot2(opt);
                  }}
                  disabled={s14Slot1 === opt || s14Slot2 === opt}
                  className={`px-6 py-3 rounded-xl font-mono font-bold text-sm transition-all border-2 ${
                    s14Slot1 === opt || s14Slot2 === opt
                      ? "bg-slate-100 border-slate-200 text-slate-400"
                      : "bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 cursor-pointer"
                  }`}
                >
                  {opt}
                </button>
              ))}
              {(s14Slot1 || s14Slot2) && (
                <button
                  onClick={() => { setS14Slot1(null); setS14Slot2(null); }}
                  className="px-4 py-3 rounded-xl text-sm text-slate-500 hover:text-red-500 transition-colors font-medium"
                >
                  Reset
                </button>
              )}
            </div>
            {s14Slot1 && s14Slot2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                <OutputConsole>
                  I like {s14Slot1} and {s14Slot2}
                </OutputConsole>
                <ExplanationCard show={true} text="format() fills placeholders in order. The first {} gets the first argument, the second {} gets the second." />
              </motion.div>
            )}
          </div>
        </section>

        {/* SECTION 15: Error Explorer */}
        <section>
          <SectionTitle num={15} title="Error Explorer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <CodeBlock>
                <div><span className="text-purple-600">age</span> = <span className="text-blue-600">int</span>(<span className="text-blue-600">input</span>(<span className="text-amber-600">"Enter age: "</span>))</div>
              </CodeBlock>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">User types:</span>
                <div className="font-mono text-2xl text-red-500 mt-1">twenty</div>
              </div>
              <p className="text-slate-600 font-medium">What happens?</p>
              <div className="space-y-3">
                {["Converts Successfully", "Returns 0", "ValueError", "Returns None"].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={s15Ans === opt}
                    correct={opt === "ValueError"}
                    answered={s15Ans !== null}
                    onClick={() => setS15Ans(opt)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {s15Ans && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  <OutputConsole>
                    <span className="text-red-400 font-bold">ValueError: invalid literal for int() with base 10: 'twenty'</span>
                  </OutputConsole>
                  <ExplanationCard
                    show={true}
                    text='Words cannot be converted to integers. int("twenty") fails because Python can only convert numeric strings like "25".'
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 16: Memory State Viewer */}
        <section>
          <SectionTitle num={16} title="Memory State Viewer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <CodeBlock>
                <div><span className="text-purple-600">name</span> = <span className="text-blue-600">input</span>(<span className="text-amber-600">"Name: "</span>)</div>
                <div><span className="text-purple-600">age</span> = <span className="text-blue-600">int</span>(<span className="text-blue-600">input</span>(<span className="text-amber-600">"Age: "</span>))</div>
                <div className="mt-2"><span className="text-blue-600">print</span>(<span className="text-emerald-600">f</span><span className="text-amber-600">"{'{'}<span className="text-purple-500">name</span>{'}'} is {'{'}<span className="text-purple-500">age</span>{'}'} years old"</span>)</div>
              </CodeBlock>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block"><Keyboard className="inline size-3.5 mr-1" /> Name</label>
                  <input type="text" value={s16Name} onChange={(e) => { setS16Name(e.target.value); setS16Ran(false); }}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block"><Keyboard className="inline size-3.5 mr-1" /> Age</label>
                  <input type="text" value={s16Age} onChange={(e) => { setS16Age(e.target.value); setS16Ran(false); }}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-center font-mono outline-none focus:border-blue-400" />
                </div>
              </div>
              <RunButton onClick={() => setS16Ran(true)} />
            </div>
            <div className="flex flex-col gap-6">
              {s16Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                  {isNaN(parseInt(s16Age)) ? (
                    <OutputConsole>
                      <span className="text-red-400 font-bold">ValueError: invalid literal for int()</span>
                    </OutputConsole>
                  ) : (
                    <>
                      <MemoryPanel rows={[
                        { variable: "name", value: `"${s16Name}"`, type: "str" },
                        { variable: "age", value: `${parseInt(s16Age)}`, type: "int" },
                      ]} />
                      <OutputConsole>
                        {s16Name} is {parseInt(s16Age)} years old
                      </OutputConsole>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* FINAL MINI PLAYGROUND */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Mini Playground</h2>
            <p className="text-slate-500">Edit the inputs and run the code to see all concepts together.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>Code Editor</span>
                <button onClick={runFinal} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-sm">
                  <PlayCircle className="size-4" /> Run Code
                </button>
              </div>
              <div className="p-6 font-mono text-[15px] space-y-2 bg-blue-50/20 leading-relaxed">
                <div>
                  <span className="text-purple-600">name</span> ={" "}
                  <span className="text-blue-600">input</span>(<span className="text-amber-600">"Name: "</span>)
                  <span className="text-slate-400 ml-4">→</span>
                  <input type="text" value={fpName} onChange={(e) => setFpName(e.target.value)}
                    className="bg-white border-b-2 border-slate-300 w-28 text-center outline-none focus:border-blue-500 text-slate-700 ml-2" />
                </div>
                <div>
                  <span className="text-purple-600">age</span> ={" "}
                  <span className="text-blue-600">int</span>(<span className="text-blue-600">input</span>(<span className="text-amber-600">"Age: "</span>))
                  <span className="text-slate-400 ml-4">→</span>
                  <input type="text" value={fpAge} onChange={(e) => setFpAge(e.target.value)}
                    className="bg-white border-b-2 border-slate-300 w-20 text-center outline-none focus:border-blue-500 text-slate-700 ml-2" />
                </div>
                <br />
                <div className="text-slate-500">
                  <span className="text-blue-600">print</span>(<span className="text-emerald-600">f</span><span className="text-amber-600">"Hello {'{'}<span className="text-purple-500">name</span>{'}'}"</span>)
                </div>
                <div className="text-slate-500">
                  <span className="text-blue-600">print</span>(<span className="text-emerald-600">f</span><span className="text-amber-600">"Next year you will be {'{'}<span className="text-purple-500">age</span>+1{'}'}"</span>)
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col overflow-hidden flex-1">
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-400">
                  Output Console
                </div>
                <div className="p-6 font-mono text-emerald-400 space-y-1">
                  {fpOut.length > 0
                    ? fpOut.map((l, i) => (
                        <div key={i} className={l.startsWith("ValueError") ? "text-red-400 font-bold" : ""}>{l}</div>
                      ))
                    : <div className="text-slate-600 italic">Click Run Code to see output...</div>}
                </div>
              </div>
              {fpOut.length > 0 && !fpOut[0].startsWith("ValueError") && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <MemoryPanel rows={[
                    { variable: "name", value: `"${fpName}"`, type: "str" },
                    { variable: "age", value: fpAge, type: "int" },
                  ]} />
                </motion.div>
              )}
            </div>
          </div>

          {/* Hints */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "💡", title: "input() Basics", text: "input() always returns a string." },
              { icon: "🔄", title: "Type Casting", text: "Use int() or float() to convert input for math." },
              { icon: "✨", title: "F-Strings", text: "f\"...{var}...\" inserts variable values into strings." },
            ].map((hint, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3">
                <span className="text-2xl">{hint.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-700 text-sm">{hint.title}</h4>
                  <p className="text-slate-500 text-xs mt-1">{hint.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
