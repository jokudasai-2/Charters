import React from 'react';
import { Star, Target, AlertCircle } from 'lucide-react';

export const StakeholderGuide: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-medium text-neutral-gray-900 mb-2">Stakeholder Roles</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Star className="h-5 w-5 text-primary-ocean-500 mt-1" />
            <div>
              <h4 className="font-medium text-neutral-gray-900">Contributor</h4>
              <p className="text-sm text-neutral-gray-600">
                Domain experts who review, approve, or reject based on their expertise. Particularly valuable for customer-facing roles to ensure proper problem framing and solution fit.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Target className="h-5 w-5 text-primary-ocean-500 mt-1" />
            <div>
              <h4 className="font-medium text-neutral-gray-900">Leadership</h4>
              <p className="text-sm text-neutral-gray-600">
                Provide strategic guidance and ensure alignment with organizational goals. Their input helps shape direction and validate business impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-neutral-gray-900 mb-2">Best Practices</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-primary-ocean-500 mt-1" />
            <div className="space-y-2">
              <p className="text-sm text-neutral-gray-600">
                • Include customer-facing roles early to validate problem statements
              </p>
              <p className="text-sm text-neutral-gray-600">
                • Add technical contributors to assess feasibility and implementation
              </p>
              <p className="text-sm text-neutral-gray-600">
                • Engage leadership for strategic alignment and resource commitment
              </p>
              <p className="text-sm text-neutral-gray-600">
                • Balance perspectives across departments for comprehensive feedback
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};