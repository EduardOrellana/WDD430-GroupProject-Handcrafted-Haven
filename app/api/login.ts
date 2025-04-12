import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const users = [
  { email: 'user@example.com', password: 'password123' },
];

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  console.log(process.env.JWT_SECRET);

  // Validate user credentials (replace with your logic)
  if (username === 'admin' && password === 'password') {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('authToken', token, { httpOnly: true, secure: true });
    return response;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}