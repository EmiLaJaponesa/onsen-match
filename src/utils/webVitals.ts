// Web Vitals monitoring for performance tracking
import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
}

const sendToAnalytics = (metric: Metric) => {
  // Log metrics in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  // In production, you could send to your analytics service
  // Example: Send to Supabase analytics
  /*
  try {
    const webVital: WebVitalMetric = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    };
    
    // You could track this with your analytics system
    // trackEvent('web_vitals', webVital);
  } catch (error) {
    // Silently fail in production
    if (import.meta.env.DEV) {
      console.error('Failed to send web vitals:', error);
    }
  }
  */
};

/**
 * Initialize Web Vitals monitoring
 * Tracks Core Web Vitals (CLS, INP, LCP) and other important metrics
 */
export const reportWebVitals = () => {
  // Core Web Vitals
  onCLS(sendToAnalytics);  // Cumulative Layout Shift
  onINP(sendToAnalytics);  // Interaction to Next Paint (replaces FID in Web Vitals v3+)
  onLCP(sendToAnalytics);  // Largest Contentful Paint
  
  // Other important metrics
  onFCP(sendToAnalytics);  // First Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte
};

/**
 * Get performance timing data from Navigation Timing API
 */
export const getNavigationTiming = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const perfData = window.performance.timing;
  const navigationStart = perfData.navigationStart;

  return {
    // Time to first byte
    ttfb: perfData.responseStart - navigationStart,
    // DOM content loaded
    domContentLoaded: perfData.domContentLoadedEventEnd - navigationStart,
    // Full page load
    loadComplete: perfData.loadEventEnd - navigationStart,
    // DNS lookup
    dnsLookup: perfData.domainLookupEnd - perfData.domainLookupStart,
    // TCP connection
    tcpConnection: perfData.connectEnd - perfData.connectStart,
    // Server response
    serverResponse: perfData.responseEnd - perfData.requestStart,
  };
};

