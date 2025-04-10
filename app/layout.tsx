import type { Metadata } from "next";
import "./globals.css";
import Header from "./ui/header";
import Footer from "./ui/footer";
import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "Heavenly Haven Art Store",
  description: "An art store for the most fervent crafters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const pathname = typeof window !== "undefined" && window.location.pathname === "/login";
  // const isLoginPage = pathname === "/login";
  // const isSearchPage = pathname === "/search";
  return (
    <html lang="en">
      <body className={styles.body}>
        <Header />
        {/* {!pathname && <Search />} */}
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
