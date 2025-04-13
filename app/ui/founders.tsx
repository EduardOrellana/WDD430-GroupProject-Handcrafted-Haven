import Image from 'next/image';
import styles from '../page.module.css';

export default async function Founders() {
  return (
    <div className={styles.founders}>
      <h2>Founders</h2>
      <Image
        className='founderImage'
        src="/founders/erick.png"
        alt="Erick Orellana"
        width={150}
        height={150}
        priority
      />
      <h3>Erick Orellana</h3>
    </div>
  );
}
