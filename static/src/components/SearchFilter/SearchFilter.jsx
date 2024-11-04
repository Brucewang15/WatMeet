import {useState} from 'react';


import "./SearchFilter.css";



const SearchFilter = ({setRating}) => {

    const [slider, setSlider] = useState(0);

    const handleChange = (event) => {
        setSlider(event.target.value);
        setRating(event.target.value);
    }


    return (
        <div className="filterContainer">
            <div className="titleContainer">
                <div className="title">Filter your organizations</div>
            </div>
            <div className="ratingContainer">
                <div className="showRating">
                    <div className="ratingText">Showing all ratings greater than:</div>
                    <div className="currentRating">{slider}</div>
                </div>
                <input className="ratingInput" type="range" min="0" max="5" defaultValue="0" step="0.1" onChange={handleChange}/>
            </div>
            <div className="orgContainer">
                <div className="orgType">Your organization type</div>
                <div className="orgsContainer">
                    <div className="orgs">Clubs</div>
                    <div className="orgs">Design Teams</div>
                    <div className="orgs">Sports</div>
                    <div className="orgs">Intramurals</div>
                </div>
            </div>
            <button className="filterClear">Clear Filter</button>
        </div>
    );
}

export default SearchFilter;