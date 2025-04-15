'use client';

import { useState, useTransition } from 'react';
import { updateProfile } from './actions/update-profile';

export default function ProfileForm({ user }: { user: any }) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    profile_pic_url: user.profile_pic_url,
  });

  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      const result = await updateProfile(
        1, // your userId
        formData.username,
        formData.email,
        formData.profile_pic_url
      );

      if (result?.error) {
        alert('❌ Error updating profile');
      } else {
        alert('✅ Profile updated!');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Name"
        className="border px-3 py-2 w-full rounded"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border px-3 py-2 w-full rounded"
      />
      <input
        name="profile_pic_url"
        value={formData.profile_pic_url}
        onChange={handleChange}
        placeholder="Photo URL"
        className="border px-3 py-2 w-full rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}