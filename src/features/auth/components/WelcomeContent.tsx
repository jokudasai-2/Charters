import React from 'react';
import { FileText, Users, MessageSquare, Target } from 'lucide-react';

export const WelcomeContent: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-primary-ocean-50 rounded-lg">
          <FileText className="h-5 w-5 text-primary-ocean-500" />
        </div>
        <div className="text-left">
          <h3 className="font-medium text-neutral-gray-900">Structured Documents</h3>
          <p className="text-sm text-neutral-gray-600">
            Create comprehensive project charters with guided sections for clarity and alignment
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <div className="p-2 bg-primary-ocean-50 rounded-lg">
          <Users className="h-5 w-5 text-primary-ocean-500" />
        </div>
        <div className="text-left">
          <h3 className="font-medium text-neutral-gray-900">Stakeholder Management</h3>
          <p className="text-sm text-neutral-gray-600">
            Involve key stakeholders across departments with role-based collaboration
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <div className="p-2 bg-primary-ocean-50 rounded-lg">
          <MessageSquare className="h-5 w-5 text-primary-ocean-500" />
        </div>
        <div className="text-left">
          <h3 className="font-medium text-neutral-gray-900">Structured Feedback</h3>
          <p className="text-sm text-neutral-gray-600">
            Collect and track feedback with conviction levels and resolution status
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <div className="p-2 bg-primary-ocean-50 rounded-lg">
          <Target className="h-5 w-5 text-primary-ocean-500" />
        </div>
        <div className="text-left">
          <h3 className="font-medium text-neutral-gray-900">Clear Approvals</h3>
          <p className="text-sm text-neutral-gray-600">
            Track stakeholder approvals and project status in real-time
          </p>
        </div>
      </div>
    </div>
  );
};