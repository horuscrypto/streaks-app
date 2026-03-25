import React from 'react';
import { cn } from './Button'; // reuse cn utility

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevated = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-4 transition-colors",
          elevated ? "bg-surface-container-high shadow-ambient" : "bg-surface-container",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
