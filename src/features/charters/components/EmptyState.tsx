import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, UserCircle, PlusCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FeedbackGuide } from '@/features/feedback/components/FeedbackGuide';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

interface EmptyStateProps {
  type: 'owned' | 'involved';
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const [showGuide, setShowGuide] = useLocalStorage('showFeedbackGuide', true);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex justify-center mb-4">
          {type === 'owned' ? (
            <Crown className="h-12 w-12 text-primary-ocean-300" />
          ) : (
            <UserCircle className="h-12 w-12 text-primary-ocean-300" />
          )}
        </div>
        <h3 className="text-lg font-medium text-neutral-gray-900 mb-2">
          {type === 'owned' 
            ? 'Create Your First Charter' 
            : 'No Assigned Charters Yet'}
        </h3>
        <p className="text-neutral-gray-600 mb-6">
          {type === 'owned' 
            ? 'Start by creating a charter to align stakeholders and gather feedback'
            : 'You\'ll see charters here when you\'re added as a stakeholder'}
        </p>
        {type === 'owned' && (
          <Link to="/create">
            <Button className="flex items-center space-x-2">
              <PlusCircle className="h-5 w-5" />
              <span>Create Charter</span>
            </Button>
          </Link>
        )}
      </div>

      {type === 'owned' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-neutral-gray-900">
              Understanding Feedback
            </h3>
            {!showGuide && (
              <button
                onClick={() => setShowGuide(true)}
                className="flex items-center space-x-2 text-sm text-primary-ocean-500 hover:text-primary-ocean-600"
              >
                <Info className="h-4 w-4" />
                <span>Show guide</span>
              </button>
            )}
          </div>

          {showGuide && (
            <>
              <FeedbackGuide />
              <button
                onClick={() => setShowGuide(false)}
                className="text-sm text-primary-ocean-500 hover:text-primary-ocean-600 mt-4"
              >
                Hide guide
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};