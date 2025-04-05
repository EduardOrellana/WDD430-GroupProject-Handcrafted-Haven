'use client';

import { useEffect, useState } from 'react';

type Review = {
  productId: string;
  review: string;
  createdAt: string;
};

export default function Reviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<string[]>([]);
  const [review, setReview] = useState('');

  useEffect(() => {
    fetch(`/api/reviews/${productId}`)
      .then(res => res.json())
      .then((data: Review[]) => {
        const reviewTexts = data.map((r) => r.review);
        setReviews(reviewTexts);
      })
      .catch(err => console.error('Failed to fetch reviews:', err));
  }, [productId]);

  const handleSubmit = async () => {
    if (!review.trim()) return;

    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, review }),
    });

    setReviews(prev => [review, ...prev]);
    setReview('');
  };

  return (
    <section>
      <h2>Reviews</h2>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        rows={4}
      />
      <br />
      <button onClick={handleSubmit}>Submit Review</button>

      <ul>
        {reviews.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </section>
  );
}
