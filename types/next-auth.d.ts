import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      profile_pic_url: string;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
    profile_pic_url: string;
  }

  interface JWT {
    id: string;
    email: string;
    username: string;
    profile_pic_url: string;
  }
}
