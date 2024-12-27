import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRetry } from '@/lib/hooks/useRetry';

export const useSectionFeedback = (documentId: string, section: string) => {
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { retry } = useRetry();

  useEffect(() => {
    const fetchFeedbackCount = async () => {
      try {
        const fetchData = async () => {
          const { count, error } = await supabase
            .from('feedback')
            .select('id', { count: 'exact', head: true })
            .eq('document_id', documentId)
            .eq('section', section);

          if (error) throw error;
          return count || 0;
        };

        const count = await retry(fetchData);
        setFeedbackCount(count);
      } catch (err) {
        console.error('Error fetching feedback count:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbackCount();

    // Subscribe to feedback changes for this section
    const subscription = supabase
      .channel(`section_feedback_${documentId}_${section}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'feedback',
          filter: `document_id=eq.${documentId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT' && payload.new.section === section) {
            setFeedbackCount((prev) => prev + 1);
          } else if (payload.eventType === 'DELETE' && payload.old.section === section) {
            setFeedbackCount((prev) => Math.max(0, prev - 1));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [documentId, section, retry]);

  return { feedbackCount, isLoading };
};