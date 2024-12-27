import React from 'react';
import { StakeholderAvatar } from './StakeholderAvatar';
import type { Stakeholder } from '@/types/database';

interface StakeholderSectionProps {
  title: string;
  stakeholders: Stakeholder[];
  variant: 'leadership' | 'contributor' | 'steward';
  isCompact?: boolean;
}

export const StakeholderSection: React.FC<StakeholderSectionProps> = ({
  title,
  stakeholders,
  variant,
  isCompact = false
}) => {
  const colors = {
    leadership: 'bg-primary-ocean-500',
    contributor: 'bg-green-500',
    steward: 'bg-yellow-500'
  };

  const getFullName = (stakeholder: Stakeholder) => {
    if (stakeholder.profiles?.first_name && stakeholder.profiles?.last_name) {
      return `${stakeholder.profiles.first_name} ${stakeholder.profiles.last_name}`;
    }
    return stakeholder.email;
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-neutral-gray-900 mb-3">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {stakeholders.map((stakeholder) => (
          <div
            key={stakeholder.id}
            className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-neutral-gray-200"
          >
            <StakeholderAvatar
              email={stakeholder.email}
              name={getFullName(stakeholder)}
              color={colors[variant]}
              size={isCompact ? 'sm' : 'md'}
            />
            <div className="min-w-0">
              <p className="font-medium text-sm text-neutral-gray-900 truncate">
                {getFullName(stakeholder)}
              </p>
              <p className="text-xs text-neutral-gray-600 truncate">{stakeholder.department}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};