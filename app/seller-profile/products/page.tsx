import styles from "./product.module.css";
const products = [
  {
    id: 1,
    title: "Product 1",
    description: "This is a great product 1",
    price: "$10.00",
    imageUrl: "https://placehold.co/150",
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is a great product 2",
    price: "$20.00",
    imageUrl: "https://placehold.co/150",
  },
  {
    id: 3,
    title: "Product 3",
    description: "This is a great product 3",
    price: "$30.00",
    imageUrl: "https://placehold.co/150",
  },
  {
    id: 4,
    title: "Product 4",
    description: "This is a great product 4",
    price: "$40.00",
    imageUrl: "https://placehold.co/150",
  },
];

export default function SellerProdutList() {
  const list = products.concat(products).concat(products);
  return (
    <div className={styles.productlist}>
      {list.map((product, index) => (
        <div className={styles.productCard} key={index}>
          <img src={product.imageUrl} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <span className="price">{product.price}</span>
        </div>
      ))}
    </div>
  );
}
