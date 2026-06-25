import { getTracingHeaders, SentryTracker } from '@/lib/observability';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  correlationId?: string
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Inject tracing headers
  const tracingHeaders = getTracingHeaders(correlationId);
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...tracingHeaders,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText || response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error: any) {
    // Log exception to Sentry
    SentryTracker.captureException(error, { url, tracingHeaders });
    throw error;
  }
}
