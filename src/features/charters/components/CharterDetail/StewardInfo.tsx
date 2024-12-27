import React, { memo } from 'react';
import { User } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

interface StewardInfoProps {
  userId: string;
  isOwner: boolean;
}

export const StewardInfo: React.FC<StewardInfoProps> = memo(({ userId, isOwner }) => {
  const { profile, isLoading } = useProfile(userId);

  if (isLoading) {
    return (
      <div className="flex items-center text-sm text-neutral-gray-600 animate-pulse">
        <User className="h-4 w-4 mr-1 opacity-50" />
        <div className="h-4 w-24 bg-neutral-gray-200 rounded" />
      </div>
    );
  }

  if (isOwner) {
    return (
      <div className="flex items-center text-sm text-neutral-gray-600">
        <User className="h-4 w-4 mr-1" />
        <span>Stewarded by <span className="font-medium">me</span></span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-sm text-neutral-gray-600">
      <User className="h-4 w-4 mr-1" />
      <span>
        Stewarded by{' '}
        <span className="font-medium">
          {profile ? `${profile.first_name} ${profile.last_name}` : 'Unknown user'}
        </span>
      </span>
    </div>
  );
});

StewardInfo.displayName = 'StewardInfo';