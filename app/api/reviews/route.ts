import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { productId, content } = await req.json();
  await sql`
    INSERT INTO reviews (product_id, content, created_at)
    VALUES (${productId}, ${content}, NOW())
  `;
  return NextResponse.json({ message: 'Review added successfully' });
}