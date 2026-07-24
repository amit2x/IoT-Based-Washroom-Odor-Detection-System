import { NextRequest } from 'next/server';
import { handleAuthMiddleware } from './shared-auth/middleware-helper';

export function middleware(request: NextRequest) {
  const loginPortalUrl = process.env.NEXT_PUBLIC_LOGIN_PORTAL_URL || 'http://localhost:3000';
  const currentPortalUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'http://localhost:3001';

  return handleAuthMiddleware(request, {
    allowedRole: 'ADMIN',
    loginPortalUrl,
    currentPortalUrl
  });
}

export const config = {
  matcher: [
    // Protect all routes except static public files, api routes, etc.
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
