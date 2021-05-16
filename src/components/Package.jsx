import React from 'react';

function Package(props) {
    const packData = props.elm.package;
    return (
        <div className="package">
            <div className="main-data">
                <a href={packData.links.npm}>{packData.name}</a>
                <span>v{packData.version}</span>
            </div>
            <p>{packData.description}</p>
      </div>
    )
}

export default Package;