'use client';

import Image from 'next/image';

type Product = {
  name: string;
  description: string;
  price: number;
  image: string;
  seller: string;
};

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <section>
      <Image src={product.image} alt={product.name} width={300} height={300} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Seller:</strong> {product.seller}</p>
    </section>
  );
}
