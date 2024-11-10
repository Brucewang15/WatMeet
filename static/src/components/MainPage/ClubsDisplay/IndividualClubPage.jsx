// IndividualClubPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './IndividualClubPage.css';
import { useSelector } from 'react-redux';
import Header from '../../Header';
import IndividualClubComments from './IndividualClubComments';
import Socials from '../../UiComponents/Socials'
import RatingBox from './RatingBox';

const IndividualClubPage = () => {
    const [userId, setUserId] = useState(null);
    const [allComments, setAllComments] = useState([]);
    const [allCommentsRatings, setAllCommentsRatings] = useState([]);
    const [clubInfo, setClubInfo] = useState({
        org_name: '',
        overview: '',
        star_rating: 0,
        number_of_star_rating: 0,
        ranking_num: 0,
        org_type: '',
        links: [],
        tags: [],
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

                <div className="top-side">
                    <div className="content">
                        <h2>{clubInfo.org_name}</h2>
                        {clubInfo.tags}
                    </div>
                </div>
                <div className="bottom-side">
                    <div className="content">
                        <p>{clubInfo.overview}</p>
                        <div className="socialSection">
                            <Socials types={clubInfo.types} links={clubInfo.links} />
                        </div>

                        <RatingBox
                            starRating={clubInfo.star_rating}
                            numberOfStarRatings={clubInfo.number_of_star_rating}
                            allCommentsRatings={allCommentsRatings}
                        />
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
                getAllCommentsDB2={getAllCommentsDB}
            />
        </div>
    );
};

export default IndividualClubPage;
