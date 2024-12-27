import React from 'react';
import { Clock, CheckCircle2, CheckCheck } from 'lucide-react';
import type { Feedback } from '@/types/database';

interface FeedbackTooltipProps {
  feedback: Feedback[];
}

export const FeedbackTooltip: React.FC<FeedbackTooltipProps> = ({ feedback }) => {
  if (!feedback?.length) {
    return (
      <div className="text-white">
        No feedback yet
      </div>
    );
  }

  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100'
    },
    heard: {
      icon: CheckCircle2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    actioned: {
      icon: CheckCheck,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    }
  };

  const statusCounts = feedback.reduce((acc, f) => {
    if (!f?.status) return acc;
    acc[f.status] = (acc[f.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-2">
      {Object.entries(statusCounts).map(([status, count]) => {
        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config.icon;
        
        return (
          <div key={status} className="flex items-center text-white">
            <div className={`p-1 rounded-full ${config.bgColor} mr-2`}>
              <Icon className={`h-3 w-3 ${config.color}`} />
            </div>
            <span className="mr-2">{count}</span>
            <span className="capitalize">{status}</span>
          </div>
        );
      })}
    </div>
  );
};