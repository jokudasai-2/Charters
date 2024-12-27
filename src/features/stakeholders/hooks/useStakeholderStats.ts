import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { StakeholderStats } from '../types';

export const useStakeholderStats = () => {
  const [stats, setStats] = useState<StakeholderStats>({
    total: 0,
    contributors: 0,
    leadership: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // First get all documents owned by the user
        const { data: documents, error: docsError } = await supabase
          .from('documents')
          .select('id')
          .eq('user_id', user.id);

        if (docsError) throw docsError;

        if (!documents.length) {
          setStats({
            total: 0,
            contributors: 0,
            leadership: 0,
          });
          return;
        }

        // Then get stakeholder stats for these documents
        const { data, error: queryError } = await supabase
          .from('stakeholders')
          .select('role')
          .in('document_id', documents.map(d => d.id));

        if (queryError) throw queryError;

        const counts = data.reduce((acc, { role }) => {
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setStats({
          total: data.length,
          contributors: counts.contributor || 0,
          leadership: counts.leadership || 0,
        });
      } catch (err) {
        console.error('Error fetching stakeholder stats:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
};