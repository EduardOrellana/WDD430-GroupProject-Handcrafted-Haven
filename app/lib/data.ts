import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
export async function productSearch(name: string) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        SELECT
            p.id AS product_id,
            p.name AS product_name,
            p.price AS product_price,
            p.description AS product_description,
            p.images AS product_images,
            u.id AS user_id,
            u.username AS user_username,
            u.email AS user_email,
            u.password AS user_password,
            u.profile_pic_url AS user_profile_pic,
            r.id AS review_id,
            r.date AS review_date,
            r.content AS review_content,
            r.rating AS review_rating,
            c.id AS category_id,
            c.name AS category_name
        FROM
            "product" p
        JOIN
            "user" u ON p.user_id = u.id
        LEFT JOIN
            "review" r ON p.ID = r.product_id
        RIGHT JOIN
            "category" c ON p.category_id = c.id
        WHERE
            p.name = ${name};
    `;
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}