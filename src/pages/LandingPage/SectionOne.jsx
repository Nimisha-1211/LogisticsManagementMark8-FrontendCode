
import React from "react";
import "../../styles/Common/SectionOne.css";
import LogisticsLogo from "../../assets/logistics logo.jpg";
import { Link } from "react-router-dom"

const SectionOne = () => {
  return (
    <div className="section-one">
      {/* Left Text Content */}
      <div className="text-left">
        <h1>
          PROVIDING DEDICATED <br />
          TRANSPORTATION SERVICES <br />
          ACROSS INDIA
        </h1>
        <Link to="/support"className="contact-btn"style={{ textDecoration: "none" }}>CONTACT US</Link>
      </div>

      {/* Right Image */}
      <div className="image-container">
        <img src={LogisticsLogo} alt="Logistics Warehouse" className="background-image" />
      </div>
    </div>
  );
};

export default SectionOne;