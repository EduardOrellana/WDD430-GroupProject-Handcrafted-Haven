'user client'

import { useSearchParams } from "next/navigation"

export default function Error() {
    const searchparams = useSearchParams()
    const error = searchparams.get('error')
    return (
        <>
            <h1>Ooops, there's an error</h1>
            <p>{error}</p>
        </>

    )
}