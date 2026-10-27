import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  aspectRatio,
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#e5e5e5] ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#e5e5e5] animate-pulse transition-opacity duration-300" />
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#e5e5e5] text-[#6b6b6b] p-4 text-center">
          <ImageOff className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-xs uppercase font-medium tracking-wider">Asset preview unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full transition-opacity duration-500 ${
            objectFit === 'cover' ? 'object-cover' : 'object-contain'
          } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};
