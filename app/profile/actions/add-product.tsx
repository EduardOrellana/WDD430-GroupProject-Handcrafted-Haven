import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, price, category } = data;

    // Simulate adding the product to the database
    console.log("Adding product:", { name, description, price, category });

    // TODO: Replace this with actual database logic

    return NextResponse.json({ message: "Product added successfully!" });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Failed to add product." },
      { status: 500 }
    );
  }
}