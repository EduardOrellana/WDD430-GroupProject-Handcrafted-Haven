// app/profile/page.tsx
import { getUserById } from '../lib/data';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export default async function ProfilePage(req: NextRequest) {
  console.log('Request Headers:', req.headers);
  console.log('AUTH_SECRET:', process.env.AUTH_SECRET);

  // Extract the token from the request
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token || !token.sub) {
    console.error('No valid token found');
    console.log('Token:', token);
    return <div>Error: Unable to fetch user profile</div>;
  }

  const id = token.sub;
  console.log('User ID from token:', id);

  const profile = (await getUserById(parseInt(id))) as unknown as {
    username: string;
    email: string;
    profile_pic_url: string;
  };

  return <>Probando</>;
}
