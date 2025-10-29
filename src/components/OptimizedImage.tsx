import { useState, useEffect } from 'react';

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
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    
    if (priority) {
      setImageSrc(src);
    } else {
      const img = new Image();
      img.src = src;
      img.onload = () => setImageSrc(src);
      img.onerror = () => {
        // 3回まで再試行（キャッシュバスティング付き）
        if (retryCount < 3) {
          setTimeout(() => {
            const cacheBustedSrc = src.includes('?') 
              ? `${src}&retry=${retryCount + 1}`
              : `${src}?retry=${retryCount + 1}`;
            setImageSrc(cacheBustedSrc);
            setRetryCount(prev => prev + 1);
          }, 1000 * (retryCount + 1));
        } else {
          setError(true);
        }
      };
    }
  }, [src, priority, retryCount]);

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
