import type { Metadata } from "next";
import "./globals.css";
import Header from "./ui/header";
import Footer from "./ui/footer";
import styles from "./page.module.css"
import Search from "./ui/search"

export const metadata: Metadata = {
  title: "Heavenly Haven Art Store",
  description: "An art store for the most fervent crafters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = typeof window !== "undefined" && window.location.pathname === "/login";

  return (
    <html lang="en">
      <body className={styles.body}>
        <div className={styles.app}>
          <Header />
          {!pathname && <Search />}
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
