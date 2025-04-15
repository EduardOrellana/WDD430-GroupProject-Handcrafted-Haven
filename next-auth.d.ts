import 'next-auth';

declare module 'next-auth' {
  interface User {
    username?: string; // Add username field
  }

  interface Session {
    user: {
      id: number;
      email: string;
      name?: string;
      username?: string; // Add username field
      image?: string;
    };
  }
}
