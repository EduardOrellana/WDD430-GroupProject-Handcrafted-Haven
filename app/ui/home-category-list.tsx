import styles from "../page.module.css"
import Link from "next/link"

const categoriesDommyData = [
    {
        id: 1,
        title: "electronics",
        description: "This is a great category 1",
        imageUrl: "https://placehold.co/150",
    },
    {
        id: 2,
        title: "clothing",
        description: "This is a great category 2",
        imageUrl: "https://placehold.co/150",
    },
    {
        id: 3,
        title: "technology",
        description: "This is a great category 3",
        imageUrl: "https://placehold.co/150",
    },
    {
        id: 4,
        title: "games",
        description: "This is a great category 4",
        imageUrl: "https://placehold.co/150",
    }
]

export default function CategoryList() {

    return (
        <div className={styles.categoryList}>
            <h2>Categories' List</h2>
            <ul> 
            {categoriesDommyData.map((category, index) => (
                <li className="card" key={index}>
                    <Link href={`/users/products/category/${category.title}`}>
                        {category.title}
                    </Link>
                </li>
            ))}
            </ul>
        </div>
    )
}