import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials } from '@shared-auth/demo-users';
import { encryptSession } from '@shared-auth/session';

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = validateCredentials(userId, password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid User ID format or Password too short' }, { status: 401 });
    }

    const sessionData = {
      userId: user.userId,
      name: user.name,
      role: user.role,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    };

    const token = encryptSession(sessionData);

    const response = NextResponse.json({
      success: true,
      role: user.role,
      name: user.name,
      userId: user.userId
    });

    // Set core RBAC session cookie (HTTP-only for security)
    response.cookies.set('aai_session', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    // If the role is AUDITOR, we also set legacy cookies for audit portal store compat
    if (user.role === 'AUDITOR') {
      response.cookies.set('auth_token', `mock-jwt-token-aai_admin-${Date.now()}`, {
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60
      });
      response.cookies.set('auth_role', 'AAI_ADMIN', {
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60
      });
    }

    return response;
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
