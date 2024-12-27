import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, Crown, UserCircle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { Tooltip } from '@/components/ui/Tooltip';
import { StakeholderTooltip } from '@/features/stakeholders/components/StakeholderTooltip';
import { FeedbackTooltip } from '@/features/feedback/components/FeedbackTooltip';
import { EmptyState } from './EmptyState';
import type { CharterSummary } from '../types';

interface CharterListProps {
  charters: CharterSummary[];
  isLoading: boolean;
  type: 'owned' | 'involved';
}

export const CharterList: React.FC<CharterListProps> = ({ charters, isLoading, type }) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading charters...</div>;
  }

  if (charters.length === 0) {
    return <EmptyState type={type} />;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-neutral-gray-200">
      {charters.map((charter) => (
        <Link
          key={charter.id}
          to={`/charters/${charter.id}`}
          className="block p-6 hover:bg-neutral-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold font-inter text-neutral-gray-900">
              {charter.title}
            </h3>
            <StatusBadge status={charter.status} />
          </div>
          
          <p className="mt-2 text-sm text-neutral-gray-600">
            {charter.description || 'No description provided'}
          </p>
          
          <div className="mt-4 flex items-center space-x-6 text-sm text-neutral-gray-500">
            <span>Created {new Date(charter.created_at).toLocaleDateString()}</span>
            
            <Tooltip 
              content={
                charter.stakeholders.length === 0 ? (
                  <StakeholderTooltip noStakeholdersMessage />
                ) : (
                  <div className="space-y-4">
                    {charter.stakeholders.map((stakeholder) => (
                      <StakeholderTooltip key={stakeholder.id} stakeholder={stakeholder} />
                    ))}
                  </div>
                )
              }
            >
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {charter.stakeholderCount}
              </span>
            </Tooltip>
            
            <Tooltip content={<FeedbackTooltip feedback={charter.feedback} />}>
              <span className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                {charter.feedbackCount}
              </span>
            </Tooltip>
          </div>
        </Link>
      ))}
    </div>
  );
};