interface ConfidenceBadgeProps {
  level: 'high' | 'medium' | 'exploratory';
  score: number;
}

export const ConfidenceBadge = ({ level, score }: ConfidenceBadgeProps) => {
  const config = {
    high: {
      color: 'bg-green-500',
      label: 'Alta confianza',
      description: 'Coincidencia muy fuerte'
    },
    medium: {
      color: 'bg-yellow-500',
      label: 'Media confianza',
      description: 'Buena coincidencia'
    },
    exploratory: {
      color: 'bg-blue-500',
      label: 'Exploratoria',
      description: 'Considera alternativas'
    }
  };
  
  const { color, label, description } = config[level];
  
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-white/20">
      <span className={`${color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
        {score}%
      </span>
      <div className="text-left">
        <div className="text-sm font-semibold text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};
