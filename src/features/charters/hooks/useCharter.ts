import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Document, Stakeholder, Feedback } from '@/types/database';

interface CharterWithRelations extends Document {
  stakeholders: Stakeholder[];
  feedback: Feedback[];
}

export const useCharter = (id: string) => {
  const [charter, setCharter] = useState<CharterWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCharter = async () => {
      try {
        const { data, error: fetchError } = await supabase
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
              content,
              type,
              conviction,
              status,
              created_at
            )
          `)
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        setCharter(data);
      } catch (err) {
        console.error('Error fetching charter:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharter();
  }, [id]);

  return { charter, isLoading, error };
};