'use client'

import Logo from "@/app/ui/haven-logo";
import Navigation from "@/app/ui/nav";
import styles from "@/app/page.module.css"
import Link from "next/link";
import Search from "./search"

export default function Header() {
    const pathname = typeof window !== "undefined" && window.location.pathname === "/login";
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
                {!pathname && <Search />}
            </header>
        </>
    )
}
