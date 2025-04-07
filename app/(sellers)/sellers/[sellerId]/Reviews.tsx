type Props = {
  sellerId: string;
};

// 🔧 Add index signature to let TS know this object is okay with string keys
const mockReviews: Record<string, string[]> = {
  '1': ['Amazing work!', 'Super fast shipping!'],
  '2': ['Would buy again', 'Quality is 🔥'],
};

export default function Reviews({ sellerId }: Props) {
  const reviews = mockReviews[sellerId] || ['No reviews yet.'];

  return (
    <div>
      <h3 className="font-semibold text-lg">Reviews</h3>
      <ul className="text-sm text-gray-600 list-disc ml-4 mt-2">
        {reviews.map((review: string, i: number) => (
          <li key={i}>{review}</li>
        ))}
      </ul>
    </div>
  );
}
