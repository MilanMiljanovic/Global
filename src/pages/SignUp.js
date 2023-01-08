import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from "../lib/firebase";
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import BeatLoader from "react-spinners/BeatLoader";

export default function SignUp() {

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "GLOBAL - Sign up";
    }, []);

    const signUp = e => {

        e.preventDefault();

        if (username.trim().length < 5) {

            setError("Username input must contain at least 5 letters");
            return;
        }

        if (fullName.trim().length < 5) {

            setError("Full name input must contain at least 5 letters");
            return;
        }

        setLoading(true);

        getDocs(query(collection(db, "users"), where("username", "==", username.toLowerCase())))
            .then(data => {

                if (data.docs.map(doc => ({ ...doc.data() })).length === 0) {

                    createUserWithEmailAndPassword(auth, email, password)
                        .then(authUser => {

                            setDoc(doc(db, "users", authUser.user.uid), {
                                id: authUser.user.uid,
                                email: email,
                                fullName: fullName.split(" ").map(word => word[0].toUpperCase() + word.slice(1).toLocaleLowerCase()).join(" "),
                                username: username.toLowerCase(),
                                followers: [],
                                following: [],
                                avatar: "https://firebasestorage.googleapis.com/v0/b/global-896bb.appspot.com/o/avatars%2Fdefault.jpg?alt=media&token=e134e8ed-ef07-425f-83f6-f29f9c2339f7"
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
                    setLoading(false);
                    setError("Username is already in use");
                }
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
            });
    }

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100'>
            <form onSubmit={e => { signUp(e) }} className='auth-form d-flex flex-column gap-3 text-center bg-white border p-3 w-100'>
                <h3 className='logo mb-0'>GLOBAL</h3>
                <div className='d-flex flex-column gap-2'>
                    <input onChange={({ target }) => { setFullName(target.value) }} className='form-control form-control-sm shadow-none' type="text" placeholder="Full Name" value={fullName} autoComplete="off" />
                    <input onChange={({ target }) => { setUsername(target.value) }} className='form-control form-control-sm shadow-none' type="text" placeholder="Username" value={username} autoComplete="off" />
                    <input onChange={({ target }) => { setEmail(target.value) }} className='form-control form-control-sm shadow-none' type="text" placeholder="Email" value={email} autoComplete="off" />
                    <input onChange={({ target }) => { setPassword(target.value) }} className='form-control form-control-sm shadow-none' type="password" placeholder="Password" value={password} autoComplete="off" />
                    <button disabled={fullName.length < 1 || username.length < 1 || email.length < 1 || password.length < 1 || loading} className='btn btn-primary btn-sm'>{loading ? <BeatLoader size={5} color={"#fff"} /> : "Sign up"}</button>
                </div>
                {error ? <p className='mb-0 text-danger'>{error}</p> : null}
                <small>Have an account? <Link to="/login">Log in</Link></small>
            </form>
        </div>
    )
}
