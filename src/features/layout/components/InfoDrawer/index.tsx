import React, { useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { MessageSquare } from 'lucide-react';

interface InfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoDrawer: React.FC<InfoDrawerProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFeedback('');
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Beta Feedback"
    >
      <div className="space-y-6">
        <div>
          <p className="text-neutral-gray-600 mb-2">
            We're currently in beta and would love to hear your thoughts about Charters.
          </p>
          <p className="text-sm text-neutral-gray-500">
            Your feedback will help us improve the platform for everyone.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-neutral-gray-900">What would you like to share?</h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-32 px-3 py-2 text-base rounded border border-neutral-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-teal-500"
            placeholder="Share your thoughts, suggestions, or report issues..."
          />
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={!feedback.trim() || isSubmitting}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{isSubmitting ? 'Sending...' : 'Send Feedback'}</span>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};