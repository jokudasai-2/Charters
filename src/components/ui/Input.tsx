import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  className,
  error,
  ...props
}) => {
  const baseStyles = `
    h-10 px-3 py-2 text-base
    rounded border border-neutral-gray-200
    bg-white
    focus:border-2 focus:border-primary-ocean-800 focus:outline-none focus:ring-2 focus:ring-primary-ocean-50
    disabled:bg-neutral-gray-50 disabled:border-neutral-gray-200 disabled:text-neutral-gray-500
    ${error ? 'border-secondary-red focus:ring-red-50' : ''}
  `;

  return (
    <input
      className={cn(baseStyles, className)}
      {...props}
    />
  );
};