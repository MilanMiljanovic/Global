import React, { useContext, useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import LoggedInUserContext from '../../context/LoggedInUserContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BeatLoader from "react-spinners/BeatLoader";

export default function UploadPostModal({ isModalVisible, setIsModalVisible, setIsPostUploaded }) {

    const { loggedInUser: { id } } = useContext(LoggedInUserContext);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const uploadPost = () => {

        if (image && (image.type === "image/jpeg" || image.type === "image/png")) {

            setLoading(true);

            const imageName = image.name + Math.floor((Math.random() * 1000000) + 1);
            const imageRef = ref(storage, `postImages/${imageName}`);

            uploadBytes(imageRef, image)
                .then(_ => {

                    getDownloadURL(imageRef)
                        .then(url => {
                            addDoc(collection(db, "posts"), {
                                id: "",
                                userId: id,
                                image: url,
                                likes: [],
                                comments: [],
                                date: new Date()
                            })
                                .then(docref => {
                                    updateDoc(doc(db, "posts", docref.id), {
                                        id: docref.id
                                    })
                                        .then(_ => {

                                            setImage(null);
                                            setLoading(false);
                                            setError("");
                                            setIsModalVisible(false);
                                            setIsPostUploaded(Math.random());
                                        })
                                        .catch(error => {
                                            console.log(error.message);
                                            setLoading(false);
                                        });
                                })
                                .catch(error => {
                                    console.log(error.message);
                                    setLoading(false);
                                });
                        })
                        .catch(error => {
                            console.log(error.message);
                            setLoading(false);
                        });
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }
        else {
            setError("Incorrect file type");
        }
    }

    return (
        <Modal show={isModalVisible} animation={true} centered>
            <Modal.Header>
                <Modal.Title className='logo'>Make a new post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <input onChange={({ target }) => { setImage(target.files[0]) }} type="file" className='form-control form-control-sm' />
                    {error ? <p className='mb-0 pt-3 text-danger text-center'>{error}</p> : null}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={image === null || loading} onClick={() => { uploadPost() }} className="btn-primary btn-sm">{loading ? <BeatLoader size={5} color={"#fff"} /> : "Upload"}</Button>
                <Button disabled={loading} onClick={() => { setIsModalVisible(false); setImage(null); setError(""); setLoading(false); }} className="btn-secondary btn-sm">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}