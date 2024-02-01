import React from "react";
import img from "../images/dashboard-img.png";
import "./WelcomeUI.css";

const WelcomeUI = ({ employee }) => {
  const getGreetings = () => {
    let timeNow = new Date().getHours();
    let greeting =
      timeNow >= 5 && timeNow < 12
        ? "Good Morning"
        : timeNow >= 12 && timeNow < 18
        ? "Good Afternoon"
        : "Good Evening";
    return greeting;
  };

  return (
    <div className="row welcome-section">
      <div className="col-md-7">
        {employee && (
          <h3>
            Hello, <span className="fw-bold">{employee.name}</span>
          </h3>
        )}
        <h2>{getGreetings()}!</h2>
        <h6>Have a Good Day !</h6>
      </div>
      <div className="col-md-5">
        <img src={img} className="dashboard-img" alt="dashboard"/>
      </div>
    </div>
  );
};

export default WelcomeUI;
