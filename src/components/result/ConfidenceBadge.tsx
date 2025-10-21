import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface ConfidenceBadgeProps {
  level: 'high' | 'medium' | 'exploratory';
  percentage: number;
}

export const ConfidenceBadge = ({ level, percentage }: ConfidenceBadgeProps) => {
  const config = {
    high: {
      label: 'Alta confianza',
      color: 'bg-green-500 dark:bg-green-600',
      textColor: 'text-white',
      Icon: CheckCircle2
    },
    medium: {
      label: 'Confianza media',
      color: 'bg-yellow-500 dark:bg-yellow-600',
      textColor: 'text-white',
      Icon: AlertCircle
    },
    exploratory: {
      label: 'Resultado exploratorio',
      color: 'bg-blue-500 dark:bg-blue-600',
      textColor: 'text-white',
      Icon: HelpCircle
    }
  }[level];
  
  const { Icon } = config;
  
  return (
    <div className={`inline-flex items-center gap-2 ${config.color} ${config.textColor} px-4 py-2 rounded-full shadow-md`}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{config.label}</span>
      <span className="font-bold">{percentage}%</span>
    </div>
  );
};
