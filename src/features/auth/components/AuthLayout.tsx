import React from 'react';
import { FileText } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-neutral-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-teal-50 p-3 rounded-lg">
              <FileText className="h-12 w-12 text-primary-teal-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-neutral-gray-900 mb-3">{title}</h1>
          {subtitle}
        </div>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
          {children}
        </div>
      </div>
    </div>
  );
};