import React from 'react';
import { Menu, BookOpen, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  onMenuClick: () => void;
  onInfoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onInfoClick }) => {
  return (
    <header className="bg-white border-b border-neutral-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-3 lg:hidden">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-semibold text-primary-ocean-700">Charters</span>
          </div>
        </div>

        <div className="flex items-center divide-x divide-neutral-gray-200">
          <div className="flex items-center pr-4">
            <Link to="/guides">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-neutral-gray-500 hover:text-neutral-gray-700"
              >
                <BookOpen className="h-5 w-5" />
                <span className="hidden sm:inline">Guides</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={onInfoClick}
              className="flex items-center space-x-2 text-neutral-gray-500 hover:text-neutral-gray-700 ml-2"
            >
              <Info className="h-5 w-5" />
              <span className="hidden sm:inline">Beta</span>
            </Button>
          </div>
          
          <div className="pl-4">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};