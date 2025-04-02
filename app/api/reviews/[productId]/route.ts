import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import clientPromise from '../../../lib/mongodb'; 

export async function GET(
  request: NextRequest,
  context: { params: { productId: string } }
) {
  const productId = context.params.productId;

  const client = await clientPromise;
  const db = client.db('handcrafted');

  const reviews = await db
    .collection('reviews')
    .find({ productId })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(reviews);
}
