import SellerList from './ui/home-seller-list';
import CategoryList from './ui/home-category-list';
import Search from './ui/search';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <h1>Welcome to Heavenly Haven Art Store</h1>
      <Search />
      <div className={styles.home}>
        <SellerList />
        <CategoryList />
      </div>
    </>
  );
}
