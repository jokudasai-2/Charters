import React from 'react';
import { Users, UserCircle, Shield } from 'lucide-react';
import { useStakeholderStats } from '../hooks/useStakeholderStats';

export const StakeholderStats: React.FC = () => {
  const { stats, isLoading } = useStakeholderStats();

  const statCards = [
    { label: 'Total Stakeholders', value: stats.total, icon: Users },
    { label: 'Contributors', value: stats.contributors, icon: UserCircle },
    { label: 'Leadership', value: stats.leadership, icon: Shield },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {statCards.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4"
        >
          <div className="p-2 rounded-lg text-primary-teal-500">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-gray-600">{label}</p>
            <p className="text-2xl font-semibold text-neutral-gray-900">
              {isLoading ? '-' : value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};