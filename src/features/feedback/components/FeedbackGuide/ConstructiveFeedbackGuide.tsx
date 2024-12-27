import React from 'react';
import { Target } from 'lucide-react';

export const ConstructiveFeedbackGuide: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-neutral-gray-900 mb-4">Providing Constructive Feedback</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Target className="h-5 w-5 text-primary-ocean-500 mt-1" />
          <div className="space-y-2">
            <h4 className="font-medium text-neutral-gray-900">Best Practices</h4>
            <ul className="text-sm text-neutral-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Be specific and provide examples when possible</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Focus on the content, not the person</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Suggest solutions along with identifying problems</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Consider both immediate and long-term implications</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Use the appropriate feedback type and conviction level</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};