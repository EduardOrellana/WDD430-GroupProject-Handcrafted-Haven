'use client';
import styles from "@/app/page.module.css";
import Image from "next/image";

export default function Layout() {
  return (
    <main>
      <section>
        <h2 className={styles.titleLogin}>Log In</h2>
        <form className={styles.loginForm}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
      </section>
      <section className={styles.oAuthSection}>
        <Image
          src="/github-logo.png"
          width={50}
          height={30}
          alt="GitHub Logo"
          className={styles.gitLogo}
        />
      </section>
    </main>
  )
}
