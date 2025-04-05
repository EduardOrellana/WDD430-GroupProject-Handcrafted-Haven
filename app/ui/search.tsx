import styles from "../page.module.css"
import Image from "next/image"

export default function Search() {
    return (
        <div className={styles.search}>
            <label htmlFor="search">
                <Image
                    src='./search.svg'
                    alt="Search Icon"
                    width={25}
                    height={25}
                    className={styles.searchIcon}
                >
                </Image>
            </label>
            <input type="text" placeholder="Search products here" />
        </div>
    )
}