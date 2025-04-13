import SellerList from './ui/home-seller-list';
import CategoryList from './ui/home-category-list';
import Search from './ui/search';
import styles from './page.module.css';
import InfoHome from './ui/info-home';

export default function Home() {
  return (
    <>
      <div className = {styles.homePage}>
        <div className = {styles.searchContainer}>
          <Search />
        </div>
        <div className = {styles.mainContainer}>
          <InfoHome />
        </div>
        <div className={styles.linksContainer}>
          <SellerList />
          <CategoryList />
        </div>
      </div>
    </>
  );
}
