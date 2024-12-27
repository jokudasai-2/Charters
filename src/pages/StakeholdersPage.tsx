import React, { useState } from 'react';
import { StakeholderStats } from '@/features/stakeholders/components/StakeholderStats';
import { StakeholderFilters } from '@/features/stakeholders/components/StakeholderFilters';
import { StakeholderTable } from '@/features/stakeholders/components/StakeholderTable';
import { useStakeholderList } from '@/features/stakeholders/hooks/useStakeholderList';
import type { StakeholderFilters as Filters } from '@/features/stakeholders/types';

export const StakeholdersPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({});
  const { stakeholders, isLoading } = useStakeholderList(filters);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-gray-900">Stakeholders</h1>
        <p className="mt-1 text-sm text-neutral-gray-600">
          Manage and track all stakeholders across your charters.
        </p>
      </div>

      <StakeholderStats />
      
      <div className="space-y-4">
        <StakeholderFilters
          filters={filters}
          onFiltersChange={setFilters}
        />
        <StakeholderTable
          stakeholders={stakeholders}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};