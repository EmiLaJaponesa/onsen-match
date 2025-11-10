// Lazy-loaded analytics wrapper to defer Supabase client loading
// This reduces initial bundle size by loading analytics code only when needed

export const trackPageView = async (pagePath?: string) => {
  const { trackPageView: track } = await import('./analytics');
  return track(pagePath);
};

export const trackUTMParams = async () => {
  const { trackUTMParams: track } = await import('./analytics');
  return track();
};

export const trackScrollDepth = async () => {
  const { trackScrollDepth: track } = await import('./analytics');
  return track();
};

export const trackEvent = async (event: any) => {
  const { trackEvent: track } = await import('./analytics');
  return track(event);
};
