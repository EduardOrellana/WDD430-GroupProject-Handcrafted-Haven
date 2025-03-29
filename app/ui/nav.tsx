import styles from "@/app/page.module.css";
import Link from "next/link";
export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <Link href="/">Home</Link>
        <Link href="/sellers">Sellers</Link>
        <Link href="#">Link 2</Link>
        <Link href="#">Link 3</Link>
        <Link href="#">Link 4</Link>
        <Link href="#">Link 5</Link>
      </ul>
    </nav>
  );
}
