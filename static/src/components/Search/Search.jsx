import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';


import './Search.css'

const Search = () => {

    const [userInput, setUserInput] = useState("");
    const [clicked, setClicked] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const navigate = useNavigate();

    const getPotentialClub = async (query) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/organizations/get_potential_club_data", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: query })
            });
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data);
            }
        } catch (err) {
            console.log('error', err);
        }
    };

    const handleClick = () => {
        if (userInput == "") {
            navigate('/');
        } else {
            navigate(`/explore/search/${userInput}`);
        }
    };


    const queryChange = (event) => {
        let query = event.target.value;
        setUserInput(query);

        if (query != "")
            getPotentialClub(query);
        else
            setSuggestions([]);
        //console.log(suggestions);
    };

    const handleOnFocus = () => {
        setClicked(true);
    }

    const handleOnBlur = () => {
        setTimeout(() => setClicked(false), 200)
    }

    const handleOrgClick = (orgId) => {
        navigate(`/organizations/${orgId}/`);
        console.log(orgId);
    }

    return (
        <div className="searchBox">
            <input
                className="searchInput"
                type="text"
                name=""
                placeholder="Search for any organization"
                onChange={queryChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleClick();
                    }
                }}
            />
            {clicked && suggestions.length > 0 && (
                <div className="dropDownContainer">
                    {suggestions.map((item, index) => (
                        <button className="results" key={index} onClick={() => handleOrgClick(item.org_id)}>
                            {item.org_name}
                        </button>
                    ))}
                </div>
            )}
        </div>

    );

}

export default Search;

