'use client'

// import Logo from "@/app/ui/haven-logo";
import Navigation from "@/app/ui/nav";
import styles from "@/app/page.module.css"

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.h1}>Heavenly Haven</h1>
                {/* <Logo /> */}
                <Navigation />
            </header>
        </>
    )
}
