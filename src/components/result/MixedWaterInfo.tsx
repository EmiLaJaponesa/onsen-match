import { Info } from 'lucide-react';

export const MixedWaterInfo = () => {
  return (
    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg animate-fade-in">
      <div className="flex gap-3">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
            Sobre las mezclas de agua
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Muchos onsen en Japón combinan varios tipos de agua mineral. Este resultado 
            representa el <strong>tipo principal</strong> más cercano a tus respuestas. 
            En la práctica, encontrarás matices y beneficios adicionales que enriquecen la experiencia.
          </p>
        </div>
      </div>
    </div>
  );
};
