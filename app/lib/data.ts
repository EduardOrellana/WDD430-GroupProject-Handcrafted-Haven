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
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
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
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function productSearchByPriceRange(min: number, max: number) {
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
          p.price >= ${min} AND p.price <= ${max}
    `;
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
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
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
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
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
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
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
    return data[0];
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
    const ratingSum = data.reduce((sum, item) => sum + item.rating, 0);
    const totalRating = (ratingSum / data.length || 0).toFixed(2);
    if (process.env.ENV === 'development') {
      console.log('Total Rating:', totalRating);
    }
    return [{ rating: totalRating }];
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function getProductRating(product_id: number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
      SELECT
        rating
      FROM
        review
      WHERE
        product_id = ${product_id};
    `;
    const ratingSum = data.reduce((sum, item) => sum + item.rating, 0);
    const totalRating = (ratingSum / data.length || 0).toFixed(2);
    if (process.env.ENV === 'development') {
      console.log('Total Rating:', totalRating);
    }
    return [{ rating: totalRating }];
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function getProductReview(product_id: number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
      SELECT
        r.id,
        u.username AS author,
        r.date,
        r.content AS text,
        r.rating
      FROM
        "review" r
      JOIN
        "user" u ON u.id = r.user_id
      WHERE
        r.product_id = ${product_id};
    `;
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
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
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}
