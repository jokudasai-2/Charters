import React from 'react';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { SignInForm } from '@/features/auth/components/SignInForm';

export const SignInPage: React.FC = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle={
        <p className="text-neutral-gray-600">
          Sign in to manage your charters and collaborate with stakeholders
        </p>
      }
    >
      <SignInForm />
    </AuthLayout>
  );
};