import React, { useState } from 'react';

function Rating(props) {
    const [stars, setStars] = useState(new Array(props.starCount).fill(false));

    function handleClick(index) {
        let tempArr = new Array(index - 1).fill(true)
            .concat(new Array(stars.length - index - 1).fill(false));
        console.log("tempArr", tempArr);
        setStars(tempArr);
    }

    return (
        <div className="stars">
            {stars.map((elm, i) => (
                <div className="star" onClick={() => handleClick(i + 1)}>
                    { elm ? <span>&#9733;</span> : <span>&#9734;</span> }
                </div>
            ))}
        </div>
    )
}