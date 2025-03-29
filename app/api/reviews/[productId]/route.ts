import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const client = await clientPromise;
  const db = client.db('handcrafted');
  const reviews = await db
    .collection('reviews')
    .find({ productId: params.productId })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(reviews);
}
