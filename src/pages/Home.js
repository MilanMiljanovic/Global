import React, { useContext, useEffect, useState } from 'react';
import LoggedInUserContext from '../context/LoggedInUserContext';
import Header from '../components/header';
import Posts from '../components/posts';
import Suggestions from '../components/suggestions/';

export default function Home() {

    const { loggedInUser: { id, following } } = useContext(LoggedInUserContext);
    const [refreshPageRandomNum, setRefreshPageRandomNum] = useState(Math.random());

    useEffect(() => {
        document.title = "GLOBAL";
    }, []);


    return (
        <>
            <Header setRefreshPageRandomNum={setRefreshPageRandomNum} />
            <main>
                <div className='container'>
                    <div className='row py-3'>
                        <div className='col-md-7'>
                            <Posts usersIds={[...following, id]} key={refreshPageRandomNum} />
                        </div>
                        <Suggestions key={refreshPageRandomNum} />
                    </div>
                </div>
            </main>
        </>
    )
}
