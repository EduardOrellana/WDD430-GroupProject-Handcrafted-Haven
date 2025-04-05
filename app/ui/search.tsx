import styles from "../page.module.css"

export default function Search() {
    return (
        <div className={styles.search}>
            <label htmlFor="search">Search</label>
            <input type="text" />
        </div>

    )
}