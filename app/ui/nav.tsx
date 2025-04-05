"use client"; 

import { useState } from "react";
import styles from "@/app/page.module.css"; 
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  return (
    <>
      <button 
        className={styles.navitagion} 
        onClick={() => setOpen(!open)}
      >
        {open ? "✖" : "☰"}
      </button>
      <nav className={`${styles.nav} ${open ? styles.show : ""}`}>
        <Link href="/" className={pathName === "/" ? styles.activePage : ""}>
          Home
        </Link>
        <Link href="/seller-profile" className={pathName === "/seller-profile" ? styles.activePage : ""}>
          My Seller Profile
        </Link>
        <Link href="/users/products" className={pathName === "/users/products" ? styles.activePage : ""}>
          General Market
        </Link>
        <Link href="/login" className={pathName === "/login" ? styles.activePage : ""}>
          Login
        </Link>
        {/* <Link href={"/signup"} className={pathName === "/signup" ? styles.active : ""}>Sign Up</Link> */}
      </nav>
    </>
  );
}
