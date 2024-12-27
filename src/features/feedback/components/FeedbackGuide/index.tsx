import React from 'react';
import { MessageSquare, AlertTriangle, CheckCircle2, Target } from 'lucide-react';
import { FeedbackTypeGuide } from './FeedbackTypeGuide';
import { ConvictionGuide } from './ConvictionGuide';
import { StatusGuide } from './StatusGuide';
import { ConstructiveFeedbackGuide } from './ConstructiveFeedbackGuide';

export const FeedbackGuide: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
      <ConstructiveFeedbackGuide />
      <FeedbackTypeGuide />
      <ConvictionGuide />
      <StatusGuide />
    </div>
  );
};