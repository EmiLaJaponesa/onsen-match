import { useState, useEffect, useRef } from 'react';

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
  ...props 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const retryCountRef = useRef(0);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    retryCountRef.current = 0;
    
    const loadImage = () => {
      const img = new Image();
      const cacheBustedSrc = src.includes('?') 
        ? `${src}&t=${Date.now()}`
        : `${src}?t=${Date.now()}`;
      img.src = cacheBustedSrc;
      
      img.onload = () => {
        setImageSrc(cacheBustedSrc);
        setIsLoaded(true);
      };
      
      img.onerror = () => {
        if (retryCountRef.current < 3) {
          retryCountRef.current += 1;
          setTimeout(() => {
            loadImage();
          }, 1000 * retryCountRef.current);
        } else {
          setError(true);
        }
      };
    };

    if (priority) {
      setImageSrc(src);
      setIsLoaded(true);
    } else {
      loadImage();
    }
  }, [src, priority]);

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
      src={imageSrc}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      onError={() => setError(true)}
      className={`${className} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      {...props}
    />
  );
};
