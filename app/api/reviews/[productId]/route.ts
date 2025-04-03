import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const segments = url.pathname.split('/');
    const productId = segments[segments.length - 1];

    // 1. Connect to the MongoDB client
    const client = await clientPromise;

    // 2. Select your database and collection
    const db = client.db('handcrafted');
    const reviewsCollection = db.collection('reviews');

    // 3. Query reviews for the given productId
    const reviews = await reviewsCollection
      .find({ productId })
      .sort({ createdAt: -1 })
      .toArray();

    // 4. Return the reviews
    return NextResponse.json({
      message: `Fetched ${reviews.length} reviews for product ID: ${productId}`,
      productId,
      reviews,
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Something went wrong while fetching reviews.' },
      { status: 500 }
    );
  }
}