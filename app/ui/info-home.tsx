import styles from '../page.module.css';
import Link from 'next/link';
import Founders from './founders';

export default async function InfoHome() {
    
    return (
        <>
            <div className={styles.infoHome}>
                <h2>Welcome to the Product Store</h2>
                <p>Explore our wide range of products and categories.</p>
                <Link href="/users/products">View Products</Link>
            </div>
            <br></br>
            <h2>About Us</h2>
            <p>Heavenly Haven is a beautifully designed product page that showcases a curated collection of handcrafted goods made with care and tradition. The site offers a warm and inviting experience, allowing users to explore top sellers and product categories with ease. With a clean layout, intuitive navigation, and a focus on artisan craftsmanship, Heavenly Haven creates a peaceful and user-friendly environment for discovering unique items that bring comfort and beauty to everyday life.</p>

            <br></br>
            <h2>Our Mission</h2>
            <p>At Heavenly Haven, our mission is to provide a platform for artisans to showcase their handcrafted goods, while offering customers a unique shopping experience that celebrates craftsmanship and tradition. We believe in the beauty of handmade products and strive to connect artisans with those who appreciate the artistry behind each piece.</p>
            <br></br>

            <Founders />

        </>
    )
}