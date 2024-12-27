import React from 'react';
import { MessageSquare, AlertTriangle, FileText, User } from 'lucide-react';
import { FeedbackStatus } from './FeedbackStatus';
import type { FeedbackSummary } from '../types';

interface FeedbackTableProps {
  feedback: FeedbackSummary[];
  isLoading: boolean;
  onStatusChange: (id: string, status: string) => Promise<void>;
}

export const FeedbackTable: React.FC<FeedbackTableProps> = ({
  feedback,
  isLoading,
  onStatusChange,
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading feedback...</div>;
  }

  if (feedback.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-gray-600">
        No feedback found
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="w-full table-fixed divide-y divide-neutral-gray-200">
        <colgroup>
          <col className="w-[40%]" />
          <col className="w-[20%]" />
          <col className="w-[20%]" />
          <col className="w-[10%]" />
          <col className="w-[10%]" />
        </colgroup>
        <thead className="bg-neutral-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-gray-500 uppercase tracking-wider">
              Feedback
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-gray-500 uppercase tracking-wider">
              Document & Section
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-gray-200">
          {feedback.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4">
                <div className="flex items-start space-x-2">
                  <MessageSquare className="h-5 w-5 text-neutral-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm text-neutral-gray-900 line-clamp-2">{item.content}</p>
                    {item.conviction === 'high' && (
                      <div className="flex items-center mt-1 text-secondary-red text-xs">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        High Conviction
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-neutral-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-gray-900 truncate">
                      {item.documentTitle}
                    </p>
                    {item.section && (
                      <p className="text-xs text-neutral-gray-500 mt-1 truncate">
                        Section: {item.section}
                      </p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-neutral-gray-400 flex-shrink-0" />
                  <span className="text-sm text-neutral-gray-900 truncate">
                    {item.authorName}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-neutral-gray-100 text-neutral-gray-800">
                  {item.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <FeedbackStatus 
                  status={item.status as any}
                  onStatusChange={(status) => onStatusChange(item.id, status)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};