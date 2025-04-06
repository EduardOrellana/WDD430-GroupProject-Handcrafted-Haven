import styles from "@/app/users/product/[id]/product.module.css";

import { productsObject } from "@/app/lib/temporalData";

// const product = {
//   name: "Stylish Sunglasses",
//   price: 29.99,
//   rating: 4.5,
//   description:
//     "These stylish sunglasses are perfect for all seasons. Made with high-quality materials, they offer both comfort and protection from the sun.",
//   image: "https://placehold.co/600x400",
//   reviews: [
//     { text: "Great sunglasses, very comfortable!", author: "Alice" },
//     { text: "Love the design, but a little tight.", author: "Bob" },
//     { text: "Amazing quality, would buy again.", author: "Charlie" },
//   ],
// };

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
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.productInfo}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productPrice}>${product.price}</p>
        <p className={styles.productRating}>Rating: {product.rating} ⭐</p>
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
