import {useState} from 'react';


import "./SearchFilter.css";



const SearchFilter = ({setRating}) => {

    const [slider, setSlider] = useState(0);
    const [tags, setTags] = useState([
        {id: 1, isClicked: false},
        {id: 2, isClicked: false},
        {id: 3, isClicked: false},
        {id: 4, isClicked: false},
        {id: 5, isClicked: false},
        {id: 6, isClicked: false},
        {id: 7, isClicked: false},
        {id: 8, isClicked: false},
        {id: 9, isClicked: false},
        {id: 10, isClicked: false},
        {id: 11, isClicked: false},
        {id: 12, isClicked: false},
    ]);

    const handleChange = (event) => {
        setSlider(event.target.value);
        setRating(event.target.value);
    }

    const handleTagClick = (id) => {
        setTags(
            tags.map((tag) => 
                tag.id === id ? {id: tag.id, isClicked: !tag.isClicked} : tag
            )
        );
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
                <div className="orgType">Your organization type</div>
                <div className="orgsContainer">
                    <div className={tags[0].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(1)}>Culture</div>
                    <div className={tags[1].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(2)}>Recreation</div>
                    <div className={tags[2].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(3)}>International</div>
                    <div className={tags[3].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(4)}>Science</div>
                    <div className={tags[4].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(5)}>Arts</div>
                    <div className={tags[5].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(6)}>Community Service</div>
                    <div className={tags[6].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(7)}>Academic</div>
                    <div className={tags[7].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(8)}>Gaming</div>
                    <div className={tags[8].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(9)}>Religious</div>
                    <div className={tags[9].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(10)}>Performing Arts</div>
                    <div className={tags[10].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(11)}>Technology</div>
                    <div className={tags[11].isClicked ? "orgs clicked" : "orgs"} onClick={() => handleTagClick(12)}>Music</div>
                </div>
            </div>
            <button className="filterClear">Clear Filter</button>
        </div>
    );
}

export default SearchFilter;