import styles from "../page.module.css"

const sellersDommyData = [
    {
        id: 1,
        name: "John Doe",
        description: "This is a great seller 1",
        imageUrl: "https://placehold.co/150",
    },
    {
        id: 2,
        name: "Jane Smith",
        description: "This is a great seller 2",
        imageUrl: "https://placehold.co/150",
    },
    {
        id: 3,
        name: "Alice Johnson",
        description: "This is a great seller 3",
        imageUrl: "https://placehold.co/150",
    },
    {
        id: 4,
        name: "Bob Brown",
        description: "This is a great seller 4",
        imageUrl: "https://placehold.co/150",
    }
]

export default function SellerList() {
    return (
        <div className={styles.sellersList}>
            <h2>Principal Sellers</h2>
            <ul> 
            {sellersDommyData.map((category, index) => (
                <li className={styles.categoryCard} key={index}>
                    {category.name}
                </li>
            ))}
            </ul>
        </div>
    )
}