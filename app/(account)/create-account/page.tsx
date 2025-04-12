'use client'

import styles from "../account.module.css"
import { useState } from "react"
import { createUserForm } from "@/app/(account)/actions"
import { useActionState } from "react"

export default function CreateAccount() {
    const [state, formAction] = useActionState(createUserForm, null)
    const [visible, setVisible] = useState(false)

    function toggleVisibility() {
        setVisible(!visible)
    }


    return (
        <div className={styles.createAccount}>
            <h2>Create Account</h2>
            <form action={formAction} className={styles.accountCreationForm}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type={visible ? "text" : "password"} name="password" id="password" required className={`${styles.password}`} />

                    <span onClick={toggleVisibility} className={styles.toggle}>
                        <img src="/visible.svg" alt="show password" className={`${visible ? styles.hide : styles.show}`} />
                        <img src="/invisible.svg" alt="hide password" className={`${visible ? styles.show : styles.hide}`} />
                    </span>
                </div>

                <input type="submit" value="Create Account" />
            </form>
        </div>
    )
}