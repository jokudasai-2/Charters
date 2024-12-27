import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useRetry } from '@/lib/hooks/useRetry';
import type { FeedbackWithProfile } from '../types';

export const useFeedbackData = (documentId: string) => {
  const [feedback, setFeedback] = useState<FeedbackWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { retry } = useRetry();

  const fetchFeedback = useCallback(async () => {
    try {
      const fetchData = async () => {
        const { data, error: fetchError } = await supabase
          .from('feedback')
          .select(`
            *,
            profiles (
              first_name,
              last_name
            )
          `)
          .eq('document_id', documentId)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        return data || [];
      };

      const data = await retry(fetchData);
      setFeedback(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [documentId, retry]);

  useEffect(() => {
    fetchFeedback();

    const channel = supabase.channel(`feedback_${documentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'feedback',
          filter: `document_id=eq.${documentId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setFeedback(current => [payload.new as FeedbackWithProfile, ...current]);
          } else if (payload.eventType === 'UPDATE') {
            setFeedback(current =>
              current.map(item =>
                item.id === payload.new.id
                  ? { ...item, ...payload.new }
                  : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setFeedback(current =>
              current.filter(item => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [documentId, fetchFeedback]);

  return { feedback, isLoading, error };
};