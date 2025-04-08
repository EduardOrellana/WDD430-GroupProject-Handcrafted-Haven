import styles from './product.module.css';
import { productsObject } from '@/app/lib/temporalData';

const ownerID = 207;
const list = productsObject.filter((item) => item.ownerId === ownerID);

const totalProducts = list.length; // Get the total number of products

export default function SellerProdutList() {
  // Duplicate the list for demonstration
  return (
    <>
      <section className={styles.sellers}>
        <h1 className={styles.title}>Products Page </h1>
        <p>Total Products: {totalProducts}</p>
      </section>
      <div className={styles.productlist}>
        {list.map((product, index) => (
          <div className={styles.productCard} key={index}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.category}</p>
            <h3>Ratings:</h3>
            {product.reviews.map((rating) => (
              <div key={index}>
                <span>Rating: {rating.text}</span>
                <span>Author: {rating.author}</span>
                <span>Rating: {rating.rating}</span>
              </div>
            ))}
            <span className="price">{product.price}</span>
          </div>
        ))}
      </div>
    </>
  );
}
