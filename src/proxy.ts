import { NextResponse, NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read cookies from request headers
  const token = request.cookies.get('auth_token')?.value;
  const role = request.cookies.get('auth_role')?.value;

  // Paths that are public
  const isPublicPath = pathname === '/login';

  // 1. Unauthenticated users trying to access secure routes
  if (!token && !isPublicPath) {
    // Keep target path as search param to redirect back after login if needed
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated users trying to access login page
  if (token && isPublicPath) {
    if (role === 'AAI_ADMIN') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/terminal/dashboard', request.url));
    }
  }

  // 3. RBAC checks for Admin routes
  if (pathname.startsWith('/admin') && role !== 'AAI_ADMIN') {
    return NextResponse.redirect(new URL('/terminal/dashboard', request.url));
  }

  // 4. RBAC checks for Terminal routes
  if (pathname.startsWith('/terminal') && role !== 'TERMINAL_ADMIN') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Redirect root path to dashboard based on role
  if (pathname === '/') {
    if (token) {
      if (role === 'AAI_ADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/terminal/dashboard', request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths proxy runs on
export const config = {
  matcher: [
    '/',
    '/login',
    '/admin/:path*',
    '/terminal/:path*',
  ],
};
