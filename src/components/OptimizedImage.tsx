import { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackIcon?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  fallbackIcon = "♨️",
  className = "",
  ...props 
}: OptimizedImageProps) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ${className}`}>
        <span className="text-4xl">{fallbackIcon}</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
};
