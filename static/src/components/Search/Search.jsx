import React, { useState } from 'react';


import './Search.css'

const Search = ({ setSearchPropt }) => {

    const [userInput, setUserInput] = useState("");

    const handleClick = () => {
        setSearchPropt(userInput);
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

