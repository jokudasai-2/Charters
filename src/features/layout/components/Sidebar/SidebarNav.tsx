import React from 'react';
import { FileText, Users, MessageSquare, BookOpen, Network } from 'lucide-react';
import { SidebarLink } from './SidebarLink';

export const SidebarNav: React.FC = () => {
  return (
    <nav className="space-y-1">
      <SidebarLink to="/" icon={FileText}>Charters</SidebarLink>
      <SidebarLink to="/feedback" icon={MessageSquare}>Feedback</SidebarLink>
      <SidebarLink to="/stakeholders" icon={Users}>Stakeholders</SidebarLink>
      <SidebarLink to="/stakeholder-maps" icon={Network}>Maps</SidebarLink>
      <SidebarLink to="/guides" icon={BookOpen}>Guides</SidebarLink>
    </nav>
  );
};