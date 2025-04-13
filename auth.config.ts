import type { AuthOptions } from 'next-auth';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import CredentialsProvider from 'next-auth/providers/credentials';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export const authConfig: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token && typeof token === 'object' && 'id' in token && 'email' in token) {
        const { id, email } = token as { id: string; email: string };
        session.user = { ...session.user, id, email };
      }
      console.log('Session callback:', session);
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      console.log('JWT callback:', token);
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your-email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials) {
          console.error('No credentials provided');
          return null;
        }

        const { email, password } = credentials;
        console.log('Authorizing user with email:', email);

        try {
          const user = await sql`SELECT * FROM "user" WHERE email = ${email}`;
          if (!user[0]) {
            console.error('User not found');
            return null;
          }

          const isValid = await bcrypt.compare(password, user[0].password);
          if (!isValid) {
            console.error('Invalid password');
            return null;
          }

          console.log('User authorized:', user[0]);
          return { id: user[0].id, email: user[0].email };
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
};