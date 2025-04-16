import { NextResponse } from "next/server";
import { updateUserById } from "../../lib/data";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received data:", data); // Log the received data

    const { userId, name, email, password } = data;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    // Update the user's profile in the database
    const result = await updateUserById(userId, name, undefined, email, password);

    if (!result) {
      return NextResponse.json(
        { message: "Failed to update profile. User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Profile updated successfully!", data: result });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Failed to update profile." },
      { status: 500 }
    );
  }
}