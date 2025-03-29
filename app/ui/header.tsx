'use client'

import Logo from "./haven-logo";
import Navigation from "./nav";
import styles from "../page.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerBackground}></div>
            <Logo />
            <Navigation />
        </header>
    )
}