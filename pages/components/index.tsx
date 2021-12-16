import { collection, query, doc, orderBy } from 'firebase/firestore';
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore} from "../../lib/firebase";
import { useContext } from "react";
import { UserContext } from '../../lib/context';
import ComponentsFeed from '../../components/ComponentsFeed';

export default function ComponentsListPage() {
    const {groupId} = useContext(UserContext);

    return (
        <>
        {groupId && <ComponentsList groupId={groupId} />}
        </>
    );
}

function ComponentsList({ groupId }) {
    
    const compDoc = doc(firestore, 'groups', groupId)
    const compCollection = collection(compDoc, 'components');
    const compCollectionQuery = query(compCollection, orderBy('createdAt'));
    const [querySnapshot, loading, error] = useCollection(compCollectionQuery);

    if ( error ) {
        console.error(error);
    }

    const components = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>  
            <h1>Manage Components</h1>
            {!loading ? <ComponentsFeed components={components} /> : <p>Loading components...</p>}
        </>
    );
}