import React, { useState, useEffect } from 'react';

import Search from "../Search/Search";
import ClubsDisplay from "./ClubsDisplay/ClubsDisplay";
import "./MainPage.css"
import Header from '../Header';
import DisplayCard from '../UiComponents/DisplayCard';

//import clubs_info from "..../webscraping/club_info.json";


const MainPage = () => {

    const [clubs, setClubs] = useState([]);
    const [searchPropt, setSearchPrompt] = useState("");
    const [selectedType, setSelectedType] = useState('All');

    const handleSelect = (type) => {
        setSelectedType(type);
    };

    useEffect(() => {
        const get_club_data = async () => {
            const response = await fetch('http://127.0.0.1:8000/organizations/get_club_data/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchPropt: searchPropt, selectedType: selectedType })
            })
            if (response.ok) { 
                try {
                    const data = await response.json();
                    setClubs(data);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }
        }
        get_club_data()
    }, [searchPropt, selectedType])   

    return <>
        <Header setSearchPropt={setSearchPrompt} />
        <div className="mainContainer">
            <div className="chooseOrgType">
                {['All', 'Clubs', 'Design Teams', 'Sports', 'Intramurals'].map((type) => (
                    <div
                        key={type}
                        className="chooseOrgTypeButtons"
                        onClick={() => handleSelect(type)}
                        style={{
                            backgroundColor: selectedType === type ? 'white' : 'lightgray',
                            color: selectedType === type? 'black' : '#666666',
                            cursor: 'pointer'
                        }}
                    >
                        {type}
                    </div>
                ))}
            </div>
            <div className="clubsContainer">
                {clubs.map((club, index) => (
                    // <ClubsDisplay title={club.org_name} membershipType={club[1]} 
                    // description={club.overview} ranking_num = {club.ranking_num} 
                    // star_rating={club.star_rating} org_id = {club.org_id} key={index} />     
                    <DisplayCard org_id={club.org_id} clubName={club.org_name} clubDescription={club.overview}
                        clubRating={club.star_rating} clubRatingNumber={club.number_of_star_rating} clubRank={club.ranking_num} 
                    />
                ))}
            </div>
        </div>
    </>
}

export default MainPage