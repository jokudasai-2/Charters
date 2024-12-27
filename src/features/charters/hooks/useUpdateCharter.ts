import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useUpdateCharter = (documentId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateSection = async (field: string, content: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('documents')
        .update({ [field]: content })
        .eq('id', documentId);

      if (updateError) throw updateError;
      return true;
    } catch (err) {
      console.error('Error updating charter section:', err);
      setError(err as Error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateSection, isLoading, error };
};