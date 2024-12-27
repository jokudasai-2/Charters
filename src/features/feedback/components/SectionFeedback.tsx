import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AddFeedbackDialog } from './AddFeedbackDialog';
import { Tooltip } from '@/components/ui/Tooltip';

interface SectionFeedbackProps {
  section: string;
  documentId: string;
  feedbackCount: number;
  isLoading?: boolean;
}

export const SectionFeedback: React.FC<SectionFeedbackProps> = ({
  section,
  documentId,
  feedbackCount,
  isLoading = false,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Tooltip content="Add feedback for this section">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center space-x-2 text-neutral-gray-500 hover:text-primary-teal-500"
          disabled={isLoading}
        >
          <MessageSquare className="h-4 w-4" />
          <span>{isLoading ? '-' : feedbackCount}</span>
        </Button>
      </Tooltip>

      <AddFeedbackDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        documentId={documentId}
        section={section}
      />
    </>
  );
};