import styles from './product.module.css';
import Image from 'next/image';
import { productSearchByCategory, getCategoryIdByName } from '@/app/lib/data';
import Link from 'next/link';

export default async function UserProductListByCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Decode the category parameter to handle special characters like spaces and '&'
  const decodedCategory = decodeURIComponent(category);

  const categoryId = await getCategoryIdByName(decodedCategory);

  if (categoryId?.error) {
    return (
      <div className={styles.productlist}>
        <h2>Error: {categoryId.error}</h2>
      </div>
    );
  }

  const response = await productSearchByCategory(categoryId);

  if (!response || 'error' in response) {
    return (
      <div className={styles.productlist}>
        <h2>Error: {response?.error || 'Unknown error occurred'}</h2>
      </div>
    );
  }

  const list = Array.isArray(response) ? response : [];
  const totalProducts = list.length;

  if (list.length === 0) {
    return (
      <div className={styles.productlist}>
        <h2>No products found in this category</h2>
      </div>
    );
  }

  return (
    <>
      <div className={styles.productlist}>
        <h2>
          {totalProducts} products found in {decodedCategory}
        </h2>
        <h2>Products in {decodedCategory}</h2>
      </div>
      <div className={styles.productlist}>
        {list.map((product: any, index: any) => (
          <div className={styles.productCard} key={index}>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={150}
              height={150}
              priority
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className={styles.price}>{`$${product.price}`}</span>
            <br />
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
