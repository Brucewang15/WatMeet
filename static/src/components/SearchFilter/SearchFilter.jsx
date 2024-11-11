import {useState} from 'react';

import "./SearchFilter.css";

const SearchFilter = ({setMinStarRating, setMinAmountRating}) => {

    const [starRating, setStarRating] = useState(0);
    const [amountRating, setAmountRating] = useState(0);
    const [tags, setTags] = useState(["Culture", "Recreation", "International", "Technology","Academic", "Arts", "Community Service", "Gaming", 
        "Health", "Religious", "Performing Arts", "Music", "Science", "Charity", "Volunteering", "Fundraising", "Support Group", "Language", "Wellness", "Video Games", "Board Games", 
        "Literature", "Public Speaking", "Law", "Mentorship", "Innovation", "Leadership", "Finance", "Sports", "Debate", "Engineering", "Investment", 
        "LGBTQ+", "Film", "Diversity", "Education", "Photography", "Comedy", "Entrepreneurship", "Social", "Professional Development", "Networking", "Advocacy"]);
    const [isClicked, setIsClicked] = useState(new Array(tags.length).fill(false));
    const [expanded, setExpanded] = useState(false);

    const handleStarRatingChange = (event) => {
        setStarRating(event.target.value);
        setMinStarRating(event.target.value);
    }

    const handleAmountRatingChange = (event) => {
        setAmountRating(event.target.value);
        setMinAmountRating(event.target.value);
    }

    const handleTagClick = (index) => {
        setIsClicked(isClicked.map((item, i) => 
            index == i ? !item : item
        ));
    }

    const checkExpanded = (tags) => {
        if (expanded)
            return tags;
        let arr = [];
        for (let i=0; i<10; i++) 
            arr.push(tags[i]);
        return arr;
    }

    const handleShow = () => {
        setExpanded(!expanded);
    }


    return (
        <div className="filterContainer">
            <div className="titleContainer">
                <div className="title">Filter your organizations</div>
            </div>
            <div className="ratingContainer">
                <div className="showRating">
                    <div className="ratingText">Showing all ratings greater than:</div>
                    <div className="currentRating">{starRating}</div>
                </div>
                <input className="ratingInput" type="range" min="0" max="5" defaultValue="0" step="0.1" onChange={handleStarRatingChange}/>
            </div>
            <div className="ratingContainer">
                <div className="showRating">
                    <div className="ratingText">Showing amount of ratings greater than:</div>
                    <div className="currentRating">{amountRating}</div>
                </div>
                <input className="ratingInput" type="range" min="0" max="5" defaultValue="0" step="0.1" onChange={handleAmountRatingChange}/>
            </div>
            <div className="orgContainer">
                <div className="orgType">Organization Tags</div>
                <div className="orgsContainer">
                    {checkExpanded(tags).map((item, index) => (
                        <div key={index} onClick={() => handleTagClick(index)} className={isClicked[index] ? "orgs clicked" : "orgs"}>
                            {item}
                        </div>
                    ))}
                </div>
                <div className="showContainer">
                    <div className="show" onClick={handleShow}>{expanded ? "show less" : "show more"}</div>
                </div>
            </div>
            <button className="filterClear">Clear Filter</button>
        </div>
    );
}

export default SearchFilter;