import React from 'react';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { SignInForm } from '@/features/auth/components/SignInForm';

export const SignInPage: React.FC = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
    >
      <SignInForm />
    </AuthLayout>
  );
};