export interface AnalyticsEvent {
  eventType: string;
  eventData?: Record<string, any>;
  pagePath?: string;
}

export const ALLOWED_EVENT_TYPES = [
  'page_view',
  'quiz_started',
  'quiz_completed',
  'scroll_depth',
  'cta_click',
  'share_click',
] as const;

export type AllowedEventType = typeof ALLOWED_EVENT_TYPES[number];
