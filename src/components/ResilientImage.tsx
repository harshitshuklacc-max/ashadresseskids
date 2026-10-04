import React, { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Asha Dresses NX',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF6F4] via-[#F5EBEB] to-[#EFE5E3] text-[#88131D] p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-10 h-10 mb-3 opacity-80 stroke-[#C81E2B]"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <span className="font-display text-base font-semibold text-[#191516] max-w-[20ch] leading-snug">
          {fallbackTitle}
        </span>
        <span className="text-xs text-[#6E6566] mt-1">
          Asha Dresses NX · Bilaspur
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
