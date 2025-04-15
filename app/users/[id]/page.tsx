import { profileObject } from "@/app/lib/temporalData";
import styles from "./page.module.css";
import Image from "next/image";
import { productsObject } from "@/app/lib/temporalData";
import Link from "next/link";
import { getUserById, productSearchByUser } from "@/app/lib/data";

export default async function SellerProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile: {
    username: string;
    email: string;
    profile_pic_url: string;
  } = await getUserById(id);

  console.log("aca", profile);
  const data = await productSearchByUser(id);

  const list: {
    name: string;
    description: string;
    id: string;
    price: string;
    category: string;
    images: string[];
  }[] = (data || []) as unknown as {
    name: string;
    description: string;
    id: string;
    price: string;
    category: string;
    images: string[];
  }[];

  const products = await list.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.images[0],
    category: product.category,
    description: product.description,
    price: product.price,
  }));

  if (products.length === 0) {
    return (
      <div className={styles.productlist}>
        <h2>No products found</h2>
      </div>
    );
  }

  return (
    <>
      {/*
<div className={styles.sellerProfile}>

        <h2>Seller Profile</h2>
        <div className={styles.profileCard}>

        </div>
      </div>
      */}
      <h2>Products by {profile?.username}</h2>
      <div className={styles.productlist}>
        {products.map((product, index) => (
          <div className={styles.productCard} key={index}>
            <Image
              src={product.image}
              alt={product.name}
              width={150}
              height={150}
              priority
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className={styles.price}>{product.price}</span>
            <Link
              href={`/users/product/${product.id}`}
              className={styles.productLink}
            >
              view details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
