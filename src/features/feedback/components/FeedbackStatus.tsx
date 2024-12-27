import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { statusConfig } from '../config/feedbackConfig';
import type { FeedbackStatus as Status } from '@/types/database';

interface FeedbackStatusProps {
  status: Status;
  onStatusChange: (status: Status) => Promise<boolean>;
}

export const FeedbackStatus: React.FC<FeedbackStatusProps> = ({ status: initialStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<Status>(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const StatusIcon = statusConfig[currentStatus].icon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusClick = async (newStatus: Status) => {
    if (isUpdating || newStatus === currentStatus) {
      setIsOpen(false);
      return;
    }

    setIsUpdating(true);
    // Optimistically update the UI
    setCurrentStatus(newStatus);
    setIsOpen(false);

    try {
      const success = await onStatusChange(newStatus);
      if (!success) {
        // Revert on failure
        setCurrentStatus(initialStatus);
      }
    } catch (error) {
      // Revert on error
      setCurrentStatus(initialStatus);
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !isUpdating && setIsOpen(!isOpen)}
        className={cn(
          'flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors',
          statusConfig[currentStatus].color,
          'hover:opacity-90',
          isUpdating && 'opacity-50 cursor-not-allowed'
        )}
        disabled={isUpdating}
      >
        <StatusIcon className="h-3 w-3 mr-1" />
        <span>{currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-neutral-gray-200 py-1 z-10">
          {Object.entries(statusConfig).map(([value, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={value}
                onClick={() => handleStatusClick(value as Status)}
                className={cn(
                  'w-full flex items-center px-3 py-2 text-xs',
                  'hover:bg-neutral-gray-50 transition-colors',
                  value === currentStatus ? 'bg-neutral-gray-50' : ''
                )}
                disabled={isUpdating}
              >
                <Icon className="h-3 w-3 mr-2" />
                <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};