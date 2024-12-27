import React from 'react';
import { MessageSquare, Code, LineChart, Scale } from 'lucide-react';

export const FeedbackTypeGuide: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-neutral-gray-900 mb-4">Feedback Types</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MessageSquare className="h-5 w-5 text-neutral-gray-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">General</h4>
            <p className="text-sm text-neutral-gray-600">
              Overall feedback about the charter's direction, clarity, or scope. Use this for high-level observations and suggestions.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Code className="h-5 w-5 text-blue-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Technical</h4>
            <p className="text-sm text-neutral-gray-600">
              Implementation considerations, technical constraints, or architectural suggestions. Focus on feasibility and technical requirements.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <LineChart className="h-5 w-5 text-green-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Business</h4>
            <p className="text-sm text-neutral-gray-600">
              Impact on business metrics, market considerations, or resource implications. Address ROI and strategic alignment.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Scale className="h-5 w-5 text-purple-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Legal</h4>
            <p className="text-sm text-neutral-gray-600">
              Compliance requirements, regulatory considerations, or legal risks. Essential for ensuring proper governance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};