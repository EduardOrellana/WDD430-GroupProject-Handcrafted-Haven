import styles from "../page.module.css"
import Link from "next/link"
import { productsObject } from "@/app/lib/temporalData";

export default function CategoryList() {

    return (
        <div className={styles.categoryList}>
            <h2>Categories' List</h2>
            <ul> 
            {productsObject.map((category, index) => (
                <li className="card" key={index}>
                    <Link href={`/users/products/${category.category}`}>
                        {category.category}
                    </Link>
                </li>
            ))}
            </ul>
        </div>
    )
}