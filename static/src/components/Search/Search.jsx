import React, { useState } from 'react';


import './Search.css'

const Search = ({ setSearchPropt }) => {

    const [userInput, setUserInput] = useState("");

    const handleClick = () => {
        setSearchPropt(userInput);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleClick();
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

