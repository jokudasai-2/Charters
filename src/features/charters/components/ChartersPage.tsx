import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CharterStats } from './CharterStats';
import { CharterTabs } from './CharterTabs';
import { ContextPanel } from './ChartersPage/ContextPanel';
import { useCharterData } from '../hooks/useCharterData';

export const ChartersPage: React.FC = () => {
  const { stats, charters, isLoadingStats, isLoadingCharters } = useCharterData();

  return (
    <div className="space-y-8">
      <ContextPanel />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-gray-900">Your Charters</h1>
          <p className="mt-1 text-sm text-neutral-gray-600">
            Manage and track all your charter documents in one place.
          </p>
        </div>
        <Link to="/create">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-5 w-5" />
            <span>New</span>
          </Button>
        </Link>
      </div>

      <CharterStats stats={stats} isLoading={isLoadingStats} />
      <CharterTabs charters={charters} isLoading={isLoadingCharters} />
    </div>
  );
}