import { profileObject } from '@/app/lib/temporalData';
import styles from './page.module.css';
import Image from 'next/image';
import { productsObject } from '@/app/lib/temporalData';
import Link from 'next/link';

export default async function SellerProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = profileObject.find((profile) => profile.id === parseInt(id));

  return (
    <>
      <div className={styles.sellerProfile}>
        <h2>Seller Profile</h2>
        <div className={styles.profileCard}>
          <h3>{profile?.name}</h3>
          <p>{profile?.description}</p>
        </div>
      </div>
      <div className={styles.productlist}>
        <h2>Products by {profile?.name}</h2>
        {productsObject
          .filter((product) => product.ownerId === parseInt(id))
          .map((product, index) => (
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
