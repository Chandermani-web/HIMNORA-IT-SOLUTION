import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

interface CircleCTAProps {
  label: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'dark' | 'light';
  size?: 'default' | 'sm';
  className?: string;
  disabled?: boolean;
}

export const CircleCTA: React.FC<CircleCTAProps> = ({
  label,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'dark',
  size = 'default',
  className = '',
  disabled = false,
}) => {
  const isLight = variant === 'light';
  const circleSize = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  const content = (
    <>
      <span
        className={`${circleSize} rounded-full flex items-center justify-center shrink-0 transition-transform duration-500 ease-out group-hover:rotate-90 shadow-sm ${
          isLight ? 'bg-white text-[#0a0a0a]' : 'bg-[#0a0a0a] text-white'
        }`}
        aria-hidden="true"
      >
        <Plus className={iconSize} strokeWidth={2.5} />
      </span>
      <span
        className={`font-semibold tracking-wider text-xs sm:text-sm uppercase transition-colors ${
          isLight
            ? 'text-white group-hover:text-gray-200'
            : 'text-[#0a0a0a] group-hover:text-black'
        }`}
      >
        {label}
      </span>
    </>
  );

  const baseClasses = `group inline-flex items-center gap-3.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0a0a0a] rounded-full p-1 -m-1 transition-all ${
    disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {content}
    </button>
  );
};
