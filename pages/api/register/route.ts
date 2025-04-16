// // /app/api/register/route.ts

// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import postgres from "postgres";

// // Initialize the PostgreSQL client
// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// export async function POST(req: Request) {
//   try {
//     // Parse the incoming JSON request body
//     const body = await req.json();

//     // Destructure the necessary values from the request body
//     const { username, email, password, profile_pic_url } = body;

//     // Validate that required fields are provided
//     if (!username || !email || !password) {
//       return NextResponse.json({ message: 'fail validations' }, { status: 400 });
//     }

//     // Hash the password before storing it in the database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert the new user into the PostgreSQL database
//     const result = await sql`
//       INSERT INTO "user" (username, profile_pic_url, email, password)
//       VALUES (${username}, ${profile_pic_url || ''}, ${email}, ${hashedPassword})
//       RETURNING id, username, email, profile_pic_url;
//     `;

//     // Return success message along with the created user data
//     return NextResponse.json({ message: 'success', user: result[0] });
//   } catch (error) {
//     // Log the error and return an appropriate error message to the client
//     console.error('Database error:', error);
//     return NextResponse.json(
//       { message: `Database Error: ${(error as Error).message}` },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import postgres from 'postgres';

// // Log the connection string (for debugging)
// console.log('Connecting to database with URL:', process.env.POSTGRES_URL);

// const sql = postgres(process.env.POSTGRES_URL!, {
//   ssl: { rejectUnauthorized: false }, // SSL configuration for cloud databases
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { username, email, password, profile_pic_url } = body;

//     if (!username || !email || !password) {
//       return NextResponse.json({ message: 'fail validations' }, { status: 400 });
//     }

//     // Log the incoming data for debugging
//     console.log('Received user data:', { username, email, password, profile_pic_url });

//     // Hash the password before storing
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Log hashed password
//     console.log('Hashed password:', hashedPassword);

//     // Insert the new user into the PostgreSQL database
//     await sql`
//       INSERT INTO "user" (username, profile_pic_url, email, password)
//       VALUES (${username}, ${profile_pic_url || ''}, ${email}, ${hashedPassword});
//     `;

//     // Return a success message
//     return NextResponse.json({ message: 'success' });
//   } catch (error) {
//     console.error('Database error:', error);
//     return NextResponse.json({ message: `Database Error: ${(error as Error).message}` }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

// Ensure SSL is properly configured
const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: {
    rejectUnauthorized: false,  // Important for cloud-based databases with SSL certs
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, profile_pic_url } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'fail validations' }, { status: 400 });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the PostgreSQL database
    await sql`
      INSERT INTO "user" (username, profile_pic_url, email, password)
      VALUES (${username}, ${profile_pic_url || ''}, ${email}, ${hashedPassword});
    `;

    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: `Database Error: ${(error as Error).message}` }, { status: 500 });
  }
}



