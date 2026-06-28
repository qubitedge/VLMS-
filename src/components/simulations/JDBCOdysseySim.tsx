
import { useState } from "react";
import { Plug, Truck, Terminal, Link2, ScanLine, Lock, Database, Shield} from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

const TOTAL_STAGES = 6;

// Stage 1 — Pipeline drag order
const PIPELINE_NODES = [
  { id: "java",    label: "☕ Java App",       role: "Control Room" },
  { id: "api",     label: "🔌 JDBC API",       role: "Control Panel" },
  { id: "dm",      label: "🚦 Driver Manager", role: "Traffic Controller" },
  { id: "driver",  label: "🤖 JDBC Driver",    role: "Translator" },
  { id: "db",      label: "🗄️ Database",        role: "Locked Vault" },
];
const CORRECT_PIPELINE = PIPELINE_NODES.map(n => n.id);

// Stage 2 — Driver/URL matching
const DRIVER_URLS: Record<string, string> = {
  mysql:  "jdbc:mysql://host:3306/db",
  oracle: "jdbc:oracle:thin:@host:1521:SID",
  sqlite: "jdbc:sqlite:test.db",
};

export function JDBCOdysseySim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setPipelinePlaced([]);
    setSelectedVehicle(null);
    setVehicleResult(null);
    setDriverAnswer(null);
    setConnResult(null);
    setMetaClicked(new Set());
    setCloseDropped(new Set());
    setBossPhase("build");
    setBossSteps(new Set());
    setBossResult(null);
  });

  // Stage 1
  const [pipelinePlaced, setPipelinePlaced] = useState<string[]>([]);
  const shuffled = [...PIPELINE_NODES].sort(() => 0.5 - Math.random());
  const [available, setAvailable]           = useState(shuffled.map(n => n.id));

  // Stage 2
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedUrl, setSelectedUrl]         = useState<string | null>(null);
  const [vehicleResult, setVehicleResult]     = useState<"win"|"fail"|null>(null);

  // Stage 3
  const [driverAnswer, setDriverAnswer] = useState<string | null>(null);

  // Stage 4
  const [connResult, setConnResult]   = useState<"win"|"fail"|null>(null);
  const [connInput, setConnInput]     = useState("");

  // Stage 5
  const [metaClicked, setMetaClicked] = useState<Set<string>>(new Set());

  // Stage 6
  const [closeDropped, setCloseDropped] = useState<Set<string>>(new Set());

  // Boss
  const [bossPhase, setBossPhase]   = useState<"build"|"quiz"|"done">("build");
  const [bossSteps, setBossSteps]   = useState<Set<string>>(new Set());
  const [bossResult, setBossResult] = useState<"win"|"fail"|null>(null);
  const [quiz1Answer, setQuiz1Answer] = useState<string | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<string | null>(null);

  const renderStage1 = () => {
    const isComplete = pipelinePlaced.length === CORRECT_PIPELINE.length
      && pipelinePlaced.every((id, i) => id === CORRECT_PIPELINE[i]);
  
    const handlePlace = (id: string) => {
      const nextIndex = pipelinePlaced.length;
      const newPlaced = [...pipelinePlaced, id];
      setPipelinePlaced(newPlaced);
      setAvailable(prev => prev.filter(n => n !== id));
    };
  
    return (
      <StageWrapper>
        <h2 className="text-3xl font-bold text-primary mb-2">🔌 The Broken Pipeline</h2>
        <p className="text-muted-foreground mb-6 max-w-md text-center">
          Rebuild the JDBC communication pipeline by clicking nodes in the correct order.
        </p>
  
        {/* Pipeline drop zone */}
        <div className="flex items-center gap-1 mb-6 flex-wrap justify-center">
          {CORRECT_PIPELINE.map((id, i) => {
            const node = PIPELINE_NODES.find(n => n.id === id)!;
            const placed = pipelinePlaced[i];
            const correct = placed === id;
            return (
              <div key={id} className="flex items-center gap-1">
                <div className={`px-3 py-2 rounded-lg border text-xs text-center min-w-[90px] transition-all
                  ${placed
                    ? correct ? "border-green-500 bg-green-500/10 text-green-400"
                      : "border-red-500 bg-red-500/10 text-red-400"
                    : "border-dashed border-muted-foreground text-muted-foreground"}`}>
                  {placed ? PIPELINE_NODES.find(n => n.id === placed)?.label : `Slot ${i + 1}`}
                </div>
                {i < CORRECT_PIPELINE.length - 1 && (
                  <span className="text-muted-foreground text-xs">→</span>
                )}
              </div>
            );
          })}
        </div>
  
        {/* Available nodes */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {available.map(id => {
            const node = PIPELINE_NODES.find(n => n.id === id)!;
            return (
              <button
                key={id}
                onClick={() => handlePlace(id)}
                className="px-3 py-2 bg-primary/20 text-primary rounded-lg text-xs font-bold hover:bg-primary/40 transition-all"
              >
                {node.label}
              </button>
            );
          })}
        </div>
  
        {/* Role hint cards */}
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {PIPELINE_NODES.map(n => (
            <div key={n.id} className="px-3 py-1 bg-muted/40 rounded text-xs text-muted-foreground">
              <span className="font-bold text-primary">{n.label.split(" ").slice(1).join(" ")}</span> = {n.role}
            </div>
          ))}
        </div>
  
        {/* Reset if wrong */}
        {pipelinePlaced.length > 0 && !isComplete && pipelinePlaced.length === CORRECT_PIPELINE.length && (
          <div className="flex flex-col items-center gap-2 mb-4">
            <p className="text-red-400 text-sm">❌ Pipeline order incorrect — layers are mismatched.</p>
            <button
              onClick={() => { setPipelinePlaced([]); setAvailable(shuffled.map(n => n.id)); }}
              className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
            >
              🔄 Try Again
            </button>
          </div>
        )}
  
        {isComplete && (
          <button
            onClick={() => { game.addXp(100, "🏅 System Architect"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            ✅ Pipeline Restored! →
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage2 = () => {
    const vehicles = [
      { id: "mysql",  label: "🚚 MySQL Truck",        port: "3306" },
      { id: "oracle", label: "🏎️ Oracle Racer",        port: "1521" },
      { id: "sqlite", label: "🤖 SQLite Compact Bot",  port: "file" },
    ];
    const urlOptions = Object.values(DRIVER_URLS);
  
    const checkMatch = () => {
      if (selectedVehicle && selectedUrl === DRIVER_URLS[selectedVehicle]) {
        setVehicleResult("win");
      } else {
        setVehicleResult("fail");
      }
    };
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">🚗 Choose Your Driver</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Each database needs a specific JDBC URL format. Select a vehicle, then match its URL.
        </p>
  
        {/* Vehicle selector */}
        <div className="flex gap-3 mb-6 flex-wrap justify-center">
          {vehicles.map(v => (
            <button
              key={v.id}
              onClick={() => { setSelectedVehicle(v.id); setSelectedUrl(null); setVehicleResult(null); }}
              className={`px-4 py-3 rounded-xl border text-sm transition-all
                ${selectedVehicle === v.id ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground hover:border-primary"}`}
            >
              <div className="font-bold">{v.label}</div>
              <div className="text-xs text-muted-foreground">Port: {v.port}</div>
            </button>
          ))}
        </div>
  
        {/* URL options */}
        {selectedVehicle && (
          <div className="flex flex-col gap-2 w-full max-w-md mb-6">
            <p className="text-xs text-muted-foreground mb-1">Select the correct connection URL:</p>
            {urlOptions.map(url => (
              <button
                key={url}
                onClick={() => { setSelectedUrl(url); setVehicleResult(null); }}
                className={`px-4 py-2 rounded-lg border font-mono text-xs text-left transition-all
                  ${selectedUrl === url ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground hover:border-primary"}`}
              >
                {url}
              </button>
            ))}
          </div>
        )}
  
        {selectedVehicle && selectedUrl && vehicleResult === null && (
          <button
            onClick={checkMatch}
            className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4"
          >
            ▶ Attempt Dock
          </button>
        )}
  
        {vehicleResult === "fail" && (
          <div className="flex flex-col items-center gap-2 mb-4">
            <p className="text-red-400 text-sm">❌ Wrong URL — the vehicle rejected the connection port.</p>
            <button
              onClick={() => { setSelectedUrl(null); setVehicleResult(null); }}
              className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
            >
              🔄 Try Again
            </button>
          </div>
        )}
  
        {vehicleResult === "win" && (
          <button
            onClick={() => { game.addXp(150, "🏅 Protocol Specialist"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            🚗 Driver Initialized! →
          </button>
        )}
      </StageWrapper>
    );
  };

  const DRIVER_OPTIONS = [
    "org.sqlite.JDBC",
    "com.mysql.cj.jdbc.Driver",
    "oracle.jdbc.OracleDriver",
    "java.sql.DriverManager",   // wrong — common confusion
  ];
  
  const renderStage3 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-2">⚙️ Summon the Driver</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        Load the correct JDBC driver into memory using <code>Class.forName()</code>.
      </p>
  
      {/* Terminal visual */}
      <div className="w-full max-w-md bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6">
        <p className="text-muted-foreground">// Load the SQLite driver</p>
        <p className="text-yellow-300">
          Class.forName(<span className={`${driverAnswer ? (driverAnswer === "org.sqlite.JDBC" ? "text-green-400" : "text-red-400") : "text-primary/50"}`}>
            "{driverAnswer ?? "???"}"
          </span>);
        </p>
      </div>
  
      {/* Options */}
      <div className="flex flex-col gap-2 w-full max-w-md mb-6">
        {DRIVER_OPTIONS.map(opt => (
          <button
            key={opt}
            onClick={() => setDriverAnswer(opt)}
            className={`px-4 py-2 rounded-lg border font-mono text-xs text-left transition-all
              ${driverAnswer === opt
                ? opt === "org.sqlite.JDBC" ? "border-green-500 bg-green-500/10 text-green-400"
                  : "border-red-500 bg-red-500/10 text-red-400"
                : "border-muted-foreground hover:border-primary"}`}
          >
            "{opt}"
          </button>
        ))}
      </div>
  
      {driverAnswer && driverAnswer !== "org.sqlite.JDBC" && (
        <div className="flex flex-col items-center gap-2 mb-4">
          <p className="text-red-400 text-sm">❌ Wrong driver string — system error! Check the SQLite driver class name.</p>
          <button
            onClick={() => setDriverAnswer(null)}
            className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
          >
            🔄 Try Again
          </button>
        </div>
      )}
  
      {driverAnswer === "org.sqlite.JDBC" && (
        <button
          onClick={() => { game.addXp(200, "🤖 Driver Summoned"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          ✅ Driver Loaded! →
        </button>
      )}
    </StageWrapper>
  );

  const CORRECT_CONN = "jdbc:sqlite:test.db";

const renderStage4 = () => (
  <StageWrapper>
    <h3 className="text-xl font-bold text-primary mb-2">🔗 Establish the Connection</h3>
    <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
      Use <code>DriverManager.getConnection()</code> to open the portal to the database vault.
    </p>

    {/* Portal visual */}
    <div className={`w-32 h-32 rounded-full border-4 mb-6 flex items-center justify-center transition-all duration-700
      ${connResult === "win" ? "border-green-500 bg-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.4)]"
        : connResult === "fail" ? "border-red-500 bg-red-500/10 animate-pulse"
        : "border-primary/40 bg-primary/5"}`}>
      <Database className={`size-10 ${connResult === "win" ? "text-green-400" : "text-primary/40"}`} />
    </div>

    {/* Code block */}
    <div className="w-full max-w-md bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-4">
      <p className="text-muted-foreground">Connection con =</p>
      <p className="text-yellow-300">DriverManager.getConnection(</p>
      <input
        type="text"
        value={connInput}
        onChange={e => { setConnInput(e.target.value); setConnResult(null); }}
        placeholder={`"jdbc:sqlite:test.db"`}
        className="w-full bg-transparent text-green-400 outline-none border-b border-primary/30 py-1 font-mono text-sm"
      />
      <p className="text-yellow-300">);</p>
    </div>

    <button
      onClick={() => {
        const cleaned = connInput.replace(/['"]/g, "").trim();
        setConnResult(cleaned === CORRECT_CONN ? "win" : "fail");
      }}
      className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4"
    >
      ▶ Open Portal
    </button>

    {connResult === "fail" && (
      <div className="flex flex-col items-center gap-2 mb-4">
        <p className="text-red-400 text-sm">❌ Portal collapsed — connection string mismatch. Hint: <code>jdbc:sqlite:test.db</code></p>
        <button
          onClick={() => { setConnInput(""); setConnResult(null); }}
          className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
        >
          🔄 Try Again
        </button>
      </div>
    )}

    {connResult === "win" && (
      <button
        onClick={() => { game.addXp(300, "🔗 Connection Established"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        🌐 Enter the Vault →
      </button>
    )}
  </StageWrapper>
);

const META_METHODS = [
  { method: "getDatabaseProductName()", output: "SQLite" },
  { method: "getDriverVersion()",       output: "3.42.0" },
  { method: "getURL()",                 output: "jdbc:sqlite:test.db" },
];

const renderStage5 = () => (
  <StageWrapper>
    <h3 className="text-xl font-bold text-primary mb-2">🔍 Metadata Scanner</h3>
    <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
      Inspect the database environment — click each method to retrieve its metadata.
    </p>

    {/* Scanner panel */}
    <div className="w-full max-w-md space-y-3 mb-6">
      {META_METHODS.map(({ method, output }) => {
        const clicked = metaClicked.has(method);
        return (
          <div
            key={method}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer
              ${clicked ? "border-green-500 bg-green-500/10" : "border-primary/30 bg-primary/5 hover:border-primary"}`}
            onClick={() => setMetaClicked(prev => new Set([...prev, method]))}
          >
            <span className="font-mono text-xs text-primary">{method}</span>
            <span className={`text-xs font-bold transition-all duration-500
              ${clicked ? "text-green-400" : "text-transparent"}`}>
              → "{output}"
            </span>
          </div>
        );
      })}
    </div>

    {metaClicked.size === META_METHODS.length && (
      <button
        onClick={() => { game.addXp(250, "🏅 Data Investigator"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        🔒 Seal the Portal →
      </button>
    )}
  </StageWrapper>
);

const CLOSE_TARGETS = ["Connection", "Statement", "ResultSet"];

const renderStage6 = () => {
  if (bossPhase === "done") {
    return (
      <CompletionScreen
        missionTitle="🌌 JDBC Odyssey Complete!"
        missionSubtitle="You restored the Lost Connection Protocol and reconnected the Central Knowledge Vault."
        xp={game.xp}
        xpLog={game.xpLog}
        achievements={[
          { icon: <Plug className="size-4" />,     label: "System Architect" },
          { icon: <Truck className="size-4" />,    label: "Protocol Specialist" },
          { icon: <Terminal className="size-4" />, label: "Driver Summoner" },
          { icon: <Link2 className="size-4" />,    label: "Connection Master" },
          { icon: <ScanLine className="size-4" />, label: "Data Investigator" },
          { icon: <Lock className="size-4" />,     label: "Cleanup Master" },
          { icon: <Shield className="size-4" />,   label: "JDBC Master" },
        ]}
        concepts={[
          { label: "JDBC Architecture",    description: "5-layer pipeline: Java App → API → DriverManager → Driver → Database." },
          { label: "Driver Loading",        description: "Class.forName() loads the driver class into JVM memory before use." },
          { label: "Connection String",     description: "DriverManager.getConnection(url) opens the actual database channel." },
          { label: "Database Metadata",     description: "DatabaseMetaData reveals DB name, driver version, and URL at runtime." },
          { label: "Resource Management",   description: "Always close Connection, Statement, and ResultSet to prevent memory leaks." },
        ]}
        onReset={game.reset}
      />
    );
  }

  // Phase 1: Close the Portal lesson
  if (bossPhase === "build") return (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-2">🔒 Close the Portal</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        Leaving connections open drains system energy. Click each resource to close it inside the <code>finally</code> block.
      </p>

      {/* Finally block visual */}
      <div className="w-full max-w-md bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6">
        <p className="text-muted-foreground">{"} finally {"}</p>
        {CLOSE_TARGETS.map(target => (
          <div key={target} className={`ml-4 transition-all ${closeDropped.has(target) ? "text-green-400" : "text-muted-foreground"}`}>
            {closeDropped.has(target) ? `  if (${target.toLowerCase()} != null) ${target.toLowerCase()}.close(); ✅` : `  // ${target}.close() missing`}
          </div>
        ))}
        <p className="text-muted-foreground">{"}"}</p>
      </div>

      {/* Clickable resource buttons */}
      <div className="flex gap-3 flex-wrap justify-center mb-6">
        {CLOSE_TARGETS.map(target => (
          <button
            key={target}
            onClick={() => setCloseDropped(prev => new Set([...prev, target]))}
            disabled={closeDropped.has(target)}
            className={`px-4 py-2 rounded-xl border text-sm font-mono transition-all
              ${closeDropped.has(target)
                ? "border-green-500 bg-green-500/10 text-green-400 cursor-default"
                : "border-primary/40 hover:border-primary text-primary"}`}
          >
            {closeDropped.has(target) ? `✅ ${target}` : `close(${target})`}
          </button>
        ))}
      </div>

      {closeDropped.size === CLOSE_TARGETS.length && (
        <button
          onClick={() => { game.addXp(200, "🏅 Cleanup Master"); setBossPhase("quiz"); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          🧠 Final Boss Challenge →
        </button>
      )}
    </StageWrapper>
  );

  // Phase 2: Boss Quiz
  if (bossPhase === "quiz") return (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-6">🧨 Final Boss: Manual Connection Build</h3>
      <div className="w-full max-w-md space-y-6 mb-8">
        <QuizBlock
          question="Which method is used to load the JDBC driver into memory?"
          options={[
            { label: "DriverManager.getConnection()", value: "a" },
            { label: "Class.forName()",               value: "b" },
            { label: "Connection.load()",             value: "c" },
          ]}
          correctValue="b"
          selectedValue={quiz1Answer}
          onSelect={setQuiz1Answer}
          correctFeedback="✅ Class.forName() dynamically loads the driver class into JVM memory."
          wrongFeedback="❌ Not quite — DriverManager handles connections, not loading. Try again."
        />

        {quiz1Answer && quiz1Answer !== "b" && (
          <button
            onClick={() => setQuiz1Answer(null)}
            className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
          >
            🔄 Try Again
          </button>
        )}

        {quiz1Answer === "b" && (
          <>
            <QuizBlock
              question="What happens if you forget to close a database connection?"
              options={[
                { label: "Query runs faster",                        value: "a" },
                { label: "Memory leak — system eventually crashes",  value: "b" },
                { label: "Connection auto-closes after 1 minute",   value: "c" },
              ]}
              correctValue="b"
              selectedValue={quiz2Answer}
              onSelect={setQuiz2Answer}
              correctFeedback="✅ Unclosed connections accumulate, exhaust the connection pool, and crash the system."
              wrongFeedback="❌ Connections do not auto-close — they hold resources until explicitly released."
            />

            {quiz2Answer && quiz2Answer !== "b" && (
              <button
                onClick={() => setQuiz2Answer(null)}
                className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
              >
                🔄 Try Again
              </button>
            )}
          </>
        )}
      </div>

      {quiz1Answer === "b" && quiz2Answer === "b" && (
        <button
          onClick={() => { game.addXp(300, "🛡️ JDBC Master"); setBossPhase("done"); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          🌌 Restore the DataSphere →
        </button>
      )}
    </StageWrapper>
  );
};

return (
  <SimShell
    title="JDBC Odyssey"
    subtitle="The Lost Connection Protocol"
    xp={game.xp}
    stage={game.stage}
    totalStages={TOTAL_STAGES}
    mistakeMessage={game.mistakeMessage}
    successMessage={game.successMessage}
    icon={<Database className="size-5 text-primary" />}
  >
    {game.stage === 1 && renderStage1()}
    {game.stage === 2 && renderStage2()}
    {game.stage === 3 && renderStage3()}
    {game.stage === 4 && renderStage4()}
    {game.stage === 5 && renderStage5()}
    {game.stage === 6 && renderStage6()}
  </SimShell>
);


} 