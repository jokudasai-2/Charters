import React from 'react';
import { Users, Target, CheckCircle2 } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';

interface InfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoDrawer: React.FC<InfoDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Building Alignment Through Collaboration"
    >
      <div className="space-y-8">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-primary-teal-50 rounded-lg">
            <Users className="h-6 w-6 text-primary-teal-500" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-gray-900 mb-1">Cross-Functional Alignment</h3>
            <p className="text-sm text-neutral-gray-600">
              Bring together stakeholders from different departments to ensure all perspectives are considered.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 bg-primary-teal-50 rounded-lg">
            <Target className="h-6 w-6 text-primary-teal-500" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-gray-900 mb-1">Shared Ownership</h3>
            <p className="text-sm text-neutral-gray-600">
              Foster collective responsibility and commitment through transparent decision-making.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 bg-primary-teal-50 rounded-lg">
            <CheckCircle2 className="h-6 w-6 text-primary-teal-500" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-gray-900 mb-1">Group Cohesion</h3>
            <p className="text-sm text-neutral-gray-600">
              Build stronger teams through collaborative review and approval processes.
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  );
};