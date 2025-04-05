const mockProducts = [
  { id: 1, title: 'Product A', description: 'Awesome A', price: '$25', imageUrl: 'https://placehold.co/150' },
  { id: 2, title: 'Product B', description: 'Great B', price: '$40', imageUrl: 'https://placehold.co/150' },
];

export default function SellerProducts({ sellerId }: { sellerId: string }) {
  // TODO: Filter mockProducts by sellerId when hooked to DB
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockProducts.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded shadow">
          <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover rounded" />
          <h3 className="font-semibold mt-2">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <p className="font-bold text-green-600">{product.price}</p>
        </div>
      ))}
    </div>
  );
}