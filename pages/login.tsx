import { ReactElement, useEffect, useState } from "react";
import { actionCodeSettings, auth, firestore, getUsernameWithUid } from "../lib/firebase";
import { sendSignInLinkToEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import AuthCheck from "../components/AuthCheck";
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from 'react-hot-toast';
import { doc, getDoc } from "firebase/firestore";

export default function Login(): ReactElement {
    const [user, loading] = useAuthState(auth);

    function UserGreeting(): ReactElement {
        const [username, setUsername] = useState(null);
        useEffect(() => {
            if (user) {
                getUsernameWithUid(user).then((res) => {
                    setUsername(res.username);
                })
            }
        }, [user]);
    
        return(
            <div>
                {username && <p>Hi {username}</p>}
            </div>
        )
    }

    // Logout Button Component which renders a button to logout
    function LogoutButton(): ReactElement {
        const logout = () => {
            signOut(auth)
            .catch((error) => console.error(error));
        }
        return <button onClick={logout}>Sign Out</button>;
    }

    // Component that shows the Form to authenticate users
    function SignInWithEmailForm(): ReactElement {
        const [loginWithEmailLink, setLoginWithEmailLink] = useState(false);

        // function which is triggered when the login form is submitted
        const handleSubmit = (event) => new Promise<void>((resolve, reject) => {
            event.preventDefault();

            const email = event.target.email.value;
            const pw = event.target.password.value;
            const sendEmailLoginLink = loginWithEmailLink;

            const obj = {
                loading: {
                    loading: 'Loading', success: () => `Successfully logged in`, 
                    error: (err) => `${err.toString()}`
                }, 
                styling: {
                    style: {minWidth: '250px'}, 
                    success: {duration: 5000, icon: '🔥'}
                }
            };
            
            // register via E-Mail and password field
            if (!sendEmailLoginLink && email && pw) {
                toast.promise(
                    signInWithEmailAndPassword(auth, email, pw),
                    obj.loading,
                    obj.styling
                );       
            } 

            // send E-Mail Login Link to login
            if (sendEmailLoginLink && email) {
                toast.promise(
                    sendSignInLinkToEmail(auth, email, actionCodeSettings),
                    obj.loading,
                    obj.styling
                )
            } 
        });

        return(
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="E-Mail" required />
                <input id="password" type={!loginWithEmailLink ? 'password' : 'hidden'} name="password" placeholder="Password" required={!loginWithEmailLink} />
                <button type="submit">Login</button>
                <label><input type="checkbox" name="emailLink" onChange={() => setLoginWithEmailLink(!loginWithEmailLink)} />Login with E-Mail Link</label>
            </form>
        );
    }

    return(
        <main>
            <h1>Login</h1>
            <Toaster/>
            {!user && !loading && <SignInWithEmailForm />}
            <AuthCheck fallback={true}>
                <>
                <UserGreeting />
                <LogoutButton />
                </>
            </AuthCheck>
        </main>
    );
}