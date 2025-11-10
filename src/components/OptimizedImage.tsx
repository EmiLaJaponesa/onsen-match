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

  // Optimize Supabase Storage images with transformations
  const optimizedSrc = React.useMemo(() => {
    if (src.includes('supabase.co/storage')) {
      const url = new URL(src);
      // Remove existing query params except 't' (cache busting)
      const tParam = url.searchParams.get('t');
      url.search = '';
      if (tParam) url.searchParams.set('t', tParam);
      
      // Add image transformations for better performance
      // Use smaller default dimensions and higher compression for faster loading
      const targetWidth = width?.toString() || '200';
      const targetHeight = height?.toString() || '200';
      
      url.searchParams.set('width', targetWidth);
      url.searchParams.set('height', targetHeight);
      url.searchParams.set('resize', 'cover');
      url.searchParams.set('format', 'webp');
      url.searchParams.set('quality', '70'); // Reduced from 85 to 70 for smaller file size
      
      return url.toString();
    }
    return src;
  }, [src, width, height]);

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
