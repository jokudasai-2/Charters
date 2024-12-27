import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSignIn } from '../hooks/useSignIn';

export const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { signIn, isLoading, error } = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    await signIn(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="space-y-4">
        <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium text-neutral-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value.trim() }))}
            className="w-full"
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block text-sm font-medium text-neutral-gray-700 mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="w-full"
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>
      </div>

      {error?.message && (
        <div className="text-secondary-red text-sm" role="alert">
          {error.message}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading || !formData.email || !formData.password}>
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>

      <p className="text-center text-sm text-neutral-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary-teal-500 hover:text-primary-teal-600">
          Sign up
        </Link>
      </p>
    </form>
  );
};