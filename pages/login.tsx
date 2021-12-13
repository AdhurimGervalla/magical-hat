import { ReactElement } from "react";
import {actionCodeSettings, auth } from "../lib/firebase";
import { sendSignInLinkToEmail, signOut } from "firebase/auth";
import AuthCheck from "../components/AuthCheck";
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from 'react-hot-toast';

export default function Login(): ReactElement {
    const [user, loading, error] = useAuthState(auth);
    
    return(
        <main>
            <Toaster/>
            <AuthCheck fallback={
                <SendEmailLinkButton email="adi@gervalla.ch" loading={loading} />
            }>
                <h1>Hallo {user?.displayName}</h1>
                <LogoutButton />
            </AuthCheck>
        </main>
    )
}

/**
 * Renders the send E-Mail Link Button component
 * @param param0 
 * @returns 
 */
function SendEmailLinkButton({email, loading}): ReactElement {

    const send = async (email: string) => {
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            toast.success(`Link was sent to ${email}`);
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('emailForSignIn', email);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });
    }

    return(
        <>
            {loading && <p>Loading</p>}
            <button onClick={() => send(email)}>E-Mail Link senden</button>
        </>
        
    );
}

function LogoutButton() {
    const logout = () => {
        signOut(auth)
        .then(() => {
            toast.success('successfully signed out!')
        })
        .catch((error) => console.error(error));
    }
    return <button onClick={logout}>Sign Out</button>;
}