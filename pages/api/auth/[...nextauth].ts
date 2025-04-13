import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

console.log('Initializing NextAuth API route');

export default async function handler(req, res) {
  try {
    console.log('Request received at NextAuth API route:', req.url);
    await NextAuth(authConfig)(req, res);
  } catch (error) {
    console.error('Error in NextAuth API route:', error);
    res.status(500).send('Internal Server Error');
  }
}