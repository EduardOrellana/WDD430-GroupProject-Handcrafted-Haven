'use client';

import { useState } from "react";
import { updateProfile } from "@/app/profile/actions/update-profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profile_pic_url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userId = session?.user?.id;

      const result = await updateProfile(
        Number(userId),
        formData.username,
        formData.email,
        formData.profile_pic_url
      );

      if (!("error" in result)) {
        alert("✅ Profile updated successfully!");
        await update(); // 
        router.push("/profile");
      } else {
        alert("❌ Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("❌ Error updating profile.");
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter new name"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter new email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="profile_pic_url">Profile Image URL:</label>
          <input
            type="text"
            id="profile_pic_url"
            name="profile_pic_url"
            placeholder="Enter new image URL"
            value={formData.profile_pic_url}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}