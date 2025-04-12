import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    request.headers.set('user', JSON.stringify(decoded)); // Pass user info to the request
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/profile', '/protected-route'],
};