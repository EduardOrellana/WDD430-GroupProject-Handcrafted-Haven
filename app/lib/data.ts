import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 

export async function getCategories() {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        SELECT DISTINCT
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

export async function getProducts({
  category,
  maxPrice,
  search,
}: {
  search?: string;
  category?: string;
  maxPrice?: number;
} = {}) {
  const isWhere = search || maxPrice || category;
  try {
    if (!process.env.POSTGRES_URL) {
      console.error("POSTGRES_URL environment variable is not defined.");
      return { error: "Database connection string is missing.", status: 500 };
    }

    if (isWhere) {
      if (search && !maxPrice && !category) {
        return await sql`
        SELECT * FROM "product" p WHERE
       p.name ILIKE ${"%" + search + "%"}
    `;
      } else if (maxPrice && !search && !category) {
        return await sql`
        SELECT * FROM "product" p WHERE
         p.price <= ${maxPrice}
        `;
      } else if (category && !maxPrice && !search) {
        return await sql`
        SELECT * FROM "product" p WHERE
         p.category_id = ${category}
        `;
      } else if (category && maxPrice && search) {
        return await sql`
      SELECT * FROM "product" p WHERE
        p.name ILIKE ${"%" + search + "%"}
        AND
        p.category_id = ${category}
        AND
        p.price <= ${maxPrice}
    `;
      } else if (category && maxPrice) {
        return await sql`
        SELECT * FROM "product" p WHERE
          p.category_id = ${category}
          AND
          p.price <= ${maxPrice}
      `;
      } else if (category && search) {
        return await sql`
        SELECT * FROM "product" p WHERE
          p.name ILIKE ${"%" + search + "%"}
          AND
          p.category_id = ${category}
      `;
      } else if (maxPrice && search) {
        return await sql`
        SELECT * FROM "product" p WHERE
          p.name ILIKE ${"%" + search + "%"}
          AND
          p.price <= ${maxPrice}
      `;
      }
    } else {
      return await sql`SELECT * FROM "product" p`;
    }
  } catch (error) {
    console.error("Database query error:", error);
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
    if (data.length === 0) {
      return { msg: 'Products not found', status: 404 };
    }
    if (data.length > 1) {
      return data;
    }
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
    if (data.length === 0) {
      return { msg: 'Products not found', status: 404 };
    }
    if (data.length > 1) {
      return data;
    }
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

export async function productSearchByUser(user_id: number | string) {
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
    if (data.length === 0) {
      return { msg: 'Products not found', status: 404 };
    }
    if (data.length > 1) {
      return data;
    }
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

export async function getUserById(id: number | string) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        SELECT
          "username",
          "email",
          "profile_pic_url",
          "password"
        FROM
          "user"
        WHERE
          id = ${id};
    `;


    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
    if (data.length === 0) {
      return { msg: 'User not found', status: 404 };
    }
    if (data.length > 0) {
      return data[0];
    }
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function getUserByEmail(email:string) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        SELECT
          "id",
          "username",
          "profile_pic_url",
          "password"
        FROM
          "user"
        WHERE
          email = ${email};
    `;
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
    if (data.length === 0) {
      return { msg: 'User not found', status: 404 };
    }
    if (data.length > 1) {
      return data[0];
    }
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function getUserRatingById(user_id: number) {
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
    if (data.length === 0) {
      return { msg: 'No rating found', status: 404 };
    }
    if (data.length > 1) {
      const ratingSum = data.reduce((sum: number, item: any) => sum + item.rating, 0);
      const totalRating = (ratingSum / data.length || 0).toFixed(2);
      if (process.env.ENV === 'development') {
        console.log('Total Rating:', totalRating);
      }
      return [{ rating: totalRating }];
    }
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function getProductRatingById(product_id: number) {
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
    if (data.length === 0) {
      return { msg: 'No rating found', status: 404 };
    }
    if (data.length > 1) {
      const ratingSum = data.reduce((sum: number, item: any) => sum + item.rating, 0);
      const totalRating = (ratingSum / data.length || 0).toFixed(2);
      if (process.env.ENV === 'development') {
        console.log('Total Rating:', totalRating);
      }
      return [{ rating: totalRating }];
    }
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function getProductReviewById(product_id: number) {
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

export async function updateProductById(id: number, name: string, price: number, description:string, images:[string]) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
      UPDATE "product" SET name = ${name}, price = ${price}, description = ${description}, images = ${images} WHERE "id" = ${id};
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

export async function deleteProductById(id: number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
      DELETE FROM "product" WHERE "id" = ${id};
    `;
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
    return {delete: "success"};
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function createProduct(name: string, price: number, description:string, images:[string], user_id: number, category_id: number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
      INSERT INTO "product" (name, price, description, images, user_id, category_id)
      VALUES (${name}, ${price}, ${description}, ${images}, ${user_id}, ${category_id});
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

export async function createReview(product_id: number, user_id: number, content: string, rating: number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
      INSERT INTO "review" (product_id, user_id, content, rating)
      VALUES (${product_id}, ${user_id}, ${content}, ${rating});
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

export async function updateReviewById(id: number, content: string, rating: number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
      UPDATE "review" SET content = ${content}, rating = ${rating} WHERE "id" = ${id};
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

export async function deleteReviewById(id: number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
      DELETE FROM "review" WHERE "id" = ${id};
    `;
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
    return {delete: "success"};
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

export async function createUser(username: string, profile_pic_url: string, email: string, password: string) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
      INSERT INTO "user" (username, profile_pic_url, email, password)
      VALUES (${username}, ${profile_pic_url}, ${email}, ${password});
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

export async function updateUserById(id: number, username: string, profile_pic_url: string, email: string, password: string) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
      UPDATE "user" SET username = ${username}, profile_pic_url = ${profile_pic_url}, email = ${email}, password = ${password} WHERE "id" = ${id};
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

export async function deleteUserById(id:number) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
      DELETE FROM "user" WHERE "id" = ${id};
    `;
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
    return {delete: "success"};
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}

// test function beware, high probability of data leak!
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

export async function getCategoryIdByName(categoryName: string) {
  try {
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL environment variable is not defined.');
      return { error: 'Database connection string is missing.', status: 500 };
    }
    const data = await sql`
        SELECT id FROM "category" WHERE name = ${categoryName};
    `;
    if (process.env.ENV === 'development') {
      console.log('Query result:', data);
    }
    if (data.length === 0) {
      return { error: 'Category not found', status: 404 };
    }
    return data[0].id; // Return only the ID
  } catch (error) {
    console.error('Database query error:', error);
    return { error: (error as Error).message, status: 500 };
  }
}