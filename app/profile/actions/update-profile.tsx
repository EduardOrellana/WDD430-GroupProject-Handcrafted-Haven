'use server';

import { updateUserById } from '@/app/lib/data';

export async function updateProfile(
  userId: number,
  username: string,
  email: string,
  profile_pic_url: string
) {
  try {
    const result = await updateUserById(userId, username, profile_pic_url, email, '');
    return result;
  } catch (error) {
    console.error("Server action error:", error);
    return { error: "Failed to update user" };
  }
}
