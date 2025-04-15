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
