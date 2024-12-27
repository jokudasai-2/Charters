import React from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-gray-700 mb-1">
        {label}
      </label>
      <textarea
        className={cn(
          'w-full px-3 py-2 rounded-md border',
          'focus:outline-none focus:ring-2 focus:ring-primary-teal-500',
          error ? 'border-secondary-red' : 'border-neutral-gray-300',
          className
        )}
        rows={4}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-secondary-red">{error}</p>
      )}
    </div>
  );
};