'use client';

import { SessionProvider } from 'next-auth/react';
import "./globals.css";
import Header from "./ui/header";
import Footer from "./ui/footer";
import styles from "./page.module.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
