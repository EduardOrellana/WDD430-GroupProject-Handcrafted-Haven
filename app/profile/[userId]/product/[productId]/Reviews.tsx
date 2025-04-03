'use client';

import { useEffect, useState } from 'react';

type Review = {
  id: number;
  content: string;
  rating: number;
};

export default function Reviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    fetch(`/api/reviews/${productId}`)
      .then(res => res.json())
      .then(setReviews);
  }, [productId]);

  const handleSubmit = async () => {
    if (!newReview.trim()) return;

    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, content: newReview }),
    });

    setReviews(prev => [{ id: Date.now(), content: newReview, rating: 5 }, ...prev]);
    setNewReview('');
  };

  return (
    <section>
      <h2>Reviews</h2>
      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        rows={3}
        placeholder="Write a review..."
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      <ul>
        {reviews.map((r) => (
          <li key={r.id}>{r.content}</li>
        ))}
      </ul>
    </section>
  );
}