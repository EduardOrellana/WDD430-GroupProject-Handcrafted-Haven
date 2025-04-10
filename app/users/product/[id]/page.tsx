import styles from '@/app/users/product/[id]/product.module.css';
import Image from 'next/image';
import { productsObject } from '@/app/lib/temporalData';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const product = productsObject.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div className={styles.error}>Product not found</div>;
  }

  return (
    <div className={styles.productDetail}>
      <div className={styles.productImage}>
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={1200}
        />
      </div>
      <div className={styles.productInfo}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productPrice}>${product.price}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.productReviews}>
          <h3>Customer Reviews</h3>
          {product.reviews.map((review, index) => (
            <div key={index} className={styles.review}>
              <p className={styles.reviewText}>"{review.text}"</p>
              <p className={styles.reviewAuthor}>- {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
