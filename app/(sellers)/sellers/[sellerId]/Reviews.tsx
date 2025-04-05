const mockReviews = [
  'Great seller!',
  'Product quality was top-notch.',
  'Will buy again.'
];

export default function Reviews({ sellerId }: { sellerId: string }) {
  return (
    <aside>
      <h2 className="text-lg font-bold mb-2">Reviews</h2>
      <ul className="space-y-2">
        {mockReviews.map((review, idx) => (
          <li key={idx} className="text-gray-700 text-sm">{review}</li>
        ))}
      </ul>
    </aside>
  );
}