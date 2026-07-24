import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Expire all cookies
  response.cookies.set('aai_session', '', { path: '/', maxAge: 0 });
  response.cookies.set('auth_token', '', { path: '/', maxAge: 0 });
  response.cookies.set('auth_role', '', { path: '/', maxAge: 0 });

  return response;
}
