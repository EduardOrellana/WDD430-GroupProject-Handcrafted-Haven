'use client';

import { Button } from './buttom';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { signIn } from 'next-auth/react';

function LoginFormComponent() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams
    ? searchParams.get('returnUrl') || '/profile'
    : '/profile';

  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl);
    }
  }, [isAuthenticated, returnUrl, router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.get('email'),
        password: formData.get('password'),
      });

      if (result?.error) {
        setErrorMessage(result.error);
      } else {
        setErrorMessage(null);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to authenticate:', error);
      setErrorMessage('Failed to login');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h1>Please log in to continue.</h1>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <div>
          <Button type="submit">
            {isPending ? 'Logging in...' : 'Log in'}
          </Button>
        </div>

        <div>
          <p>
            Don&apos;t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
        <div>
          {errorMessage && (
            <>
              <p>{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormComponent />
    </Suspense>
  );
}
