"use client"; 
import { useState } from "react";
import styles from "@/app/page.module.css"; 
import Link from "next/link";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        className={styles.navitagion} 
        onClick={() => setOpen(!open)}
      >
        {open ? "✖" : "☰"}
      </button>
      <nav className={`${styles.nav} ${open ? styles.show : ""}`}>
          <Link href="/">Home</Link>
          <Link href="/sellers">Sellers</Link>
          <Link href="/users/products">Users Products</Link>
          <Link href={"/login"} >Login</Link>
          {/* <Link href={"/signup"} >Sign Up</Link> */}
      </nav>
    </>
  );
}
