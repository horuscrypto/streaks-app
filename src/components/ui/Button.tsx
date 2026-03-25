import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-sans font-bold transition-transform duration-100 ease-out active:scale-[0.96] rounded-full",
          {
            "bg-primary text-on-primary": variant === 'primary',
            "bg-surface-container-highest ghost-border text-on-surface": variant === 'secondary',
            "text-primary bg-transparent": variant === 'ghost',
            "px-4 py-2 text-sm": size === 'sm',
            "px-6 py-3 text-base": size === 'md',
            "px-8 py-4 text-lg": size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
