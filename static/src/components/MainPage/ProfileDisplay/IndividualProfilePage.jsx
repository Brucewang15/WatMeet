import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './IndividualProfilePage.css';
import { useSelector } from 'react-redux';
import Header from '../../Header';
import '../ClubsDisplay/IndividualClubComments.css';
import upvote from '../../../pictures/upvote.svg';
import downvote from '../../../pictures/downvote.svg';
// import Background from '../Background/Background';
// import IndividualProfileComments from './IndividualProfileComments';
// import Socials from '../../UiComponents/Socials'

const IndividualProfilePage = () => {
    const [userId, setUserId] = useState(null);
    const [allComments, setAllComments] = useState([]);
    const [UserInfo, setUserInfo] = useState([]);
    const [allCommentsRatings, setAllCommentsRatings] = useState([]);
    const [, setClubInfo] = useState([]);
    const { orgId } = useParams();

    const auth = useSelector((state) => state.auth);
    const { isAuthenticated, accessToken } = auth;

    useEffect(() => {
        if (isAuthenticated && accessToken) {
            try {
                const arrayToken = accessToken.split('.');
                const tokenPayload = JSON.parse(atob(arrayToken[1]));
                setUserId(tokenPayload.user_id);
                getUserData(tokenPayload.user_id);
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

    // getClubData = async () => {
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/organizations/get_individual_club_data/', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ org_id: orgId }),
    //         });
    //         if (response.ok) {
    //             const data = await response.json();
    //             setClubInfo(data);
    //         }
    //     } catch (err) {
    //         console.log('error', err);
    //     }
    // };

    const getUserData = async (userId) => {
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
            <Header />

            <div className="profilebackgroundContainer">
                <div className="profiletextContainer">
                    <div className="profileContent">
                        <div className="profilePicture">
                            <img src={UserInfo.profilePictureUrl} alt="Profile Picture" />
                        </div>
                        <div className="profileDetails">
                            <div className="profilebackgroundText">
                                {UserInfo.first_name} {UserInfo.last_name}
                            </div>
                            <div className="profilebackgroundText">
                                <div className='smallertext'>
                                    Email: <u>{UserInfo.email}</u>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display User's Comments */}
            <div className='centertext'>
                <h2>Your Comments</h2>
                {userComments.length > 0 ? (
                    <ul>
                        {userComments.map((comment, index) => (
                            <div className="commentCard">
                                <div className="allCommentsContainer">
                                    <div className="comments" key={index}>
                                        <div className="like-wrapper">
                                            <img
                                                src={upvote}
                                                alt="upvote"
                                                // onClick={() => {
                                                //     if (isAuthenticated) {
                                                //         rateComment(comment.comment_id, userId, true, false);
                                                //     } else {
                                                //         setLoginPopupVisible(true);
                                                //     }
                                                // }}
                                            />
                                            <div className="like-text">{comment.comment_upvote - comment.comment_downvote}</div>
                                            <img
                                                src={downvote}
                                                alt="downvote"
                                                // onClick={() => {
                                                //     if (isAuthenticated) {
                                                //         rateComment(comment.comment_id, userId, false, true);
                                                //     } else {
                                                //         setLoginPopupVisible(true);
                                                //     }
                                                // }}
                                            />
                                        </div>

                                        <div className="comment-container">
                                            <div className="user">
                                                <div className="user-pic">
                                                    <svg
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        height="20"
                                                        width="20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinejoin="round"
                                                            fill="#707277"
                                                            strokeLinecap="round"
                                                            strokeWidth="2"
                                                            stroke="#707277"
                                                            d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                                                        ></path>
                                                        <path
                                                            strokeWidth="2"
                                                            fill="#707277"
                                                            stroke="#707277"
                                                            d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div className="user-info">
                                                    <span>{comment.comment_user_name}</span>
                                                    <p>{new Date(comment.comment_created_at).toLocaleDateString()}</p>
                                                    <p>{comment.comment_org_name}</p>
                                                </div>
                                            </div>
                                            <div
                                                className="individualCommentStarRating"
                                                style={{ '--rating': comment.comment_star_rating * 20 }}
                                            >
                                                <div className="rating commentVersion"></div>
                                            </div>
                                            <div className="comment-content">{comment.comment_body}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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