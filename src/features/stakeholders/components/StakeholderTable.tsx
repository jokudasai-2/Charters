import React from 'react';
import { User, Building2 } from 'lucide-react';
import { DocumentList } from './DocumentList';
import type { StakeholderSummary } from '../types';

interface StakeholderTableProps {
  stakeholders: StakeholderSummary[];
  isLoading: boolean;
}

export const StakeholderTable: React.FC<StakeholderTableProps> = ({
  stakeholders,
  isLoading,
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading stakeholders...</div>;
  }

  if (stakeholders.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-gray-600">
        No stakeholders found
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-neutral-gray-200">
        <thead className="bg-neutral-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-gray-500 uppercase tracking-wider">
              Documents
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-gray-500 uppercase tracking-wider">
              Last Active
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-gray-200">
          {stakeholders.map((stakeholder) => (
            <tr key={stakeholder.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-gray-900">
                {stakeholder.firstName || stakeholder.lastName ? (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-neutral-gray-400" />
                    {`${stakeholder.firstName} ${stakeholder.lastName}`.trim()}
                  </div>
                ) : (
                  <span className="text-neutral-gray-500">Not available</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-neutral-gray-400" />
                  <span className="text-sm text-neutral-gray-900">{stakeholder.department}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-neutral-gray-100 text-neutral-gray-800">
                  {stakeholder.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <DocumentList documents={stakeholder.documents} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-gray-500">
                {new Date(stakeholder.lastActive).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};