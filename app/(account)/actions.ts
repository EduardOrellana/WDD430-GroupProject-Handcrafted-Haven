'use server'

import bcryptjs from 'bcryptjs'
import postgres from "postgres";
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth';
import { randomInt } from 'crypto';
import { AuthError } from 'next-auth';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const newUserSchema = z.object({
    username: z.string().max(32),
    email: z.string().email(),
    password: z.string().min(8).max(16),
})



export async function createUserForm(prevstate: any, formdata: FormData) {
    const userData = newUserSchema.safeParse({
        username: formdata.get("username"),
        email: formdata.get("email"),
        password: formdata.get("password"),
    })

    if (!userData.success) {
        return {
            errors: userData.error.flatten().fieldErrors,
            message: 'Some fields are missing. Action failed!'
        }
    }

    const id = 17
    const { username, email, password } = userData.data
    const hashedPassword = await bcryptjs.hash(password, 10);

    try {
        await sql`INSERT INTO user(id, username, email, password)
                    VALUES (${id}, ${username}, ${email}, ${hashedPassword});`
    } catch (error) {
        console.error("Account creation failed:", error)
        return {
            errors: { database: "Database error occured" },
            message: "Database error occured"
        }
    }

    redirect("/profile")

}
// change the table name user2 to user

export async function processLogin(prevstate: string | undefined, formdata: FormData) {

    const email = formdata.get("email")?.toString()
    const password = formdata.get("password")?.toString()

    try {
        await signIn("credentials", { email, password })

    } catch (error) {
        if (error instanceof AuthError) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                        return 'Invalid credentials.';
                    default:
                        return 'Something went wrong.';
                }
            }
            throw error;
        }
    }

    redirect("/profile")
}

export async function githubLogin() {

    await signIn("github")


}