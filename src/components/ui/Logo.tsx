import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 240" 
      className={className}
    >
      <rect x="40" y="40" width="120" height="140" fill="#e0f2fe" rx="8"/>
      <rect x="30" y="50" width="120" height="140" fill="#7dd3fc" rx="8"/>
      <rect x="20" y="60" width="120" height="140" fill="#0891b2" rx="8"/>
      <text 
        x="45" 
        y="160" 
        fontFamily="Inter, Arial" 
        fontWeight="600" 
        fontSize="85" 
        fill="white"
      >
        C
      </text>
    </svg>
  );
};