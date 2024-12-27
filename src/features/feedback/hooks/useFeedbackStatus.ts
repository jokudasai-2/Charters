import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { FeedbackStatus } from '@/types/database';

export const useFeedbackStatus = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateStatus = async (feedbackId: string, status: FeedbackStatus) => {
    try {
      setIsUpdating(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('feedback')
        .update({ status })
        .eq('id', feedbackId);

      if (updateError) throw updateError;
    } catch (err) {
      console.error('Failed to update status:', err);
      setError(err as Error);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateStatus,
    isUpdating,
    error
  };
};