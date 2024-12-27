import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRetry } from '@/lib/hooks/useRetry';
import type { Stakeholder, StakeholderRole, StakeholderDepartment } from '@/types/database';

export const useStakeholders = (documentId?: string) => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { retry } = useRetry();

  useEffect(() => {
    const fetchStakeholders = async () => {
      try {
        // Only fetch if we have a valid documentId
        if (!documentId) {
          setStakeholders([]);
          setIsLoading(false);
          return;
        }

        const fetchData = async () => {
          const { data, error: fetchError } = await supabase
            .from('stakeholders')
            .select('*')
            .eq('document_id', documentId)
            .order('created_at', { ascending: true });

          if (fetchError) throw fetchError;
          return data;
        };

        const data = await retry(fetchData);
        setStakeholders(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching stakeholders:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStakeholders();

    // Only subscribe if we have a valid documentId
    if (documentId) {
      const subscription = supabase
        .channel(`stakeholders_${documentId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'stakeholders',
            filter: `document_id=eq.${documentId}`,
          },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              setStakeholders((current) => [...current, payload.new as Stakeholder]);
            } else if (payload.eventType === 'DELETE') {
              setStakeholders((current) =>
                current.filter((item) => item.id !== payload.old.id)
              );
            }
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [documentId, retry]);

  const addStakeholder = async (
    email: string, 
    role: StakeholderRole,
    department: StakeholderDepartment
  ) => {
    if (!documentId) return false;

    try {
      const { data, error: insertError } = await supabase
        .from('stakeholders')
        .insert([
          {
            document_id: documentId,
            email: email.trim(),
            role,
            department,
            type: 'email',
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;
      return true;
    } catch (err) {
      console.error('Error adding stakeholder:', err);
      setError(err as Error);
      return false;
    }
  };

  const removeStakeholder = async (stakeholderId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('stakeholders')
        .delete()
        .eq('id', stakeholderId);

      if (deleteError) throw deleteError;
      return true;
    } catch (err) {
      console.error('Error removing stakeholder:', err);
      setError(err as Error);
      return false;
    }
  };

  return {
    stakeholders,
    isLoading,
    error,
    addStakeholder,
    removeStakeholder,
  };
};