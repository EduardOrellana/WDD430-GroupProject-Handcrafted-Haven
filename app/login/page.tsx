'use client';

export const dynamic = 'force-dynamic';
import LoginForm from '../ui/login-form';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (session) {
        router.push('/profile');
      }
    }
    checkSession();
  }, [router]);

  return (
    <main>
      <div>
        <LoginForm />
      </div>
    </main>
  );
}