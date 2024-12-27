import React from 'react';
import { Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typeConfig } from '../config/feedbackConfig';
import type { FeedbackWithProfile } from '../types';

interface FeedbackBadgesProps {
  feedback: FeedbackWithProfile;
}

export const FeedbackBadges: React.FC<FeedbackBadgesProps> = ({ feedback }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', typeConfig[feedback.type].color)}>
          {typeConfig[feedback.type].label}
        </span>
        {feedback.conviction === 'high' && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 flex items-center">
            <Megaphone className="h-3 w-3 mr-1" />
            High Conviction
          </span>
        )}
      </div>
      {feedback.section && (
        <div className="text-xs text-neutral-gray-500">
          Section: <span className="text-neutral-gray-700">{feedback.section}</span>
        </div>
      )}
    </div>
  );
};