import React from 'react';
import { HelpCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface UnassignedSectionProps {
  departments: string[];
  onAssign?: (department: string) => void;
  isCompact?: boolean;
}

export const UnassignedSection: React.FC<UnassignedSectionProps> = ({
  departments,
  onAssign,
  isCompact = false
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-neutral-gray-900 mb-3">Unassigned Departments</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {departments.map((department) => (
          <div
            key={department}
            className="flex items-center justify-between p-2 bg-white rounded-lg border border-neutral-gray-200"
          >
            <div className="flex items-center space-x-2">
              <div className={`${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-neutral-gray-100 flex items-center justify-center flex-shrink-0`}>
                <HelpCircle className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'} text-neutral-gray-400`} />
              </div>
              <span className="text-sm font-medium text-neutral-gray-900">{department}</span>
            </div>
            {onAssign && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAssign(department)}
                className="text-primary-ocean-500 hover:text-primary-ocean-600"
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};