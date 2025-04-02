'use client'
import styles from "@/app/page.module.css";
import Link from "next/link";
import { useState, useEffect } from 'react';


export default function Navigation() {

  const [clicked, setClicked] = useState(false)
  const [screen, setScreen] = useState(0)
  const [bigScreen, setBigScreen] = useState(false)

  useEffect(() => {

    function resize() {
      const screen = window.innerWidth
      setScreen(screen)
      setBigScreen(screen >= 700)
    }
    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [screen])

  function handleMenuBtn() {
    setClicked(!clicked)

  }

  function Menu() {
    return (
      <>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/sellers">Sellers</Link></li>
        <li><Link href="/users/products">Users Products</Link></li>
        <li><Link href="#">Link 3</Link></li>
        <li><Link href="#">Link 4</Link></li>
        <li><Link href="#">Link 5</Link></li>
      </>
    )
  }

  return (
    <nav className={styles.nav}>
      {bigScreen ? (
        <ul>
          <Menu />
        </ul>
      ) : (
        <ul onClick={handleMenuBtn}>
          {clicked ?
            (
              <ul>
                <li><img src="../close.svg" /></li>
                <Menu />
              </ul>
            ) : (<ul><li><img src="../menu.svg" /></li></ul>)
          }
        </ul>


      )}
    </nav>
  );
}
