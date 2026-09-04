import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  Activity, Sliders, Waves, Play, RotateCcw, Copy, Check, 
  Sparkles, Zap, Atom, HelpCircle, ArrowRight
} from "lucide-react";

interface SimProps {
  onExportCode?: (code: string) => void;
}

export function RabiJaynesCummingsSim({ onExportCode }: SimProps) {
  const [modelType, setModelType] = useState<"rabi" | "jaynes_cummings">("rabi");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── Rabi Model Parameters ──────────────────────────────────────────────────
  const [omega, setOmega] = useState<number>(3.0); // Rabi frequency (coupling/drive strength)
  const [delta, setDelta] = useState<number>(0.0); // Detuning (omega_laser - omega_atom)
  const [gamma, setGamma] = useState<number>(0.1); // Spontaneous decay rate

  // ── Jaynes-Cummings Model Parameters ───────────────────────────────────────
  const [couplingG, setCouplingG] = useState<number>(2.5); // Atom-cavity coupling g
  const [meanPhotons, setMeanPhotons] = useState<number>(10); // Mean photon number in cavity field
  const [cavityDetuning, setCavityDetuning] = useState<number>(0.0); // Atom-cavity detuning

  // Time & Animation
  const [timeMax, setTimeMax] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate Analytical / Numerical Data Points
  const computeData = useCallback(() => {
    const numPoints = 300;
    const dt = timeMax / numPoints;
    const times: number[] = [];
    const peValues: number[] = [];
    const pgValues: number[] = [];
    const inversionValues: number[] = [];

    if (modelType === "rabi") {
      // Rabi Oscillations with optional damping
      const omegaEff = Math.sqrt(omega * omega + delta * delta);
      const maxPe = (omega * omega) / (omegaEff * omegaEff);

      for (let i = 0; i <= numPoints; i++) {
        const t = i * dt;
        times.push(t);
        // Pe(t) = maxPe * sin^2(omegaEff * t / 2) * exp(-gamma * t)
        const decay = Math.exp(-gamma * t);
        const osc = Math.sin((omegaEff * t) / 2) ** 2;
        const pe = maxPe * osc * decay;
        const pg = 1.0 - pe;
        peValues.push(pe);
        pgValues.push(pg);
        inversionValues.push(pe - pg);
      }
    } else {
      // Jaynes-Cummings: Sum over Poisson photon distribution for coherent state
      // W(t) = sum_n P(n) * cos(2 * g * sqrt(n+1) * t) -> exhibits collapse and revivals
      const maxN = Math.max(30, meanPhotons * 3);
      // Precompute Poisson weights P(n) = exp(-meanPhotons) * meanPhotons^n / n!
      const pDist: number[] = [];
      let currentLogFactorial = 0;
      for (let n = 0; n <= maxN; n++) {
        if (n > 0) currentLogFactorial += Math.log(n);
        const logPn = -meanPhotons + n * Math.log(Math.max(meanPhotons, 0.001)) - currentLogFactorial;
        pDist.push(Math.exp(logPn));
      }

      for (let i = 0; i <= numPoints; i++) {
        const t = i * dt;
        times.push(t);
        let inversion = 0;
        for (let n = 0; n <= maxN; n++) {
          const rabiN = 2 * couplingG * Math.sqrt(n + 1);
          inversion += pDist[n] * Math.cos(rabiN * t);
        }
        // Clamped into [-1, 1]
        inversion = Math.max(-1, Math.min(1, inversion));
        const pe = (inversion + 1) / 2;
        const pg = 1 - pe;
        peValues.push(pe);
        pgValues.push(pg);
        inversionValues.push(inversion);
      }
    }

    return { times, peValues, pgValues, inversionValues };
  }, [modelType, omega, delta, gamma, couplingG, meanPhotons, timeMax]);

  // Render Waveform Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const data = computeData();
    const padding = { left: 50, right: 30, top: 30, bottom: 40 };
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    // Grid lines & Background
    ctx.fillStyle = "rgba(2, 6, 23, 0.5)";
    ctx.fillRect(padding.left, padding.top, plotW, plotH);

    ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
    ctx.lineWidth = 1;

    // Horizontal grid lines (0.0, 0.25, 0.5, 0.75, 1.0)
    for (let p = 0; p <= 1.0; p += 0.25) {
      const y = padding.top + (1 - p) * plotH;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + plotW, y);
      ctx.stroke();

      ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
      ctx.font = "10px monospace";
      ctx.fillText(p.toFixed(2), 15, y + 3);
    }

    // Time ticks on X axis
    for (let t = 0; t <= timeMax; t += timeMax / 5) {
      const x = padding.left + (t / timeMax) * plotW;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + plotH);
      ctx.stroke();

      ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
      ctx.font = "10px monospace";
      ctx.fillText(`${t.toFixed(1)}s`, x - 10, height - 15);
    }

    // Plot Excited State Pe(t) (Amber / Rose)
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    data.times.forEach((t, i) => {
      const px = padding.left + (t / timeMax) * plotW;
      const py = padding.top + (1 - data.peValues[i]) * plotH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Plot Ground State Pg(t) (Cyan)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.times.forEach((t, i) => {
      const px = padding.left + (t / timeMax) * plotW;
      const py = padding.top + (1 - data.pgValues[i]) * plotH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Inversion line W(t) dashed (Amber)
    if (modelType === "jaynes_cummings") {
      ctx.strokeStyle = "#eab308";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      data.times.forEach((t, i) => {
        const px = padding.left + (t / timeMax) * plotW;
        // map inversion [-1, 1] to plot height [0, 1]
        const normInv = (data.inversionValues[i] + 1) / 2;
        const py = padding.top + (1 - normInv) * plotH;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Axes border
    ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(padding.left, padding.top, plotW, plotH);

  }, [computeData, timeMax, modelType]);

  // Generate Runnable Python SciPy Code
  const generatePythonCode = () => {
    if (modelType === "rabi") {
      return `import numpy as np
import matplotlib.pyplot as plt

# --- Rabi Oscillation Numerical Solver (QT 03 / QT 11) ---
omega = ${omega.toFixed(2)}       # Rabi frequency (laser coupling)
delta = ${delta.toFixed(2)}       # Detuning (omega_laser - omega_atom)
gamma = ${gamma.toFixed(2)}       # Decoherence / Spontaneous decay rate

t = np.linspace(0, ${timeMax}, 500)
omega_eff = np.sqrt(omega**2 + delta**2)

# Excited state probability P_e(t) and Ground state P_g(t)
pe = ((omega / omega_eff)**2) * (np.sin(omega_eff * t / 2)**2) * np.exp(-gamma * t)
pg = 1.0 - pe

print(f"Rabi Frequency: {omega:.2f} rad/s, Detuning: {delta:.2f} rad/s")
print(f"Maximum Inversion Amplitude: {(omega/omega_eff)**2:.3f}")

plt.figure(figsize=(9, 4.5))
plt.plot(t, pe, label="Excited State P_e(t)", color="crimson", lw=2)
plt.plot(t, pg, label="Ground State P_g(t)", color="dodgerblue", lw=1.5, ls="--")
plt.title("Rabi Oscillations of a Driven Two-Level Atom")
plt.xlabel("Time (s)")
plt.ylabel("Occupation Probability")
plt.grid(True, alpha=0.3)
plt.legend()
plt.show()`;
    } else {
      return `import numpy as np
import matplotlib.pyplot as plt

# --- Jaynes-Cummings Quantum Dynamics (Collapse & Revival) ---
g = ${couplingG.toFixed(2)}           # Cavity-atom vacuum coupling
n_mean = ${meanPhotons}       # Mean photon number of coherent cavity field
t = np.linspace(0, ${timeMax}, 600)

max_n = max(35, int(n_mean * 3))
# Poisson coherent state distribution
p_n = [np.exp(-n_mean) * (n_mean**n) / np.math.factorial(n) for n in range(max_n)]

# Atomic population inversion W(t) = sum_n P(n) * cos(2*g*sqrt(n+1)*t)
inversion = np.zeros_like(t)
for n, p in enumerate(p_n):
    inversion += p * np.cos(2 * g * np.sqrt(n + 1) * t)

pe = (inversion + 1) / 2

print(f"Coupling g: {g} rad/s, Coherent Photons: {n_mean}")
print("Observed Quantum Collapse and Revival of Population Inversion")

plt.figure(figsize=(9, 4.5))
plt.plot(t, inversion, label="Atomic Inversion W(t)", color="goldenrod", lw=2)
plt.plot(t, pe, label="Excited Population P_e(t)", color="crimson", alpha=0.7, ls=":")
plt.title("Jaynes-Cummings Model: Quantum Collapse and Revival")
plt.xlabel("Interaction Time (s)")
plt.ylabel("Inversion / Probability")
plt.grid(True, alpha=0.3)
plt.legend()
plt.show()`;
    }
  };

  const handleCopy = () => {
    const code = generatePythonCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    if (onExportCode) onExportCode(code);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#0b0f17] text-slate-100 p-4 space-y-4 overflow-y-auto">
      
      {/* ── Top Bar: Model Selector & Actions ────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="size-4.5 text-rose-400" />
            <h3 className="font-bold text-base text-slate-100">
              Numerical Quantum Dynamics: Rabi & Jaynes-Cummings Models
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Fulfills AICTE QT 03 (Scientific Computing) & QT 11 (Quantum Optics). Simulates driven two-level atoms and cavity QED light-matter interactions.
          </p>
        </div>

        {/* Model Switcher Tabs */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setModelType("rabi")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              modelType === "rabi"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Rabi Oscillations
          </button>
          <button
            onClick={() => setModelType("jaynes_cummings")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              modelType === "jaynes_cummings"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Jaynes-Cummings (Cavity QED)
          </button>
        </div>
      </div>

      {/* ── Waveform Chart & Legend ───────────────────────────────────────── */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <span className="size-2.5 rounded-full bg-rose-500" /> Excited State P_e(t)
            </span>
            <span className="flex items-center gap-1.5 text-sky-400 font-bold">
              <span className="size-2.5 rounded-full bg-sky-500" /> Ground State P_g(t)
            </span>
            {modelType === "jaynes_cummings" && (
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-400" /> Atomic Inversion W(t)
              </span>
            )}
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono rounded bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
            {copied ? "Copied Python Script!" : "Export Python Solver"}
          </button>
        </div>

        {/* Dynamic Waveform Canvas */}
        <div className="relative w-full flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={720}
            height={320}
            className="w-full h-auto max-h-[340px] rounded-lg border border-slate-800/80"
          />
        </div>
      </div>

      {/* ── Parameter Controls & Real-Time Physics Meters ─────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {modelType === "rabi" ? (
          <>
            {/* Rabi Frequency Omega */}
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Rabi Drive (Ω):</span>
                <span className="text-rose-400 font-bold">{omega.toFixed(2)} rad/s</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.1"
                value={omega}
                onChange={(e) => setOmega(parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 leading-tight">
                Controls the oscillation frequency between ground and excited states.
              </p>
            </div>

            {/* Detuning Delta */}
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Laser Detuning (Δ = ω - ω₀):</span>
                <span className="text-sky-400 font-bold">{delta.toFixed(2)} rad/s</span>
              </div>
              <input
                type="range"
                min="-5.0"
                max="5.0"
                step="0.2"
                value={delta}
                onChange={(e) => setDelta(parseFloat(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 leading-tight">
                When Δ ≠ 0, maximum transition probability drops below 1.0.
              </p>
            </div>

            {/* Spontaneous Decay Gamma */}
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Decoherence Decay (γ):</span>
                <span className="text-amber-400 font-bold">{gamma.toFixed(2)} s⁻¹</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.5"
                step="0.02"
                value={gamma}
                onChange={(e) => setGamma(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 leading-tight">
                Simulates energy dissipation into the ambient environment.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Jaynes-Cummings Coupling g */}
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Cavity Coupling (g):</span>
                <span className="text-amber-400 font-bold">{couplingG.toFixed(2)} rad/s</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={couplingG}
                onChange={(e) => setCouplingG(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 leading-tight">
                Vacuum Rabi splitting frequency between atom and cavity mode.
              </p>
            </div>

            {/* Mean Photons n */}
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Mean Photon Number (⟨n⟩):</span>
                <span className="text-cyan-400 font-bold">{meanPhotons} photons</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={meanPhotons}
                onChange={(e) => setMeanPhotons(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 leading-tight">
                Photon statistics trigger quantum interference: Collapse followed by Revivals!
              </p>
            </div>

            {/* Time Window */}
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Observation Window:</span>
                <span className="text-slate-200 font-bold">{timeMax} seconds</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={timeMax}
                onChange={(e) => setTimeMax(parseInt(e.target.value))}
                className="w-full accent-slate-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 leading-tight">
                Increase window length to observe multiple revival envelopes.
              </p>
            </div>
          </>
        )}

      </div>

    </div>
  );
}
