import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  html?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, className, html = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-flex" 
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={cn(
          'absolute z-10 px-3 py-2 text-xs text-white bg-neutral-gray-900 rounded',
          'transform -translate-x-1/2 whitespace-pre-line',
          'bottom-full left-1/2 mb-1 min-w-[200px]',
          className
        )}>
          {html ? (
            <div dangerouslySetInnerHTML={{ __html: content as string }} />
          ) : (
            content
          )}
          <div className="absolute w-2 h-2 bg-neutral-gray-900 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
};