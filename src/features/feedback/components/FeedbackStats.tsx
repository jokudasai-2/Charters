import React from 'react';
import { MessageSquare, Clock, CheckCircle2, CheckCheck } from 'lucide-react';
import { useFeedbackStats } from '../hooks/useFeedbackStats';

export const FeedbackStats: React.FC = () => {
  const { stats, isLoading } = useFeedbackStats();

  const statCards = [
    { 
      label: 'Total Feedback', 
      value: stats.total, 
      icon: MessageSquare,
      color: 'text-neutral-gray-600'
    },
    { 
      label: 'Pending', 
      value: stats.pending, 
      icon: Clock,
      color: 'text-yellow-600'
    },
    { 
      label: 'Heard', 
      value: stats.heard, 
      icon: CheckCircle2,
      color: 'text-blue-600'
    },
    { 
      label: 'Actioned', 
      value: stats.actioned, 
      icon: CheckCheck,
      color: 'text-green-600'
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4"
        >
          <div className={`p-2 rounded-lg ${color}`}>
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