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

      <Image
        className='founderImage'
        src="/founders/ignacio.jpeg"
        alt="Ignacio De Los Santos"
        width={150}
        height={150}
        priority
      />
      <h3>Ignacio De Los Santos</h3>

      <Image
        className='founderImage'
        src="/founders/johann.jpg"
        alt="Johaan"
        width={150}
        height={150}
        priority
      />
      <h3>Johann Tellez</h3>

      <Image
        className='founderImage'
        src="/founders/victor.jpeg"
        alt="Victor Malpica"
        width={150}
        height={150}
        priority
      />
      <h3>Victor Malpica</h3>
    </div>
  );
}
