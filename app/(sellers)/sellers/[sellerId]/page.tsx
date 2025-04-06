import SellerProfile from './SellerProfile';
import SellerProducts from './SellerProducts';
import Reviews from './Reviews';
import styles from './sellers.module.css';

export default async function Page({ params }: { params: Promise<{ sellerId: string }> }) {
  const { sellerId } = await params;

  return (
    <main className={styles.container}>
      <section className={styles.profileAndReviews}>
        <SellerProfile sellerId={sellerId} />
        <Reviews sellerId={sellerId} />
      </section>
      <section className={styles.products}>
        <h2>My Products</h2>
        <SellerProducts sellerId={sellerId} />
      </section>
    </main>
  );
}
