import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';
import type { Document } from '@/types/database';

interface DocumentListProps {
  documents: Document[];
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!documents.length) {
    return <span className="text-neutral-gray-500">No documents</span>;
  }

  const sortedDocuments = [...documents].sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-sm text-neutral-gray-600 hover:text-neutral-gray-900"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 mr-1" />
        ) : (
          <ChevronRight className="h-4 w-4 mr-1" />
        )}
        {documents.length} document{documents.length !== 1 ? 's' : ''}
      </button>
      
      {isExpanded && (
        <ul className="mt-2 space-y-1 pl-5">
          {sortedDocuments.map((doc) => (
            <li key={doc.id} className="flex items-center text-sm text-neutral-gray-700">
              <FileText className="h-4 w-4 mr-2 text-neutral-gray-400" />
              {doc.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};