import styles from '../page.module.css';
import { profileObject } from '@/app/lib/temporalData';
import { getUsers } from '@/app/lib/data';
import Link from 'next/link';

const sellersDommyData = profileObject;

export default async function SellerList() {
  const data = await getUsers();
  if ('error' in data) {
    console.error('Error fetching users:', data.error);
    return <div>Error fetching users</div>;
  } else {
    console.log('Users:', data);
  }

  const users = Array.from(new Set(data.map((i) => i.username)));

  return (
    <div className={styles.sellersList}>
      <h2>Principal Sellers</h2>
      <ul>
        {users.map((category, index) => (
          <Link
            href={`/users/${category}`}
            className={styles.categoryCard}
            key={index}
          >
            <li className={styles.categoryCard} key={index}>
              {category}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
