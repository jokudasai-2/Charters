import React from 'react';
import { Star, Target } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import type { StakeholderRole } from '@/types/database';

interface StakeholderRowProps {
  department: string;
  email: string;
  role: StakeholderRole;
  onEmailChange: (email: string) => void;
  onRoleSelect: (role: StakeholderRole) => void;
}

export const StakeholderRow: React.FC<StakeholderRowProps> = ({
  department,
  email,
  role,
  onEmailChange,
  onRoleSelect,
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-2">
        <span className="text-sm font-medium text-neutral-gray-600">{department}</span>
      </div>
      <div className="col-span-8">
        <Input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Enter stakeholder email"
          className="w-full"
        />
      </div>
      <div className="col-span-2 flex items-center justify-end space-x-2">
        <button
          type="button"
          onClick={() => onRoleSelect('contributor')}
          className={`p-2 rounded-full transition-colors ${
            role === 'contributor'
              ? 'bg-primary-teal-50 text-primary-teal-500'
              : 'text-neutral-gray-400 hover:bg-neutral-gray-50'
          }`}
        >
          <Star className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => onRoleSelect('leadership')}
          className={`p-2 rounded-full transition-colors ${
            role === 'leadership'
              ? 'bg-primary-teal-50 text-primary-teal-500'
              : 'text-neutral-gray-400 hover:bg-neutral-gray-50'
          }`}
        >
          <Target className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};