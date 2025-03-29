import styles from "@/app/page.module.css";
import Link from "next/link";
export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/sellers">Sellers</Link>
        <Link href="/users/products">Users Products</Link>
        <Link href="#">Link 3</Link>
        <Link href="#">Link 4</Link>
        <Link href="#">Link 5</Link>
      </ul>
    </nav>
  );
}
