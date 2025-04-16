"use server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function authenticate(formData: FormData) {
  try {
    const user = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (user?.error) {
      return user.error;
    }

    return user;
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          console.log(error);
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createReview(prevState: State, formData: FormData) {
  const data = {
    product_id: formData.get("product_id") as string,
    user_id: parseInt((formData.get("user_id") as string) || "0"),
    content: formData.get("content") as string,
    rating: parseInt(formData.get("rating") as string),
  };

  if (!data.product_id || !data.rating || !data.content || !data.user_id) {
    return { message: "fail validations" };
  }

  try {
    await sql`
      INSERT INTO "review" (product_id, user_id, content, rating)
      VALUES (${data.product_id}, ${data.user_id}, ${data.content}, ${data.rating});
    `;
    revalidatePath(`/users/products/${data.product_id}`);
    redirect(`/users/products/${data.product_id}`);
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return {
      message: `Database Error: Failed to Create Invoice. ${error}`,
    };
  }
}

export async function editProduct(formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string),
    categoryId: parseInt(formData.get('category') as string),
    productId: parseInt(formData.get('productId') as string),
  };

  console.log('Form Data:', data);

  // if (!data.name || !data.description || isNaN(data.price) || isNaN(data.categoryId) || isNaN(data.productId)) {
  //   return { message: "fail validations" };
  // }

  try {
    await sql`
      UPDATE product
      SET 
        name = ${data.name}, 
        description = ${data.description}, 
        price = ${data.price}, 
        category_id = ${data.categoryId}
      WHERE id = ${data.productId};
    `;

    revalidatePath(`/users/product/${data.productId}/edit`);
    
    // Devuelve la redirección de forma correcta
    return {
      redirect: `/users/product/${data.productId}`,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: `Database Error: Failed to Update Product. ${error}`,
    };
  }
}

export async function DeleteProduct(form: FormData) {

}