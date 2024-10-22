import React, { useState, useEffect } from 'react';

import Search from "../Search/Search";
import ClubsDisplay from "./ClubsDisplay/ClubsDisplay";
import "./MainPage.css"
import Header from '../Header';

//import clubs_info from "..../webscraping/club_info.json";


const MainPage = () => {

    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        const get_club_data = async () => {
            const response = await fetch('http://127.0.0.1:8000/organizations/get_club_data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                try {
                    const data = await response.json();
                    console.log(data);
                    setClubs(data);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }
        }
        get_club_data()
    }, [])

    return <>
        <Header />
        <div className="mainContainer">
            <div className="clubsContainer">
                {clubs.map((club, index) => (
                    <ClubsDisplay title={club.org_name} membershipType={club[1]} 
                    description={club.overview} ranking_num = {club.ranking_num} 
                    star_rating={club.star_rating} org_id = {club.org_id} key={index} />
                ))}
            </div>
        </div>
    </>
}

export default MainPage