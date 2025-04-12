import styles from '@/app/users/product/[id]/product.module.css';
import Image from 'next/image';
import { getProductById, getProductReviewById } from '@/app/lib/data';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/api/authConfig';
import Link from 'next/link';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authConfig);
  const params = await props.params;
  const id = params.id;
  console.log('ID:', id);

  const product = await getProductById(parseInt(id));
  const reviews = await getProductReviewById(parseInt(id));

  if (product?.error) {
    console.error('Error fetching product and reviews:', product.error);
    console.error('Error fetching product:', product.error);
    return <div>Error fetching product</div>;
  } else {
    console.log('Product:', product);
    console.log('Reviews:', reviews);
  }

  if (!product) {
    return <div className={styles.error}>Product not found</div>;
  }

  return (
    <div className={styles.productDetail}>
      <div className={styles.productImage}>
        <Image
          src={product.images[0]}
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
          {Array.isArray(reviews) ? (
            reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <h4>{review.author}</h4>
                <p>{review.title}</p>
                <p>{review.text}</p>
                <p>Rating: {review.rating}</p>
                <p>Date: {new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No reviews available</p>
          )}
          {session ? (
            <div>
              <h4>Leave a Review</h4>
              {/* Add review form here */}
            </div>
          ) : (
            <p>
              To leave a review, you must be{' '}
              <Link href="/login">logged in</Link>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
