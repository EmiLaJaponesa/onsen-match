export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            Creado por{' '}
            <a 
              href="https://www.emilajaponesa.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              EMI JIN
            </a>
            {' '}© 2025 Onsen Match. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
