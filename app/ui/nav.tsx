'use client'

import styles from '../page.module.css'
import clsx from 'clsx'

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><img src="../menu.svg" /></li>
            </ul>
            <ul>
                <li><img src="../close.svg" /></li>
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