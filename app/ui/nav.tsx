
import styles from '@/app/page.module.css'

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/sellers">Sellers</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
                <li><a href="#">Link 4</a></li>
                <li><a href="#">Link 5</a></li>
            </ul>
        </nav>
    )
}
