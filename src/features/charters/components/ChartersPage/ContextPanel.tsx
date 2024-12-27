import React from 'react';
import { Users, Target, CheckCircle2, X } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const ContextPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useLocalStorage('showContextPanel', true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 text-neutral-gray-400 hover:text-neutral-gray-600 transition-colors"
        aria-label="Close panel"
      >
        <X className="h-5 w-5" />
      </button>

      <h2 className="text-xl font-semibold text-neutral-gray-900 mb-4">
        Building Alignment Through Collaboration
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
};