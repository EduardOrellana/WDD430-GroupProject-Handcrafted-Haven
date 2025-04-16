"use client";

import { FormEvent, useActionState, useState } from "react";

import styles from "./product.module.css";
import { createReview } from "@/app/lib/actions";

export type State = {
  message?: string | null;
};

export default function WriteReview({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const [rating, setRating] = useState(0);
  const [isEnable, setEnable] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  const initialState: State = { message: null };
  const [state, formAction] = useActionState(createReview, initialState);

  return isEnable ? (
    <div className={styles.reviewContainer}>
      <h2>Leave a Review</h2>
      <form action={formAction}>
        <div className={styles.starRating}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <span
              key={star}
              className={`${styles.star} ${
                star <= (hoverRating || rating) ? styles.filled : ""
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className={styles.input}
          placeholder="Write your review here..."
          value={review}
          id={"content"}
          name={"content"}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
        />
        <input type="hidden" id={"rating"} name={"rating"} value={rating} />

        <input type="hidden" id={"user_id"} name={"user_id"} value={userId} />
        <input
          type="hidden"
          id={"product_id"}
          name={"product_id"}
          value={productId}
        />

        <button
          className={styles.reviewButton}
          type="submit"
          disabled={rating === 0 || review.trim() === ""}
        >
          Submit Review
        </button>
      </form>
    </div>
  ) : (
    <button
      style={{ width: 200 }}
      className={styles.reviewButton}
      onClick={() => setEnable(true)}
    >
      Write Review
    </button>
  );
}
