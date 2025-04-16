'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/buttom'; // Your custom Button component
import { createAcc } from '../lib/actions';

export default function SignupForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const profilePicUrl = formData.get('profilePicUrl') as string;

    try {
      const result = await createAcc(username, email, password, profilePicUrl);

      if (result?.error) {
        setErrorMessage(result.error);
      } else {
        setErrorMessage(null);
        setSuccessMessage('Account created successfully! Redirecting...');
        setTimeout(() => {
          router.push('/login'); // Redirect to login page after successful signup
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to create account:', error);
      setErrorMessage('Failed to create account');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <h1>Create an account</h1>
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <div>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
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
          <div>
            <label htmlFor="profilePicUrl">Profile Picture URL</label>
            <div>
              <input
                id="profilePicUrl"
                type="url"
                name="profilePicUrl"
                placeholder="Enter a profile picture URL (optional)"
              />
            </div>
          </div>
        </div>
        <div>
          <Button type="submit">
            {isPending ? 'Creating account...' : 'Sign up'}
          </Button>
        </div>

        <div>
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
        <div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
      </div>
    </form>
  );
}
