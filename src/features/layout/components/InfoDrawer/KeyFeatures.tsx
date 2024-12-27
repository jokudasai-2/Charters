import React from 'react';
import { FileText, Users, MessageSquare, Target } from 'lucide-react';

export const KeyFeatures: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-neutral-gray-900">Key Features</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-start space-x-3">
          <FileText className="h-4 w-4 text-primary-ocean-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-neutral-gray-900">Structured Charters</p>
            <p className="text-sm text-neutral-gray-600">
              Create comprehensive project documents with guided sections for clarity and alignment
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Users className="h-4 w-4 text-primary-ocean-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-neutral-gray-900">Stakeholder Management</p>
            <p className="text-sm text-neutral-gray-600">
              Involve key stakeholders across departments with role-based collaboration
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MessageSquare className="h-4 w-4 text-primary-ocean-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-neutral-gray-900">Feedback System</p>
            <p className="text-sm text-neutral-gray-600">
              Collect and track structured feedback with conviction levels and resolution status
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Target className="h-4 w-4 text-primary-ocean-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-neutral-gray-900">Approval Tracking</p>
            <p className="text-sm text-neutral-gray-600">
              Monitor stakeholder approvals and project status in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};