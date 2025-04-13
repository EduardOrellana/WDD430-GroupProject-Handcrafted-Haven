import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (process.env.NODE_ENV === 'development') {
    console.log('Token:', token);
  }
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
//    '/protected-route',
  ],
};