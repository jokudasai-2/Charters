import React from 'react';
import { Lightbulb, Users, MessageSquare, Target } from 'lucide-react';

export const BestPractices: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-neutral-gray-900">Best Practices</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-4 w-4 text-primary-ocean-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-neutral-gray-900">Charter Creation</p>
            <ul className="text-sm text-neutral-gray-600 list-disc pl-4 space-y-1">
              <li>Start with a clear problem statement</li>
              <li>Include measurable success criteria</li>
              <li>Define specific use cases</li>
              <li>Document risks and mitigation strategies</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Users className="h-4 w-4 text-primary-ocean-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-neutral-gray-900">Stakeholder Selection</p>
            <ul className="text-sm text-neutral-gray-600 list-disc pl-4 space-y-1">
              <li>Include diverse department perspectives</li>
              <li>Engage technical and business stakeholders</li>
              <li>Add leadership for strategic alignment</li>
              <li>Consider customer-facing roles</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MessageSquare className="h-4 w-4 text-primary-ocean-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-neutral-gray-900">Feedback Management</p>
            <ul className="text-sm text-neutral-gray-600 list-disc pl-4 space-y-1">
              <li>Respond to all feedback promptly</li>
              <li>Address high conviction feedback first</li>
              <li>Document resolution decisions</li>
              <li>Keep stakeholders updated on changes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};