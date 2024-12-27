import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary-teal-50 text-primary-teal-700'
            : 'text-neutral-gray-600 hover:bg-neutral-gray-50 hover:text-neutral-gray-900'
        )
      }
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </NavLink>
  );
};