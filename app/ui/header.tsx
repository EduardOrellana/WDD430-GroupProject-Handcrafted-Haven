'use client'

import Logo from "@/app/ui/haven-logo";
import Navigation from "@/app/ui/nav";
import styles from "@/app/page.module.css"
import Link from "next/link";

export default function Header() {
    return (
        <>
            <div className={styles.loginContainer}>
                <Link href={"/login"} className={styles.loginButton}>Login</Link>
                <Link href={"signup"} className={styles.registerButton}>Sign Up</Link>
            </div>
            <header className={styles.header}>
                <div className={styles.headerBackground}></div>
                <Logo />
                <Navigation />
            </header>
        </>
    )
}
