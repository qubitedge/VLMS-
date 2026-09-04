import React, { useState } from "react";
import { 
  ShieldCheck, ShieldAlert, Radio, UserCheck, Eye, EyeOff, 
  RefreshCw, Play, Check, AlertTriangle, Key, ArrowRight, Lock
} from "lucide-react";

interface Photon {
  aliceBit: number; // 0 or 1
  aliceBasis: "+" | "x"; // + (rectilinear), x (diagonal)
  aliceState: string; // |0>, |1>, |+>, |->
  eveIntercepted: boolean;
  eveBasis?: "+" | "x";
  eveMeasuredBit?: number;
  bobBasis: "+" | "x";
  bobMeasuredBit: number;
  basesMatch: boolean;
  bitError: boolean;
}

export function BB84QkdSimulator() {
  const [numPhotons, setNumPhotons] = useState<number>(12);
  const [eveEnabled, setEveEnabled] = useState<boolean>(true);
  const [eveRate, setEveRate] = useState<number>(100); // 100% intercept
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [photons, setPhotons] = useState<Photon[]>([]);
  const [step, setStep] = useState<"idle" | "transmitted" | "sifted" | "analyzed">("idle");

  // Run BB84 Simulation
  const runSimulation = () => {
    setIsSimulating(true);
    setStep("transmitted");

    const newPhotons: Photon[] = [];

    for (let i = 0; i < numPhotons; i++) {
      // 1. Alice generates random bit (0 or 1) and random basis (+ or x)
      const aBit = Math.random() < 0.5 ? 0 : 1;
      const aBasis: "+" | "x" = Math.random() < 0.5 ? "+" : "x";
      
      // Determine Alice's quantum state
      let aState = "";
      if (aBasis === "+") {
        aState = aBit === 0 ? "|0⟩" : "|1⟩";
      } else {
        aState = aBit === 0 ? "|+⟩" : "|−⟩";
      }

      // 2. Eve intercepts?
      const willEveIntercept = eveEnabled && (Math.random() * 100 < eveRate);
      let eBasis: "+" | "x" | undefined = undefined;
      let eBit: number | undefined = undefined;
      let stateInFlightBasis = aBasis;
      let stateInFlightBit = aBit;

      if (willEveIntercept) {
        eBasis = Math.random() < 0.5 ? "+" : "x";
        if (eBasis === aBasis) {
          eBit = aBit;
        } else {
          // Basis mismatch collapses state randomly 50/50
          eBit = Math.random() < 0.5 ? 0 : 1;
          stateInFlightBasis = eBasis;
          stateInFlightBit = eBit;
        }
      }

      // 3. Bob chooses random basis (+ or x)
      const bBasis: "+" | "x" = Math.random() < 0.5 ? "+" : "x";
      let bBit: number;

      if (bBasis === stateInFlightBasis) {
        bBit = stateInFlightBit;
      } else {
        // Measurement in conjugate basis produces 50/50 random outcome
        bBit = Math.random() < 0.5 ? 0 : 1;
      }

      const basesMatch = (aBasis === bBasis);
      const bitError = basesMatch && (aBit !== bBit);

      newPhotons.push({
        aliceBit: aBit,
        aliceBasis: aBasis,
        aliceState: aState,
        eveIntercepted: willEveIntercept,
        eveBasis: eBasis,
        eveMeasuredBit: eBit,
        bobBasis: bBasis,
        bobMeasuredBit: bBit,
        basesMatch,
        bitError,
      });
    }

    setPhotons(newPhotons);
    setIsSimulating(false);
  };

  // Metrics
  const siftedPhotons = photons.filter(p => p.basesMatch);
  const errorCount = siftedPhotons.filter(p => p.bitError).length;
  const qber = siftedPhotons.length > 0 ? (errorCount / siftedPhotons.length) * 100 : 0;
  const isSecure = qber <= 11.0; // Theoretical threshold ~11% in QKD

  // Sifted Key String
  const aliceKey = siftedPhotons.map(p => p.aliceBit).join("");
  const bobKey = siftedPhotons.map(p => p.bobMeasuredBit).join("");

  return (
    <div className="h-full flex flex-col bg-[#0b0f17] text-slate-100 p-4 space-y-4 overflow-y-auto">
      
      {/* ── Header & Protocol Overview ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="size-4.5 text-cyan-400 animate-pulse" />
            <h3 className="font-bold text-base text-slate-100">
              BB84 Quantum Key Distribution (QKD) Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate quantum cryptography with polarized photons. Observe how eavesdropping (Eve) fundamentally introduces detectable bit errors (QBER).
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-900/30 active:scale-95 disabled:opacity-50"
          >
            <Play className="size-3.5 fill-current" />
            Transmit Photons
          </button>
        </div>
      </div>

      {/* ── Control Configuration Bar ───────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Photon Count Slider */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-2">
            <span>Photon Pulses:</span>
            <span className="text-cyan-400 font-bold">{numPhotons} Photons</span>
          </div>
          <div className="flex gap-2">
            {[8, 12, 16, 24].map(n => (
              <button
                key={n}
                onClick={() => setNumPhotons(n)}
                className={`flex-1 py-1 text-xs font-mono rounded border transition-colors ${
                  numPhotons === n 
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold" 
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Eve Eavesdropper Toggle */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              {eveEnabled ? <Eye className="size-4 text-rose-400" /> : <EyeOff className="size-4 text-emerald-400" />}
              <span>Eve (Eavesdropper)</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {eveEnabled ? "Intercepting in transit" : "Passive / Disabled"}
            </p>
          </div>

          <button
            onClick={() => setEveEnabled(!eveEnabled)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
              eveEnabled
                ? "bg-rose-500/20 border-rose-500/50 text-rose-300"
                : "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
            }`}
          >
            {eveEnabled ? "Intercepting ON" : "Channel Safe"}
          </button>
        </div>

        {/* Eve Interception Rate */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-1">
            <span>Eve Interception Rate:</span>
            <span className={eveEnabled ? "text-rose-400 font-bold" : "text-slate-500"}>
              {eveEnabled ? `${eveRate}%` : "0% (Disabled)"}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            disabled={!eveEnabled}
            value={eveRate}
            onChange={(e) => setEveRate(parseInt(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer disabled:opacity-30"
          />
        </div>
      </div>

      {/* ── Security Verdict & QBER Meter ────────────────────────────────── */}
      {photons.length > 0 && (
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
          isSecure 
            ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" 
            : "bg-rose-950/30 border-rose-500/40 text-rose-300"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`size-10 rounded-xl grid place-items-center shrink-0 ${
              isSecure ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
            }`}>
              {isSecure ? <ShieldCheck className="size-6" /> : <ShieldAlert className="size-6" />}
            </div>
            <div>
              <h4 className="font-bold text-sm">
                {isSecure ? "Channel Verified SECURE — Key Exchange Successful!" : "Eavesdropping Detected — Channel COMPROMISED!"}
              </h4>
              <p className="text-xs opacity-80 mt-0.5">
                {isSecure 
                  ? "QBER is below the 11% threshold. Quantum mechanics guarantees no eavesdropper was listening." 
                  : "QBER exceeds 11%. Eve's measurement collapsed photon states, causing detectable errors."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider block opacity-70">Quantum Error Rate</span>
              <span className={`text-lg font-black ${isSecure ? "text-emerald-400" : "text-rose-400"}`}>
                {qber.toFixed(1)}% QBER
              </span>
            </div>
            <div className="text-right pl-3 border-l border-white/10">
              <span className="text-[10px] uppercase tracking-wider block opacity-70">Sifted Bits</span>
              <span className="text-lg font-black text-slate-100">
                {siftedPhotons.length} / {numPhotons}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Interactive Transmission Table ───────────────────────────────── */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Key className="size-3.5 text-cyan-400" />
            Photon Exchange Matrix
          </h4>
          <span className="text-[11px] font-mono text-slate-400">
            Bases: <b className="text-cyan-400">+ (Rectilinear)</b>, <b className="text-purple-400">× (Diagonal)</b>
          </span>
        </div>

        {photons.length === 0 ? (
          <div className="text-center py-10 text-slate-500 font-mono text-xs">
            Click <b className="text-cyan-400">"Transmit Photons"</b> to initiate the BB84 quantum exchange protocol.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                  <th className="p-2.5">Photon</th>
                  <th className="p-2.5 text-cyan-400">Alice Bit</th>
                  <th className="p-2.5 text-cyan-400">Alice Basis</th>
                  <th className="p-2.5 text-cyan-300">State |ψ⟩</th>
                  {eveEnabled && <th className="p-2.5 text-rose-400">Eve Intercept?</th>}
                  <th className="p-2.5 text-sky-400">Bob Basis</th>
                  <th className="p-2.5 text-sky-400">Bob Measured</th>
                  <th className="p-2.5 text-amber-400">Bases Match?</th>
                  <th className="p-2.5 text-emerald-400">Sifted Key Bit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {photons.map((p, idx) => (
                  <tr 
                    key={idx} 
                    className={`transition-colors ${
                      p.basesMatch 
                        ? p.bitError ? "bg-rose-950/40" : "bg-emerald-950/20" 
                        : "opacity-40"
                    }`}
                  >
                    <td className="p-2.5 font-bold text-slate-400">#{idx + 1}</td>
                    <td className="p-2.5 font-bold text-cyan-400">{p.aliceBit}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded border text-[11px] ${
                        p.aliceBasis === "+" 
                          ? "border-cyan-500/40 text-cyan-300 bg-cyan-950/50" 
                          : "border-purple-500/40 text-purple-300 bg-purple-950/50"
                      }`}>
                        {p.aliceBasis}
                      </span>
                    </td>
                    <td className="p-2.5 font-bold text-cyan-200">{p.aliceState}</td>
                    {eveEnabled && (
                      <td className="p-2.5">
                        {p.eveIntercepted ? (
                          <span className="px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-600/60 text-rose-400 font-semibold text-[10px]">
                            Eve ({p.eveBasis}) → {p.eveMeasuredBit}
                          </span>
                        ) : (
                          <span className="text-slate-600 text-[11px]">—</span>
                        )}
                      </td>
                    )}
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded border text-[11px] ${
                        p.bobBasis === "+" 
                          ? "border-cyan-500/40 text-cyan-300 bg-cyan-950/50" 
                          : "border-purple-500/40 text-purple-300 bg-purple-950/50"
                      }`}>
                        {p.bobBasis}
                      </span>
                    </td>
                    <td className="p-2.5 font-bold text-sky-300">{p.bobMeasuredBit}</td>
                    <td className="p-2.5">
                      {p.basesMatch ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="size-3" /> MATCH
                        </span>
                      ) : (
                        <span className="text-slate-500">DISCARD</span>
                      )}
                    </td>
                    <td className="p-2.5">
                      {p.basesMatch ? (
                        p.bitError ? (
                          <span className="px-1.5 py-0.5 rounded bg-rose-900/60 text-rose-300 border border-rose-700 font-black flex items-center gap-1">
                            <AlertTriangle className="size-3" /> ERROR ({p.aliceBit}≠{p.bobMeasuredBit})
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-700 font-bold">
                            {p.aliceBit}
                          </span>
                        )
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Generated Symmetric Secret Key ──────────────────────────────── */}
      {siftedPhotons.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
              Alice's Sifted Secret Key:
            </span>
            <div className="font-mono text-base font-black tracking-widest text-slate-100 break-all">
              {aliceKey || "None"}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-xs font-mono text-sky-400 font-bold block mb-1">
              Bob's Sifted Secret Key:
            </span>
            <div className={`font-mono text-base font-black tracking-widest break-all ${
              aliceKey === bobKey ? "text-emerald-400" : "text-rose-400"
            }`}>
              {bobKey || "None"}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
