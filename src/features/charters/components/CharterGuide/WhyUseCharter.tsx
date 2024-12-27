import React from 'react';
import { Target, Users, MessageSquare, GitMerge } from 'lucide-react';

export const WhyUseCharter: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-neutral-gray-900 mb-4">Why Use Charters</h3>
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <Target className="h-5 w-5 text-primary-ocean-500 mt-1" />
            <div>
              <h4 className="font-medium text-neutral-gray-900">Alignment & Clarity</h4>
              <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
                <li>• Ensures everyone understands the problem and proposed solution</li>
                <li>• Creates a single source of truth for project direction</li>
                <li>• Reduces misunderstandings and scope creep</li>
                <li>• Sets clear success criteria and expectations</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Users className="h-5 w-5 text-primary-ocean-500 mt-1" />
            <div>
              <h4 className="font-medium text-neutral-gray-900">Stakeholder Engagement</h4>
              <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
                <li>• Involves key stakeholders early in the process</li>
                <li>• Captures diverse perspectives and requirements</li>
                <li>• Builds consensus through structured collaboration</li>
                <li>• Creates shared ownership of outcomes</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MessageSquare className="h-5 w-5 text-primary-ocean-500 mt-1" />
            <div>
              <h4 className="font-medium text-neutral-gray-900">Better Decision Making</h4>
              <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
                <li>• Structured feedback improves solution quality</li>
                <li>• Risk identification and mitigation planning</li>
                <li>• Clear business value assessment</li>
                <li>• Data-driven prioritization</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <GitMerge className="h-5 w-5 text-primary-ocean-500 mt-1" />
            <div>
              <h4 className="font-medium text-neutral-gray-900">Project Success</h4>
              <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
                <li>• Higher implementation success rates</li>
                <li>• Faster time to value through early alignment</li>
                <li>• Reduced rework and changes mid-project</li>
                <li>• Better resource allocation and planning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};