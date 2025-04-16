'use client';

import styles from '@/app/users/product/[id]/edit/edit.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/app/lib/actions';

export default function CreateProductForm({
  categories,
  userId,
}: {
  categories: { id: number; name: string }[];
  userId: number | string;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('user_id', userId.toString());

    const result = await createProduct(formData);

    console.log('Form Data Info', formData);

    if (result.message === 'success') {
      //   alert('Product created successfully!');
      router.push(`/users/${userId}`);
    } else {
      //   alert('Failed to create product: ' + result.message);
      router.push(`/users/${userId}`);
    }
  }

  return (
    <div className={styles.form}>
      <h1 className={styles.h1}>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Name:
          <input
            className={styles['input-text']}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Description:
          <textarea
            className={styles.textarea}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Price:
          <input
            className={styles['input-number']}
            type="number"
            step="0.01"
            name="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </label>

        <label className={styles.label}>
          Category:
          <select
            className={styles['input-select']}
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <button className={styles.button} type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
}
