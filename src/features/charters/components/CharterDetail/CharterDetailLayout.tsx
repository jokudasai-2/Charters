import React from 'react';
import { CharterHeader } from './CharterHeader';
import { CharterContent } from './CharterContent';
import { CharterGuide } from './CharterGuide';
import { StakeholderList } from '@/features/stakeholders/components/StakeholderList';
import { FeedbackList } from '@/features/feedback/components/FeedbackList';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { Document } from '@/types/database';

interface CharterDetailLayoutProps {
  charter: Document;
  onAddStakeholder: () => void;
  onAddFeedback: () => void;
}

export const CharterDetailLayout: React.FC<CharterDetailLayoutProps> = ({ 
  charter,
  onAddStakeholder,
  onAddFeedback
}) => {
  const { user } = useAuth();
  const isOwner = user?.id === charter.user_id;

  return (
    <div className="space-y-8">
      <CharterHeader charter={charter} isOwner={isOwner} />
      
      {isOwner && <CharterGuide />}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CharterContent charter={charter} isOwner={isOwner} />
        </div>
        
        <div className="space-y-8">
          <StakeholderList
            documentId={charter.id}
            onAddStakeholder={onAddStakeholder}
          />
          <FeedbackList
            documentId={charter.id}
            onAddFeedback={onAddFeedback}
          />
        </div>
      </div>
    </div>
  );
};