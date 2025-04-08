type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};


export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <span className="text-green-600 font-bold">${product.price.toFixed(2)}</span>
    </div>
  );
}
