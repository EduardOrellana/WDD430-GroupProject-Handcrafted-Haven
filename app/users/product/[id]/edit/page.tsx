import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth.config';
import { getProductById } from '@/app/lib/data';
import styles from './edit.module.css';
import EditProductForm from '@/app/ui/Edit-Product-Form';

export default async function EditProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return (
      <div>Please log in to edit the product.</div>
    );
  }

  const params = await props.params;
  const { id } = params;

  const product = await getProductById(parseInt(id));

  const productData = await product.map((product) => ({
    name: product.name,
    category: product.category,
    description: product.description,
    price: product.price,
  }));

  console.log('Product Data:', product);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <EditProductForm product={productData} productId={id} />
  );
}
