import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptSession } from './session';
import { Role } from './roles';

interface MiddlewareOptions {
  allowedRole: Role;
  loginPortalUrl: string;
  currentPortalUrl: string;
}

export function handleAuthMiddleware(request: NextRequest, options: MiddlewareOptions) {
  const { allowedRole, loginPortalUrl, currentPortalUrl } = options;
  const { pathname } = request.nextUrl;

  // 1. Skip assets, next build files, metadata, and auth APIs
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/auth') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Allow logout pages to process cookie clearance
  if (pathname === '/logout') {
    return NextResponse.next();
  }

  // 3. Retrieve the session cookie
  const sessionCookie = request.cookies.get('aai_session');

  if (!sessionCookie?.value) {
    // Redirect to Login Portal with callback context
    const redirectUrl = new URL(loginPortalUrl);
    redirectUrl.searchParams.set('callbackUrl', `${currentPortalUrl}${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(redirectUrl);
  }

  // 4. Decrypt and check validity
  const session = decryptSession(sessionCookie.value);
  if (!session) {
    // Invalid session cookie - wipe it and redirect to login
    const redirectUrl = new URL(loginPortalUrl);
    redirectUrl.searchParams.set('callbackUrl', `${currentPortalUrl}${pathname}${request.nextUrl.search}`);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.delete('aai_session');
    return response;
  }

  // 5. Enforce role checking
  if (session.role !== allowedRole) {
    // Redirect to login portal's unauthorized page
    const unauthorizedUrl = new URL('/unauthorized', loginPortalUrl);
    unauthorizedUrl.searchParams.set('userRole', session.role);
    unauthorizedUrl.searchParams.set('requiredRole', allowedRole);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // Session is active and role matches
  return NextResponse.next();
}
