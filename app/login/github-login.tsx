
import styles from "@/app/page.module.css"
import Image from "next/image";
import { githubLogin } from "../(account)/actions";

export default function GithubLogin() {

    return (
        <section className={styles.oAuthSection} onClick={githubLogin}>
            <p>--OR--</p>

            <form action={githubLogin}>
                <button type="submit">
                    <Image
                        src="/github-logo.png"
                        width={50}
                        height={30}
                        alt="GitHub Logo"
                        className={styles.gitLogo}

                    /><h4>Signin with GitHub</h4></button>
            </form>

        </section>


    )
}