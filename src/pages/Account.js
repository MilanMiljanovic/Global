import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import UploadPost from '../components/uploadPost/';
import Posts from '../components/posts';
import AccountInfo from '../components/accountInfo/';
import LoggedInUserContext from '../context/LoggedInUserContext';

export default function Account() {

    const { userId } = useParams();
    const { loggedInUser: { id } } = useContext(LoggedInUserContext);
    const [postsLength, setPostsLength] = useState(null);
    const [isPostUploaded, setIsPostUploaded] = useState(null);

    return (
        <>
            <Header />
            <main>
                <div className='container'>
                    <div className='row py-3'>
                        <AccountInfo postsLength={postsLength} paramId={userId} key={userId} />
                        <div className='col-md-7 d-flex flex-column gap-3'>
                            {
                                id === userId ?
                                    <UploadPost setIsPostUploaded={setIsPostUploaded} />
                                    :
                                    null
                            }
                            <Posts usersIds={[userId]} setPostsLength={setPostsLength} isPostUploaded={isPostUploaded} key={userId} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
