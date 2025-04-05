import SellerProfile from './SellerProfile';
import SellerProducts from './SellerProducts';
import Reviews from './Reviews';
import styles from './seller.module.css';

export default function SellerPage({ params }: { params: { sellerId: string } }) {
  return (
    <main className={styles.container}>
      <section className={styles.profileAndReviews}>
        <SellerProfile sellerId={params.sellerId} />
        <Reviews sellerId={params.sellerId} />
      </section>
      <section className={styles.products}>
        <h2>My Products</h2>
        <SellerProducts sellerId={params.sellerId} />
      </section>
    </main>
  );
}

