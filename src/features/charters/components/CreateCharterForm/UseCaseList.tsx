import React from 'react';
import { PlusCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { UseCase } from '../../types';

interface UseCaseListProps {
  useCases: UseCase[];
  onChange: (useCases: UseCase[]) => void;
  error?: string;
}

export const UseCaseList: React.FC<UseCaseListProps> = ({
  useCases,
  onChange,
  error,
}) => {
  const addUseCase = () => {
    onChange([
      ...useCases,
      { id: crypto.randomUUID(), description: '' },
    ]);
  };

  const removeUseCase = (id: string) => {
    onChange(useCases.filter(uc => uc.id !== id));
  };

  const updateUseCase = (id: string, description: string) => {
    onChange(
      useCases.map(uc =>
        uc.id === id ? { ...uc, description } : uc
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-neutral-gray-700">
          Use Cases
        </label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addUseCase}
          className="flex items-center space-x-1 text-primary-teal-500"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Use Case</span>
        </Button>
      </div>

      <div className="space-y-3">
        {useCases.map((useCase, index) => (
          <div key={useCase.id} className="flex items-start space-x-2">
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-neutral-gray-500">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  value={useCase.description}
                  onChange={(e) => updateUseCase(useCase.id, e.target.value)}
                  placeholder="Describe the use case"
                  className="flex-grow px-3 py-2 border border-neutral-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-teal-500"
                />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeUseCase(useCase.id)}
              className="text-neutral-gray-400 hover:text-secondary-red"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-secondary-red">{error}</p>
      )}

      {useCases.length === 0 && (
        <p className="text-sm text-neutral-gray-500 italic">
          No use cases added yet. Click "Add Use Case" to get started.
        </p>
      )}
    </div>
  );
};