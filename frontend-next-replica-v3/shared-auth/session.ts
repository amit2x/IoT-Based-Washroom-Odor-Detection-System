import { Role } from './roles';

export interface SessionData {
  userId: string;
  name: string;
  role: Role;
  createdAt: number;
  expiresAt: number;
}

export function encryptSession(data: SessionData): string {
  const jsonStr = JSON.stringify(data);
  if (typeof btoa === 'function') {
    return btoa(unescape(encodeURIComponent(jsonStr)));
  }
  return Buffer.from(jsonStr, 'utf-8').toString('base64');
}

export function decryptSession(token: string): SessionData | null {
  try {
    let jsonStr = '';
    if (typeof atob === 'function') {
      jsonStr = decodeURIComponent(escape(atob(token)));
    } else {
      jsonStr = Buffer.from(token, 'base64').toString('utf-8');
    }
    const data = JSON.parse(jsonStr) as SessionData;
    
    // Check expiration
    if (Date.now() > data.expiresAt) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
