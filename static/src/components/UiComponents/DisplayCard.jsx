import React from 'react';
import './DisplayCard.css';
import { useNavigate } from 'react-router-dom';


const DisplayCard = ({ org_id, clubName, clubDescription, clubRating, clubRatingNumber, clubRank, selectedType }) => {
    const navigate = useNavigate();
    let formattedClubRating = clubRating.toFixed(1);

    const handleClick = () => {
        console.log(org_id)
        navigate(`/organizations/${org_id}`);
    };

    const clubDescriptionShortened = clubDescription.length > 150 ? clubDescription.slice(0, 125) + '...' : clubDescription
    return (
        <div className="org_card" onClick={handleClick} style={{ '--rating': clubRating * 20 }}>
            {/* <div className="icon">🫠</div> */}
            <div className="org_card_left">
                <div className="title">{clubName}</div>
                <p className="description">{clubDescriptionShortened}</p>
                {/* <a href={`/organizations/${org_id}`} className="link">Learn more</a> */}
            </div>

            <div className="ratingWrapperMain">
                <div className="ratingRight">
                    <div className="ratingNumber">{formattedClubRating}</div>
                    <div className="rating"></div>
                    <div className="ratingStats">{clubRatingNumber} ratings</div>
                </div>
            </div>

        </div>
    );
}

export default DisplayCard;
