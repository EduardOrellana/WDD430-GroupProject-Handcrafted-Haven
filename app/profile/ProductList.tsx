// app/profile/ProductList.tsx
import ProductCard from './ProductCard';

export default function ProductList({ products }: { products: any[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
