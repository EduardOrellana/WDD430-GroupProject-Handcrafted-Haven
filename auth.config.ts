import type { AuthOptions } from 'next-auth';

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
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  providers: [],
};