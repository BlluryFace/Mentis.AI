import React from "react";
import "../styles/styles.css";
import testImage from "../assets/try.png";

const Feature = ({title, description}) => {
  return (
    <div className="feature-container">
      <div className="feature-left">
        <img src={testImage} alt="Feature" className="feature-image" />
      </div>
      <div className="feature-right">
        <h2 className="feature-title">{title}</h2>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  );
};

export default Feature;


