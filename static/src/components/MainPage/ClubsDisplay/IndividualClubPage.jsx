import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './IndividualClubPage.css'
import { useSelector } from 'react-redux';
import CommentPopUp from '../../UiComponents/CommentPopUp';
import Login from '../../../components/account/Login'
import Header from '../../Header'
import Thumb from '../../UiComponents/Thumb';
import upvote from '../../../pictures/upvote.svg'
import downvote from '../../../pictures/downvote.svg'
const IndividualClubPage = () => {

    const [commentState, setCommentState] = useState(false)
    const [loginPopupVisible, setLoginPopupVisible] = useState(false)
    const [userId, setUserId] = useState(null);
    const [allComments, setAllComments] = useState([])
    const [allCommentsRatings, setAllCommentsRatings] = useState([])
    const [commentRatings, setCommentRatings] = useState({});
    const [clubInfo, setClubInfo] = useState({
        star_rating: 0,
        number_of_star_rating: 0,
    })
    const { orgId } = useParams()

    const auth = useSelector(state => state.auth)
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
    console.log(isAuthenticated)

    //Checks if a user is logged in or not. If logged in, sets userId.
    // useEffect(() => {
    //     // Check for access token in localStorage
    //     const token = localStorage.getItem("access_token");
    //     if (token) {
    //         const arrayToken = token.split(".")
    //         const tokenPayload = JSON.parse(atob(arrayToken[1]))
    //         setIsLoggedIn(true)
    //         setUserId(tokenPayload.user_id)
    //     }
    // }, []);

    //Gets club data from backend upon loading
    useEffect(() => {
        getClubData()
    }, [])

    // Function used to get club data
    const getClubData = async () => {
        const response = await fetch('http://127.0.0.1:8000/organizations/get_individual_club_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                org_id: orgId
            })
        })
        if (response.ok) {
            const data = await response.json()
            setClubInfo(data)
            console.log(clubInfo, data)
        }
    }

    //Gets all comments for a specific organization
    useEffect(() => {
        getAllCommentsDB()
    }, [])

    // Function used in useEffect on top.
    const getAllCommentsDB = async () => {
        console.log(orgId, allComments)
        try {
            const response = await fetch('http://127.0.0.1:8000/comments/get_comments/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    org_id: orgId
                })
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setAllComments(data.comments_data)
                setAllCommentsRatings(data.comments_likes)
                console.log(allComments, data)
            }
        }
        catch (err) {
            console.log('error', err)
        }
    }

    const ratecomment = async (commentId, userId, upvote, downvote) => {

        const newRatings = { ...commentRatings };
        if (upvote) {
            newRatings[commentId] = { upvoted: true, downvoted: false };
        } else {
            newRatings[commentId] = { upvoted: false, downvoted: true };
        }
        setCommentRatings(newRatings);

        try {
            console.log(userId)
            const response = await fetch('http://127.0.0.1:8000/comments/rate_comment/', {
                method: 'POST', // Use POST for creating/updating resources
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment_id: commentId,
                    user_id: userId,
                    upvote: upvote,
                    downvote: downvote,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.success) {
                console.log('Comment rating updated successfully:', data);
                getAllCommentsDB()
                // Optionally, update your UI to reflect the new like status here
            } else {
                console.error('Failed to update comment rating:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Fetch user comment ratings from the backend when component mounts
    useEffect(() => {
        if (userId) {
            fetchUserCommentRatings();
        }
    }, [userId]);

    const fetchUserCommentRatings = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/comments/get_user_ratings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    org_id: orgId
                })
            });

            if (response.ok) {
                const data = await response.json();
                setCommentRatings(data.commentRatings); // Assume data.commentRatings is an object with the same structure
            }
        } catch (error) {
            console.error('Failed to fetch user ratings:', error);
        }
    };

    // prevent scrolling when pop up is opened
    useEffect(() => {
        if (loginPopupVisible || commentState) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [loginPopupVisible]);


    return (
        <div className="individualClubContainer">
            <Header />

            <div className="club-about-section-wrapper">
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

            <div className="leaveAComment">
                <div className="leaveACommentWrapper"><div className="leaveACommentText">Leave a review!</div>
                    <button className="bookmarkBtn" onClick={() => {
                        if (isAuthenticated) {
                            setCommentState(!commentState);
                        } else {
                            setLoginPopupVisible(true);
                        }
                    }}>
                        <span className="IconContainer">
                            <svg fill="white" viewBox="0 0 512 512" height="1em">
                                <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"></path>
                            </svg>
                        </span>
                        <p className="text">Comment</p>
                    </button>
                </div>
            </div>

            {commentState && <div className="commentPopUp"><CommentPopUp userId={userId} setCommentState={setCommentState} onCommentPosted={() => { getAllCommentsDB(); getClubData(); }} /> </div>}

            {loginPopupVisible && (
                <div className="popupOverlay" onClick={() => setLoginPopupVisible(false)}>
                    <div className="popupContent" onClick={(e) => e.stopPropagation()}>
                        <Login />
                    </div>
                </div>
            )}
            <div className="commentCard">
                <span className="commentTitle">Comments</span>
                <div className="allCommentsContainer">
                    {[...allComments].reverse().map((comment, index) => (

                        <div className="comments">
                            <div class="like-wrapper">
                                <img className={`voteButton ${commentRatings[comment.comment_id]?.upvoted ? 'upvoted' : ''}`}
                                    src={upvote} alt="upvote" onClick={() => {
                                        if (isAuthenticated) {
                                            ratecomment(comment.comment_id, userId, true, false)
                                        } else {
                                            setLoginPopupVisible(true)
                                        }}} />
                                <div className="like-text">{comment.comment_upvote - comment.comment_downvote}</div>
                                <img className={`voteButton ${commentRatings[comment.comment_id]?.downvoted ? 'downvoted' : ''}`}
                                    src={downvote} alt="downvote" onClick={() => {
                                        if (isAuthenticated) {
                                            ratecomment(comment.comment_id, userId, false, true)
                                        } else {
                                            setLoginPopupVisible(true)
                                        }}} />
                            </div>

                            <div className="comment-container">
                                <div className="user">
                                    <div className="user-pic">
                                        <svg fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
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
                                        <p>{comment.comment_created_at.split("T")[0]}</p>
                                    </div>
                                </div>
                                <div className="individualCommentStarRating" style={{ '--rating': comment.comment_star_rating * 20 }}>
                                    <div className="rating commentVersion"></div>
                                </div>
                                <div className="comment-content">{comment.comment_body}</div>
                            </div>
                        </div>


                    ))}
                </div>
            </div>
            {/* {isLoggedIn && <div className="">
                {orgId} {userId}
                <input type="text" onChange={(e) => { setComment(e.target.value) }} />
                <input type="text" onChange={(e) => { setStars(e.target.value) }} />
                <button onClick={postComment}>Submit</button>
            </div>} */}
        </div>
    );
}

export default IndividualClubPage