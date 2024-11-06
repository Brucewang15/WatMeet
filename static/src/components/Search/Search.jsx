import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';


import './Search.css'

const Search = () => {

    const [userInput, setUserInput] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        if (userInput == "") {
            navigate('/');
        } else {
            navigate(`/explore/search/${userInput}`);
        }
    }

    return (
        <div className="searchBox">
            <input
                className="searchInput"
                type="text"
                name=""
                placeholder="Search for any organization"
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleClick();
                    }
                }}
            />
        </div>

    );

}

export default Search;

