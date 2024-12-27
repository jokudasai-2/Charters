import React from 'react';
import type { Stakeholder } from '@/types/database';

interface StakeholderTooltipProps {
  stakeholder?: Stakeholder;
  noStakeholdersMessage?: boolean;
}

export const StakeholderTooltip: React.FC<StakeholderTooltipProps> = ({ 
  stakeholder,
  noStakeholdersMessage 
}) => {
  if (noStakeholdersMessage) {
    return (
      <div className="text-white">
        No stakeholders yet
      </div>
    );
  }

  if (!stakeholder) return null;

  const roleDescriptions = {
    contributor: 'Domain expert providing expertise-based feedback and approval',
    leadership: 'Strategic guidance and organizational alignment'
  };

  const name = stakeholder.profiles?.first_name && stakeholder.profiles?.last_name
    ? `${stakeholder.profiles.first_name} ${stakeholder.profiles.last_name}`
    : stakeholder.email;

  return (
    <div className="space-y-2">
      <div className="text-white">{name}</div>
      <div className="text-white opacity-75">{stakeholder.department}</div>
      <div className="text-white opacity-75 text-sm">
        {roleDescriptions[stakeholder.role] || stakeholder.role}
      </div>
    </div>
  );
};