import {useState} from 'react';


import "./SearchFilter.css";



const SearchFilter = ({setRating}) => {

    const [slider, setSlider] = useState(0);
    const [tags, setTags] = useState(["Social", "Culture", "Recreation", "International", "Professional Development", 
        "Academic", "Networking", "Arts", "Advocacy", "Community Service", "Gaming", "Health", "Religious", "Performing Arts", "Music", 
        "Science", "Technology", "Charity", "Volunteering", "Fundraising", "Support Group", "Language", "Wellness", "Video Games", "Board Games", 
        "Literature", "Public Speaking", "Law", "Mentorship", "Innovation", "Leadership", "Finance", "Sports", "Debate", "Engineering", "Investment", 
        "LGBTQ+", "Film", "Diversity", "Education", "Photography", "Comedy", "Entrepreneurship"]);
    const [isClicked, setIsClicked] = useState(new Array(tags.length).fill(false));

    const handleChange = (event) => {
        setSlider(event.target.value);
        setRating(event.target.value);
    }

    const handleTagClick = (index) => {
        setIsClicked(isClicked.map((item, i) => 
            index == i ? !item : item
        ));
    }


    return (
        <div className="filterContainer">
            <div className="titleContainer">
                <div className="title">Filter your organizations</div>
            </div>
            <div className="ratingContainer">
                <div className="showRating">
                    <div className="ratingText">Showing all ratings greater than:</div>
                    <div className="currentRating">{slider}</div>
                </div>
                <input className="ratingInput" type="range" min="0" max="5" defaultValue="0" step="0.1" onChange={handleChange}/>
            </div>
            <div className="orgContainer">
                <div className="orgType">Organization Tags</div>
                <div className="orgsContainer">
                    {tags.map((item, index) => (
                        <div key={index} onClick={() => handleTagClick(index)} className={isClicked[index] ? "orgs clicked" : "orgs"}>
                            {item}
                        </div>
                    ))}
                </div>
                <div className="showContainer">
                    <div className="show">show more</div>
                </div>
            </div>
            <button className="filterClear">Clear Filter</button>
        </div>
    );
}

export default SearchFilter;