import React, { useState } from 'react';
import { MessageSquare, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FeedbackItem } from './FeedbackItem';
import { FeedbackGuide } from './FeedbackGuide';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useFeedback } from '../hooks/useFeedback';

interface FeedbackListProps {
  documentId: string;
  onAddFeedback: () => void;
}

export const FeedbackList: React.FC<FeedbackListProps> = ({ 
  documentId, 
  onAddFeedback 
}) => {
  const { 
    feedback, 
    isLoading, 
    updateFeedbackStatus 
  } = useFeedback(documentId);
  const [showGuide, setShowGuide] = useLocalStorage('showFeedbackGuide', false);

  if (isLoading) {
    return <div className="text-center py-4">Loading feedback...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-medium text-neutral-gray-900 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Feedback
          </h3>
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center gap-1.5 text-sm text-primary-ocean-500 hover:text-primary-ocean-600"
          >
            <Info className="h-4 w-4" />
            <span>{showGuide ? 'Hide guide' : 'Show guide'}</span>
          </button>
        </div>
        <Button onClick={onAddFeedback} size="sm">
          Add
        </Button>
      </div>

      {showGuide && (
        <div className="mb-6">
          <FeedbackGuide />
        </div>
      )}

      <div className="space-y-4">
        {feedback.length === 0 ? (
          <p className="text-sm text-neutral-gray-500 italic">
            No feedback provided yet
          </p>
        ) : (
          feedback.map((item) => (
            <FeedbackItem
              key={item.id}
              feedback={item}
              onStatusChange={updateFeedbackStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};