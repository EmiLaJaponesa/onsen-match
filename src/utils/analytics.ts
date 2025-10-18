import { supabase } from "@/integrations/supabase/client";
import { getSessionId } from "./sessionManager";

interface AnalyticsEvent {
  eventType: string;
  eventData?: Record<string, any>;
  pagePath?: string;
}

/**
 * Detect device type based on screen width
 */
export function getDeviceType(): string {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Extract referrer domain for privacy protection
 * Returns only the hostname, not the full URL
 */
export function getReferrerDomain(): string | null {
  if (!document.referrer) return null;
  try {
    const url = new URL(document.referrer);
    return url.hostname;
  } catch {
    return null;
  }
}

/**
 * Check if analytics tracking is enabled
 * Users can opt-out by setting localStorage flag
 */
export function isAnalyticsEnabled(): boolean {
  return localStorage.getItem('analytics_disabled') !== 'true';
}

/**
 * Track custom events with flexible data structure
 */
export async function trackEvent({ 
  eventType, 
  eventData = {}, 
  pagePath 
}: AnalyticsEvent): Promise<void> {
  if (!isAnalyticsEnabled()) return;

  try {
    await supabase.from('analytics_events').insert({
      session_id: getSessionId(),
      event_type: eventType,
      event_data: eventData,
      page_path: pagePath || window.location.pathname,
      referrer: getReferrerDomain(),
      device_type: getDeviceType(),
      browser_language: navigator.language,
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

/**
 * Track UTM parameters from URL
 * Call this once on app initialization
 */
export async function trackUTMParams(): Promise<void> {
  if (!isAnalyticsEnabled()) return;

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');
  
  if (utmSource) {
    try {
      await supabase.from('utm_tracking').insert({
        session_id: getSessionId(),
        utm_source: utmSource,
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
        utm_content: params.get('utm_content'),
        utm_term: params.get('utm_term'),
        landing_page: window.location.pathname,
      });
    } catch (error) {
      console.error('UTM tracking error:', error);
    }
  }
}

/**
 * Track scroll depth at 25%, 50%, 75%, and 100%
 * Returns cleanup function
 */
export function trackScrollDepth(): () => void {
  if (!isAnalyticsEnabled()) return () => {};

  const depths = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    
    depths.forEach(depth => {
      if (scrolled >= depth && !tracked.has(depth)) {
        tracked.add(depth);
        trackEvent({
          eventType: 'scroll_depth',
          eventData: { depth: `${depth}%` }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}

/**
 * Track page view
 */
export async function trackPageView(pagePath?: string): Promise<void> {
  await trackEvent({
    eventType: 'page_view',
    pagePath: pagePath || window.location.pathname
  });
}
