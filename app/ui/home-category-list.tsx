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

  const uniqueCategories = data.map((cat) => ({ id: cat.id, name: cat.name }));
  console.log('Unique Categories:', uniqueCategories);

  return (
    <div className={styles.categoryList}>
      <h2>Categories List</h2>
      <ul>
        {uniqueCategories.map((category) => (
          <li className="card" key={category.id}>
            <Link href={`/users/products/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
