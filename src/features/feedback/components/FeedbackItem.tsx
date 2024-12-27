import React from 'react';
import { FeedbackBadges } from './FeedbackBadges';
import { FeedbackStatus } from './FeedbackStatus';
import type { FeedbackWithProfile } from '../types';
import type { FeedbackStatus as Status } from '@/types/database';

interface FeedbackItemProps {
  feedback: FeedbackWithProfile;
  onStatusChange: (id: string, status: Status) => Promise<boolean>;
}

export const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback, onStatusChange }) => {
  const formatTime = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-gray-200 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <FeedbackBadges feedback={feedback} />
        <FeedbackStatus 
          status={feedback.status} 
          onStatusChange={async (status) => onStatusChange(feedback.id, status)}
        />
      </div>

      <p className="text-sm text-neutral-gray-700">{feedback.content}</p>

      <div className="flex items-center justify-between text-xs text-neutral-gray-500">
        <div className="flex items-center space-x-1">
          <span>By</span>
          <span className="font-medium">
            {feedback.profiles 
              ? `${feedback.profiles.first_name} ${feedback.profiles.last_name}` 
              : 'Unknown User'
            }
          </span>
        </div>
        <span>{formatTime(feedback.created_at)}</span>
      </div>

      {feedback.resolution_notes && (
        <div className="text-sm text-neutral-gray-600 bg-neutral-gray-50 p-3 rounded">
          <strong>Resolution:</strong> {feedback.resolution_notes}
        </div>
      )}
    </div>
  );
};