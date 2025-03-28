import styles from '@/app/page.module.css'

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">Account</a></li>
                <li><a href="#">Seller Hub</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
    )
}