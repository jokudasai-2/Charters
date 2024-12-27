import React from 'react';
import { cn } from '@/lib/utils';
import type { DocumentStatus } from '@/types/database';

interface StatusBadgeProps {
  status: DocumentStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const variants = {
    draft: 'bg-neutral-gray-100 text-neutral-gray-700',
    pending_review: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-secondary-green',
    rejected: 'bg-red-100 text-secondary-red',
  };

  const labels = {
    draft: 'Draft',
    pending_review: 'In Review',
    approved: 'Approved',
    rejected: 'No-Go',
  };

  return (
    <span className={cn(
      'px-2.5 py-0.5 rounded-full text-sm font-medium',
      variants[status],
      className
    )}>
      {labels[status]}
    </span>
  );
};