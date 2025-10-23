import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable container component for consistent layout
 */
export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4 py-12 md:py-20", className)}>
      <div className="max-w-4xl mx-auto space-y-8">
        {children}
      </div>
    </div>
  );
};
