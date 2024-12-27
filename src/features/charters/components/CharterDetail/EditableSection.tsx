import React, { useState } from 'react';
import { Pencil, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUpdateCharter } from '../../hooks/useUpdateCharter';
import { SectionFeedback } from '@/features/feedback/components/SectionFeedback';
import { useSectionFeedback } from '@/features/feedback/hooks/useSectionFeedback';

interface EditableSectionProps {
  title: string;
  content: string;
  field: string;
  documentId: string;
  isOwner: boolean;
}

export const EditableSection: React.FC<EditableSectionProps> = ({
  title,
  content,
  field,
  documentId,
  isOwner
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const { updateSection, isLoading } = useUpdateCharter(documentId);
  const { feedbackCount, isLoading: isFeedbackLoading } = useSectionFeedback(documentId, title.toLowerCase());

  const handleSave = async () => {
    const success = await updateSection(field, editedContent);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-neutral-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <SectionFeedback
            section={title.toLowerCase()}
            documentId={documentId}
            feedbackCount={feedbackCount}
            isLoading={isFeedbackLoading}
          />
          {isOwner && !isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-neutral-gray-400 hover:text-primary-teal-500"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-teal-500"
            rows={4}
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isLoading}
            >
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="prose prose-sm max-w-none text-neutral-gray-700">
          {content.split('\n').map((line, i) => (
            <p key={i} className="mb-2 last:mb-0">{line}</p>
          ))}
        </div>
      )}
    </div>
  );
};