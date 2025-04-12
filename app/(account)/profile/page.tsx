
import { signOut } from "@/auth"

export default function Profile() {
    return (
        <>
            <h2>Profile</h2>

            <p>You are logged in</p>

            <form action={async () => {
                'use server'
                await signOut({ redirectTo: "/" })
            }}>
                <button>Sign Out</button>
            </form>
        </>

    )
}