import React, { useState } from 'react';
import { Users, Star, Target } from 'lucide-react';
import { StakeholderRow } from './StakeholderRow';
import { DEPARTMENTS } from '../../constants';
import type { StakeholderRole } from '@/types/database';

interface Stakeholder {
  department: string;
  email: string;
  role: StakeholderRole;
}

interface StakeholderSelectionProps {
  onChange: (stakeholders: Stakeholder[]) => void;
}

export const StakeholderSelection: React.FC<StakeholderSelectionProps> = ({ onChange }) => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(
    DEPARTMENTS.map(department => ({
      department,
      email: '',
      role: 'contributor',
    }))
  );

  const handleEmailChange = (index: number, email: string) => {
    const newStakeholders = [...stakeholders];
    newStakeholders[index] = { ...newStakeholders[index], email };
    setStakeholders(newStakeholders);
    onChange(newStakeholders.filter(s => s.email.trim()));
  };

  const handleRoleSelect = (index: number, role: StakeholderRole) => {
    const newStakeholders = [...stakeholders];
    newStakeholders[index] = { ...newStakeholders[index], role };
    setStakeholders(newStakeholders);
    onChange(newStakeholders.filter(s => s.email.trim()));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-neutral-gray-700" />
            <h2 className="text-xl font-semibold text-neutral-gray-900">Key Stakeholders</h2>
          </div>
          <div className="flex items-center space-x-4 text-sm text-neutral-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-primary-teal-500" />
              <span>Contributor</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4 text-primary-teal-500" />
              <span>Leadership</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-neutral-gray-600">
          Select who will make up your Stakeholder group. The more departments you involve the richer your work will be.
        </p>
      </div>
      
      <div className="space-y-4">
        {stakeholders.map((stakeholder, index) => (
          <StakeholderRow
            key={stakeholder.department}
            department={stakeholder.department}
            email={stakeholder.email}
            role={stakeholder.role}
            onEmailChange={(email) => handleEmailChange(index, email)}
            onRoleSelect={(role) => handleRoleSelect(index, role)}
          />
        ))}
      </div>
    </div>
  );
};