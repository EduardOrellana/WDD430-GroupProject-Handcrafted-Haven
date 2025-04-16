'use client';

import styles from '@/app/signup/create.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAccount } from '@/app/lib/actions';

export default function CreateUserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const result = await createAccount(formData);

        if (result.message === 'success') {
            router.push('/login');
        } else {
            router.push('/login');
        }
    }

    return (
        <div className={styles.form}>
            <h1 className={styles.h1}>Create New User</h1>
            <form onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Name:
                    <input
                        className={styles['input-text']}
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>

                <label className={styles.label}>
                    Email:
                    <input
                        className={styles['input-text']}
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label className={styles.label}>
                    Password:
                    <input
                        className={styles['input-text']}
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button className={styles.button} type="submit">
                    Create User
                </button>
            </form>
        </div>
    );
}
