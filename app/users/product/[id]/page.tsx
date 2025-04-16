import styles from "@/app/users/product/[id]/product.module.css";
import Image from "next/image";
import { getProductById, getProductReviewById } from "@/app/lib/data";
import WriteReview from "./WriteReview";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const product = await getProductById(parseInt(id));
  const reviews = await getProductReviewById(parseInt(id));
  const session = await getServerSession(authConfig);

  if (product?.error) {
    console.error("Error fetching product and reviews:", product.error);
    return <div>Error fetching product</div>;
  }

  if (!product) {
    return <div className={styles.error}>Product not found</div>;
  }

  return (
    <>
      <div className={styles.containerImageInfo}>
      <div className={styles.productImage}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={150}
            height={150}
            priority
          />
        ) : (
          <div style={{ width: 150, height: 150, background: '#ccc' }}>
            No image
          </div>
          )}
      </div>
      <div className={styles.productInfo}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productPrice}>${product.price}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productCategory}>Category: {product.category}</p>
        <div className={styles.productReviews}>
          <h3>Customer Reviews</h3>
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <h3>{review.author}</h3>
                  <span className={styles.reviewDate}>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                {Array(review.rating)
                  .fill(0)
                  .map((star, index) => (
                    <span
                      key={index}
                      className={`${styles.star} ${styles.filled}`}
                    >
                      ★
                    </span>
                  ))}
                <p className={styles.reviewComment}>{review.text}</p>
              </div>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </div>
      </div>
      </div>
      <div className={styles.reviews}>
      {session?.user?.id && (
          <WriteReview userId={session?.user?.id} productId={product.id} />
        )}
      </div>
    </>
  );
}
