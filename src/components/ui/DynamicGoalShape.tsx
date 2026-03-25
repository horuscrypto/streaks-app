import { cn } from './Button';

interface Props {
  target: number | null;
  progress: number;
  className?: string;
}

export function DynamicGoalShape({ target, progress, className }: Props) {
  if (!target || target <= 1) {
    return (
      <svg viewBox="0 0 100 100" className={cn("w-full h-full", className)}>
        <circle cx="50" cy="50" r="40" fill={progress >= 1 ? "#FFFFFF" : "#1a1c1c"} stroke={progress >= 1 ? "#FFFFFF" : "#333333"} strokeWidth="2" className="transition-colors duration-500" />
      </svg>
    );
  }

  // Base 5 segments
  const totalSegments = Math.ceil(target / 5);
  
  const segments = Array.from({ length: totalSegments }).map((_, i) => {
    const isFilled = progress >= Math.min((i + 1) * 5, target);
    return isFilled;
  });

  const maxRadius = Math.max(2, Math.min(8, (Math.PI * 35) / totalSegments - 1));

  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full", className)}>
      <g transform="translate(50, 50)">
        {segments.map((isFilled, i) => {
          const angle = (i * 360) / totalSegments;
          return (
            <g key={i} transform={`rotate(${angle})`}>
              <circle
                cx="0"
                cy="-35"
                r={maxRadius}
                fill={isFilled ? "#FFFFFF" : "#1a1c1c"} 
                stroke={isFilled ? "#FFFFFF" : "#333333"} 
                strokeWidth="1.5"
                className="transition-colors duration-500"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
