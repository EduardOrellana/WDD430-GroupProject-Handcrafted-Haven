"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { getProductById, updateProductById, deleteProductById } from '@/app/lib/data';

interface ReviewFormProps {
  productId: string | null;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const router = useRouter();
  const [product, setProduct] = useState<{ name: string; description: string; price: string; image: string; user_id: number } | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;

      const session = await getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const userId = session.user.id;
      const productData = await getProductById(Number(productId));

      if (productData && productData.user_id !== userId) {
        router.push(`/users/product/${productId}`);
        return;
      }

      const formattedProductData = {
        name: productData.name,
        description: productData.description,
        price: productData.price.toString(),
        image: productData.image,
        user_id: productData.user_id,
      };

      setProduct(formattedProductData);
      setName(formattedProductData.name);
      setDescription(formattedProductData.description);
      setPrice(formattedProductData.price);
      setImage(formattedProductData.image);
    }

    fetchProduct();
  }, [productId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const updatedProduct = {
      name,
      description,
      price: Number(price),
      images: image.split(',').map((url) => url.trim()),
    };

    const result = await updateProductById(
      Number(productId),
      updatedProduct.name,
      updatedProduct.price,
      updatedProduct.description,
      updatedProduct.images
    );

    if (result && !result.error) {
      router.push(`/users/product/${productId}`);
    } else {
      alert('Error updating product');
    }
  };

  const handleDelete = async () => {
    if (!productId) return;

    const result = await deleteProductById(Number(productId));
    if (result && !result.error) {
      router.push(`/users`);
    } else {
      alert('Error deleting product');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
      <button type="button" onClick={handleDelete}>Delete Product</button>
    </>
  );
}