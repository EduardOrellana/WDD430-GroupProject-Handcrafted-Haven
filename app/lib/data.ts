import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 

export async function getCategories() {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        SELECT
          *
        FROM
          "category";
    `;
    console.log('Query result:', data);
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function productSearchByName(name: string) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        select
          p.id,
          p.name,
          p.price,
          p.description,
          p.images,
          c.name AS category,
          u.username AS "owner"
        from
          "product" p
        right join
          "user" u
        on
          p.user_id = u.id
        left join
          "category" c
        on
          p.category_id = c.id
        where
          p.name ILIKE ${'%' + name + '%'};
    `;
    console.log('Query result:', data);
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function productSearchByCategory(category_id: number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        select
          p.id,
          p.name,
          p.price,
          p.description,
          p.images,
          u.username AS "owner"
        from
          "product" p
        right join
          "user" u
        on
          p.user_id = u.id
        where
          p.category_id = ${category_id};
    `;
    console.log('Query result:', data);
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function productSearchByUser(user_id: number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        select
          p.id,
          p.name,
          p.price,
          p.description,
          p.images,
          c.name AS category
        from
          "product" p
        left join
          "category" c
        on
          p.category_id = c.id
        where
          p.user_id = ${user_id};
    `;
    console.log('Query result:', data);
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function getProductById(id: number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        select
          p.name,
          p.price,
          p.description,
          p.images,
          c.name AS category,
          u.username AS "owner"
        from
          "product" p
        right join
          "user" u
        on
          p.user_id = u.id
        left join
          "category" c
        on
          p.category_id = c.id
        where
          p.id = ${id};
    `;
    console.log('Query result:', data);
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function getUserRating(user_id: number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        SELECT
        r.rating
      FROM
        "review" r
      JOIN
        "product" p ON p.id = r.product_id
      WHERE
        p.user_id = ${user_id};
    `;
    console.log('Query result:', data);
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function getUsers() {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        SELECT
            *
        FROM
            "user";
    `;
    console.log('Query result:', data);
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}
