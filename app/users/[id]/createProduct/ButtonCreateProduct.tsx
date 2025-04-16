'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css'

export default function ButtonCreateProduct({
  userId,
}: {
  userId: number | string;
}) {
  const router = useRouter();

  function handleClick() {
    router.push(`/users/${userId}/createProduct`);
  }

  return (
    <button
      onClick={handleClick}
      className={styles.button}
    >
      Create New Product
    </button>
  );
}
