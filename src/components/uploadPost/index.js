import React, { useState } from 'react';
import UploadPostModal from './UploadPostModal';

export default function UploadModal({ setIsPostUploaded }) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <>
            <div className='d-flex align-items-center justify-content-between bg-white border p-2'>
                <p className='mb-0'>Upload your best photo</p>
                <button onClick={() => { setIsModalVisible(!isModalVisible) }} className='btn btn-primary btn-sm'>Upload</button>
            </div>
            <UploadPostModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} setIsPostUploaded={setIsPostUploaded} />
        </>

    )
}
