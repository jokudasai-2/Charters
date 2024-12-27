import React from 'react';
import { Info } from 'lucide-react';

interface StakeholderGuideToggleProps {
  onShow: () => void;
}

export const StakeholderGuideToggle: React.FC<StakeholderGuideToggleProps> = ({ onShow }) => {
  return (
    <button
      type="button"
      onClick={onShow}
      className="flex items-center space-x-2 text-sm text-primary-ocean-500 hover:text-primary-ocean-600"
    >
      <Info className="h-4 w-4" />
      <span>Show stakeholder guide</span>
    </button>
  );
};