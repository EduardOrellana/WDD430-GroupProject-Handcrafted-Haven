export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[]; // from DB
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded p-4 shadow">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="font-bold text-lg mt-2">{product.name}</h3>
      <p>{product.description}</p>
      <p className="text-green-600 font-semibold">${product.price}</p>
    </div>
  );
}
