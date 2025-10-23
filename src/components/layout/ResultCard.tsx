import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ResultCardProps {
  children: ReactNode;
}

/**
 * Styled card component for result pages
 */
export const ResultCard = ({ children }: ResultCardProps) => {
  return (
    <Card className="shadow-2xl border border-white/20 animate-fade-in overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 transition-all duration-300">
      <CardContent className="p-8 md:p-12 space-y-10">
        {children}
      </CardContent>
    </Card>
  );
};
