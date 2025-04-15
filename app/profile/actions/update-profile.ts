// app/profile/actions/update-profile.ts
'use server';

import { updateUserById } from '../../lib/data';

export async function updateProfile(userId: number, username: string, email: string, profile_pic_url: string) {
  const result = await updateUserById(userId, username, profile_pic_url, email, '');
  return result;
}
