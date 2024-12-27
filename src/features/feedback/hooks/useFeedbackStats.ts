import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { FeedbackStats } from '../types';

export const useFeedbackStats = () => {
  const [stats, setStats] = useState<FeedbackStats>({
    total: 0,
    pending: 0,
    heard: 0,
    actioned: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error: queryError } = await supabase
          .from('feedback')
          .select('status, documents!inner(user_id)')
          .eq('documents.user_id', user.id);

        if (queryError) throw queryError;

        const counts = data.reduce((acc, { status }) => {
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setStats({
          total: data.length,
          pending: counts.pending || 0,
          heard: counts.heard || 0,
          actioned: counts.actioned || 0,
        });
      } catch (err) {
        console.error('Error fetching feedback stats:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
};