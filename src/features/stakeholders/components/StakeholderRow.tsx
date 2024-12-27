import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Stakeholder } from '@/types/database';

interface StakeholderRowProps {
  stakeholder: Stakeholder;
  onRemove: () => void;
}

export const StakeholderRow: React.FC<StakeholderRowProps> = ({ stakeholder, onRemove }) => {
  const roleLabels = {
    owner: 'Owner',
    contributor: 'Contributor',
    leadership: 'Leadership',
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-md border border-neutral-gray-200">
      <div>
        <p className="text-sm font-medium text-neutral-gray-900">{stakeholder.email}</p>
        <p className="text-xs text-neutral-gray-500">{roleLabels[stakeholder.role]}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="text-neutral-gray-400 hover:text-secondary-red"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};