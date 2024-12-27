import React from 'react';
import { FileText, Target, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const CharterGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-neutral-gray-900 mb-4">Creating Effective Charters</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-primary-ocean-500 mt-1" />
            <div>
              <h4 className="font-medium text-neutral-gray-900">Essential Components</h4>
              <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
                <li>• Clear, concise title that reflects the initiative</li>
                <li>• Specific problem statement with metrics when possible</li>
                <li>• Well-defined target user or beneficiary</li>
                <li>• Concrete use cases and success criteria</li>
                <li>• Quantifiable business value and impact</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Target className="h-5 w-5 text-primary-ocean-500 mt-1" />
            <div>
              <h4 className="font-medium text-neutral-gray-900">Writing Tips</h4>
              <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
                <li>• Start with the problem, not the solution</li>
                <li>• Use data and metrics to support claims</li>
                <li>• Break down complex use cases</li>
                <li>• Consider both short and long-term impact</li>
                <li>• Write for a diverse audience of stakeholders</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-primary-ocean-500 mt-1" />
            <div>
              <h4 className="font-medium text-neutral-gray-900">Common Pitfalls</h4>
              <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
                <li>• Focusing on solutions before defining the problem</li>
                <li>• Vague or unmeasurable success criteria</li>
                <li>• Overlooking key stakeholder perspectives</li>
                <li>• Insufficient risk assessment</li>
                <li>• Missing business value quantification</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-primary-ocean-500 mt-1" />
            <div>
              <h4 className="font-medium text-neutral-gray-900">Review Checklist</h4>
              <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
                <li>• Problem statement is clear and measurable</li>
                <li>• Target users are well-defined</li>
                <li>• Use cases cover key scenarios</li>
                <li>• Business value is quantified</li>
                <li>• Risks and mitigations are documented</li>
                <li>• Key stakeholders are identified</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};