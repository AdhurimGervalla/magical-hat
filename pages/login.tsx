import { ReactElement, useContext, useState } from "react";
import { actionCodeSettings, auth } from "../lib/firebase";
import { sendSignInLinkToEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import AuthCheck from "../components/AuthCheck";
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from "../lib/context";
import i18n from "../i18n";

export default function Login(): ReactElement {
    const {user, username, loading} = useContext(UserContext);
    

    function UserGreeting(): ReactElement {    
        return(
            <div>
                {username && <p>{i18n.t('Hello')} {username}</p>}
            </div>
        )
    }

    // Logout Button Component which renders a button to logout
    function LogoutButton(): ReactElement {
        const logout = () => {
            signOut(auth)
            .catch((error) => console.error(error));
        }
        return <button onClick={logout}>{i18n.t('Sign out')}</button>;
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
            
            // register via E-Mail and password field
            if (!sendEmailLoginLink && email && pw) {
                signInWithEmailAndPassword(auth, email, pw);      
            } 

            // send E-Mail Login Link to login
            if (sendEmailLoginLink && email) {
                toast.promise(
                    sendSignInLinkToEmail(auth, email, actionCodeSettings),
                    {
                        loading: 'Loading', 
                        success: () => i18n.t('Link has been sent to your e-mail address'), 
                        error: (err) => `${err.toString()}`
                    },
                    {
                        style: {minWidth: '250px'}, 
                        success: {duration: 5000, icon: '🔥'}
                    }
                )
            } 
        });

        return(
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="E-Mail" required />
                <input id="password" type={!loginWithEmailLink ? 'password' : 'hidden'} name="password" placeholder={i18n.t('Password')} required={!loginWithEmailLink} />
                <button type="submit">{i18n.t('Login')}</button>
                <label><input type="checkbox" name="emailLink" onChange={() => setLoginWithEmailLink(!loginWithEmailLink)} />{i18n.t('Login with E-Mail link')}</label>
            </form>
        );
    }

    return(
        <main>
            <h1>{i18n.t('Login')}</h1>
            <Toaster/>
            {!user && !loading && <SignInWithEmailForm />}
            <AuthCheck fallback={true}>
                <UserGreeting />
                <LogoutButton />
            </AuthCheck>
        </main>
    );
}