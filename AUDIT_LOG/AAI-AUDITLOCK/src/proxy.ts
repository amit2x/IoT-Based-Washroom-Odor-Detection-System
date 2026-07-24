import { NextResponse, NextRequest } from 'next/server';
import { decryptSession } from './shared-auth/session';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginPortalUrl = process.env.NEXT_PUBLIC_LOGIN_PORTAL_URL || 'http://localhost:3000';
  const currentPortalUrl = process.env.NEXT_PUBLIC_AUDIT_PORTAL_URL || 'http://localhost:3003';

  // 1. Exclude public assets, static files, and api routes from protection
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/auth') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Retrieve the RBAC session cookie
  const sessionCookie = request.cookies.get('aai_session');

  if (!sessionCookie?.value) {
    const redirectUrl = new URL(loginPortalUrl);
    redirectUrl.searchParams.set('callbackUrl', `${currentPortalUrl}${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(redirectUrl);
  }

  // 3. Decrypt and check validity
  const session = decryptSession(sessionCookie.value);
  if (!session) {
    const redirectUrl = new URL(loginPortalUrl);
    redirectUrl.searchParams.set('callbackUrl', `${currentPortalUrl}${pathname}${request.nextUrl.search}`);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.delete('aai_session');
    return response;
  }

  // 4. Verify user role permission (must be AUDITOR for this portal)
  if (session.role !== 'AUDITOR') {
    const unauthorizedUrl = new URL('/unauthorized', loginPortalUrl);
    unauthorizedUrl.searchParams.set('userRole', session.role);
    unauthorizedUrl.searchParams.set('requiredRole', 'AUDITOR');
    return NextResponse.redirect(unauthorizedUrl);
  }

  // 5. Run original proxy legacy routing for internal views
  const token = request.cookies.get('auth_token')?.value;
  const role = request.cookies.get('auth_role')?.value;

  // Auto-restore legacy cookies if they are missing but we have a valid session.
  // This ensures the internal frontend hooks (like Zustand store initialization) continue working.
  if (!token || !role) {
    const redirectUrl = new URL(request.url);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set('auth_token', `mock-jwt-token-aai_admin-${Date.now()}`, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60
    });
    response.cookies.set('auth_role', 'AAI_ADMIN', {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60
    });
    return response;
  }

  // Paths that are public
  const isPublicPath = pathname === '/login';

  // Legacy route redirection
  if (token && isPublicPath) {
    if (role === 'AAI_ADMIN') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/terminal/dashboard', request.url));
    }
  }

  if (pathname.startsWith('/admin') && role !== 'AAI_ADMIN') {
    return NextResponse.redirect(new URL('/terminal/dashboard', request.url));
  }

  if (pathname.startsWith('/terminal') && role !== 'TERMINAL_ADMIN') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  if (pathname === '/') {
    if (role === 'AAI_ADMIN') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/terminal/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/admin/:path*',
    '/terminal/:path*',
  ],
};
