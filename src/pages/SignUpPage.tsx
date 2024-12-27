import React from 'react';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { SignUpForm } from '@/features/auth/components/SignUpForm';

export const SignUpPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start creating and managing your charters"
    >
      <SignUpForm />
    </AuthLayout>
  );
};