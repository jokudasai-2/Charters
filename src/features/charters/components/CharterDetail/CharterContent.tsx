import React from 'react';
import { EditableSection } from './EditableSection';
import type { Document } from '@/types/database';

interface CharterContentProps {
  charter: Document;
  isOwner: boolean;
}

export const CharterContent: React.FC<CharterContentProps> = ({ charter, isOwner }) => {
  const sections = [
    { title: 'Description', field: 'description', content: charter.description },
    { title: 'Problem Statement', field: 'problem_statement', content: charter.problem_statement },
    { title: 'Target User', field: 'target_user', content: charter.target_user },
    { title: 'Business Case', field: 'business_case', content: charter.business_case },
    { title: 'Risks', field: 'risks', content: charter.risks },
    { title: 'Use Cases', field: 'use_cases', content: charter.use_cases },
  ];

  return (
    <div className="space-y-6">
      {sections.map(({ title, field, content }) => content && (
        <EditableSection
          key={field}
          title={title}
          content={content}
          field={field}
          documentId={charter.id}
          isOwner={isOwner}
        />
      ))}
    </div>
  );
};