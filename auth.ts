import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import postgres from "postgres";
import { z } from "zod"
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const LoginData = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(36),
})

async function getUser(email: string) {
    const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

    try {
        const user = await sql`SELECT * FROM user WHERE email=${email};`
        return user[0]
    } catch (error) {
        console.error('No user exists:', error)
        throw new Error('Failed to fetch user')
    }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validatedData = LoginData.safeParse(credentials)

                if (validatedData.success) {

                    const { email, password } = validatedData.data

                    const user = await getUser(email)

                    if (!user) return null
                    const unhashedPw = await bcrypt.compare(password, user.password)

                    if (unhashedPw) return user
                }
                console.log("Credentials Invalid")
                return null
            }
        })
    ],
})
