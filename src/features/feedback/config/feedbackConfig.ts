import { Clock, CheckCircle, CheckCheck } from 'lucide-react';
import type { StatusConfig, TypeConfig } from '../types';

export const statusConfig: Record<string, StatusConfig> = {
  pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  heard: { color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
  actioned: { color: 'bg-green-100 text-green-700', icon: CheckCheck },
};

export const typeConfig: Record<string, TypeConfig> = {
  general: { color: 'bg-neutral-gray-100 text-neutral-gray-700', label: 'General' },
  technical: { color: 'bg-blue-100 text-blue-700', label: 'Technical' },
  business: { color: 'bg-green-100 text-green-700', label: 'Business' },
  legal: { color: 'bg-purple-100 text-purple-700', label: 'Legal' },
};