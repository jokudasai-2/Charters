import React from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StakeholderRow } from './StakeholderRow';
import { useStakeholders } from '../hooks/useStakeholders';

interface StakeholderListProps {
  documentId: string;
  onAddStakeholder: () => void;
}

export const StakeholderList: React.FC<StakeholderListProps> = ({ documentId, onAddStakeholder }) => {
  const { stakeholders, isLoading, removeStakeholder } = useStakeholders(documentId);

  if (isLoading) {
    return <div className="text-center py-4">Loading stakeholders...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-neutral-gray-900 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Stakeholders
        </h3>
        <Button onClick={onAddStakeholder} size="sm">
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {stakeholders.length === 0 ? (
          <p className="text-sm text-neutral-gray-500 italic">
            No stakeholders added yet
          </p>
        ) : (
          stakeholders.map((stakeholder) => (
            <StakeholderRow
              key={stakeholder.id}
              stakeholder={stakeholder}
              onRemove={() => removeStakeholder(stakeholder.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}