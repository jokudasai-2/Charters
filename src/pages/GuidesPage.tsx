import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Collapsible } from '@/components/ui/Collapsible';
import { CharterGuide } from '@/features/charters/components/CharterGuide';
import { WhyUseCharter } from '@/features/charters/components/CharterGuide/WhyUseCharter';
import { StakeholderGuide } from '@/features/stakeholders/components/StakeholderGuide';
import { FeedbackGuide } from '@/features/feedback/components/FeedbackGuide';

const guides = [
  { id: 'why-use', title: 'Why Use Charters', content: WhyUseCharter },
  { id: 'charter-guide', title: 'Creating Effective Charters', content: CharterGuide },
  { id: 'stakeholder-guide', title: 'Stakeholder Management', content: StakeholderGuide },
  { id: 'feedback-guide', title: 'Feedback Best Practices', content: FeedbackGuide },
];

export const GuidesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const filteredGuides = useMemo(() => {
    if (!searchQuery) return guides;
    
    const query = searchQuery.toLowerCase();
    return guides.filter(guide => 
      guide.title.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleAllSections = () => {
    const areAllExpanded = guides.every(guide => expandedSections[guide.id]);
    const newState = guides.reduce((acc, guide) => ({
      ...acc,
      [guide.id]: !areAllExpanded
    }), {});
    setExpandedSections(newState);
  };

  const handleSectionToggle = (id: string, isOpen: boolean) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: isOpen
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-gray-900">Guides</h1>
        <p className="mt-1 text-sm text-neutral-gray-600">
          Learn best practices and get the most out of Charters.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-gray-400" />
            <Input
              type="search"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={toggleAllSections}
            className="text-sm text-neutral-gray-600 hover:text-neutral-gray-700"
          >
            {guides.every(guide => expandedSections[guide.id]) ? 'Collapse all' : 'Expand all'}
          </button>
        </div>

        <div className="space-y-4">
          {filteredGuides.map(guide => {
            const GuideContent = guide.content;
            return (
              <Collapsible
                key={guide.id}
                title={guide.title}
                isOpen={expandedSections[guide.id]}
                onOpenChange={(isOpen) => handleSectionToggle(guide.id, isOpen)}
              >
                <div className="p-6">
                  <GuideContent />
                </div>
              </Collapsible>
            );
          })}
        </div>
      </div>
    </div>
  );
};