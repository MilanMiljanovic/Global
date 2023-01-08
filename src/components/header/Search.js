import React, { useState } from 'react';
import { MdOutlineArrowBack } from "react-icons/md";
import Results from "./Results";

export default function Search({ isSearchBoxVisible, setIsSearchBoxVisible }) {

    const [search, setSearch] = useState("");

    return (
        <div className={`nav-search-box align-items-center gap-2 py-1 px-2 h-100 rounded position-absolute ${isSearchBoxVisible ? "d-flex" : "d-none"}`}>
            <MdOutlineArrowBack onClick={() => { setIsSearchBoxVisible(false) }} className='nav-search-box-back-icon' size={20} />
            <input onChange={({ target }) => { setSearch(target.value) }} className='border-0 outline-none flex-grow-1 font-14' type="text" placeholder='Search...' autoComplete="off" value={search} />
            <Results search={search} />
        </div>
    )
}
