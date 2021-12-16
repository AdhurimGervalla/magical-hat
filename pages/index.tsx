import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { auth } from '../lib/firebase';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { UserContext } from '../lib/context';
import {useRouter} from "next/router";

export default function Home() {
  const {user, loading, groupId} = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Obtain emailLink from the user.
    if (isSignInWithEmailLink(auth, window.location.href)) {
        signInWithEmailLink(auth, window.localStorage.getItem('emailForSignIn'), window.location.href)
        .then(() => router.push('/'))
        .catch((error) =>  console.error(error))
    }
  }, [])

  return (
    <>
      { groupId && 
      <div>
        <h1>Welcome to the magical hat. Draw a component.</h1>
        <p><Link href="/components">Show Components</Link></p>
      </div>
      }
      { !user && !loading && <Link href='/login'>Login</Link> }
    </>

  )
}

