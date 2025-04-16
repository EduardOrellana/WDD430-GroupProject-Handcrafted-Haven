'use client';

import styles from '@/app/users/product/[id]/edit/edit.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { editProduct } from '@/app/lib/actions';

export default function EditForm({
    product,
    productId,
    categories,
}: {
    product: {
        name: string;
        description: string;
        price: number;
        category: number | string;
    };
    productId: number | string;
    categories: { id: number; name: string }[];
}) {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);

    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append('productId', productId.toString());

        const result = await editProduct(formData);

        if (result.message === 'success') {
            //   alert('Product updated successfully!');
            router.push(`/users/product/${productId}`);
        } else {
            //   alert('Product Update');
            router.push(`/users/product/${productId}`);
        }
    }

    return (
        <div className={styles.form}>
            <h1 className={styles.h1}>Edit Product</h1>
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
                        onChange={(e) => setCategory(parseInt(e.target.value))}
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
                    Update Product
                </button>
            </form>
        </div>
    );
}
