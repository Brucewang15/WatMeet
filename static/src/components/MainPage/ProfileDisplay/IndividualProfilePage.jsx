import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './IndividualProfilePage.css';
import { useSelector } from 'react-redux';
// import Header from '../../Header';  
// import IndividualProfileComments from './IndividualProfileComments';
// import Socials from '../../UiComponents/Socials'

const IndividualProfilePage = () => {
    const [userId, setUserId] = useState(null);
    const [allComments, setAllComments] = useState([]);
    const [UserInfo, setUserInfo] = useState([]);
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

    const getUserData = async () => {
        console.log("Fetching user data for userId:", userId);
        try{
            const response = await fetch('http://127.0.0.1:8000/users/get_user/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId }),
            });
            if (response.ok) {
                const data = await response.json();
                setUserInfo(data);
            }
        } catch (err) {
            console.log('error', err);
        }
    };

    // const getClubData = async () => {
    //     const response = await fetch('http://127.0.0.1:8000/organizations/get_individual_club_data', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ org_id: orgId }),
    //     });
    //     if (response.ok) {
    //         const data = await response.json();
    //         setClubInfo(data);
    //     }
    // };

    useEffect(() => {
        getAllCommentsDB();
    }, []);

    // Get club data from backend upon loading
    // useEffect(() => {
    //     getClubData();
    // }, []);

    useEffect(() => {
        getUserData();
    }, [userId]);

    // Scroll to top upon loading
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    // allComments.forEach((comment) => {
    //     console.log(`Comment ID: ${comment.comment_id}, User ID: ${comment.user_id}`);
    // });

    const userComments = allComments.filter(comment => comment.comment_user_id === userId);

    return (
        <div>
            <div>
                <h1>User Info</h1>
                {UserInfo ? (
                    <div>
                        <p><strong>Name:</strong> {UserInfo.first_name} {UserInfo.last_name}</p>
                        <p><strong>Email:</strong> {UserInfo.email}</p>
                    </div>
                ) : (
                    <p>Loading user information...</p>
                )}
            </div>  

            {/* Display User's Comments */}
            <div>
                <h2>Your Comments</h2>
                {userComments.length > 0 ? (
                    <ul>
                        {userComments.map((comment, index) => (
                            <li key={index}>
                                <p>{comment.comment_body}</p>
                                <small>Posted on: {new Date(comment.comment_created_at).toLocaleDateString()}</small>
                                <br />
                                <small>Rating: {comment.comment_star_rating}</small>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You haven't made any comments yet.</p>
                )}
            </div>
        </div>
    );


};

export default IndividualProfilePage;