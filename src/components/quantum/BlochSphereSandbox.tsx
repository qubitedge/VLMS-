import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  RotateCcw, Play, Copy, Check, Sparkles, HelpCircle, 
  Compass, Eye, Sliders, ChevronRight, Zap, RefreshCw
} from "lucide-react";

interface BlochSphereProps {
  onExportCode?: (code: string) => void;
}

export function BlochSphereSandbox({ onExportCode }: BlochSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Quantum state parameters: theta in [0, pi], phi in [0, 2*pi]
  const [theta, setTheta] = useState<number>(0); // Starts at |0> (north pole)
  const [phi, setPhi] = useState<number>(0);
  
  // Camera angles (degrees)
  const [camYaw, setCamYaw] = useState<number>(35);
  const [camPitch, setCamPitch] = useState<number>(20);
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Gate history
  const [history, setHistory] = useState<string[]>(["Init |0⟩"]);
  const [copied, setCopied] = useState<boolean>(false);

  // Mathematical state variables
  const alphaReal = Math.cos(theta / 2);
  const betaMag = Math.sin(theta / 2);
  const betaReal = betaMag * Math.cos(phi);
  const betaImag = betaMag * Math.sin(phi);

  const prob0 = Math.cos(theta / 2) ** 2;
  const prob1 = Math.sin(theta / 2) ** 2;

  // Cartesian coordinates on unit sphere
  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(theta);

  // Convert theta and phi to Bloch state vector and apply gates
  const applyGate = (gateName: string) => {
    let newTheta = theta;
    let newPhi = phi;

    // Convert current state to alpha and beta (complex)
    let a_r = Math.cos(theta / 2);
    let a_i = 0;
    let b_r = Math.sin(theta / 2) * Math.cos(phi);
    let b_i = Math.sin(theta / 2) * Math.sin(phi);

    let next_ar = a_r;
    let next_ai = a_i;
    let next_br = b_r;
    let next_bi = b_i;

    if (gateName === "X") {
      // X = [[0, 1], [1, 0]]
      next_ar = b_r; next_ai = b_i;
      next_br = a_r; next_bi = a_i;
    } else if (gateName === "Y") {
      // Y = [[0, -i], [i, 0]]
      next_ar = b_i; next_ai = -b_r;
      next_br = -a_i; next_bi = a_r;
    } else if (gateName === "Z") {
      // Z = [[1, 0], [0, -1]]
      next_ar = a_r; next_ai = a_i;
      next_br = -b_r; next_bi = -b_i;
    } else if (gateName === "H") {
      // H = 1/sqrt(2) * [[1, 1], [1, -1]]
      const s = 1 / Math.SQRT2;
      next_ar = s * (a_r + b_r); next_ai = s * (a_i + b_i);
      next_br = s * (a_r - b_r); next_bi = s * (a_i - b_i);
    } else if (gateName === "S") {
      // S = [[1, 0], [0, i]]
      next_ar = a_r; next_ai = a_i;
      next_br = -b_i; next_bi = b_r;
    } else if (gateName === "T") {
      // T = [[1, 0], [0, e^(i*pi/4)]]
      const c = Math.cos(Math.PI / 4);
      const s = Math.sin(Math.PI / 4);
      next_ar = a_r; next_ai = a_i;
      next_br = b_r * c - b_i * s;
      next_bi = b_r * s + b_i * c;
    } else if (gateName === "Rx") {
      // Rx(pi/4)
      const c = Math.cos(Math.PI / 8);
      const s = Math.sin(Math.PI / 8);
      next_ar = c * a_r + s * b_i;
      next_ai = c * a_i - s * b_r;
      next_br = c * b_r + s * a_i;
      next_bi = c * b_i - s * a_r;
    } else if (gateName === "Ry") {
      // Ry(pi/4)
      const c = Math.cos(Math.PI / 8);
      const s = Math.sin(Math.PI / 8);
      next_ar = c * a_r - s * b_r;
      next_ai = c * a_i - s * b_i;
      next_br = s * a_r + c * b_r;
      next_bi = s * a_i + c * b_i;
    } else if (gateName === "Rz") {
      // Rz(pi/4)
      const angle = Math.PI / 8;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      next_ar = a_r * c + a_i * s;
      next_ai = a_i * c - a_r * s;
      next_br = b_r * c - b_i * s;
      next_bi = b_i * c + b_r * s;
    } else if (gateName === "RESET_0") {
      newTheta = 0; newPhi = 0;
      setTheta(newTheta);
      setPhi(newPhi);
      setHistory(prev => [...prev.slice(-6), "Reset |0⟩"]);
      return;
    } else if (gateName === "FLIP_1") {
      newTheta = Math.PI; newPhi = 0;
      setTheta(newTheta);
      setPhi(newPhi);
      setHistory(prev => [...prev.slice(-6), "Flip |1⟩"]);
      return;
    } else if (gateName === "PLUS") {
      newTheta = Math.PI / 2; newPhi = 0;
      setTheta(newTheta);
      setPhi(newPhi);
      setHistory(prev => [...prev.slice(-6), "State |+⟩"]);
      return;
    }

    // Convert next state vector back to (theta, phi)
    const norm = Math.sqrt(next_ar*next_ar + next_ai*next_ai + next_br*next_br + next_bi*next_bi);
    if (norm > 0) {
      next_ar /= norm; next_ai /= norm; next_br /= norm; next_bi /= norm;
    }

    // Remove global phase so alpha is real and non-negative
    const alphaPhase = Math.atan2(next_ai, next_ar);
    const cosP = Math.cos(-alphaPhase);
    const sinP = Math.sin(-alphaPhase);

    const final_ar = next_ar * cosP - next_ai * sinP;
    const final_br = next_br * cosP - next_bi * sinP;
    const final_bi = next_br * sinP + next_bi * cosP;

    const clampedAr = Math.min(1, Math.max(0, final_ar));
    newTheta = 2 * Math.acos(clampedAr);

    if (Math.abs(Math.sin(newTheta / 2)) < 1e-6) {
      newPhi = 0;
    } else {
      newPhi = Math.atan2(final_bi, final_br);
      if (newPhi < 0) newPhi += 2 * Math.PI;
    }

    setTheta(newTheta);
    setPhi(newPhi);
    setHistory(prev => [...prev.slice(-6), `Gate ${gateName}`]);
  };

  // 3D Canvas Projection & Rendering
  const renderBloch = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const R = Math.min(width, height) * 0.35;

    // Camera matrix: yaw (around Z) and pitch (around X')
    const yawRad = (camYaw * Math.PI) / 180;
    const pitchRad = (camPitch * Math.PI) / 180;

    const project = (px: number, py: number, pz: number) => {
      const x1 = px * Math.cos(yawRad) - py * Math.sin(yawRad);
      const y1 = px * Math.sin(yawRad) + py * Math.cos(yawRad);
      const z1 = pz;

      const x2 = x1;
      const y2 = y1 * Math.cos(pitchRad) - z1 * Math.sin(pitchRad);
      const z2 = y1 * Math.sin(pitchRad) + z1 * Math.cos(pitchRad);

      return {
        sx: cx + x2 * R,
        sy: cy - z2 * R,
        depth: y2
      };
    };

    // 1. Draw glowing background sphere boundary
    const grad = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.1, cx, cy, R);
    grad.addColorStop(0, "rgba(34, 211, 238, 0.08)");
    grad.addColorStop(0.7, "rgba(14, 165, 233, 0.03)");
    grad.addColorStop(1, "rgba(2, 6, 23, 0.6)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 2. Draw Latitude Wireframes
    const latitudes = [-60, -30, 0, 30, 60];
    latitudes.forEach(latDeg => {
      const latRad = (latDeg * Math.PI) / 180;
      const r_lat = Math.cos(latRad);
      const z_lat = Math.sin(latRad);

      ctx.beginPath();
      const numPoints = 64;
      for (let i = 0; i <= numPoints; i++) {
        const a = (i / numPoints) * 2 * Math.PI;
        const p = project(r_lat * Math.cos(a), r_lat * Math.sin(a), z_lat);
        if (i === 0) ctx.moveTo(p.sx, p.sy);
        else ctx.lineTo(p.sx, p.sy);
      }
      ctx.strokeStyle = latDeg === 0 ? "rgba(34, 211, 238, 0.45)" : "rgba(148, 163, 184, 0.12)";
      ctx.lineWidth = latDeg === 0 ? 1.5 : 0.8;
      if (latDeg === 0) {
        ctx.setLineDash([4, 4]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 3. Draw Longitude Wireframes
    const longitudes = [0, 45, 90, 135];
    longitudes.forEach(lonDeg => {
      const lonRad = (lonDeg * Math.PI) / 180;
      ctx.beginPath();
      const numPoints = 64;
      for (let i = 0; i <= numPoints; i++) {
        const a = (i / numPoints) * 2 * Math.PI;
        const px = Math.cos(lonRad) * Math.sin(a);
        const py = Math.sin(lonRad) * Math.sin(a);
        const pz = Math.cos(a);
        const p = project(px, py, pz);
        if (i === 0) ctx.moveTo(p.sx, p.sy);
        else ctx.lineTo(p.sx, p.sy);
      }
      ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // 4. Draw Orthonormal Coordinate Axes (X, Y, Z)
    const drawAxis = (x1: number, y1: number, z1: number, label: string, color: string, negLabel?: string) => {
      const origin = project(0, 0, 0);
      const pos = project(x1 * 1.25, y1 * 1.25, z1 * 1.25);
      const neg = project(-x1 * 1.15, -y1 * 1.15, -z1 * 1.15);

      // Negative axis dashed
      ctx.beginPath();
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(neg.sx, neg.sy);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
      ctx.setLineDash([2, 3]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Positive axis solid
      ctx.beginPath();
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(pos.sx, pos.sy);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Arrowhead
      const angle = Math.atan2(pos.sy - origin.sy, pos.sx - origin.sx);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(pos.sx, pos.sy);
      ctx.lineTo(pos.sx - 8 * Math.cos(angle - Math.PI / 6), pos.sy - 8 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(pos.sx - 8 * Math.cos(angle + Math.PI / 6), pos.sy - 8 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      // Label
      ctx.font = "bold 12px monospace";
      ctx.fillStyle = color;
      ctx.fillText(label, pos.sx + 8, pos.sy + 4);

      if (negLabel) {
        ctx.fillStyle = "rgba(148, 163, 184, 0.5)";
        ctx.fillText(negLabel, neg.sx - 16, neg.sy + 4);
      }
    };

    drawAxis(0, 0, 1, "+Z |0⟩", "#38bdf8", "-Z |1⟩");
    drawAxis(1, 0, 0, "+X |+⟩", "#f43f5e", "-X |-⟩");
    drawAxis(0, 1, 0, "+Y |i⟩", "#a855f7", "-Y |-i⟩");

    // 5. Draw Current State Vector Projection Lines
    const origin = project(0, 0, 0);
    const stateHead = project(x, y, z);
    const xyFoot = project(x, y, 0);

    ctx.beginPath();
    ctx.moveTo(stateHead.sx, stateHead.sy);
    ctx.lineTo(xyFoot.sx, xyFoot.sy);
    ctx.strokeStyle = "rgba(250, 204, 21, 0.4)";
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(origin.sx, origin.sy);
    ctx.lineTo(xyFoot.sx, xyFoot.sy);
    ctx.strokeStyle = "rgba(250, 204, 21, 0.4)";
    ctx.stroke();
    ctx.setLineDash([]);

    // 6. Draw State Vector Arrow (|psi>)
    ctx.beginPath();
    ctx.moveTo(origin.sx, origin.sy);
    ctx.lineTo(stateHead.sx, stateHead.sy);
    ctx.strokeStyle = "#eab308";
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Vector Head Bead
    ctx.beginPath();
    ctx.arc(stateHead.sx, stateHead.sy, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#facc15";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Glow ring around head
    ctx.beginPath();
    ctx.arc(stateHead.sx, stateHead.sy, 11, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(234, 179, 8, 0.45)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = "bold 13px monospace";
    ctx.fillStyle = "#facc15";
    ctx.fillText("|ψ⟩", stateHead.sx + 12, stateHead.sy - 6);

  }, [camYaw, camPitch, theta, phi, x, y, z]);

  useEffect(() => {
    renderBloch();
  }, [renderBloch]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    setCamYaw(prev => (prev + dx * 0.6) % 360);
    setCamPitch(prev => Math.max(-80, Math.min(80, prev - dy * 0.6)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const generateQiskitCode = (): string => {
    const th_rounded = (theta).toFixed(3);
    const ph_rounded = (phi).toFixed(3);
    return `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
import numpy as np

# Create single qubit circuit
qc = QuantumCircuit(1)

# Rotate to target state: theta=${th_rounded} rad, phi=${ph_rounded} rad
qc.ry(${th_rounded}, 0)
qc.rz(${ph_rounded}, 0)

# Simulate statevector
state = Statevector.from_instruction(qc)
print("Bloch Coordinates (x, y, z):", (${x.toFixed(3)}, ${y.toFixed(3)}, ${z.toFixed(3)}))
print("Probabilities:", state.probabilities_dict())
print("\\nCircuit:")
print(qc.draw())`;
  };

  const handleCopyCode = () => {
    const py = generateQiskitCode();
    navigator.clipboard.writeText(py);
    setCopied(true);
    if (onExportCode) onExportCode(py);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#0b0f17] text-slate-100 overflow-hidden select-none">
      
      {/* ── Left Column: 3D Canvas Visualizer ───────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-between p-4 border-r border-slate-800/80 relative min-h-[360px]">
        
        {/* Top Floating Helper */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 z-10">
          <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
            <Compass className="size-3.5 text-cyan-400" />
            Click & Drag Sphere to Rotate View
          </span>
          <span className="bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800 text-amber-400 font-semibold">
            |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩
          </span>
        </div>

        {/* 3D Canvas */}
        <div className="relative w-full flex-1 flex items-center justify-center my-2">
          <canvas
            ref={canvasRef}
            width={480}
            height={420}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="cursor-grab active:cursor-grabbing max-w-full h-auto drop-shadow-[0_0_25px_rgba(6,182,212,0.15)]"
          />
        </div>

        {/* Live Vector Coordinates Bar */}
        <div className="w-full grid grid-cols-3 gap-2 text-center text-xs font-mono bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
          <div className="p-1 rounded bg-slate-950/60 border border-slate-800/50">
            <span className="text-rose-400 font-bold">X:</span> {x.toFixed(3)}
          </div>
          <div className="p-1 rounded bg-slate-950/60 border border-slate-800/50">
            <span className="text-purple-400 font-bold">Y:</span> {y.toFixed(3)}
          </div>
          <div className="p-1 rounded bg-slate-950/60 border border-slate-800/50">
            <span className="text-sky-400 font-bold">Z:</span> {z.toFixed(3)}
          </div>
        </div>
      </div>

      {/* ── Right Column: Interactive Gate Sandbox & Mathematics ─────────── */}
      <div className="w-full md:w-[420px] flex flex-col p-4 overflow-y-auto space-y-4 bg-slate-950/40">
        
        {/* Measurement Probability Gauges */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-2.5">
            <Zap className="size-3.5 text-amber-400" />
            Measurement Probabilities (Born Rule)
          </h4>
          
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-sky-400 font-semibold">P(|0⟩)</span>
                <span className="text-sky-300">{(prob0 * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300 rounded-full" 
                  style={{ width: `${prob0 * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-rose-400 font-semibold">P(|1⟩)</span>
                <span className="text-rose-300">{(prob1 * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300 rounded-full" 
                  style={{ width: `${prob1 * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quantum Gate Palette */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-cyan-400" />
              Apply Quantum Gates
            </h4>
            <span className="text-[10px] text-slate-500 font-mono">Unitary Transforms</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { id: "H", label: "H", desc: "Hadamard (Superposition)", color: "border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10" },
              { id: "X", label: "X", desc: "Pauli-X (NOT Flip)", color: "border-rose-500/40 text-rose-400 hover:bg-rose-500/10" },
              { id: "Y", label: "Y", desc: "Pauli-Y (Bit+Phase)", color: "border-purple-500/40 text-purple-400 hover:bg-purple-500/10" },
              { id: "Z", label: "Z", desc: "Pauli-Z (Phase Flip)", color: "border-sky-500/40 text-sky-400 hover:bg-sky-500/10" },
              { id: "S", label: "S", desc: "Phase (π/2)", color: "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10" },
              { id: "T", label: "T", desc: "Phase (π/4)", color: "border-teal-500/40 text-teal-400 hover:bg-teal-500/10" },
              { id: "Rx", label: "Rx(π/4)", desc: "X-Rotation", color: "border-amber-500/40 text-amber-400 hover:bg-amber-500/10" },
              { id: "Ry", label: "Ry(π/4)", desc: "Y-Rotation", color: "border-amber-500/40 text-amber-400 hover:bg-amber-500/10" },
            ].map(gate => (
              <button
                key={gate.id}
                onClick={() => applyGate(gate.id)}
                title={gate.desc}
                className={`py-2 px-2 rounded-lg border bg-slate-950 font-mono text-sm font-bold transition-all hover:scale-105 active:scale-95 ${gate.color}`}
              >
                {gate.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() => applyGate("RESET_0")}
              className="flex-1 py-1.5 text-xs font-mono font-medium rounded-md border border-slate-700 bg-slate-950 hover:bg-slate-800 text-slate-300 transition-colors"
            >
              Reset |0⟩
            </button>
            <button
              onClick={() => applyGate("FLIP_1")}
              className="flex-1 py-1.5 text-xs font-mono font-medium rounded-md border border-slate-700 bg-slate-950 hover:bg-slate-800 text-slate-300 transition-colors"
            >
              Set |1⟩
            </button>
            <button
              onClick={() => applyGate("PLUS")}
              className="flex-1 py-1.5 text-xs font-mono font-medium rounded-md border border-cyan-800/60 bg-cyan-950/30 hover:bg-cyan-900/50 text-cyan-300 transition-colors"
            >
              Set |+⟩
            </button>
          </div>
        </div>

        {/* Continuous Angles Sliders (Theta & Phi) */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sliders className="size-3.5 text-sky-400" />
            Spherical Angles (θ, φ)
          </h4>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Polar Angle (θ):</span>
              <span className="text-cyan-400">{((theta * 180) / Math.PI).toFixed(1)}° ({(theta).toFixed(2)} rad)</span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.PI}
              step="0.01"
              value={theta}
              onChange={(e) => {
                setTheta(parseFloat(e.target.value));
                setHistory(prev => [...prev.slice(-6), "Adjust θ"]);
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Azimuthal Angle (φ):</span>
              <span className="text-purple-400">{((phi * 180) / Math.PI).toFixed(1)}° ({(phi).toFixed(2)} rad)</span>
            </div>
            <input
              type="range"
              min="0"
              max={2 * Math.PI}
              step="0.01"
              value={phi}
              onChange={(e) => {
                setPhi(parseFloat(e.target.value));
                setHistory(prev => [...prev.slice(-6), "Adjust φ"]);
              }}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Statevector Dirac Representation & Qiskit Code Export */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quantum State Vector</span>
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 hover:bg-cyan-900/80 transition-colors"
            >
              {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
              {copied ? "Copied Qiskit!" : "Export Qiskit Code"}
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-xs text-amber-300 border border-slate-800/80 break-all leading-relaxed">
            |ψ⟩ = {alphaReal.toFixed(3)}|0⟩ + {betaMag > 0.001 ? `(${betaReal.toFixed(3)}${betaImag >= 0 ? "+" : ""}${betaImag.toFixed(3)}i)|1⟩` : "0.000|1⟩"}
          </div>

          <div className="flex flex-wrap gap-1 items-center pt-1 text-[10px] font-mono text-slate-400">
            <span className="text-slate-500">History:</span>
            {history.map((h, idx) => (
              <span key={idx} className="bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-300 border border-slate-700/50">
                {h}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
