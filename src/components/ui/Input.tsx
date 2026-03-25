import React from 'react';
import { cn } from './Button';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-surface-container-lowest text-on-surface font-sans text-lg lg:text-xl py-3 px-1",
          "border-b border-outline-variant/20 outline-none transition-colors",
          "focus:border-primary focus:border-b-2 placeholder:text-on-surface-variant",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
