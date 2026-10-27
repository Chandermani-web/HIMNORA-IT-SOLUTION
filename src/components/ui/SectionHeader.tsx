import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  theme = 'light', // light background by default
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`mb-10 sm:mb-14 ${
        align === 'center' ? 'text-center mx-auto max-w-4xl' : 'max-w-4xl'
      } ${className}`}
    >
      {/* Small UPPERCASE eyebrow label */}
      <div
        className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase mb-4 ${
          isDark ? 'text-gray-400' : 'text-[#6b6b6b]'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
        <span>{eyebrow}</span>
      </div>

      {/* Huge light-weight headline */}
      <h2
        className={`headline-editorial tracking-tight font-light ${
          isDark ? 'text-white' : 'text-[#0a0a0a]'
        }`}
      >
        {title}
      </h2>

      {/* Optional subtitle */}
      {subtitle && (
        <p
          className={`mt-5 text-base sm:text-lg leading-relaxed max-w-2xl font-normal ${
            align === 'center' ? 'mx-auto' : ''
          } ${isDark ? 'text-gray-400' : 'text-[#6b6b6b]'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
