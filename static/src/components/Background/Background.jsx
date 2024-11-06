import {useState, useEffect} from 'react';


import "./Background.css";


const Background = (props) => {
    const prompt = props.prompt;

    const [searchText, setSearchText] = useState("Displaying all organizations")

    useEffect(() => {
        if (prompt == undefined) {
            setSearchText("Displaying all organizations");
        } else {
            setSearchText("Search Result for '" + prompt + "'");
        }
    }, [prompt]);

    return (
        <div className="backgroundContainer">
            <div className="textContainer">
                <div className="backgroundText">{searchText}</div>
            </div>
        </div>
    );
}


export default Background;