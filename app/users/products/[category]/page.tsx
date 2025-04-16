import styles from './product.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { productSearchByCategory } from '@/app/lib/data';


export default async function UserProductListByCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const products = await productSearchByCategory(parseInt(category));

  if('error' in products) {
    console.error('Error fetching products:', products.error);
    return <div>Error fetching products</div>;
  } else {
    console.log('Products:', products);
  }

  const list = products.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.images[0],
    description: product.description,
    price: product.price,
  }));

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
          {totalProducts} products found in {category}
        </h2>
        <h2>Products in {category}</h2>
      </div>
      <div className={styles.productlist}>
        {list.map((product: any, index: any) => (
          <div className={styles.productCard} key={index}>
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
