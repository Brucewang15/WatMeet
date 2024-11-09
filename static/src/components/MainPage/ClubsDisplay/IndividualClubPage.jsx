// IndividualClubPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './IndividualClubPage.css';
import { useSelector } from 'react-redux';
import Header from '../../Header';
import IndividualClubComments from './IndividualClubComments';
import Socials from '../../UiComponents/Socials'

const IndividualClubPage = () => {
    const [userId, setUserId] = useState(null);
    const [allComments, setAllComments] = useState([]);
    const [allCommentsRatings, setAllCommentsRatings] = useState([]);
    const [clubInfo, setClubInfo] = useState({
        star_rating: 0,
        number_of_star_rating: 0,
    });
    const { orgId } = useParams();

    const auth = useSelector((state) => state.auth);
    const { isAuthenticated, accessToken } = auth;

    useEffect(() => {
        if (isAuthenticated && accessToken) {
            try {
                const arrayToken = accessToken.split('.');
                const tokenPayload = JSON.parse(atob(arrayToken[1]));
                setUserId(tokenPayload.user_id);
            } catch (error) {
                console.error('Failed to parse access token:', error);
            }
        }
    }, [isAuthenticated, accessToken]);

    // Fetch all comments from the backend
    const getAllCommentsDB = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/comments/get_comments/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ org_id: orgId }),
            });
            if (response.ok) {
                const data = await response.json();
                setAllComments(data.comments_data);
                setAllCommentsRatings(data.comments_likes);
            }
        } catch (err) {
            console.log('error', err);
        }
    };

    // Fetch all comments when component mounts
    useEffect(() => {
        getAllCommentsDB();
    }, []);

    // Get club data from backend upon loading
    useEffect(() => {
        getClubData();
    }, []);

    // Scroll to top upon loading
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Function to get club data
    const getClubData = async () => {
        const response = await fetch('http://127.0.0.1:8000/organizations/get_individual_club_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ org_id: orgId }),
        });
        if (response.ok) {
            const data = await response.json();
            setClubInfo(data);
        }
    };

    return (
        <div className="individualClubContainer">
            <Header />

            <div className="club-about-section-wrapper">

                <Socials types={["instagram"]} links={['http://']} />
                <div className="top-side">
                    <div className="content">
                        <h2>{clubInfo.org_name}</h2>
                    </div>
                </div>
                <div className="bottom-side">
                    <div className="content">
                        <p>{clubInfo.overview}</p>
                    </div>
                </div>
                <div className="ratingWrapperOutside">
                    <div className="ratingWrapper" style={{ '--rating': clubInfo.star_rating * 20 }}>
                        <div className="ratingTop">Reviews</div>
                        <div className="ratingBottom">
                            <div className="ratingLeft">
                                {Array.from({ length: 5 }).map((_, index) => {
                                    const reversedIndex = 5 - index; // Reverse the order from 5 to 1
                                    return (
                                        <div className="ratingBarWrapper" key={index}>
                                            <div className="ratingBarNumber">{reversedIndex}</div>
                                            <div
                                                className="ratingBar"
                                                style={{
                                                    '--ratingBar': clubInfo.number_of_star_rating
                                                        ? (allCommentsRatings[reversedIndex - 1] / clubInfo.number_of_star_rating) * 100
                                                        : 0,
                                                }}
                                            ></div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="ratingRight">
                                <div className="ratingNumber">{clubInfo.star_rating}</div>
                                <div className="rating"></div>
                                <div className="ratingStats">{clubInfo.number_of_star_rating} ratings</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Include the IndividualClubComments component */}
            <IndividualClubComments
                orgId={orgId}
                userId={userId}
                isAuthenticated={isAuthenticated}
                accessToken={accessToken}
                getClubData={getClubData}
                clubInfo={clubInfo}
            />
        </div>
    );
};

export default IndividualClubPage;
