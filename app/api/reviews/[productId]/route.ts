import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  const { rows } = await sql`
    SELECT * FROM reviews WHERE product_id = ${params.productId}
    ORDER BY created_at DESC
  `;
  return NextResponse.json(rows);
}