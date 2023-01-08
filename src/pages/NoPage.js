import React, { useEffect } from 'react';

export default function NoPage() {

    useEffect(() => {
        document.title = "GLOBAL - Page not found";
    }, []);

    return (
        <div className='container-fluid min-vh-100 d-flex flex-column justify-content-center text-center'>
            <h5>PAGE NOT FOUND</h5>
        </div>
    )
}
