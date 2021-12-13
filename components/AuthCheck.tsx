import Link from "next/link";
// Component's children only shown to logged-in users
import {useContext} from "react";
import {UserContext} from "../lib/context";


export default function AuthCheck({ children, fallback}) {
    const { username } = useContext(UserContext);

    return username ?
        children :
        fallback || <Link href="/login">Signed in you must be</Link>
}
