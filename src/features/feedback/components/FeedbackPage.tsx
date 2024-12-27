import React, { useState } from 'react';
import { FeedbackStats } from './FeedbackStats';
import { FeedbackFilters } from './FeedbackFilters';
import { FeedbackTable } from './FeedbackTable';
import { useFeedbackList } from '../hooks/useFeedbackList';
import { useFeedbackStatus } from '../hooks/useFeedbackStatus';
import type { FeedbackFilters as Filters } from '../types';
import type { FeedbackStatus } from '@/types/database';

export const FeedbackPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({});
  const { feedback, isLoading } = useFeedbackList(filters);
  const { updateStatus, isUpdating } = useFeedbackStatus();

  const handleStatusChange = async (id: string, status: FeedbackStatus) => {
    try {
      await updateStatus(id, status);
    } catch (error) {
      // Error is already logged in the hook
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-gray-900">Feedback</h1>
        <p className="mt-1 text-sm text-neutral-gray-600">
          Track and manage feedback across all your charters.
        </p>
      </div>

      <FeedbackStats />
      
      <div className="space-y-4">
        <FeedbackFilters
          filters={filters}
          onFiltersChange={setFilters}
        />
        <FeedbackTable
          feedback={feedback}
          isLoading={isLoading || isUpdating}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};