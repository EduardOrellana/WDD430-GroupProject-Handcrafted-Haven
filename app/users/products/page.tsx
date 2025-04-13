import styles from './product.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {
  getProducts,
} from '@/app/lib/data';

export default async function UserProdutList({
  searchParams,
}: {
  searchParams: Promise<{ [search: string]: string | string[] | undefined }>;
}) {
  const data = await getProducts();

  if ('error' in data) {
    console.error('Error fetching products:', data.error);
    return <div>Error fetching products</div>;
  } else {
    console.log('Products:', data);
  }

  const { search } = await searchParams;

  const products = await data.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.images[0],
    category: product.category,
    description: product.description,
    price: product.price,
  }));

  const list = products.filter(
    (product) =>
      typeof search === 'string' &&
      (product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase()))
  );

  if (!(search === undefined) && list.length === 0) {
    return (
      <div className={styles.productlist}>
        <h2>No products found</h2>
      </div>
    );
  }

  if (!(search === undefined) && list.length > 0) {
    return (
      <div className={styles.productlist}>
        {list.map((product, index) => (
          <div className={styles.productCard} key={index}>
            <Link
              href={`/users/product/${product.id}`}
              className={styles.productLink}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={150}
                height={150}
                priority
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">{product.price}</span>
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.productlist}>
      {products.map((product, index) => (
        <div className={styles.productCard} key={index}>
          <Link
            href={`/users/product/${product.id}`}
            className={styles.productLink}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={150}
              height={150}
              priority
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className="price">{`$${product.price}`}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
