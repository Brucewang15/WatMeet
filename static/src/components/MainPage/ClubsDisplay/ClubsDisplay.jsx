import React from 'react';
import "./ClubsDisplay.css"

const ClubsDisplay = (props) => {
    
    const title = props.title;
    const memType = props.membershipType;
    const description = props.description;
    const ranking_num = props.ranking_num
    const star_rating = props.star_rating

    console.log(title);
    console.log("hi");

    return (
        <div className="clubContainer">
            <div className="clubTitle">
                <h1 className="title">{title}</h1>
                <p className="discription">{memType}</p>
            </div>
            <div className="clubInfo">
                <p className="discription">{description}</p>
                <p>{ranking_num}</p>
                <p>{star_rating}</p>
            </div>
        </div>
    );
}

export default ClubsDisplay;