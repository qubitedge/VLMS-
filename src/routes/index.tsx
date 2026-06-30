import { createFileRoute, useNavigate } from "@tanstack/react-router";
import footerImg from "../footer (2).jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JNTUGV • Virtual Labs Portal" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const navigate = useNavigate();

  const handleEnterDashboard = () => {
      navigate({ to: "/dashboard" });
  };

  const handleLabClick = (labName: string) => {
      alert(`Loading ${labName} Node...`);
  };

  return (
    <div className="w-full min-h-screen bg-[#010a10] flex flex-col overflow-x-hidden">
      
      {/* 
        Responsive Container (Stretch to Fill)
        This stretches the video to perfectly fill the screen without cropping.
        All hotspot percentages will stretch proportionally!
      */}
      <div className="relative w-screen h-screen">
        
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-fill z-0 pointer-events-none"
        >
          <source src="/landingpage.mp4" type="video/mp4" />
        </video>

        {/* 
          Interactive Hotspots 
        */}

        {/* Activate Platform (Robot Area) */}
        <button 
          onClick={handleEnterDashboard}
          className="absolute top-[55%] left-[62%] w-[12%] h-[30%] rounded-full cursor-pointer hover:bg-cyan-500/20 hover:shadow-[0_0_50px_rgba(0,240,255,0.4)] transition-all duration-300 z-10"
          title="Activate Platform"
          aria-label="Activate Platform"
        />

        {/* Center Cube Area */}
        <button 
          onClick={handleEnterDashboard}
          className="absolute top-[25%] left-[32%] w-[25%] h-[55%] rounded-full cursor-pointer hover:bg-cyan-500/10 hover:shadow-[0_0_50px_rgba(0,240,255,0.2)] transition-all duration-300 z-10"
          title="Enter Core"
          aria-label="Enter Core"
        />

        {/* Launch Portal Button (Bottom Center) */}
        <button 
          onClick={handleEnterDashboard}
          className="absolute top-[85%] left-[42%] w-[16%] h-[8%] rounded-full cursor-pointer hover:bg-cyan-500/30 hover:shadow-[0_0_50px_rgba(0,240,255,0.6)] transition-all duration-300 z-10"
          title="Launch Portal"
          aria-label="Launch Portal"
        />

        {/* Engineering Physics Lab Globe (Top Right) */}
        <button 
          onClick={() => handleLabClick('Engineering Physics')}
          className="absolute top-[10%] right-[10%] w-[15%] h-[28%] rounded-full cursor-pointer hover:bg-cyan-500/20 hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-300 z-10"
          title="Engineering Physics Lab"
          aria-label="Engineering Physics Lab"
        />

        {/* Analog Electronics Lab Globe (Middle Right) */}
        <button 
          onClick={() => handleLabClick('Analog Electronics')}
          className="absolute top-[38%] right-[2%] w-[15%] h-[28%] rounded-full cursor-pointer hover:bg-cyan-500/20 hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-300 z-10"
          title="Analog Electronics Lab"
          aria-label="Analog Electronics Lab"
        />

        {/* Advanced Python Lab Globe (Bottom Right) */}
        <button 
          onClick={() => handleLabClick('Advanced Python')}
          className="absolute top-[68%] right-[12%] w-[15%] h-[28%] rounded-full cursor-pointer hover:bg-cyan-500/20 hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-300 z-10"
          title="Advanced Python Lab"
          aria-label="Advanced Python Lab"
        />

      </div>

      {/* Footer Section */}
      <div className="w-full bg-[#010a10] shrink-0 flex justify-center">
        <img 
          src={footerImg} 
          alt="Virtual Labs Footer" 
          className="w-full max-w-[1920px] h-auto object-contain drop-shadow-2xl" 
          style={{ 
            imageRendering: "crisp-edges", 
            transform: "translateZ(0)",
            backfaceVisibility: "hidden"
          }} 
        />
      </div>
    </div>
  );
}
