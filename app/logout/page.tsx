import { NextResponse } from 'next/server';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.set('authToken', '', { maxAge: 0 });
  return response;
}

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
    };

    logout();
  }, [router]);

  return <p>Logging out...</p>;
}