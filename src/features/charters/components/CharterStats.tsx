import React from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CharterStats } from '../types';

interface StatsCardProps {
  stats: CharterStats;
  isLoading: boolean;
}

export const CharterStats: React.FC<StatsCardProps> = ({ stats, isLoading }) => {
  const statCards = [
    { label: 'Draft', value: stats.draft, icon: FileText, color: 'text-neutral-gray-600' },
    { label: 'In Review', value: stats.pending_review, icon: Clock, color: 'text-secondary-yellow' },
    { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'text-secondary-green' },
    { label: 'No-Go', value: stats.rejected, icon: XCircle, color: 'text-secondary-red' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4"
        >
          <div className={cn('p-2 rounded-lg', color)}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-gray-600">{label}</p>
            <p className="text-2xl font-semibold text-neutral-gray-900">
              {isLoading ? '-' : value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};