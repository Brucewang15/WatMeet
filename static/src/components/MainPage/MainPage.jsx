import React, {useState, useEffect} from 'react';

import Search from "../Search/Search";
import ClubsDisplay from "./ClubsDisplay/ClubsDisplay";
import "./MainPage.css"

//import clubs_info from "..../webscraping/club_info.json";


const MainPage = () => {

    const [clubs, setClubs] = useState([
        ["hi1", "hi2", "hi3"],
        ["bruh", "bruh", "bruh"]
    ]);

    return (
        <div className="mainContainer">
            <Search/>
            <div className="clubsContainer">
                {clubs.map((club, index) => (
                    <ClubsDisplay title={club[0]} membershipType={club[1]} discription={club[2]} key={index}/>
                ))}
            </div>
        </div>
    );
}

export default MainPage