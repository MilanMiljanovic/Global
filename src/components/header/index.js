import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { HiSearch } from "react-icons/hi";
import LoggedInUserContext from '../../context/LoggedInUserContext';
import Search from './Search';
import LogOutIcon from './LogOutIcon';

export default function Header({ setRefreshPageRandomNum }) {

    const { loggedInUser: { id, avatar } } = useContext(LoggedInUserContext);
    const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <header className='bg-white border sticky-top py-2'>
            <div className='container d-flex justify-content-between align-items-center gap-3 position-relative'>
                <h1 onClick={() => { setRefreshPageRandomNum ? setRefreshPageRandomNum(Math.random()) : navigate("/") }} className='logo mb-0 cursor-pointer'>GLOBAL</h1>
                <Search isSearchBoxVisible={isSearchBoxVisible} setIsSearchBoxVisible={setIsSearchBoxVisible} />
                <nav className='d-flex align-items-center gap-3'>
                    <Link className='text-dark' to="/"><AiOutlineHome size={24} /></Link>
                    <HiSearch onClick={() => { setIsSearchBoxVisible(true) }} className='nav-search-icon cursor-pointer' size={24} />
                    <Link to={`/account/${id}`}>
                        <img className='avatar-sm rounded-circle' src={avatar} alt='' />
                    </Link>
                    <LogOutIcon />
                </nav>
            </div>
        </header>
    )
}
