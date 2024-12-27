import React from 'react';
import { CreateCharterForm } from '@/features/charters/components/CreateCharterForm';

export const CreateCharterPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-gray-900">Create New Charter</h1>
        <p className="mt-1 text-sm text-neutral-gray-600">
          Fill out the form below to create a new charter document.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <CreateCharterForm />
      </div>
    </div>
  );
};