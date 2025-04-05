import ProductDetail from './ProductDetail';
import Reviews from './Reviews';

const dummyProduct = {
  name: 'Handmade Ceramic Mug',
  description: 'Eco-friendly mug with beautiful glaze.',
  price: 25,
  image: '/angel.png',
  seller: 'Rose Potter',
};

export default async function ProductPage({
  params,
}: {
  params: { productId: string; userId: string };
}) {
  return (
    <main className="p-4 max-w-2xl mx-auto">
      <ProductDetail product={dummyProduct} />
      <Reviews productId={params.productId} />
    </main>
  );
}
/*
export default function ProductPage({ params }: { params: { productId: string, userId: string } }) {
  return (
    <main>
      <ProductDetail product={dummyProduct} />
      <Reviews productId={params.productId} />
    </main>
  );
}*/
