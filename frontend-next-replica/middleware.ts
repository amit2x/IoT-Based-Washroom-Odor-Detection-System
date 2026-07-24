import { NextRequest } from 'next/server';
import { handleAuthMiddleware } from './shared-auth/middleware-helper';

export function middleware(request: NextRequest) {
  const loginPortalUrl = process.env.NEXT_PUBLIC_LOGIN_PORTAL_URL || 'http://localhost:3000';
  const currentPortalUrl = process.env.NEXT_PUBLIC_TERMINAL_PORTAL_URL || 'http://localhost:3002';

  return handleAuthMiddleware(request, {
    allowedRole: 'TERMINAL',
    loginPortalUrl,
    currentPortalUrl
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
