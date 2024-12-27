import type { Document, Stakeholder, Feedback } from '@/types/database';

export interface UseCase {
  id: string;
  description: string;
}

export interface CreateCharterData {
  title: string;
  description: string;
  problem_statement: string;
  target_user: string;
  use_cases: UseCase[];
  business_case: string;
  risks: string;
}

export interface CharterSummary extends Document {
  stakeholderCount: number;
  feedbackCount: number;
  stakeholders: Stakeholder[];
  feedback: Feedback[];
  isOwner: boolean;
}

export type CreateCharterError = {
  [K in keyof CreateCharterData]?: string;
} & {
  general?: string;
};