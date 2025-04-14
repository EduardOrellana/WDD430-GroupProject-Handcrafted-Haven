import styles from "./product.module.css";
import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts } from "@/app/lib/data";
import Filter from "./Filter";

export default async function UserProdutList({
  searchParams,
}: {
  searchParams: Promise<{ [search: string]: string | undefined }>;
}) {
  const { search, category, maxPrice } = await searchParams;
  const categories = await getCategories();

  if ("error" in categories) {
    console.error("Error fetching categories:", categories.error);
    return <div>Error fetching categories</div>;
  } else {
    console.log("Categories:", categories);
  }

  const uniqueCategories = Array.from(
    new Set(categories.map((cat) => cat))
  ) as unknown as { id: string; name: string }[];

  const data = await getProducts({
    search: search ? search : undefined,
    category: category ? category : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
  });

  if (!data) {
    console.error("Error fetching products:", data);
    return <div>Error fetching products</div>;
  } else {
    console.log("Products:", data);
  }

  const list: {
    name: string;
    description: string;
    id: string;
    price: string;
  }[] = (data || []) as unknown as {
    name: string;
    description: string;
    id: string;
    price: string;
  }[];

  if (!(search === undefined) && list.length === 0) {
    return (
      <div className={styles.productlist}>
        <h2>No products found</h2>
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Filter
        category={category}
        maxPrice={maxPrice}
        search={search}
        categories={uniqueCategories}
      />
      <div className={styles.productlist}>
        {list.map((product, index) => (
          <div className={styles.productCard} key={index}>
            <Link
              href={`/users/product/${product.id}`}
              className={styles.productLink}
            >
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">{`$${product.price}`}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
