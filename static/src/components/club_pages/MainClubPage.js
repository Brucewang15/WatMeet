import React, { useState, useEffect } from 'react';
import './MainClubPage.css';
import Stars from './Stars';
const MainClubPage = () => {

    const [club_data, setClub_data] = useState(null);

    const [email, setEmail] = useState(null);
    const [comment, setComment] = useState(null);
    const [stars, setStars] = useState(0);
    const handleStarChange = (event) => {
        setStars(event.target.value)
    }

    const handleSubmit = async () => {
        
    }


    useEffect(() => {

        const get_club_data = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/comments/get_comments/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    console.log(response.json())
                }
            }
            catch (error) {
                console.error('Error fetching club data:', error);
            }
        }
        get_club_data();

    }, []);

    return <>
        <h1>Main Page</h1>


        <div className="card">
            <span className="title">Leave a Comment</span>
            <div className="form">
                <div className="group">
                    {/* <Stars className='stars' sendStarToParent = {handleStarChange}/> */}
                </div>
                <div className="group">
                    <input placeholder="" type="email" id="email" name="email" required />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="group">
                    <textarea placeholder="" id="comment" name="comment" rows="5" required />
                    <label htmlFor="comment" onChange={(e) => {setComment(e.target.value)}}>Comment</label>
                </div>
                <button type="submit">Submit</button>
            </div>
        </div>


    </>
}

export default MainClubPage;