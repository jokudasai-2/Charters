import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toast } from '@/components/ui/Toast';
import { useSignUp } from '../hooks/useSignUp';
import { useToast } from '../hooks/useToast';

export const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const { signUp, isLoading, error } = useSignUp();
  const { toast, showToast, hideToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signUp(formData);
    if (success) {
      showToast('Profile created successfully! Redirecting...');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Existing form fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label htmlFor="firstName" className="block text-sm font-medium text-neutral-gray-700 mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastName" className="block text-sm font-medium text-neutral-gray-700 mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full"
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full"
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
            />
          </div>
        </div>

        {error && (
          <div className="text-secondary-red text-sm">{error.message}</div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Sign up'}
        </Button>

        <p className="text-center text-sm text-neutral-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary-teal-500 hover:text-primary-teal-600">
            Sign in
          </Link>
        </p>
      </form>

      {toast.isVisible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </>
  );
};