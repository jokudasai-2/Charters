import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useStakeholderApprovals } from './useStakeholderApprovals';
import type { DocumentStatus } from '@/types/database';

export const useApprovalActions = (documentId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { recordApproval, hasApproved } = useStakeholderApprovals(documentId);

  const handleApprove = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: rpcError } = await supabase.rpc('record_stakeholder_approval', {
        p_document_id: documentId,
        p_email: (await supabase.auth.getUser()).data.user?.email
      });

      if (rpcError) throw new Error('Failed to record approval');
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('documents')
        .update({ status: 'rejected' as DocumentStatus })
        .eq('id', documentId);

      if (updateError) throw updateError;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleApprove,
    handleReject,
    isLoading,
    error,
    hasApproved
  };
};