import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/features/auth/hooks/useUser';

interface StakeholderApproval {
  stakeholderId: string;
  hasApproved: boolean;
}

export const useStakeholderApprovals = (documentId: string) => {
  const [approvals, setApprovals] = useState<StakeholderApproval[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { email } = useUser();

  useEffect(() => {
    const fetchApprovals = async () => {
      if (!email) return;
      
      try {
        // First get stakeholder ID
        const { data: stakeholder, error: stakeholderError } = await supabase
          .from('stakeholders')
          .select('id')
          .eq('document_id', documentId)
          .eq('email', email)
          .maybeSingle();

        if (stakeholderError) throw stakeholderError;
        if (!stakeholder) {
          setApprovals([]);
          return;
        }

        // Then get approval status
        const { data: approval, error: approvalError } = await supabase
          .from('stakeholder_approvals')
          .select('has_approved')
          .eq('document_id', documentId)
          .eq('stakeholder_id', stakeholder.id)
          .maybeSingle();

        if (approvalError) throw approvalError;

        setApprovals([{
          stakeholderId: stakeholder.id,
          hasApproved: approval?.has_approved || false
        }]);
      } catch (err) {
        console.error('Error fetching approvals:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovals();

    const subscription = supabase
      .channel('stakeholder_approvals')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'stakeholder_approvals',
        filter: `document_id=eq.${documentId}`
      }, fetchApprovals)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [documentId, email]);

  const recordApproval = async () => {
    if (!email) {
      setError(new Error('User not authenticated'));
      return false;
    }

    try {
      setError(null);

      const { error: rpcError } = await supabase.rpc('record_stakeholder_approval', {
        p_document_id: documentId,
        p_email: email
      });

      if (rpcError) throw rpcError;

      return true;
    } catch (err) {
      console.error('Error recording approval:', err);
      setError(err as Error);
      return false;
    }
  };

  const hasApproved = approvals.some(a => a.hasApproved);

  return {
    approvals,
    isLoading,
    error,
    recordApproval,
    hasApproved
  };
};