import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArrowCircleButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  variant?: 'white' | 'black';
  size?: 'md' | 'lg';
}

export const ArrowCircleButton: React.FC<ArrowCircleButtonProps> = ({
  to,
  href,
  onClick,
  ariaLabel = 'View details',
  className = '',
  variant = 'white',
  size = 'md',
}) => {
  const isWhite = variant === 'white';
  const sizeClasses = size === 'lg' ? 'w-14 h-14' : 'w-11 h-11';
  const iconSize = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  const classes = `group/btn ${sizeClasses} rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
    isWhite
      ? 'bg-white text-[#0a0a0a] hover:bg-gray-100 focus-visible:ring-white'
      : 'bg-[#0a0a0a] text-white hover:bg-[#222222] focus-visible:ring-[#0a0a0a]'
  } ${className}`;

  const icon = (
    <ArrowUpRight
      className={`${iconSize} transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5`}
    />
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {icon}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {icon}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {icon}
    </button>
  );
};
