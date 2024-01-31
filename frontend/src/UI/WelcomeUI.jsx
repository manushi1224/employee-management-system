import React from "react";

const WelcomeUI = ({ employee }) => {
  const getGreetings = () => {
    let timeNow = new Date().getHours();
    let greeting =
      timeNow >= 5 && timeNow < 12
        ? "Good Morning"
        : timeNow >= 12 && timeNow < 18
        ? "Good Afternoon"
        : "Good evening";
    return greeting;
  };

  return (
    <div className="row">
      <div className="col-7">
        {employee && <h5>Hi, {employee.name}</h5>}
        <h3>{getGreetings()} !</h3>
        <h6 className="text-secondary">Have a Good Day !</h6>
      </div>
      <div className="col-5">{/* <img src={img} height={300}/> */}</div>
    </div>
  );
};

export default WelcomeUI;
