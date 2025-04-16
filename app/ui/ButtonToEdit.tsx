import { getServerSession } from 'next-auth';
import { productSearchByUser, getProductById } from '@/app/lib/data';
import { authConfig } from '@/auth.config';
import { User } from '@/app/lib/definitions';
import Link from 'next/link';
import styles from '@/app/users/product/[id]/edit/edit.module.css'; 

export default async function ButtonEditProduct({
  params,
}: {
  params: { ProductId: string };
}) {
  const session = await getServerSession(authConfig);
  const { ProductId } = params;
  const { id } = session?.user ? session.user as User : { id: 'noLog' };
  
  console.log('User Id:', id);

  if (id === 'noLog') {
    return <>Please Log in to View more Actions</>
  }

  const data = await productSearchByUser(id);

  const list: {
    name: string;
    description: string;
    id: string;
    price: string;
    category: string;
    images: string[];
  }[] = (data || []) as unknown as {
    name: string;
    description: string;
    id: string;
    price: string;
    category: string;
    images: string[];
  }[];

  const products = await list.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.images[0],
    category: product.category,
    description: product.description,
    price: product.price,
  }));

  const productData = await getProductById(parseInt(ProductId));

  // console.log('Product Data:', productData);
  // console.log('Products:', products);

  // Check if productData exists in products
  const isProductInList = products.find(
    (product) => product.id === productData?.id
  );

  if (!session?.user) {
    return <>Log in to edit</>;
  }

  if (session?.user && !isProductInList) {
    return (
      <>
        <p className={styles.key}>Product not found in your list</p>
        <Link
          href={`/users/product/${ProductId}/review`}
          className={styles.link}
        >
          Write a Review
        </Link>
      </>
    )

  }

  if (session?.user && isProductInList) {
    return (
      <Link href={`/users/product/${ProductId}/edit`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit Product
        </button>
      </Link>
    );
  }
}
