import React from 'react';
import { cn } from '@/lib/utils';

interface TabProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count: number;
}

export const Tab: React.FC<TabProps> = ({ isActive, onClick, children, count }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group inline-flex items-center pb-4 border-b-2 font-medium text-sm',
        isActive
          ? 'border-primary-ocean-700 text-primary-ocean-700'
          : 'border-transparent text-neutral-gray-500 hover:text-neutral-gray-700 hover:border-neutral-gray-300'
      )}
    >
      {children}
      <span
        className={cn(
          'ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium',
          isActive
            ? 'bg-primary-ocean-50 text-primary-ocean-700'
            : 'bg-neutral-gray-100 text-neutral-gray-600 group-hover:bg-neutral-gray-200'
        )}
      >
        {count}
      </span>
    </button>
  );
};