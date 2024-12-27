import React from 'react';
import { AlertTriangle, ThumbsUp } from 'lucide-react';

export const ConvictionGuide: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-neutral-gray-900 mb-4">Understanding Conviction Levels</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <ThumbsUp className="h-5 w-5 text-neutral-gray-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Low Conviction</h4>
            <p className="text-sm text-neutral-gray-600">
              Suggestions or observations that could improve the charter but aren't critical to its success. Use for general improvements or alternative approaches to consider.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">High Conviction</h4>
            <p className="text-sm text-neutral-gray-600">
              Critical concerns or blockers that must be addressed before proceeding. Use when you strongly believe something needs to change for the charter to succeed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};