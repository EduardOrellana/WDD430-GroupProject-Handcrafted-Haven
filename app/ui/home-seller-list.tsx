import styles from '../page.module.css';
import { profileObject } from '@/app/lib/temporalData';
import Link from 'next/link';

const sellersDommyData = profileObject;

export default function SellerList() {
  return (
    <div className={styles.sellersList}>
      <h2>Principal Sellers</h2>
      <ul>
        {sellersDommyData.map((category, index) => (  
          <Link href={`/users/${category.id}`} className={styles.categoryCard} key={index}>
            <li className={styles.categoryCard} key={index}>
              {category.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
