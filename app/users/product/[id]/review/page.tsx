//import ReviewForm from '../../../../components/ReviewForm';

export default async function Page({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  return <></>
  //return <ReviewForm productId={id} />;
}
