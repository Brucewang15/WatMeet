// RatingBox.jsx
import React from 'react';
import './RatingBox.css'; // Import the CSS for RatingBox

const RatingBox = ({ starRating, numberOfStarRatings, allCommentsRatings }) => {
    return (
        <div className="ratingWrapperOutside">
            <div className="ratingWrapper" style={{ '--rating': starRating * 20 }}>
                <div className="ratingTop">Reviews</div>
                <div className="ratingBottom">
                    <div className="ratingLeft">
                        {Array.from({ length: 5 }).map((_, index) => {
                            const reversedIndex = 5 - index; // Reverse the order from 5 to 1
                            const ratingBarWidth =
                                numberOfStarRatings && allCommentsRatings[reversedIndex - 1]
                                    ? (allCommentsRatings[reversedIndex - 1] / numberOfStarRatings) * 100
                                    : 0;
                            return (
                                <div className="ratingBarWrapper" key={index}>
                                    <div className="ratingBarNumber">{reversedIndex}</div>
                                    <div
                                        className="ratingBar"
                                        style={{
                                            '--ratingBar': ratingBarWidth,
                                        }}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="ratingRight">
                        <div className="ratingNumber">{starRating}</div>
                        <div className="rating"></div>
                        <div className="ratingStats">{numberOfStarRatings} ratings</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingBox;
