'use server';

import { signIn } from '@/auth';

export async function authenticate(
  formData: FormData,
) {
  try {
    const user = await signIn('credentials', formData);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}