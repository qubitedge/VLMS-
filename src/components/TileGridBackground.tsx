import { useEffect, useRef } from "react";

export function TileGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    
    // Grid parameters
    const tileW = 160;
    const tileH = 96;
    const gap = 6;
    const radius = 8;
    const cellW = tileW + gap;
    const cellH = tileH + gap;
    const glowRadius = 320;
    const decay = 0.06;

    // Colors
    const baseColor = { r: 203, g: 213, b: 225, a: 0.45 };
    const glowColor = { r: 56, g: 189, b: 248, a: 1.0 }; // #38bdf8

    let cols = 0;
    let rows = 0;
    
    // State of each tile
    let tiles: { targetIntensity: number; currentIntensity: number; cx: number; cy: number }[][] = [];

    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseActive = false;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      cols = Math.ceil(width / cellW);
      rows = Math.ceil(height / cellH);
      
      tiles = Array(cols).fill(0).map((_, i) => 
        Array(rows).fill(0).map((_, j) => ({
          targetIntensity: 0,
          currentIntensity: 0,
          cx: i * cellW + tileW / 2,
          cy: j * cellH + tileH / 2
        }))
      );
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Helper to draw a rounded rectangle path
    const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < cols; i++) {
        for (let j = rows - 1; j >= 0; j--) {
          const tile = tiles[i][j];
          
          if (isMouseActive) {
            const dx = tile.cx - mouseX;
            const dy = tile.cy - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < glowRadius) {
              tile.targetIntensity = Math.pow(1 - dist / glowRadius, 1.8);
            } else {
              tile.targetIntensity = 0;
            }
          } else {
            tile.targetIntensity = 0;
          }

          // Smooth interpolation towards target
          tile.currentIntensity += (tile.targetIntensity - tile.currentIntensity) * decay;
          
          // Compute current color
          const r = baseColor.r + (glowColor.r - baseColor.r) * tile.currentIntensity;
          const g = baseColor.g + (glowColor.g - baseColor.g) * tile.currentIntensity;
          const b = baseColor.b + (glowColor.b - baseColor.b) * tile.currentIntensity;
          const a = baseColor.a + (glowColor.a - baseColor.a) * tile.currentIntensity;

          ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(3)})`;
          
          const elevation = tile.currentIntensity * 8; // Max 8px elevation

          if (elevation > 0.1) {
            ctx.shadowColor = `rgba(148, 163, 184, ${tile.currentIntensity * 0.4})`; // Subtle slate shadow
            ctx.shadowBlur = elevation * 1.5;
            ctx.shadowOffsetY = elevation;
          } else {
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
          }
          
          drawRoundedRect(i * cellW, j * cellH - elevation, tileW, tileH, radius);
          ctx.fill();
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f4f8",
        pointerEvents: "none",
        zIndex: -1, // Keep strictly behind other elements
      }}
    />
  );
}
