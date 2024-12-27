import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Feedback, FeedbackStatus } from '@/types/database';

export const useFeedbackActions = (documentId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addFeedback = async (newFeedback: Omit<Feedback, 'id' | 'created_at' | 'user_id'>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error: insertError } = await supabase
        .from('feedback')
        .insert([{
          ...newFeedback,
          document_id: documentId,
          user_id: user.id
        }]);

      if (insertError) throw insertError;
      return true;
    } catch (err) {
      console.error('Error adding feedback:', err);
      setError(err as Error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFeedbackStatus = async (feedbackId: string, status: FeedbackStatus) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('feedback')
        .update({ status })
        .eq('id', feedbackId);

      if (updateError) throw updateError;
      return true;
    } catch (err) {
      console.error('Error updating feedback status:', err);
      setError(err as Error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addFeedback,
    updateFeedbackStatus,
    isLoading,
    error
  };
};