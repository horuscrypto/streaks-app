import type { HabitShape } from '../../db/db';

interface Props {
  shape: HabitShape | undefined;
  className?: string;
  isActive: boolean;
}

export function FlatIllustration({ shape, className = "", isActive }: Props) {
  const fill = isActive ? "#FFFFFF" : "#1a1c1c";
  const stroke = isActive ? "#FFFFFF" : "#333333";
  
  return (
    <svg viewBox="0 0 100 100" className={className} stroke={stroke} strokeWidth="2">
      {(!shape || shape === 'sphere') && (
        <circle cx="50" cy="50" r="40" fill={fill} />
      )}
      {shape === 'block' && (
        <g fill={fill}>
           {/* Isometric cube */}
           <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" />
           <line x1="20" y1="35" x2="50" y2="50" />
           <line x1="80" y1="35" x2="50" y2="50" />
           <line x1="50" y1="80" x2="50" y2="50" />
        </g>
      )}
      {shape === 'icosahedron' && (
        <g fill={fill}>
          <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
          <line x1="50" y1="10" x2="50" y2="50" />
          <line x1="90" y1="30" x2="50" y2="50" />
          <line x1="90" y1="70" x2="50" y2="50" />
          <line x1="50" y1="90" x2="50" y2="50" />
          <line x1="10" y1="70" x2="50" y2="50" />
          <line x1="10" y1="30" x2="50" y2="50" />
        </g>
      )}
      {shape === 'flower' && (
        <g strokeWidth="2">
           <circle cx="35" cy="35" r="20" fill="none" stroke={stroke} />
           <circle cx="65" cy="35" r="20" fill="none" stroke={stroke} />
           <circle cx="35" cy="65" r="20" fill="none" stroke={stroke} />
           <circle cx="65" cy="65" r="20" fill="none" stroke={stroke} />
           <circle cx="50" cy="50" r="10" fill={fill} stroke="none" />
        </g>
      )}
      {shape === 'pyramid' && (
        <polygon points="50,15 85,85 15,85" fill={fill} stroke={stroke} />
      )}
      {shape === 'cylinder' && (
        <g fill={fill} stroke={stroke}>
          <ellipse cx="50" cy="25" rx="25" ry="8" />
          <path d="M 25 25 L 25 75 A 25 8 0 0 0 75 75 L 75 25" />
        </g>
      )}
      {shape === 'cross' && (
        <polygon points="40,15 60,15 60,40 85,40 85,60 60,60 60,85 40,85 40,60 15,60 15,40 40,40" fill={fill} stroke={stroke} />
      )}
      {shape === 'star' && (
        <polygon points="50,15 61,35 85,35 66,54 74,80 50,65 26,80 34,54 15,35 39,35" fill={fill} stroke={stroke} />
      )}
      {shape === 'diamond' && (
        <polygon points="50,10 85,50 50,90 15,50" fill={fill} stroke={stroke} />
      )}
      {shape === 'rings' && (
        <g fill="none" strokeWidth="4">
          <circle cx="50" cy="50" r="35" stroke={stroke} />
          <circle cx="50" cy="50" r="20" stroke={stroke} />
          <circle cx="50" cy="50" r="5" fill={fill} />
        </g>
      )}
    </svg>
  );
}
