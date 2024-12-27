import React from 'react';
import { Button } from '@/components/ui/Button';

interface FormActionsProps {
  onSaveDraft: () => void;
  isLoading: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ onSaveDraft, isLoading }) => {
  return (
    <div className="flex items-center justify-end space-x-4">
      <button
        type="button"
        onClick={onSaveDraft}
        className="text-primary-teal-500 hover:text-primary-teal-600 text-sm font-medium"
        disabled={isLoading}
      >
        Save as draft
      </button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => window.history.back()}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Charter'}
      </Button>
    </div>
  );
};