import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Results({ search }) {

    const [results, setResults] = useState([]);

    useEffect(() => {

        if (search.trim().length > 0) {

            getDocs(query(collection(db, "users"), where("username", "==", search)))
                .then(data => {
                    setResults(data.docs.map(doc => ({ ...doc.data() })));
                })
                .catch(error => {
                    console.log(error.message);
                });
        }

    }, [search]);

    return (
        <div className={`flex-column gap-2 position-absolute start-0 top-100 mt-1 p-2 border rounded bg-white w-100 ${results.length > 0 ? "d-flex" : "d-none"}`}>
            {
                results.map(user => {
                    return (
                        <Link to={`/account/${user.id}`} className='d-flex align-items-center gap-2 text-dark text-decoration-none' key={user.id}>
                            <img src={user.avatar} className="avatar-sm rounded-circle" alt='' />
                            <span>{user.username}</span>
                        </Link>
                    )
                })
            }
        </div>
    )
}
