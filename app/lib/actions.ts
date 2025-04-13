'use server';

import { signIn } from 'next-auth/react';

export async function authenticate(
  formData: FormData,
) {
  try {
    const user = await signIn('credentials', {
      redirect: false,
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (user?.error) {
      return user.error;
    }

    return user;
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          console.log(error);
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}