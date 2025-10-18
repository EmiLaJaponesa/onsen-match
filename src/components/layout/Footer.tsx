export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>Onsen Match</p>
          <div className="flex items-center gap-6">
            <a 
              href="https://www.emilajaponesa.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Desarrollado con ♥ por EMI JIN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
