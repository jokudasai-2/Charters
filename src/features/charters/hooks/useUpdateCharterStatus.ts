import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { DocumentStatus } from '@/types/database';

export const useUpdateCharterStatus = (charterId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateStatus = async (status: DocumentStatus) => {
    try {
      setIsLoading(true);
      setError(null);

      // First verify the document exists and current user is a stakeholder
      const { data: document, error: fetchError } = await supabase
        .from('documents')
        .select('id, status')
        .eq('id', charterId)
        .single();

      if (fetchError) {
        throw new Error('Unable to verify document status');
      }

      if (!document) {
        throw new Error('Document not found');
      }

      // Perform the update
      const { error: updateError } = await supabase
        .from('documents')
        .update({ status })
        .eq('id', charterId);

      if (updateError) {
        if (updateError.message?.includes('status transition')) {
          throw new Error('Invalid status change. Document must be in review state.');
        }
        throw new Error('Unable to update document status');
      }
      
      return true;
    } catch (err) {
      console.error('Error updating charter status:', err);
      setError(err as Error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    updateStatus, 
    isLoading, 
    error,
    errorMessage: error?.message 
  };
};