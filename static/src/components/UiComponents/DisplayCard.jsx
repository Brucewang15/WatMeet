import React from 'react';
import './DisplayCard.css';
import { useNavigate } from 'react-router-dom';


const DisplayCard = ( {org_id, clubName, clubDescription, clubRating, clubRatingNumber, clubRank}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(org_id)
        navigate(`/organizations/${org_id}`);
    };

    return (
        <div className="org_card" onClick = {handleClick} style={{ '--rating': 90 }}>
            {/* <div className="icon">🫠</div> */}
            <div className="title">{clubName}</div>
            <p className="description">{clubDescription.length > 400 ? clubDescription.slice(0, 400) + '...' : clubDescription}</p>
            <div className="rating"></div>
            <a href={`/organizations/${org_id}`} className="link">Learn more</a>
        </div>
    );
}

export default DisplayCard;
