import React from 'react';
import "./ClubsDisplay.css"

const ClubsDisplay = (props) => {
    
    const title = props.title;
    const memType = props.membershipType;
    const discription = props.discription;

    console.log(title);
    console.log("hi");

    return (
        <div className="clubContainer">
            <div className="clubTitle">
                <h1 className="title">{title}</h1>
                <p className="discription">{memType}</p>
            </div>
            <div className="clubInfo">
                <p className="discription">{discription}</p>
            </div>
        </div>
    );
}

export default ClubsDisplay;