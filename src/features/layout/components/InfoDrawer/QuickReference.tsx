import React from 'react';
import { FileText, Users, MessageSquare, CheckCircle2 } from 'lucide-react';

export const QuickReference: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-neutral-gray-900">Quick Reference</h3>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <FileText className="h-4 w-4 text-primary-ocean-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-neutral-gray-900">Charter Status</p>
            <ul className="text-sm text-neutral-gray-600 space-y-1">
              <li>Draft → Initial creation and editing</li>
              <li>In Review → Ready for stakeholder feedback</li>
              <li>Approved → All stakeholders have approved</li>
              <li>No-Go → Rejected by stakeholders</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Users className="h-4 w-4 text-primary-ocean-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-neutral-gray-900">Stakeholder Roles</p>
            <ul className="text-sm text-neutral-gray-600 space-y-1">
              <li>Contributor → Domain expertise input</li>
              <li>Leadership → Strategic alignment</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MessageSquare className="h-4 w-4 text-primary-ocean-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-neutral-gray-900">Feedback Types</p>
            <ul className="text-sm text-neutral-gray-600 space-y-1">
              <li>General → Overall observations</li>
              <li>Technical → Implementation details</li>
              <li>Business → Strategic impact</li>
              <li>Legal → Compliance concerns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};