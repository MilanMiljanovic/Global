import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import LoggedInUserContext from '../../context/LoggedInUserContext';
import Skeleton from 'react-loading-skeleton';
import Suggestion from './Suggestion';

export default function Suggestions() {

    const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);

        getDocs(query(collection(db, "users"), where("id", "not-in", [...loggedInUser.following, loggedInUser.id], limit(5))))
            .then(data => {
                setLoading(false);
                setSuggestedUsers(data.docs.map(doc => ({ ...doc.data() })));
            })
            .catch(error => {
                setLoading(false);
                console.log(error.message);
            });
    }, []);

    return (
        <div className='suggestions col-md-5 d-none'>
            <h6 className='mb-3'>Suggestions</h6>
            <div className='d-flex flex-column gap-1'>
                {
                    suggestedUsers.map((suggestedUser, index) => {
                        return (
                            <Suggestion suggestedUser={suggestedUser} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} key={index} />
                        )
                    })
                }
                {
                    loading ?
                        <>
                            <Skeleton className='rounded-0' height={31} />
                            <Skeleton className='rounded-0' height={31} />
                            <Skeleton className='rounded-0' height={31} />
                        </>
                        :
                        null
                }
            </div>
        </div>
    )
}
