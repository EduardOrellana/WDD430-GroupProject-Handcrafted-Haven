import Logo from "@/app/ui/haven-logo";
import Navigation from "./nav";
import styles from "@/app/page.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerBackground}></div>
            <Logo />
            <Navigation />
        </header>
    )
}