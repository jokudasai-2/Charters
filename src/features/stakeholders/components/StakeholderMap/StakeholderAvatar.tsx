import React from 'react';

interface StakeholderAvatarProps {
  email: string;
  name: string;
  color: string;
  size?: 'sm' | 'md';
}

export const StakeholderAvatar: React.FC<StakeholderAvatarProps> = ({
  email,
  name,
  color,
  size = 'md'
}) => {
  // Get initials from name or email
  const getInitials = () => {
    if (name && name !== email) {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm'
  };

  return (
    <div
      className={`${color} ${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-medium flex-shrink-0`}
    >
      {getInitials()}
    </div>
  );
};