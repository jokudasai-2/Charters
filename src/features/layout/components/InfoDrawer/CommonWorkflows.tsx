import React from 'react';
import { GitBranch } from 'lucide-react';

export const CommonWorkflows: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-neutral-gray-900">Common Workflows</h3>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <GitBranch className="h-4 w-4 text-primary-ocean-500" />
            <p className="text-sm font-medium text-neutral-gray-900">Charter Creation to Approval</p>
          </div>
          <ol className="text-sm text-neutral-gray-600 list-decimal pl-4 space-y-2">
            <li>Create charter draft with initial content</li>
            <li>Add stakeholders from relevant departments</li>
            <li>Submit for review when ready</li>
            <li>Collect and address feedback</li>
            <li>Obtain stakeholder approvals</li>
            <li>Charter marked as approved when all approve</li>
          </ol>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <GitBranch className="h-4 w-4 text-primary-ocean-500" />
            <p className="text-sm font-medium text-neutral-gray-900">Feedback Resolution</p>
          </div>
          <ol className="text-sm text-neutral-gray-600 list-decimal pl-4 space-y-2">
            <li>Review incoming feedback</li>
            <li>Mark as "Heard" when evaluating</li>
            <li>Make necessary charter updates</li>
            <li>Document resolution approach</li>
            <li>Mark feedback as "Actioned"</li>
            <li>Notify stakeholders of changes</li>
          </ol>
        </div>
      </div>
    </div>
  );
};