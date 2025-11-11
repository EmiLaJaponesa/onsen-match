import { useState, useEffect, useMemo } from 'react';
import * as React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  fallbackIcon?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fallbackIcon = "♨️",
  className = "",
  width,
  height,
  ...props 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Optimize Supabase Storage images - keep cache busting only
  const optimizedSrc = React.useMemo(() => {
    if (src.includes('supabase.co/storage')) {
      const url = new URL(src);
      // Keep only cache busting parameter 't'
      const tParam = url.searchParams.get('t');
      url.search = '';
      if (tParam) url.searchParams.set('t', tParam);
      
      return url.toString();
    }
    return src;
  }, [src]);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [optimizedSrc]);

  if (error) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ${className}`}>
        <span className="text-4xl" role="img" aria-label="Onsen icon">
          {fallbackIcon}
        </span>
      </div>
    );
  }

  return (
    <img 
      src={optimizedSrc}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      onError={() => setError(true)}
      className={`${className} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      width={width}
      height={height}
      {...props}
    />
  );
};
