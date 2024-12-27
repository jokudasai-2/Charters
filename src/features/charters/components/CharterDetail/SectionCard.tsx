import React from 'react';
import { SectionFeedback } from '@/features/feedback/components/SectionFeedback';
import { useSectionFeedback } from '@/features/feedback/hooks/useSectionFeedback';

interface SectionCardProps {
  title: string;
  content: string;
  documentId: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  content,
  documentId,
}) => {
  const { feedbackCount, isLoading } = useSectionFeedback(documentId, title.toLowerCase());

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-neutral-gray-900">{title}</h3>
        <SectionFeedback
          section={title.toLowerCase()}
          documentId={documentId}
          feedbackCount={feedbackCount}
          isLoading={isLoading}
        />
      </div>
      <div className="prose prose-sm max-w-none text-neutral-gray-700">
        {content.split('\n').map((line, i) => (
          <p key={i} className="mb-2 last:mb-0">{line}</p>
        ))}
      </div>
    </div>
  );
};