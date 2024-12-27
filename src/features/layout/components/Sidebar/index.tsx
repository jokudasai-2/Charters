import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { SidebarNav } from './SidebarNav';

export const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-neutral-gray-200 lg:bg-white lg:pt-5 lg:pb-4">
      <div className="flex items-center px-6 pb-4 border-b border-neutral-gray-200">
        <Logo className="h-10 w-10" />
        <span className="ml-3 text-xl font-bold text-primary-ocean-700">Charters</span>
      </div>
      <div className="flex-1 flex flex-col justify-between mt-5 overflow-y-auto">
        <div className="px-4">
          <SidebarNav />
        </div>
      </div>
    </div>
  );
};