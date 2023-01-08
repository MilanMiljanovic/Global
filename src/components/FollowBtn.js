import React from 'react';
import { db } from '../lib/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

export default function FollowBtn({ loggedInUser, setLoggedInUser, userId, user, setUser, btnType }) {

    const loggedInUserRef = doc(db, "users", loggedInUser.id);
    const userRef = doc(db, "users", userId);

    const toggleFollow = () => {

        if (loggedInUser.following.includes(userId)) {

            setLoggedInUser({ ...loggedInUser, following: [...loggedInUser.following.filter(id => id !== userId)] });

            if (setUser) {

                setUser({ ...user, followers: user.followers.filter(id => id !== loggedInUser.id) });
            }

            updateDoc(loggedInUserRef, {
                following: arrayRemove(userId)
            });

            updateDoc(userRef, {
                followers: arrayRemove(loggedInUser.id)
            });
        }
        else {

            setLoggedInUser({ ...loggedInUser, following: [...loggedInUser.following, userId] });

            if (setUser) {

                setUser({ ...user, followers: [...user.followers, loggedInUser.id] });
            }

            updateDoc(loggedInUserRef, {
                following: arrayUnion(userId)
            });

            updateDoc(userRef, {
                followers: arrayUnion(loggedInUser.id)
            });
        }
    }

    return (
        <>
            {
                userId ?
                    <button onClick={() => { toggleFollow() }} className={`btn btn-${btnType} btn-sm text-decoration-none`}>
                        {loggedInUser.following.includes(userId) ? "Following" : "Follow"}
                    </button>
                    :
                    null
            }
        </>
    )
}
