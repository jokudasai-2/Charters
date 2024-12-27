import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRetry } from '@/lib/hooks/useRetry';
import type { CharterSummary } from '../types';

export const useCharters = () => {
  const [charters, setCharters] = useState<CharterSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { retry } = useRetry();

  useEffect(() => {
    const fetchCharters = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const fetchData = async () => {
          // Fetch charters where user is owner
          const { data: ownedDocs, error: ownedError } = await supabase
            .from('documents')
            .select(`
              *,
              stakeholders (
                id,
                email,
                role,
                department,
                created_at
              ),
              feedback (
                id,
                status,
                created_at
              )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (ownedError) throw ownedError;

          // Fetch charters where user is a stakeholder
          const { data: stakeholderDocs, error: stakeholderError } = await supabase
            .from('documents')
            .select(`
              *,
              stakeholders (
                id,
                email,
                role,
                department,
                created_at
              ),
              feedback (
                id,
                status,
                created_at
              )
            `)
            .neq('user_id', user.id)
            .eq('stakeholders.email', user.email)
            .order('created_at', { ascending: false });

          if (stakeholderError) throw stakeholderError;

          return {
            ownedDocs: ownedDocs || [],
            stakeholderDocs: stakeholderDocs || []
          };
        };

        const { ownedDocs, stakeholderDocs } = await retry(fetchData);

        const allCharters = [
          ...ownedDocs.map(doc => ({
            ...doc,
            stakeholderCount: doc.stakeholders?.length || 0,
            feedbackCount: doc.feedback?.length || 0,
            stakeholders: doc.stakeholders || [],
            feedback: doc.feedback || [],
            isOwner: true,
          })),
          ...stakeholderDocs.map(doc => ({
            ...doc,
            stakeholderCount: doc.stakeholders?.length || 0,
            feedbackCount: doc.feedback?.length || 0,
            stakeholders: doc.stakeholders || [],
            feedback: doc.feedback || [],
            isOwner: false,
          })),
        ];

        setCharters(allCharters);
      } catch (err) {
        console.error('Error fetching charters:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharters();

    const subscription = supabase
      .channel('charter_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
        },
        fetchCharters
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [retry]);

  return { charters, isLoading, error };
};