import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'font-medium transition-all duration-200 ease-in-out rounded';
  
  const variants = {
    primary: 'bg-primary-ocean-800 text-white hover:bg-primary-ocean-900 active:bg-primary-ocean-900 disabled:bg-primary-ocean-200 disabled:text-primary-ocean-400',
    secondary: 'bg-white text-primary-ocean-600 border border-primary-ocean-600 hover:bg-primary-ocean-50',
    ghost: 'bg-transparent text-primary-ocean-600 hover:bg-primary-ocean-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};