
import Logo from "@/app/ui/haven-logo";
import Navigation from "@/app/ui/nav";
import styles from "@/app/page.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <Logo />
            <Navigation />
        </header>
    )
}
