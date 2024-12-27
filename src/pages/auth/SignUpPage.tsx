import React from 'react';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { SignUpForm } from '@/features/auth/components/SignUpForm';

export const SignUpPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <p className="text-neutral-gray-600">
          Join Charters to streamline project alignment and stakeholder collaboration
        </p>
      }
    >
      <SignUpForm />
    </AuthLayout>
  );
};