import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export function ErrorGraphic() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch('/No%20Internet/a9ceef08-9965-11ee-b026-63df4a08c9ac.json')
      .then(res => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, []);

  if (!animationData) {
    return <div className="w-72 h-72 mb-2 animate-pulse bg-secondary/50 rounded-full" />;
  }

  return (
    <Lottie 
      animationData={animationData} 
      loop={true} 
      className="w-72 h-auto mb-2 opacity-90" 
    />
  );
}
