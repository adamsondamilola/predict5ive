import React, { Component } from 'react'; 

const TitleSection = (props) => {
return (
    <div className="page-header mt-5">
            <div className="page-header-1">
                <h1 className="main-content-title tx-30"> </h1>
                    <h4 className="breadcrumb-item">{props.title}</h4>
            </div>
        </div>
)
}

export default TitleSection