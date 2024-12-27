import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface CharterFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: 'title' | 'steward' | 'date';
  onSortChange: (value: 'title' | 'steward' | 'date') => void;
  sortDirection: 'asc' | 'desc';
  onSortDirectionChange: (direction: 'asc' | 'desc') => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export const CharterFilters: React.FC<CharterFiltersProps> = ({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  sortDirection,
  onSortDirectionChange,
  statusFilter,
  onStatusChange,
}) => {
  const toggleSortDirection = () => {
    onSortDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-gray-400" />
          <Input
            type="search"
            placeholder="Search charters..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSortDirection}
            className={`text-neutral-gray-600 hover:text-neutral-gray-900 ${
              sortDirection === 'desc' ? 'rotate-180' : ''
            } transition-transform`}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'title' | 'steward' | 'date')}
            className="flex-1 h-10 px-3 py-2 text-base rounded border border-neutral-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-500"
          >
            <option value="title">Sort by Title</option>
            <option value="steward">Sort by Steward</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-10 px-3 py-2 text-base rounded border border-neutral-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-500"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="pending_review">In Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">No-Go</option>
        </select>
      </div>
    </div>
  );
};