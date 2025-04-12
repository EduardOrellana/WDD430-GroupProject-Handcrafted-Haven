'use client';

import styles from '@/app/page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <Image
          src="/heaven.png"
          width={100}
          height={100}
          alt="Heavenly Haven Logo"
          loading="lazy"
          className={styles.logoImage}
        />
        <h1>Heavenly Haven</h1>
      </Link>
    </div>
  );
}
