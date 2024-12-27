import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useRetryWithBackoff } from '@/lib/hooks/useRetryWithBackoff';
import type { CharterStats } from '../types';

export const useCharterStats = () => {
  const [stats, setStats] = useState<CharterStats>({
    draft: 0,
    pending_review: 0,
    approved: 0,
    rejected: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { retry } = useRetryWithBackoff();

  const fetchStats = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const fetchData = async () => {
        const { data, error: queryError } = await supabase
          .from('documents')
          .select('status')
          .eq('user_id', user.id);

        if (queryError) throw queryError;
        return data;
      };

      const data = await retry(fetchData);

      const counts = data.reduce((acc, doc) => {
        acc[doc.status] = (acc[doc.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setStats({
        draft: counts.draft || 0,
        pending_review: counts.pending_review || 0,
        approved: counts.approved || 0,
        rejected: counts.rejected || 0,
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching charter stats:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [retry]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, error };
};