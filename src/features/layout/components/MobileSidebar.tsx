import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { SidebarNav } from './Sidebar/SidebarNav';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex z-40 lg:hidden">
      <div className="fixed inset-0 bg-neutral-gray-600 bg-opacity-75" onClick={onClose} />
      
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <Button variant="ghost" size="sm" onClick={onClose} className="ml-1">
            <X className="h-6 w-6 text-white" />
          </Button>
        </div>

        <div className="flex items-center px-6 pt-5 pb-4 border-b border-neutral-gray-200">
          <Logo className="h-10 w-10" />
          <span className="ml-3 text-xl font-bold text-primary-ocean-700">Charters</span>
        </div>

        <div className="flex-1 h-0 overflow-y-auto pt-5">
          <SidebarNav />
        </div>
      </div>
    </div>
  );
};