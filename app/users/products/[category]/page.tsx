// app/users/products/[id]/page.tsx

import styles from "./product.module.css";
import Image from "next/image";

const products = [
  {
    id: 1,
    title: "Product 1",
    description: "This is a great product 1",
    price: "$10.00",
    imageUrl: "https://placehold.co/150x150.png",
    category: "electronics",
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is a great product 2",
    price: "$20.00",
    imageUrl: "https://placehold.co/150x150.png",
    category: "clothing",
  },
  {
    id: 3,
    title: "Product 3",
    description: "This is a great product 3",
    price: "$30.00",
    imageUrl: "https://placehold.co/150x150.png",
    category: "technology",
  },
  {
    id: 4,
    title: "Product 4",
    description: "This is a great product 4",
    price: "$40.00",
    imageUrl: "https://placehold.co/150x150.png",
    category: "games",
  },
  {
    id: 5,
    title: "Product 4",
    description: "This is a great product 4",
    price: "$40.00",
    imageUrl: "https://placehold.co/150x150.png",
    category: "games",
  },
];

export default async function UserProductListByCategory({ params }: { params: Promise<{ category: string }> }) {

  const { category } =  await params;

  const list = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  if (list.length === 0) {
    return (
      <div className={styles.productlist}>
        <h2>No products found in this category</h2>
      </div>
    );
  }

  return (
    <div className={styles.productlist}>
      {list.map((product, index) => (
        <div className="card" key={index}>
          <Image src={product.imageUrl} alt={product.title} width={150} height={150} priority />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <span className={styles.price}>{product.price}</span>
        </div>
      ))}
    </div>
  );
}