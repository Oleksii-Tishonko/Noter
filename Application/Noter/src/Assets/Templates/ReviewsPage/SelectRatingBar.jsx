import React, {useState} from "react";
import yellowStar from "./../../Images/Yellow_Star.svg";
import grayStar from "./../../Images/Gray_Star1.svg";
import {set} from "lodash";
const SelectRatingBar = ({onRatingChange}) => {
    const [rating, setRating] = useState(0);

    function onImageOver(id) {
        console.log(id);

        const rating = parseInt(id);

        for (let i = 1; i <= rating; i++) {
            const element = document.getElementById(i);
            element.children[0].src = yellowStar;
        }
        for (let i = rating + 1; i <= 5; i++) {
            const element = document.getElementById(i);
            element.children[0].src = grayStar;
        }
    }
    function setNewRating(id) {
        const rating = parseInt(id);
        setRating(rating);
        if (onRatingChange) onRatingChange(rating);
    }

    function onRatingBarOff() {
        console.log(`rating: ${rating}`);

        for (let i = 1; i <= rating; i++) {
            const element = document.getElementById(i);
            element.children[0].src = yellowStar;
        }
        for (let i = rating + 1; i <= 5; i++) {
            const element = document.getElementById(i);
            element.children[0].src = grayStar;
        }
    }

    return (
        <div className="selectRatingBar">
            <div className="list" onMouseLeave={() => onRatingBarOff()}>
                <li id="1" onMouseOver={() => onImageOver(1)} onClick={() => setNewRating(1)}>
                    <img src={grayStar} />
                    <label>Bad</label>
                </li>
                <li id="2" onMouseOver={() => onImageOver(2)} onClick={() => setNewRating(2)}>
                    <img src={grayStar} />
                    <label>Somewhat</label>
                </li>
                <li id="3" onMouseOver={() => onImageOver(3)} onClick={() => setNewRating(3)}>
                    <img src={grayStar} />
                    <label>Normal</label>
                </li>
                <li id="4" onMouseOver={() => onImageOver(4)} onClick={() => setNewRating(4)}>
                    <img src={grayStar} />
                    <label>Good</label>
                </li>
                <li id="5" onMouseOver={() => onImageOver(5)} onClick={() => setNewRating(5)}>
                    <img src={grayStar} />
                    <label>Perfect</label>
                </li>
            </div>
        </div>
    );
};

export default SelectRatingBar;
