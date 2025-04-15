import styles from '@/app/users/product/[id]/product.module.css';
import Image from 'next/image';
import { getProductById, getProductReviewById } from '@/app/lib/data';
import ButtonToEdit from './edit/ButtonToEdit';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  console.log('ID:', id);

  const product = await getProductById(parseInt(id));
  const reviews = await getProductReviewById(parseInt(id));

  if (product?.error) {
    console.error('Error fetching product and reviews:', product.error);
    return <div>Error fetching product</div>;
  }

  if (!product) {
    return <div className={styles.error}>Product not found</div>;
  }

  return (
    <>
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
          {Array.isArray(reviews) && reviews.length > 0 ? (
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
        </div>
        {/* Pass ProductId to ButtonToEdit */}
        <ButtonToEdit params={{ ProductId: id }} />
      </div>
    </>
  );
}
