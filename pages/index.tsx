import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import i18n from '../i18n';
import { auth } from '../lib/firebase';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { UserContext } from '../lib/context';

export default function Home() {
  const {user, loading} = useContext(UserContext);
  useEffect(() => {
    console.log(loading);
    // Obtain emailLink from the user.
    if (isSignInWithEmailLink(auth, window.location.href)) {
        signInWithEmailLink(auth, window.localStorage.getItem('emailForSignIn'), window.location.href)
        .then(() => toast.success('Welcome to the magical hat!'))
        .catch((error) =>  console.error(error))
    }
  }, [])

  return (
    <>
        { user && i18n.t('Welcome to React') }
        { !user && !loading && <Link href='/login'>Login</Link> }
    </>

  )
}
