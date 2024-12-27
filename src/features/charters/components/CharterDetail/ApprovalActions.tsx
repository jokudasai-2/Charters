import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useApprovalActions } from '../../hooks/useApprovalActions';
import type { Document } from '@/types/database';

interface ApprovalActionsProps {
  charter: Document;
  isStakeholder: boolean;
}

export const ApprovalActions: React.FC<ApprovalActionsProps> = ({ charter, isStakeholder }) => {
  const { handleApprove, handleReject, isLoading, error, hasApproved } = useApprovalActions(charter.id);

  // Only show for stakeholders on pending review documents
  if (!isStakeholder || charter.status !== 'pending_review') {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        <Button
          onClick={handleApprove}
          disabled={isLoading || hasApproved}
          className={`flex items-center space-x-2 ${
            hasApproved 
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          <CheckCircle className="h-4 w-4" />
          <span>{hasApproved ? 'Approved' : 'Approve'}</span>
        </Button>
        
        {!hasApproved && (
          <Button
            onClick={handleReject}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600"
          >
            <XCircle className="h-4 w-4" />
            <span>Reject</span>
          </Button>
        )}
      </div>

      {error && (
        <p className="text-sm text-secondary-red">{error}</p>
      )}
    </div>
  );
};