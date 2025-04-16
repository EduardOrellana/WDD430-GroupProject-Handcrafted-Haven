import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth.config';
import { getProductById, getCategories } from '@/app/lib/data';
import EditForm from './EditForm';

export default async function EditProductPage(
  props
: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authConfig);
  const params = await props.params;

  if (!session?.user) {
    return <div>Please log in to edit the product.</div>;
  }

  const productId = parseInt(params.id);
  const product = await getProductById(productId);
  const categories = await getCategories();

  // Crear un conjunto único de categorías si es necesario

  if (!Array.isArray(categories)) {
    console.error('Expected categories to be an array, but got:', categories);
    return <div>Error loading categories</div>;
  }
  
  const uniqueCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
  }));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <EditForm
      product={{
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category_id,
      }}
      productId={productId}
      categories={uniqueCategories}
    />
  );
}