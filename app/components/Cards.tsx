

import { useState, useTransition } from 'react';
import { updateProfile } from '../profile/actions/update-profile';

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="border rounded p-4 shadow-md">
      <img src={product.images?.[0]} alt={product.name} className="w-full h-48 object-cover rounded mb-2" />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-green-600 font-bold">${product.price}</p>
    </div>
  );
}


export function ProductList({ products }: { products: any[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProfileForm({ user }: { user: any }) {
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