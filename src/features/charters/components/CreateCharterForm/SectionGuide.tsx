import React from 'react';
import { Info } from 'lucide-react';

interface SectionGuideProps {
  title: string;
  tips: string[];
  example?: string;
}

export const SectionGuide: React.FC<SectionGuideProps> = ({ title, tips, example }) => {
  return (
    <div className="mb-4">
      <div className="flex items-start space-x-2">
        <Info className="h-5 w-5 text-primary-ocean-500 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-neutral-gray-900 mb-1">{title}</h4>
          <ul className="text-sm text-neutral-gray-600 space-y-1 list-disc list-inside">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          {example && (
            <div className="mt-2 p-3 bg-neutral-gray-50 rounded-md text-sm text-neutral-gray-600">
              <strong>Example:</strong> {example}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};