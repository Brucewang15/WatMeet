import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../../UiComponents/Comment';
import './IndividualClubPage.css'
import CommentPopUp from '../../UiComponents/CommentPopUp';
const IndividualClubPage = () => {

    const [commentState, setCommentState] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [allComments, setAllComments] = useState([])
    const { orgId } = useParams();

    //Checks if a user is logged in or not. If logged in, sets userId.
    useEffect(() => {
        // Check for access token in localStorage
        const token = localStorage.getItem("access_token");
        if (token) {
            const arrayToken = token.split(".")
            const tokenPayload = JSON.parse(atob(arrayToken[1]))
            setIsLoggedIn(true)
            setUserId(tokenPayload.user_id)
        }
    }, []);

    //Gets all comments for a specific organization
    useEffect(() => {
        const getAllComments = async () => {
            console.log(orgId)
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
                    console.log('ok')
                    const data = await response.json()
                    setAllComments(data)
                    console.log(allComments, data)
                }
            }
            catch (err) {
                console.log('error', err)
            }
        }
        getAllComments()
    }, [])
    return (
        <div className="individualClubContainer">
            <button className="bookmarkBtn" onClick={() => { setCommentState(!commentState && isLoggedIn) }}>
                <span className="IconContainer">
                    <svg fill="white" viewBox="0 0 512 512" height="1em">
                        <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"></path>
                    </svg>
                </span>
                <p className="text">Comment</p>
            </button>

            {commentState && <div className="commentPopUp"><CommentPopUp userId={userId} /> </div>}

            <div className="commentCard">
                <span className="commentTitle">Comments</span>
                {[...allComments].reverse().map((comment) => (
                    <div className="allCommentsContainer">                        
                            <div className="comments">
                                <div className="comment-react">
                                    <button>
                                        <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill="#707277"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                stroke="#707277"
                                                d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                                            ></path>
                                        </svg>
                                    </button>
                                    <hr />
                                    <span>14</span>
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
                                    <p className="comment-content">{comment.comment_body}</p>
                                    <p>upvotes: {comment.comment_upvote} downvotes: {comment.comment_downvote}</p>
                                </div>
                            </div>
                        </div>

                ))}
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