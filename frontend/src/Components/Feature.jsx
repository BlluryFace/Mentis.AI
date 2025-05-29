import React from "react";
import "../styles/styles.css";

const Feature = ({title, description, image}) => {
    return (
        <div className="feature-container">
            <div className="feature-right">
                <h2 className="feature-title">{title}</h2>
                <img src={image} alt="Feature" className="feature-image"/>
            </div>
            <p className="feature-description">{description}</p>
        </div>
    );
};

export default Feature;

