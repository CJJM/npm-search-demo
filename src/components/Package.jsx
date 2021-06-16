import React, { useState } from 'react';

function Package(props) {
    const [isFav, setFav] = useState(false);

    function toggleFavorite() {
        setFav(!isFav);
        props.toggleFav(props.elm.package);
    }

    const packData = props.elm.package;
    const notFavorite = <span onClick={toggleFavorite} className="star">&#9734;</span>;
    const isFavorite = <span onClick={toggleFavorite} className="fav star">&#9733;</span>;

    return (
        <div className="package">
            <div className="main-data">
                <a href={packData.links.npm}>{packData.name}</a>
                <span>v{packData.version}</span>
            </div>
            <p>{packData.description}</p>
            {isFav ? isFavorite : notFavorite}
      </div>
    )
}

export default Package;