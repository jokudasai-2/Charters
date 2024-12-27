import React from 'react';
import { Info, Users, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

export const CharterGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useLocalStorage('showCharterGuide', false);

  return (
    <div className="mb-6">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="flex items-center space-x-2 text-sm text-primary-ocean-500 hover:text-primary-ocean-600"
        >
          <Info className="h-4 w-4" />
          <span>Show process guide</span>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-neutral-gray-900">Understanding the Process</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-sm text-primary-ocean-500 hover:text-primary-ocean-600"
            >
              Hide guide
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-primary-ocean-500 mt-1" />
                <div>
                  <h4 className="font-medium text-neutral-gray-900">Stakeholder Roles</h4>
                  <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
                    <li>• Contributors provide domain expertise and feedback</li>
                    <li>• Leadership ensures strategic alignment</li>
                    <li>• All stakeholders must approve for completion</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-primary-ocean-500 mt-1" />
                <div>
                  <h4 className="font-medium text-neutral-gray-900">Gathering Feedback</h4>
                  <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
                    <li>• Use section-specific feedback for clarity</li>
                    <li>• Mark high conviction for critical issues</li>
                    <li>• Track resolution status for accountability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-primary-ocean-500 mt-1" />
                <div>
                  <h4 className="font-medium text-neutral-gray-900">Approval Process</h4>
                  <ul className="text-sm text-neutral-gray-600 space-y-2 mt-2">
                    <li>• Address all high conviction feedback</li>
                    <li>• Each stakeholder reviews and approves</li>
                    <li>• Charter is approved when all sign off</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};