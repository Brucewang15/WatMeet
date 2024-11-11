import React, { useState, useEffect } from 'react';

import Search from "../Search/Search";
import ClubsDisplay from "./ClubsDisplay/ClubsDisplay";
import "./MainPage.css"
import Header from '../Header';
import DisplayCard from '../UiComponents/DisplayCard';
import SearchFilter from '../SearchFilter/SearchFilter';
import Background from '../Background/Background';
import { useParams } from 'react-router-dom';

//import clubs_info from "..../webscraping/club_info.json";


const MainPage = () => {


    const [clubs, setClubs] = useState([]);
    const [minStarRating, setMinStarRating] = useState(0);
    const [minAmountRating, setMinAmountRating] = useState(0);
    const [selectedType, setSelectedType] = useState('All');

    const {prompt} = useParams();

    const handleSelect = (type) => {
        setSelectedType(type);
    };

    useEffect(() => {
        console.log(prompt);
        const get_club_data = async () => {
            const response = await fetch('http://127.0.0.1:8000/organizations/get_club_data/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchPropt: prompt, selectedType: selectedType, minStarRating: minStarRating })
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
    }, [prompt, minStarRating, minAmountRating, selectedType])

    return <>
        <Header/>
        <Background prompt={prompt}/>
        <div className="mainContainer">
            <div className="fContainer">
                <SearchFilter setMinStarRating={setMinStarRating} setMinAmountRating={setMinAmountRating}/>
            </div>
            <div className="mainAllClubsContainer">
                <div className="chooseOrgType">
                    {['All', 'Clubs', 'Design Teams', 'Intramurals'].map((type) => (
                        <div
                            key={type}
                            className="chooseOrgTypeButtons"
                            onClick={() => handleSelect(type)}
                            style={{
                                backgroundColor: selectedType === type ? 'white' : 'lightgray',
                                color: selectedType === type ? 'black' : '#666666',
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
        </div>
    </>
}

export default MainPage