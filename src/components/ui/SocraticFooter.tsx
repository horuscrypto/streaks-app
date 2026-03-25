import { useState, useEffect } from 'react';
import { TIPS } from '../../data/socraticTips';
import { cn } from './Button';

export function SocraticFooter() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * TIPS.length));
  const [isFading, setIsFading] = useState(false);

  const rotate = () => {
    setIsFading(true);
    setTimeout(() => {
      setIndex(Math.floor(Math.random() * TIPS.length));
      setIsFading(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(rotate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      onClick={rotate}
      className="cursor-pointer mt-12 mb-8 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 max-w-lg mx-auto w-full text-center group hover:bg-surface-container hover:border-outline-variant/50 transition-all active:scale-[0.98]"
    >
      <p className="text-on-surface-variant uppercase tracking-[0.2em] text-[10px] font-bold mb-3 font-sans opacity-70">Socratic Mind</p>
      <p className={cn(
        "font-display text-lg sm:text-xl text-primary transition-opacity duration-300 mx-auto max-w-[90%]",
        isFading ? "opacity-0 scale-95" : "opacity-100 scale-100"
      )}>
        "{TIPS[index]}"
      </p>
    </div>
  );
}
