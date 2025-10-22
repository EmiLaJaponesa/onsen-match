export const APP_CONFIG = {
  QUIZ_TOTAL_QUESTIONS: 6,
  MOBILE_BREAKPOINT: 768,
  SCROLL_DEBOUNCE: 150,
  CAROUSEL_SLIDE_PERCENTAGE: 88,
} as const;

export const EXTERNAL_LINKS = {
  JAPAN_TOURS: 'https://japontoursenespanol.com/',
} as const;

export const SOCIAL_SHARE_TEXT = {
  RESULT_TEMPLATE: (title: string) => `¡Descubrí mi tipo de onsen ideal: ${title}! 🇯🇵♨️ Encuentra el tuyo aquí:`,
  INSTAGRAM_COPY_SUCCESS: '¡Enlace copiado!',
  INSTAGRAM_COPY_DESCRIPTION: 'Pégalo en tu historia o publicación de Instagram',
  COPY_ERROR: 'Error',
  COPY_ERROR_DESCRIPTION: 'No se pudo copiar el enlace',
} as const;
