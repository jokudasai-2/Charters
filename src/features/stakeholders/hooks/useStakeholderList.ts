import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { handleError } from '@/lib/utils/errorHandling';
import type { StakeholderSummary, StakeholderFilters } from '../types';

export const useStakeholderList = (filters: StakeholderFilters) => {
  const [stakeholders, setStakeholders] = useState<StakeholderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStakeholders = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        let query = supabase
          .from('stakeholder_profiles')
          .select('*')
          .eq('owner_id', user.id);

        if (filters.role) {
          query = query.eq('role', filters.role);
        }

        if (filters.search) {
          const searchTerm = `%${filters.search}%`;
          query = query.or(
            `email.ilike.${searchTerm},department.ilike.${searchTerm},document_title.ilike.${searchTerm}`
          );
        }

        const { data, error: queryError } = await query;
        if (queryError) throw queryError;

        // Group by stakeholder for unique entries
        const stakeholderMap = new Map<string, StakeholderSummary>();
        
        data?.forEach(item => {
          if (!stakeholderMap.has(item.stakeholder_id)) {
            stakeholderMap.set(item.stakeholder_id, {
              id: item.stakeholder_id,
              firstName: item.first_name || '',
              lastName: item.last_name || '',
              role: item.role,
              department: item.department,
              documents: [{
                id: item.document_id,
                title: item.document_title,
                status: item.document_status,
                created_at: item.document_created_at
              }],
              documentCount: 1,
              lastActive: item.last_active,
            });
          }
        });

        setStakeholders(Array.from(stakeholderMap.values()));
      } catch (err) {
        console.error('Error fetching stakeholders:', err);
        setError(handleError(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStakeholders();
  }, [filters]);

  return { stakeholders, isLoading, error };
};