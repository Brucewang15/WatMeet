import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const IndividualClubPage = () => {

    const { orgId } = useParams();
    const [comment, setComment] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [stars, setStars] = useState(0);

    const postComment = async () => {
        console.log(orgId, comment, isLoggedIn, userId, stars)
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
                console.log('comment added')
            }
        }
        catch (err) {
            console.log('error', err)
        }


    }
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
    return (
        <div className="mainContainer">
            {isLoggedIn && <div className="">
                {orgId} {userId}
                <input type="text" onChange={(e) => { setComment(e.target.value) }} />
                <input type="text" onChange={(e) => { setStars(e.target.value) }} />
                <button onClick={postComment}>Submit</button>
            </div>}
        </div>
    );
}

export default IndividualClubPage