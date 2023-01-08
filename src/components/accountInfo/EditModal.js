import React, { useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BeatLoader from "react-spinners/BeatLoader";

export default function EditModal({ isModalVisible, setIsModalVisible, loggedInUser, setLoggedInUser, user, setUser }) {

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const editAccount = () => {

        if (image && (image.type === "image/jpeg" || image.type === "image/png")) {

            setLoading(true);

            const imageName = image.name + Math.floor((Math.random() * 1000000) + 1);
            const imageRef = ref(storage, `avatars/${imageName}`);

            uploadBytes(imageRef, image)
                .then(_ => {
                    getDownloadURL(imageRef)
                        .then(url => {
                            updateDoc(doc(db, "users", loggedInUser.id), {
                                avatar: url
                            })
                                .then(_ => {

                                    setUser({ ...user, avatar: url });
                                    setLoggedInUser({ ...loggedInUser, avatar: url });
                                    setImage(null);
                                    setLoading(false);
                                    setError("");
                                    setIsModalVisible(false);
                                })
                                .catch(error => {
                                    setLoading(false);
                                    setError(error.message);
                                })
                        })
                        .catch(error => {
                            setLoading(false);
                            setError(error.message);
                        });
                })
                .catch(error => {
                    setLoading(false);
                    setError(error.message);
                });
        }
        else {
            setError("Incorrect file type");
        }
    }

    return (
        <Modal show={isModalVisible} animation={true} centered>
            <Modal.Header>
                <Modal.Title className='logo'>Edit avatar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <input onChange={({ target }) => { setImage(target.files[0]) }} className='form-control form-control-sm' type="file" />
                    {error ? <p className='mb-0 pt-3 text-danger text-center'>{error}</p> : null}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={image === null || loading} onClick={() => { editAccount() }} className="btn-warning btn-sm">{loading ? <BeatLoader size={5} color={"#fff"} /> : "Upload"}</Button>
                <Button disabled={loading} onClick={() => { setIsModalVisible(false); setImage(null); setError(""); setLoading(false); }} className="btn-secondary btn-sm">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
