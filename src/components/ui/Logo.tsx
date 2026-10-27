import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '', onClick }) => {
  const isDarkTheme = variant === 'light'; // on dark background

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 ${className}`}
      aria-label="Himnora IT Solution - Home"
    >
      {/* Monogram Badge */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm tracking-tighter transition-transform duration-300 group-hover:scale-105 ${
          isDarkTheme ? 'bg-white text-[#0a0a0a]' : 'bg-[#0a0a0a] text-white'
        }`}
      >
        <span className="relative font-mono font-extrabold text-base">H</span>
      </div>

      {/* Wordmark and label */}
      <div className="flex flex-col">
        <span
          className={`font-extrabold text-lg sm:text-xl tracking-tight leading-none uppercase ${
            isDarkTheme ? 'text-white' : 'text-[#0a0a0a]'
          }`}
        >
          HIMNORA
        </span>
        <span
          className={`text-[9px] font-semibold tracking-[0.2em] uppercase mt-0.5 ${
            isDarkTheme ? 'text-gray-400' : 'text-[#6b6b6b]'
          }`}
        >
          IT Solution
        </span>
      </div>
    </Link>
  );
};
