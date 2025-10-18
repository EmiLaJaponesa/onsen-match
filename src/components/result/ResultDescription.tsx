interface ResultDescriptionProps {
  description: string;
}

export const ResultDescription = ({ description }: ResultDescriptionProps) => {
  return (
    <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
        Descripción
      </h3>
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" style={{ lineHeight: '1.8' }}>
        {description}
      </p>
    </div>
  );
};
