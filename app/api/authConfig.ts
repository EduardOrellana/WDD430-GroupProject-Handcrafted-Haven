import type { NextAuthOptions } from 'next-auth';
import type { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { getUserByEmail } from '../lib/data';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session({ session, user }) {
      if (user) {
        session.user = user;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            console.log('User not found or password missing');
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return {
              id: user.id,
              name: user.username, // Ensure this matches the user object structure
              email: user.email,
            } as User;
          } else {
            console.log('Password mismatch');
          }
        } else {
          console.log('Invalid credentials format');
        }

        return null;
      },
    }),
  ],
};