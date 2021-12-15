import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect } from 'react';
import { auth } from '../lib/firebase';
import styles from '../styles/Home.module.css'
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { UserContext } from '../lib/context';

export default function Home() {
  const {user, username, loading} = useContext(UserContext);

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
        { user && <h1>Willkommen</h1> }
        { !user && !loading && <Link href='/login'>Login</Link> }
    </>

  )
}
