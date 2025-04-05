
import SellerList from "./ui/home-seller-list"
import CategoryList from "./ui/home-category-list"
import styles from "./page.module.css"
import Image from "next/image"

export default function Home() {
  return (
    <main>
      <section className={styles.homeCards}>
        <h2>
          A place where Art meets Heart
        </h2>
        <Image
          src='/hero-image-artisan.webp'
          width={300}
          height={400}
          alt="Hero Image"
          className={styles.heroImage}></Image>
        <p>
          Discover a world of unique, handcrafted treasures at Heavenly Haven. We're more than just an online store; we're a vibrant community connecting passionate artisans with art and craft enthusiasts like you. Explore a curated collection of original works, each piece telling a story of creativity and dedication.
        </p>
      </section>

      <SellerList />
      <CategoryList />
    </main>
  )
}