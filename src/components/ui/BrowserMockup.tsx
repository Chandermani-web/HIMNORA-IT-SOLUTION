import React from 'react';
import { Lock } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface BrowserMockupProps {
  imageSrc: string;
  imageAlt: string;
  urlHost?: string;
  className?: string;
  priority?: boolean;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  imageSrc,
  imageAlt,
  urlHost = 'app.himnora.com',
  className = '',
  priority = false,
}) => {
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl bg-[#141414] border border-[#262626] shadow-2xl transition-transform duration-500 group-hover:scale-[1.01] ${className}`}
    >
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#1a1a1a] border-b border-[#262626]">
        {/* Window controls (traffic lights) */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>

        {/* URL Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0f0f0f] rounded-md text-[11px] text-gray-400 font-mono max-w-[200px] sm:max-w-xs truncate border border-[#2a2a2a]">
          <Lock className="w-2.5 h-2.5 text-gray-400 shrink-0" />
          <span className="truncate">{urlHost}</span>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-10 flex justify-end">
          <span className="w-2 h-2 rounded-full bg-[#333333]" />
        </div>
      </div>

      {/* Screen Frame with cover image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0d0d]">
        <SmartImage
          src={imageSrc}
          alt={imageAlt}
          priority={priority}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle dark gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
