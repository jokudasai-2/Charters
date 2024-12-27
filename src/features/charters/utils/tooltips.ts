import type { Stakeholder, Feedback } from '@/types/database';

export const formatStakeholderTooltip = (stakeholders: Stakeholder[]): string => {
  if (!stakeholders?.length) return 'No stakeholders';
  
  const roleGroups = stakeholders.reduce((acc, s) => {
    if (!s?.role) return acc;
    const role = s.role.charAt(0).toUpperCase() + s.role.slice(1);
    if (!acc[role]) acc[role] = [];
    acc[role].push(`${s.email}${s.department ? ` (${s.department})` : ''}`);
    return acc;
  }, {} as Record<string, string[]>);

  return Object.entries(roleGroups)
    .map(([role, members]) => `${role}s:\n${members.map(m => `• ${m}`).join('\n')}`)
    .join('\n\n');
};

export const formatFeedbackTooltip = (feedback: Feedback[]): string => {
  if (!feedback?.length) return 'No feedback';

  const statusCounts = feedback.reduce((acc, f) => {
    if (!f?.status) return acc;
    acc[f.status] = (acc[f.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusColors = {
    pending: 'text-yellow-500',
    heard: 'text-blue-500',
    actioned: 'text-green-500',
  };

  return Object.entries(statusCounts)
    .map(([status, count]) => {
      const color = statusColors[status as keyof typeof statusColors];
      return `<div class="flex items-center ${color} mb-1">
        <span class="mr-2">${count}</span>
        <span class="capitalize">${status}</span>
      </div>`;
    })
    .join('');
};