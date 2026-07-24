'use client';

// Simple UUID generator for tracking IDs
function generateUUID(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Generate unique tracing context headers
export interface TracingHeaders {
  'X-Request-ID': string;
  'X-Trace-ID': string;
  'X-Correlation-ID': string;
}

export function getTracingHeaders(correlationId?: string): TracingHeaders {
  const traceId = generateUUID();
  const requestId = generateUUID();
  const activeCorrelationId = correlationId || generateUUID();

  return {
    'X-Request-ID': requestId,
    'X-Trace-ID': traceId,
    'X-Correlation-ID': activeCorrelationId,
  };
}

// Simulated Sentry integration for client-side crash tracking
export const SentryTracker = {
  init: () => {
    if (typeof window !== 'undefined') {
      console.log('[Observability] Sentry client initialized: Session Replay, Performance Monitoring active.');
    }
  },
  captureException: (error: any, context?: any) => {
    console.error('[Observability] Captured crash exception:', error, context);
  },
  logUserJourney: (pageName: string, action: string) => {
    console.log(`[Observability] Journey tracking: Page [${pageName}] Action [${action}]`);
  }
};
