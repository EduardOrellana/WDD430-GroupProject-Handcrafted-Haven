'use client';

import styles from '@/app/users/product/[id]/edit/edit.module.css';
import { EditProduct } from '@/app/lib/actions';

export default function EditProductForm({
  product,
  productId,
}: {
  product: {
    name: string;
    description: string;
    price: number;
    category: string;
  };
  productId: number | string;
}) {
  return (
    <div className={styles.form}>
      <h1 className={styles.h1}>Edit Product</h1>
      <form action={EditProduct} method="POST">
        <label className={styles.label}>
          Name:
          <input
            className={styles['input-text']}
            type="text"
            name="name"
            defaultValue={product.name}
            required
          />
        </label>

        <label className={styles.label}>
          Description:
          <textarea
            className={styles.textarea}
            name="description"
            defaultValue={product.description}
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
            defaultValue={product.price}
            required
          />
        </label>

        <label className={styles.label}>
          Category:
          <input
            className={styles['input-text']}
            type="text"
            name="category"
            defaultValue={product.category}
            required
          />
        </label>

        <button className={styles.button} type="submit">
          Update Product
        </button>

      </form>
    </div>
  );
}
