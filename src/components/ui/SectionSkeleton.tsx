import { cn } from "@/lib/utils";

interface SectionSkeletonProps {
  className?: string;
  lines?: number;
}

export const SectionSkeleton = ({ className, lines = 3 }: SectionSkeletonProps) => {
  return (
    <div className={cn("space-y-4 animate-pulse", className)}>
      {/* Title skeleton with shimmer effect */}
      <div className="relative overflow-hidden">
        <div className="h-8 bg-muted rounded w-3/4 mb-4" />
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      
      {/* Content lines skeleton */}
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="relative overflow-hidden">
          <div 
            className="h-4 bg-muted rounded" 
            style={{ width: i === lines - 1 ? '83%' : '100%' }}
          />
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" 
               style={{ animationDelay: `${i * 0.1}s` }} />
        </div>
      ))}
    </div>
  );
};
