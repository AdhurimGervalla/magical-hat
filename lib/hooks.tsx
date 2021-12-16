import { useEffect, useState } from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "./firebase";

export function useUserData() {
    const [user, loading] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [groupId, setGroupiId] = useState(null);

    useEffect(() => {
        let unsubscribe;
        console.log('user changed', user);
        if (user) {
            unsubscribe = onSnapshot(doc(firestore, 'users', user.uid), (doc) => {
                setUsername(doc.data()?.username);
                setGroupiId(doc.data()?.groupid);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user]);

    return {user, username, loading, groupId};
}