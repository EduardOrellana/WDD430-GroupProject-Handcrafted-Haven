import styles from '../page.module.css';
import { getUsers } from '@/app/lib/data';
import Link from 'next/link';


export default async function SellerList() {
  const data = await getUsers();
  if ('error' in data) {
    console.error('Error fetching users:', data.error);
    return <div>Error fetching users</div>;
  } else {
    console.log('Users:', data);
  }

  const users = Array.from(new Set(data.map((i) => i)));

  return (
    <div className={styles.sellersList}>
      <h2>Principal Sellers</h2>
      <ul>
        {users.map((category, index) => (
          <Link
            href={`/users/${category.id}`}
            className={styles.categoryCard}
            key={index}
          >
            <li className={styles.categoryCard} key={index}>
              {category.username}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
