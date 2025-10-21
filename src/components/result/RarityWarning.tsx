import { AlertTriangle } from 'lucide-react';
import { OnsenType } from '@/types/onsen';

interface RarityWarningProps {
  type: OnsenType;
}

// Types considered rare
const RARE_TYPES: OnsenType[] = ['radon', 'carbonated', 'alkaline', 'ferruginous'];

export const RarityWarning = ({ type }: RarityWarningProps) => {
  if (!RARE_TYPES.includes(type)) return null;
  
  return (
    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-lg animate-fade-in">
      <div className="flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
            Nota sobre disponibilidad
          </p>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            Este tipo de agua es <strong>poco frecuente</strong> en Japón y puede encontrarse 
            en regiones específicas. Te recomendamos verificar disponibilidad antes de planificar 
            tu viaje o considerar la opción alternativa que aparece arriba.
          </p>
        </div>
      </div>
    </div>
  );
};
