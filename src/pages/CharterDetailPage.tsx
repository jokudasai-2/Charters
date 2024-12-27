import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCharter } from '@/features/charters/hooks/useCharter';
import { CharterDetailLayout } from '@/features/charters/components/CharterDetail/CharterDetailLayout';
import { AddStakeholderDialog } from '@/features/stakeholders/components/AddStakeholderDialog';
import { AddFeedbackDialog } from '@/features/feedback/components/AddFeedbackDialog';
import { useStakeholders } from '@/features/stakeholders/hooks/useStakeholders';
import { Toast } from '@/components/ui/Toast';
import { useToast } from '@/features/auth/hooks/useToast';

export const CharterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { charter, isLoading } = useCharter(id!);
  const { addStakeholder } = useStakeholders(id!);
  const [isStakeholderDialogOpen, setStakeholderDialogOpen] = useState(false);
  const [isFeedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  if (isLoading) {
    return <div className="text-center py-8">Loading charter...</div>;
  }

  if (!charter) {
    return <div className="text-center py-8">Charter not found</div>;
  }

  const handleAddStakeholder = async (email: string, role: any, department: any) => {
    try {
      const success = await addStakeholder(email, role, department);
      if (success) {
        showToast('Stakeholder added successfully');
        setStakeholderDialogOpen(false);
      } else {
        showToast('Failed to add stakeholder', 'error');
      }
    } catch (error) {
      console.error('Error adding stakeholder:', error);
      showToast('Failed to add stakeholder', 'error');
    }
  };

  return (
    <>
      <CharterDetailLayout 
        charter={charter}
        onAddStakeholder={() => setStakeholderDialogOpen(true)}
        onAddFeedback={() => setFeedbackDialogOpen(true)}
      />

      <AddStakeholderDialog
        isOpen={isStakeholderDialogOpen}
        onClose={() => setStakeholderDialogOpen(false)}
        onAdd={handleAddStakeholder}
      />

      <AddFeedbackDialog
        isOpen={isFeedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
        documentId={charter.id}
      />

      {toast.isVisible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </>
  );
};