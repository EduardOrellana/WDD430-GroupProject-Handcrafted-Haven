import styles from '../page.module.css';
import Link from 'next/link';
import { productsObject } from '@/app/lib/temporalData';

export default function CategoryList() {
  // Extraer categorías únicas
  const uniqueCategories = Array.from(
    new Set(productsObject.map((product) => product.category))
  );

  return (
    <div className={styles.categoryList}>
      <h2>Categories List</h2>
      <ul>
        {uniqueCategories.map((category, index) => (
          <li className="card" key={index}>
            <Link href={`/users/products/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
