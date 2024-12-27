import type { Feedback as BaseFeedback } from '@/types/database';

export interface Profile {
  first_name: string;
  last_name: string;
}

export interface FeedbackWithProfile extends BaseFeedback {
  profiles?: Profile;
}

export interface StatusConfig {
  color: string;
  icon: React.FC<{ className?: string }>;
}

export interface TypeConfig {
  color: string;
  label: string;
}

export interface FeedbackSummary {
  id: string;
  content: string;
  type: string;
  conviction: string;
  status: string;
  section?: string;
  documentTitle: string;
  createdAt: string;
  authorName: string;
}

export interface FeedbackFilters {
  search?: string;
  type?: string;
  status?: string;
}