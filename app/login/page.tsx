'use client';
import styles from "@/app/page.module.css";
import Link from "next/link";
import { useActionState } from "react";
import { processLogin } from "@/app/(account)/actions";
import GithubLogin from "./github-login";

export default function Login() {
  const [message, action] = useActionState(processLogin, undefined)

  return (
    <main>

      <section className={styles.logInSection}>
        <h2 className={styles.titleLogin}>Log In</h2>

        <form className={styles.loginForm} action={action}>

          <h5>{message}</h5>

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
          <Link href="/create-account">Create an account</Link>
        </form>

      </section>
      <GithubLogin />
    </main>
  )
}
