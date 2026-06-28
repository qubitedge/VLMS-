import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export function HeroAnimation() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch('/abce4030-1164-11ee-81b5-f75eb99f4f55.json')
      .then(res => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, []);

  if (!animationData) {
    return (
      <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
        <div className="w-64 h-64 bg-cyan/10 rounded-full animate-pulse blur-3xl" />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto perspective-1000">
      <Lottie 
        animationData={animationData} 
        loop={true} 
        className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(0,255,255,0.2)] hover:scale-105 transition-transform duration-700" 
      />
    </div>
  );
}
