"use client"

import styles from "../page.module.css"
import {useState} from "react"
import {useRouter} from "next/navigation"


export default function Search() {

    const [query, setQuery] = useState("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`users/productos/search?q=${encodeURIComponent(query)}`)
        }
    }


    return (
        <form onSubmit={handleSearch} className={styles.search}>
            <label htmlFor="search">Search</label>
            <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit"> Ok </button>
        </form>

    )
}