
// app/profile/ProductCard.tsx
export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="border rounded p-4 shadow-md">
      <img src={product.images?.[0]} alt={product.name} className="w-full h-48 object-cover rounded mb-2" />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-green-600 font-bold">${product.price}</p>
    </div>
  );
}
