import React from 'react';
import { MdLogout } from "react-icons/md";
import { auth } from '../../lib/firebase';
import { signOut } from "firebase/auth";

export default function LogOut() {

    const logout = () => {
        signOut(auth);
    }

    return (
        <MdLogout onClick={() => { logout() }} className='text-dark cursor-pointer' size={24} />
    )
}
