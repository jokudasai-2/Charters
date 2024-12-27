import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { SignUpData, AuthError } from '../types';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const navigate = useNavigate();

  const signUp = async ({ email, password, firstName, lastName }: SignUpData) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              first_name: firstName,
              last_name: lastName,
            },
          ]);

        if (profileError) throw profileError;
        
        navigate('/', { state: { signupSuccess: true } });
        return true;
      }
      return false;
    } catch (err) {
      setError({ message: (err as Error).message });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
};