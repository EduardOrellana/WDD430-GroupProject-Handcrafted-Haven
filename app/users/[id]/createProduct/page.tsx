import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth.config';
import { getCategories } from '@/app/lib/data';
import CreateForm from './CreateProductForm';

export default async function CreateProductPage() {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return <div>Please log in to create a product.</div>;
  }

  const categories = await getCategories();

  if (!Array.isArray(categories)) {
    console.error('Expected categories to be an array, but got:', categories);
    return <div>Error loading categories</div>;
  }

  const uniqueCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
  }));

  return (
    <CreateForm
      categories={uniqueCategories}
      userId={session.user.id} 
    />
  );
}
