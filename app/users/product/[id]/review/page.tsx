import ReviewForm from '../../../../components/ReviewForm';

export default function Page({ params }: { params: { id: string } }) {
  return <ReviewForm productId={params.id} />;
}
