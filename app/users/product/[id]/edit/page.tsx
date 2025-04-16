/*
"use client";

import { getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductById, updateProductById, deleteProductById } from '@/app/lib/data';



export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get('id') : null;
  const [product, setProduct] = useState<{ name: string; description: string; price: string; image: string; user_id: number } | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      const session = await getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const userId = session.user.id;
      const productData = await getProductById(Number(id));

      if (productData && productData.user_id !== userId) {
        router.push(`/users/product/${id}`);
        return;
      }

      const formattedProductData = {
        name: productData.name,
        description: productData.description,
        price: productData.price.toString(), // Convert price to string
        image: productData.image,
        user_id: productData.user_id,
      };

      setProduct(formattedProductData);
      setName(formattedProductData.name);
      setDescription(formattedProductData.description);
      setPrice(formattedProductData.price); // Use string directly
      setImage(formattedProductData.image);
    }

    fetchProduct();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const updatedProduct = {
      name,
      description,
      price: Number(price), // Convert price to number
      images: image.split(',').map((url) => url.trim()), // Convert comma-separated string to array of URLs
    };

    const result = await updateProductById(
      Number(id),
      updatedProduct.name,
      updatedProduct.price, // Pass as number
      updatedProduct.description,
      updatedProduct.images // Pass images array
    );

    if (result && !result.error) {
      router.push(`/users/product/${id}`);
    } else {
      alert('Error updating product');
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    const result = await deleteProductById(Number(id));
    if (result && !result.error) {
      router.push(`/users/${id}`);
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

*/

export default function EditProductPage() {

  return <></>
}