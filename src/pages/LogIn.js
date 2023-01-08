import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import BeatLoader from "react-spinners/BeatLoader";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "GLOBAL - Log in";
    }, []);

    const logIn = e => {
        e.preventDefault();
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .catch(error => {
                setLoading(false);
                setError(error.message);
            });
    }

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100'>
            <form onSubmit={e => { logIn(e) }} className='auth-form d-flex flex-column gap-3 text-center bg-white border p-3 w-100'>
                <h1 className='logo mb-0'>GLOBAL</h1>
                <div className='d-flex flex-column gap-2'>
                    <input onChange={({ target }) => { setEmail(target.value) }} className='form-control form-control-sm shadow-none' type="text" placeholder="Email" value={email} autoComplete="off" />
                    <input onChange={({ target }) => { setPassword(target.value) }} className='form-control form-control-sm shadow-none' type="password" placeholder="Password" value={password} autoComplete="off" />
                    <button disabled={email.length < 1 || password.length < 1 || loading} className='btn btn-primary btn-sm'>{loading ? <BeatLoader size={5} color={"#fff"} /> : "Log in"}</button>
                </div>
                {error ? <p className='mb-0 text-danger'>{error}</p> : null}
                <small>You don't have an account? <Link to="/signup">Sign up</Link></small>
            </form>
        </div>
    )
}
