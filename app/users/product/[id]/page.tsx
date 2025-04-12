import styles from '@/app/users/product/[id]/product.module.css';
import Image from 'next/image';
import { getProductById, getProductReview } from '@/app/lib/data';

import { productsObject } from '@/app/lib/temporalData';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const product = await getProductById(parseInt(id));
  const reviews = await getProductReview(parseInt(id));

  if ('error' in product && 'error' in reviews) {
    console.error(
      'Error fetching product and reviews:',
      product.error,
      reviews.error
    );
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
          {/* {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <h4>{review.title}</h4>
              <p>{review.content}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
