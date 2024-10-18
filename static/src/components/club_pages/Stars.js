import React, { useState } from 'react';
import './Stars.css'
const Stars = ({ sendStarToParent }) => {


    const ratings = [5, 4, 3, 2, 1]
    const [selectedRating, setSelectedRating] = useState(0)

    return (
        <div className="rating">
            <input value="5" name="rating" id="star5" type="radio" />
            <label htmlFor="star5"></label>

            <input value="4" name="rating" id="star4" type="radio" />
            <label htmlFor="star4"></label>

            <input value="3" name="rating" id="star3" type="radio" />
            <label htmlFor="star3"></label>

            <input value="2" name="rating" id="star2" type="radio" />
            <label htmlFor="star2"></label>

            <input value="1" name="rating" id="star1" type="radio" />
            <label htmlFor="star1"></label>
        </div>
    );
}

export default Stars