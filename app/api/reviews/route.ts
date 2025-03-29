import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function POST(request: Request) {
  const { productId, review } = await request.json();

  if (!productId || !review) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('handcrafted');
  const result = await db.collection('reviews').insertOne({
    productId,
    review,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true, id: result.insertedId });
}
