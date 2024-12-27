import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ 
  title, 
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onOpenChange
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isOpen = controlledIsOpen ?? internalIsOpen;

  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setInternalIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  const handleToggle = () => {
    const newValue = !isOpen;
    setInternalIsOpen(newValue);
    onOpenChange?.(newValue);
  };

  return (
    <div className="border border-neutral-gray-200 rounded-lg">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-gray-50"
      >
        <span className="text-lg font-medium text-neutral-gray-900">{title}</span>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-neutral-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-neutral-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="border-t border-neutral-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};