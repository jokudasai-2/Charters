import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FeedbackGuide } from './FeedbackGuide';
import { useFeedbackActions } from '../hooks/useFeedbackActions';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import type { FeedbackType, FeedbackConviction } from '@/types/database';

interface AddFeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  section?: string;
}

export const AddFeedbackDialog: React.FC<AddFeedbackDialogProps> = ({
  isOpen,
  onClose,
  documentId,
  section
}) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<FeedbackType>('general');
  const [conviction, setConviction] = useState<FeedbackConviction>('low');
  const [showGuide, setShowGuide] = useLocalStorage('showFeedbackGuide', true);
  const { addFeedback, isLoading } = useFeedbackActions(documentId);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await addFeedback({
      content,
      type,
      conviction,
      status: 'pending',
      document_id: documentId,
      section,
    });

    if (success) {
      setContent('');
      setType('general');
      setConviction('low');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">
            Add Feedback {section ? `- ${section}` : ''}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-gray-700 mb-1">
                  Feedback Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as FeedbackType)}
                  className="w-full h-10 px-3 py-2 text-base rounded border border-neutral-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-500"
                >
                  <option value="general">General</option>
                  <option value="technical">Technical</option>
                  <option value="business">Business</option>
                  <option value="legal">Legal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-gray-700 mb-1">
                  Conviction Level
                </label>
                <select
                  value={conviction}
                  onChange={(e) => setConviction(e.target.value as FeedbackConviction)}
                  className="w-full h-10 px-3 py-2 text-base rounded border border-neutral-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-500"
                >
                  <option value="low">Low</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-gray-700 mb-1">
                  Feedback
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-3 py-2 text-base rounded border border-neutral-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-500"
                  placeholder="Enter your feedback..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </div>
            </form>
          </div>

          <div>
            {showGuide ? (
              <>
                <FeedbackGuide />
                <button
                  type="button"
                  onClick={() => setShowGuide(false)}
                  className="text-sm text-primary-ocean-500 hover:text-primary-ocean-600 mt-4"
                >
                  Hide guide
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setShowGuide(true)}
                className="flex items-center space-x-2 text-sm text-primary-ocean-500 hover:text-primary-ocean-600"
              >
                <Info className="h-4 w-4" />
                <span>Show feedback guide</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};