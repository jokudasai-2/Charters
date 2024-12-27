import React from 'react';
import { AuthLayout } from './AuthLayout';
import { SignUpForm } from './SignUpForm';
import { WelcomeContent } from './WelcomeContent';

export const SignUpPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle={<WelcomeContent />}
    >
      <SignUpForm />
    </AuthLayout>
  );
};