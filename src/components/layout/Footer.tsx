import { ExternalLink } from "lucide-react";

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
          
          <a
            href="https://lovable.dev/invite/OFNWEYX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors group"
          >
            <span>Si te gustó este app, puedes crear el tuyo también con Lovable</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
};
