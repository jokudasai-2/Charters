import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../StatusBadge';
import { ApprovalActions } from './ApprovalActions';
import { StewardInfo } from './StewardInfo';
import type { Document } from '@/types/database';
import { useIsStakeholder } from '../../hooks/useIsStakeholder';

interface CharterHeaderProps {
  charter: Document;
  isOwner: boolean;
}

export const CharterHeader: React.FC<CharterHeaderProps> = ({ charter, isOwner }) => {
  const { isStakeholder } = useIsStakeholder(charter.id);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-4">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-neutral-gray-600 hover:text-neutral-gray-900"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Charters
      </Link>
      
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-gray-900">{charter.title}</h1>
          <div className="mt-2 space-y-1">
            <StewardInfo userId={charter.user_id} isOwner={isOwner} />
            <div className="flex items-center space-x-4 text-sm text-neutral-gray-600">
              <div className="flex items-center">
                Created {formatDate(charter.created_at)}
              </div>
              {charter.updated_at !== charter.created_at && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Last updated {formatDate(charter.updated_at)}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <StatusBadge status={charter.status} />
          {!isOwner && <ApprovalActions charter={charter} isStakeholder={isStakeholder} />}
        </div>
      </div>
    </div>
  );
};