'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseWebSocketOptions {
  onMessage?: (data: any) => void;
  autoConnect?: boolean;
}

export function useWebSocket(url: string, options: UseWebSocketOptions = {}) {
  const { onMessage, autoConnect = true } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  
  const connect = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Close existing connection if any
    if (socketRef.current) {
      socketRef.current.close();
    }

    try {
      const socket = new WebSocket(url);
      socketRef.current = socket;

      socket.onopen = () => {
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
        console.log(`[WebSocket] Connected to ${url}`);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage?.(data);
        } catch (err) {
          console.warn('[WebSocket] Received non-JSON payload:', event.data);
          onMessage?.(event.data);
        }
      };

      socket.onerror = (err) => {
        setError(err);
        console.error('[WebSocket] Connection error:', err);
      };

      socket.onclose = () => {
        setIsConnected(false);
        console.log(`[WebSocket] Connection closed for ${url}`);
        
        // Attempt reconnection with exponential backoff (max 30s)
        const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
        reconnectAttemptsRef.current += 1;
        
        console.log(`[WebSocket] Attempting reconnect in ${delay}ms...`);
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, delay);
      };
    } catch (err) {
      console.error('[WebSocket] Connection initialization failed:', err);
    }
  }, [url, onMessage]);

  const sendMessage = useCallback((msg: any) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } else {
      console.warn('[WebSocket] Cannot send message: socket is not connected');
    }
  }, [isConnected]);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        socketRef.current.onclose = null; // Prevent reconnect on clean unmount
        socketRef.current.close();
      }
    };
  }, [connect, autoConnect]);

  return { isConnected, error, sendMessage, reconnect: connect };
}
