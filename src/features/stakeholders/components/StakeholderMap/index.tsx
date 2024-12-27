import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { StakeholderSection } from './StakeholderSection';
import { UnassignedSection } from './UnassignedSection';
import { useProfile } from '@/features/charters/hooks/useProfile';
import type { Stakeholder } from '@/types/database';

interface StakeholderMapProps {
  title: string;
  charterId: string;
  stakeholders: Stakeholder[];
  ownerId: string;
  onAssign?: (department: string) => void;
}

export const StakeholderMap: React.FC<StakeholderMapProps> = ({
  title,
  charterId,
  stakeholders,
  ownerId,
  onAssign
}) => {
  const { profile: ownerProfile } = useProfile(ownerId);
  
  // Group stakeholders by role
  const leadership = stakeholders.filter(s => s.role === 'leadership');
  const contributors = stakeholders.filter(s => s.role === 'contributor');

  // Create steward from owner profile
  const steward = ownerProfile ? {
    id: ownerId,
    email: ownerProfile.email || '',
    role: 'owner' as const,
    department: stakeholders.find(s => s.email === ownerProfile.email)?.department || 'Engineering',
    profiles: ownerProfile
  } : null;

  // Get unique departments that don't have stakeholders
  const assignedDepartments = new Set(stakeholders.map(s => s.department));
  const unassignedDepartments = [
    'Sales',
    'Customer Success',
    'Onboarding',
    'HR Consulting',
    'Legal',
    'Marketing',
    'Design',
    'Engineering',
    'Product'
  ].filter(dept => !assignedDepartments.has(dept));

  return (
    <div className="p-6">
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-neutral-gray-900">{title}</h2>
            <Link 
              to={`/charters/${charterId}`}
              className="inline-flex items-center text-sm text-primary-ocean-600 hover:text-primary-ocean-700"
            >
              Go to charter
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <span className="text-neutral-gray-600">Steward</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2.5 w-2.5 rounded-full bg-primary-ocean-500" />
              <span className="text-neutral-gray-600">Leadership</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="text-neutral-gray-600">Contributor</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {steward && (
          <StakeholderSection
            title="Steward"
            stakeholders={[steward]}
            variant="steward"
            isCompact
          />
        )}

        {contributors.length > 0 && (
          <StakeholderSection
            title="Contributors"
            stakeholders={contributors}
            variant="contributor"
            isCompact
          />
        )}

        {leadership.length > 0 && (
          <StakeholderSection
            title="Leadership"
            stakeholders={leadership}
            variant="leadership"
            isCompact
          />
        )}

        {unassignedDepartments.length > 0 && (
          <UnassignedSection
            departments={unassignedDepartments}
            onAssign={onAssign}
            isCompact
          />
        )}
      </div>
    </div>
  );
};