'use client';

import Link from "next/link";
import styles from "./sellers.module.css";

export default function Home() {
  return (
    <section className={styles.sellers}>
      <h1 className={styles.title}>Sellers Page </h1>
      <p></p>
      <div>
        <Link href={"/seller-profile/products"}>Check My Products</Link>
      </div>
    </section>
  );
}

