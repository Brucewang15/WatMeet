// Bookmark.jsx
import React from "react";
import {useState, useEffect} from "react";
import "./Bookmark.css"; // Assuming you have a CSS file for styling

const Bookmark = ({ org_id, user_id }) => {

    const [bookmarked, setBookmarked] = useState(Boolean)

    const getBookmark = async () => {
        console.log(org_id, user_id)
        const response = await fetch('http://127.0.0.1:8000/users/get_bookmark_state/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'org_id': org_id,
                'user_id': user_id
            })
        })
        if (response.ok) {
            const data = await response.json()
            if (data.success) {
                setBookmarked(data.bookmarked)
                console.log(bookmarked, data.bookmarked)
            }
        }
    }
    // get bookmark state from backend on page visit
    useEffect(() => {
        getBookmark()
    }, [])

    const changeBookmark = async ( bookmarked ) => {
        console.log(bookmarked, user_id)
        const response = await fetch('http://127.0.0.1:8000/users/change_bookmark/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'bookmarkState': bookmarked,
                'org_id': org_id,
                'user_id': user_id
            })
        })
        if (response.ok) {
            setBookmarked(bookmarked)
        }
    }

    return (
        <label className="ui-bookmark">
            <input type="checkbox" checked={bookmarked} onClick={() => {changeBookmark(!bookmarked)}} />
            <div className="bookmark">
                <svg viewBox="0 0 32 32">
                    <g>
                        <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                    </g>
                </svg>
            </div>
        </label>
    );
};

export default Bookmark;
