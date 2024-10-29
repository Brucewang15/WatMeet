import React from 'react';
import './DisplayCard.css';
import { useNavigate } from 'react-router-dom';


const DisplayCard = ( {org_id, clubName, clubDescription, clubRating, clubRatingNumber, clubRank}) => {
    const navigate = useNavigate();
    console.log(org_id);
    const handleClick = () => {
        console.log(org_id)
        navigate(`/organizations/${org_id}`);
    };

    const clubDescriptionShortened = clubDescription.length > 400 ? clubDescription.slice(0, 400) + '...' : clubDescription
    return (
        <div className="org_card" onClick = {handleClick} style={{ '--rating': clubRating*20 }}>
            {/* <div className="icon">🫠</div> */}
            <div className="title">{clubName}</div>
            <p className="description">{clubDescriptionShortened}</p>

            <div className="ratingWrapper">
                <div className="ratingNumber">{clubRating}</div>
                <div className="rating"></div>
                <div className="ratingStats">{clubRatingNumber}100 ratings</div>
            </div>
            
            <a href={`/organizations/${org_id}`} className="link">Learn more</a>
        </div>
    );
}

export default DisplayCard;
