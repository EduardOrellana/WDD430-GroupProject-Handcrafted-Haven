// app/users/products/[id]/page.tsx

import styles from "./product.module.css";
import Image from "next/image";
import { productsObject } from "@/app/lib/temporalData";
import Link from "next/link";

const products = productsObject;

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
        <div className={styles.productCard} key={index}>
          <Image src={product.image} alt={product.name} width={150} height={150} priority />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <span className={styles.price}>{product.price}</span>
          <Link href={`/users/product/${product.id}`} className={styles.productLink}>
            view details
          </Link>
        </div>
      ))}
    </div>
  );
}