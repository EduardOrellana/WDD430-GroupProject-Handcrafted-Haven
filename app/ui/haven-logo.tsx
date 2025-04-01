import styles from '../page.module.css'
import Image from 'next/image'

export default function Logo() {
    return (
        <div className={styles.logo}>
            <Image
                src="/angel.png"
                width={100}
                height={100}
                alt="Heavenly Haven Logo"
                className={styles.logoImage}
            />
            <h1>Heavenly Haven</h1>
        </div>
    )
}