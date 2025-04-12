import styles from '../page.module.css';
import Link from 'next/link';
import { getCategories } from '@/app/lib/data';

export default async function CategoryList() {
  // Extraer categorías únicas

  const data = await getCategories();

  if ('error' in data) {
    console.error('Error fetching categories:', data.error);
    return <div>Error fetching categories</div>;
  } else {
    console.log('Categories:', data);
  }

  const uniqueCategories = Array.from(new Set(data.map((cat) => cat.name)));

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
