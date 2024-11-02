import "./SearchFilter.css";


const SearchFilter = () => {

    return (
        <div className="filterContainer">
            <div className="titleContainer">
                <div className="title">Filter your organizations</div>
            </div>
            <div className="ratingContainer">
                <div className="showRating">
                    <div className="ratingText">Showing all ratings greater than:</div>
                    <div className="currentRating"></div>
                </div>
                <input className="ratingInput" type="range" min="0" max="5" value="0"></input>
            </div>
            <div className="orgContainer">
                <div className="orgType">Your organization type</div>
                <div className="orgContainer">
                    <div className="orgs">Clubs</div>
                    <div className="orgs">Design Teams</div>
                    <div className="orgs">Sports</div>
                    <div className="orgs">Intramurals</div>
                </div>
            </div>
            <button className="filterClear"></button>
        </div>
    );
}

export default SearchFilter;