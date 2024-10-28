import './CommentPopUp.css'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const CommentPopUp = ( {userId, setCommentState} ) => {

    const { orgId } = useParams();
    const [comment, setComment] = useState("");
    const [stars, setStars] = useState(0);


    const postComment = async () => {
        console.log(orgId, comment, userId, stars)
        try {
            const response = await fetch('http://127.0.0.1:8000/comments/post_comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    comment: comment,
                    stars: stars,
                    org_id: orgId
                })
            })
            if (response.ok) {
                const data = await response.json()
                if (data.success) {
                    console.log('comment added')
                }
                else {
                    console.log(data.reason)
                }
            }
        }
        catch (err) {
            console.log('error', err)
        }
    }

    return <>
        <div className="rating-card">
            <div className="text-wrapper">
                <p className="text-primary">Provide insights for this club</p>
                {/* <p className="text-secondary">to help us serve you better</p> */}
            </div>

            <div className="rating-stars-container">
                <input onClick={() => {setStars(5)}} value="star-5" name="star" id="star-5" type="radio" />
                <label htmlFor="star-5" className="star-label">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                        ></path>
                    </svg>
                </label>

                <input onClick={() => {setStars(4)}} value="star-4" name="star" id="star-4" type="radio" />
                <label htmlFor="star-4" className="star-label">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                        ></path>
                    </svg>
                </label>

                <input onClick={() => {setStars(3)}} value="star-3" name="star" id="star-3" type="radio" />
                <label htmlFor="star-3" className="star-label">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                        ></path>
                    </svg>
                </label>

                <input onClick={() => {setStars(2)}} value="star-2" name="star" id="star-2" type="radio" />
                <label htmlFor="star-2" className="star-label">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                        ></path>
                    </svg>
                </label>

                <input onClick={() => {setStars(1)}} value="star-1" name="star" id="star-1" type="radio" />
                <label htmlFor="star-1" className="star-label">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                        ></path>
                    </svg>
                </label>
            </div>

            <textarea
                placeholder="Your feedback..."
                className="feedback-textarea"
                value={comment}
                onChange={(e) => {setComment(e.target.value)}} // Handle change here
            />


            <button className="cssbuttons-io" onClick={() => {postComment(); setCommentState();}}>
                <span>
                    Submit
                </span>
            </button>



        </div>

    </>
}

export default CommentPopUp