import React from 'react';
import { Link } from 'react-router-dom';
import FollowBtn from '../FollowBtn';

export default function Suggestion({ suggestedUser: { id, username, avatar }, loggedInUser, setLoggedInUser }) {

    return (
        <div className='d-flex align-items-center gap-2'>
            <Link className='text-decoration-none text-dark d-flex align-items-center gap-2' to={`/account/${id}`}>
                <img className='avatar-sm rounded-circle' src={avatar} alt="" />
                <span>{username}</span>
            </Link>
            <div className='ms-auto'>
                <FollowBtn loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} userId={id} btnType="link" />
            </div>
        </div>
    )
}
