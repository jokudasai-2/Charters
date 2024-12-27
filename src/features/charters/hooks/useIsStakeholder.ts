import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useIsStakeholder = (documentId: string) => {
  const [isStakeholder, setIsStakeholder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStakeholderStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.email) {
          setIsStakeholder(false);
          return;
        }

        const { data, error } = await supabase
          .from('stakeholders')
          .select('id')
          .eq('document_id', documentId)
          .eq('email', user.email);

        if (error) throw error;
        
        // Check if any stakeholder records were found
        setIsStakeholder(data && data.length > 0);
      } catch (err) {
        console.error('Error checking stakeholder status:', err);
        setIsStakeholder(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkStakeholderStatus();
  }, [documentId]);

  return { isStakeholder, isLoading };
};