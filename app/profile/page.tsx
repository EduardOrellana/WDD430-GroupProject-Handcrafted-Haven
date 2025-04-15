<<<<<<< HEAD
// app/profile/page.tsx
import { getUserById, productSearchByUser } from '../lib/data';
import ProfileForm from './ProfileForm';
import ProductList from './ProductList';

const userId = 1; // Hardcoded user, replace with session later

export default async function ProfilePage() {
  const rawUser = await getUserById(userId);
  const rawProducts = await productSearchByUser(userId);

  if (!rawUser || 'error' in rawUser || 'msg' in rawUser) {
    return <p className="text-red-600">Error: User not found</p>;
  }

  if (!rawProducts || 'error' in rawProducts || 'msg' in rawProducts) {
    return <p className="text-red-600">Error: Products not found</p>;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <ProfileForm user={rawUser} />
      <h2 className="text-2xl font-semibold mt-10 mb-4">Your Products</h2>
      <ProductList products={rawProducts} />
    </main>
  );
}


/*
'use client';

import React from 'react';

const mockUser = {
  username: 'MockUser',
  email: 'mockuser@example.com',
  // profile_pic_url: 'https://...' <-- removed to avoid image error
};

export default function ProfilePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>My Profile</h1>
      
      <div style={{
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        padding: '1rem',
        maxWidth: '400px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>

        <div style={{
          fontSize: '4rem',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          👤
        </div>

        <p><strong>Username:</strong> {mockUser.username}</p>
        <p><strong>Email:</strong> {mockUser.email}</p>
      </div>
    </main>
  );
}
*/
=======
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth.config';
import { User } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProfilePage() {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return <div>Please Log In Again.</div>;
  }

  const { username, email, profile_pic_url } = session.user as User;

  return (
    <>
      <p>Email: {email}</p>
      <p>Name: {username}</p>
      <Image
        src={profile_pic_url}
        alt="Profile Picture"
        width={100}
        height={100}
        className="rounded-full"
      />

      <Link href={`/users/${session.user.id}`}>
        <p>View My Products</p>
      </Link>

      <Link href={`/profile/edit`}>Edit Profile</Link>

      
    </>
  );
}
>>>>>>> f270f2b0ed95a60c6d83a4cc81af5529f9a3deca
