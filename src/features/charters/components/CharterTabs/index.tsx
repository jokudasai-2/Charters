import React, { useState, useMemo } from 'react';
import { Tab } from './Tab';
import { CharterList } from '../CharterList';
import { CharterFilters } from '../CharterFilters';
import type { CharterSummary } from '../../types';

interface CharterTabsProps {
  charters: CharterSummary[];
  isLoading: boolean;
}

export const CharterTabs: React.FC<CharterTabsProps> = ({ charters, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'steward' | 'involved' | 'all'>('steward');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'steward' | 'date'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState('');
  
  const filteredCharters = useMemo(() => {
    let filtered = charters;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = charters.filter(charter => 
        activeTab === 'steward' ? charter.isOwner : !charter.isOwner
      );
    }

    // Apply search filter across all relevant fields
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((charter) => {
        // Search in charter title and description
        const titleMatch = charter.title.toLowerCase().includes(searchLower);
        const descriptionMatch = charter.description?.toLowerCase().includes(searchLower);

        // Search in stakeholder information
        const stakeholderMatch = charter.stakeholders.some((s) => {
          const emailMatch = s.email.toLowerCase().includes(searchLower);
          const departmentMatch = s.department.toLowerCase().includes(searchLower);
          const roleMatch = s.role.toLowerCase().includes(searchLower);
          const nameMatch = s.profiles && (
            `${s.profiles.first_name} ${s.profiles.last_name}`.toLowerCase().includes(searchLower)
          );
          return emailMatch || departmentMatch || roleMatch || nameMatch;
        });

        return titleMatch || descriptionMatch || stakeholderMatch;
      });
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(charter => charter.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'steward':
          const aName = a.profiles 
            ? `${a.profiles.first_name} ${a.profiles.last_name}`.trim()
            : '';
          const bName = b.profiles 
            ? `${b.profiles.first_name} ${b.profiles.last_name}`.trim()
            : '';
          comparison = aName.localeCompare(bName);
          break;
        case 'date':
          comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [charters, activeTab, search, sortBy, sortDirection, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="border-b border-neutral-gray-200">
        <div className="flex space-x-8">
          <Tab
            isActive={activeTab === 'steward'}
            onClick={() => setActiveTab('steward')}
            count={charters.filter(c => c.isOwner).length}
          >
            Charters You Steward
          </Tab>
          <Tab
            isActive={activeTab === 'involved'}
            onClick={() => setActiveTab('involved')}
            count={charters.filter(c => !c.isOwner).length}
          >
            Charters You're Involved In
          </Tab>
          <Tab
            isActive={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
            count={charters.length}
          >
            All Charters
          </Tab>
        </div>
      </div>

      <CharterFilters
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortDirection={sortDirection}
        onSortDirectionChange={setSortDirection}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <CharterList
        charters={filteredCharters}
        isLoading={isLoading}
        type={activeTab === 'steward' ? 'owned' : 'involved'}
      />
    </div>
  );
};