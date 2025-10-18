interface InfoSectionProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

export const InfoSection = ({ icon, title, content }: InfoSectionProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground">
          {title}
        </h3>
      </div>
      <p className="text-base md:text-lg text-muted-foreground leading-relaxed pl-13">
        {content}
      </p>
    </div>
  );
};
