import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { sendStakeholderNotification } from '@/lib/email';
import type { CreateCharterData, CreateCharterError } from '../types';
import type { DocumentStatus, StakeholderRole } from '@/types/database';

interface Stakeholder {
  department: string;
  email: string;
  role: StakeholderRole;
}

export const useCreateCharter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CreateCharterError | null>(null);
  const navigate = useNavigate();

  const validateData = (data: CreateCharterData) => {
    const errors: CreateCharterError = {};
    
    if (!data.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!data.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!data.problem_statement.trim()) {
      errors.problem_statement = 'Problem statement is required';
    }
    
    if (!data.target_user.trim()) {
      errors.target_user = 'Target user is required';
    }
    
    if (data.use_cases.length === 0) {
      errors.use_cases = 'At least one use case is required';
    }
    
    if (!data.business_case.trim()) {
      errors.business_case = 'Business value is required';
    }
    
    return Object.keys(errors).length > 0 ? errors : null;
  };

  const saveCharter = async (
    data: CreateCharterData,
    stakeholders: Stakeholder[],
    isDraft: boolean = false
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      // Skip validation for drafts
      if (!isDraft) {
        const validationErrors = validateData(data);
        if (validationErrors) {
          setError(validationErrors);
          return false;
        }
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError({ general: 'You must be logged in to create a charter' });
        return false;
      }

      const status: DocumentStatus = isDraft ? 'draft' : 'pending_review';

      // Insert charter
      const { data: charter, error: insertError } = await supabase
        .from('documents')
        .insert([{
          title: data.title.trim(),
          description: data.description.trim(),
          problem_statement: data.problem_statement.trim(),
          target_user: data.target_user.trim(),
          use_cases: data.use_cases.map(uc => uc.description.trim()).join('\n'),
          business_case: data.business_case.trim(),
          risks: data.risks.trim(),
          user_id: user.id,
          status,
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      // Insert stakeholders and send notifications
      if (charter && stakeholders.length > 0) {
        const validStakeholders = stakeholders.filter(s => s.email.trim());
        
        if (validStakeholders.length > 0) {
          const { error: stakeholderError } = await supabase
            .from('stakeholders')
            .insert(
              validStakeholders.map(s => ({
                document_id: charter.id,
                email: s.email.trim(),
                role: s.role,
                department: s.department,
                type: 'email',
              }))
            );

          if (stakeholderError) throw stakeholderError;

          // Send notifications to all stakeholders
          await Promise.all(
            validStakeholders.map(stakeholder =>
              sendStakeholderNotification(
                charter.id,
                stakeholder.email,
                charter.title,
                user.email || 'Unknown'
              )
            )
          );
        }
      }

      if (!isDraft) {
        navigate('/');
      }
      
      return true;
    } catch (err) {
      console.error('Error saving charter:', err);
      setError({ 
        general: 'Failed to save charter. Please try again.' 
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { saveCharter, isLoading, error };
};