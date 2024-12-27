import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { handleError } from '@/lib/utils/errorHandling';
import type { FeedbackSummary, FeedbackFilters } from '../types';

export const useFeedbackList = (filters: FeedbackFilters) => {
  const [feedback, setFeedback] = useState<FeedbackSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        let query = supabase
          .from('feedback')
          .select(`
            *,
            documents!inner(
              id,
              title,
              user_id
            ),
            profiles(
              first_name,
              last_name
            )
          `)
          .eq('documents.user_id', user.id);

        if (filters.type) {
          query = query.eq('type', filters.type);
        }

        if (filters.status) {
          query = query.eq('status', filters.status);
        }

        if (filters.search) {
          const searchTerm = `%${filters.search}%`;
          query = query.or(
            `content.ilike.${searchTerm},documents.title.ilike.${searchTerm}`
          );
        }

        const { data, error: queryError } = await query;
        if (queryError) throw queryError;

        setFeedback(
          data.map(item => ({
            id: item.id,
            content: item.content,
            type: item.type,
            conviction: item.conviction,
            status: item.status,
            section: item.section,
            documentTitle: item.documents.title,
            createdAt: item.created_at,
            authorName: item.profiles ? 
              `${item.profiles.first_name} ${item.profiles.last_name}` : 
              'Unknown User'
          }))
        );
      } catch (err) {
        console.error('Error fetching feedback:', err);
        setError(handleError(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [filters]);

  return { feedback, isLoading, error };
};