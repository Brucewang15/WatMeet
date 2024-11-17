// IndividualClubPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './IndividualClubPage.css';
import { useSelector } from 'react-redux';
import Header from '../../Header';
import IndividualClubComments from './IndividualClubComments';
import Socials from '../../UiComponents/Socials'
import RatingBox from './RatingBox';
import Tags from '../../UiComponents/Tags';
import Bookmark from '../../UiComponents/Bookmark';

const IndividualClubPage = () => {
    const [userId, setUserId] = useState(null);
    const [allComments, setAllComments] = useState([]);
    const [allCommentsRatings, setAllCommentsRatings] = useState([]);
    const [allCommentsIndividualLikes, setAllCommentsIndividualLikes] = useState([]);
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

    const checkAuth = () => {
        if (isAuthenticated && accessToken) {
            try {
                const arrayToken = accessToken.split('.');
                const tokenPayload = JSON.parse(atob(arrayToken[1]));
                getAllCommentsDB(tokenPayload.user_id)
                setUserId(tokenPayload.user_id);
                console.log(userId, 'userid')
            } catch (error) {
                console.error('Failed to parse access token:', error);
            }
        }
    }
    useEffect(() => {
        checkAuth()
    }, [isAuthenticated, accessToken, orgId]);


    // Fetch all comments from the backend
    const getAllCommentsDB = async ( user_id ) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/comments/get_comments/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    org_id: orgId,
                    user_id: user_id,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setAllComments(data.comments_data);
                setAllCommentsRatings(data.comments_likes);
                setAllCommentsIndividualLikes(data.comments_individual_likes)
            }
        } catch (err) {
            console.log('error', err);
        }
    };

    // Fetch all comments when component mounts
    useEffect(() => {
        getAllCommentsDB();
    }, [orgId]);

    // Get club data from backend upon loading
    useEffect(() => {
        getClubData();
    }, [orgId]);

    // Scroll to top upon loading
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [orgId]);

    // Function to get club data
    const getClubData = async () => {
        const response = await fetch('http://127.0.0.1:8000/organizations/get_individual_club_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ org_id: orgId }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setClubInfo(data);
        }
    };

    return (
        <div className="individualClubContainer">
            <Header />

            <div className="club-about-section-wrapper">

                <div className="top-side">
                    <div className="content">
                        <h2>{clubInfo.org_name}
                            {userId && <Bookmark org_id={orgId} user_id={userId} />}
                        </h2>

                    </div>
                </div>
                <div className="bottom-side">
                    <div className="content">
                        <p>{clubInfo.overview}</p>
                        <div className="socialSection">
                            <Tags tags={clubInfo.tags} />
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
                getAllCommentsDB={getAllCommentsDB}
                allComments={allComments}
                allCommentsIndividualLikes={allCommentsIndividualLikes}
            />
        </div>
    );
};

export default IndividualClubPage;
