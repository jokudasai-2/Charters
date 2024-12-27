import type { Document, StakeholderDepartment } from '@/types/database';

export interface StakeholderSummary {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  department: StakeholderDepartment;
  documents: Document[];
  documentCount: number;
  lastActive: string;
}

export interface StakeholderStats {
  total: number;
  contributors: number;
  leadership: number;
}

export interface StakeholderFilters {
  role?: string;
  search?: string;
}