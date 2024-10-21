import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./ClubsDisplay.css"

const ClubsDisplay = (props) => {

    const title = props.title;
    const memType = props.membershipType;
    const description = props.description;
    const ranking_num = props.ranking_num
    const star_rating = props.star_rating
    const org_id = props.org_id

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/organizations/${org_id}`);
    };

    return (
        <div className="clubContainer" onClick={handleClick}>
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