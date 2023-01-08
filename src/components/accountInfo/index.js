import React, { useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import LoggedInUserContext from '../../context/LoggedInUserContext';
import Skeleton from 'react-loading-skeleton';
import EditModal from './EditModal';
import FollowBtn from '../FollowBtn';

export default function AccountInfo({ postsLength, paramId }) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState({});
    const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

    useEffect(() => {

        document.title = "GLOBAL - Account";

        if (loggedInUser.id === paramId) {

            setUser({ ...loggedInUser });
        }
        else {

            getDoc(doc(db, "users", paramId))
                .then(doc => {
                    setUser({ ...doc.data() });
                })
                .catch(error => {
                    console.log(error.message);
                });
        }

    }, [paramId]);

    return (
        <div className='col-md-5 pb-3'>
            <div className='d-flex flex-column gap-2 justify-content-center align-items-center bg-white border py-3'>
                {
                    user.avatar ?
                        <img className='avatar-lg rounded-circle' src={user.avatar} alt='' />
                        :
                        <Skeleton height={120} width={120} circle={true} />
                }
                <h6 className='mb-0'>{user.username || <Skeleton width={150} height={19.2} />}</h6>
                <span>{user.fullName || <Skeleton width={200} height={20} />}</span>
                <div className='d-flex justify-content-center align-items-center gap-3'>
                    <span>Posts: <b> {postsLength !== null ? postsLength : <Skeleton width={25} height={20} />}</b></span>
                    <span>Followers: <b>{user.followers ? user.followers.length : <Skeleton width={25} height={20} />}</b></span>
                    <span>Following: <b>{user.following ? user.following.length : <Skeleton width={25} height={20} />}</b></span>
                </div>
                {
                    paramId ?
                        loggedInUser.id === paramId ?
                            <button onClick={() => { setIsModalVisible(true) }} className='btn btn-warning btn-sm'>Edit avatar</button>
                            :
                            <FollowBtn loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} userId={paramId} user={user} setUser={setUser} btnType="primary" />
                        :
                        null
                }
            </div>
            <EditModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} user={user} setUser={setUser} />
        </div>
    )
}
