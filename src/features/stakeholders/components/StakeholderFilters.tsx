import React from 'react';
import { Input } from '@/components/ui/Input';
import type { StakeholderFilters } from '../types';

interface StakeholderFiltersProps {
  filters: StakeholderFilters;
  onFiltersChange: (filters: StakeholderFilters) => void;
}

export const StakeholderFilters: React.FC<StakeholderFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search stakeholders..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          />
        </div>
        <select
          value={filters.role || ''}
          onChange={(e) => onFiltersChange({ ...filters, role: e.target.value })}
          className="h-10 px-3 py-2 text-base rounded border border-neutral-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-500"
        >
          <option value="">All Roles</option>
          <option value="contributor">Contributors</option>
          <option value="leadership">Leadership</option>
        </select>
      </div>
    </div>
  );
};