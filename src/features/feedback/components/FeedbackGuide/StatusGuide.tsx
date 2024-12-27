import React from 'react';
import { Clock, CheckCircle2, CheckCheck } from 'lucide-react';

export const StatusGuide: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-neutral-gray-900 mb-4">Feedback Status Flow</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Clock className="h-5 w-5 text-yellow-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Pending</h4>
            <p className="text-sm text-neutral-gray-600">
              New feedback that needs to be reviewed by the charter owner. This is the initial state of all feedback.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <CheckCircle2 className="h-5 w-5 text-blue-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Heard</h4>
            <p className="text-sm text-neutral-gray-600">
              Feedback has been acknowledged and is being considered. The charter owner is evaluating the suggestions or concerns.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <CheckCheck className="h-5 w-5 text-green-500 mt-1" />
          <div>
            <h4 className="font-medium text-neutral-gray-900">Actioned</h4>
            <p className="text-sm text-neutral-gray-600">
              Feedback has been addressed through changes to the charter or a clear resolution has been provided.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};