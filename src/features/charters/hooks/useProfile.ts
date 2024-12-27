import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useRetry } from '@/lib/hooks/useRetry';

interface Profile {
  first_name: string;
  last_name: string;
}

export const useProfile = (userId: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { retry, reset } = useRetry();

  const fetchProfile = useCallback(async () => {
    try {
      const fetchData = async () => {
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', userId)
          .maybeSingle();

        if (fetchError) throw fetchError;
        return data;
      };

      const data = await retry(fetchData);
      setProfile(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, retry]);

  useEffect(() => {
    reset(); // Reset retry attempts when userId changes
    if (userId) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, [userId, fetchProfile, reset]);

  return { profile, isLoading, error };
};