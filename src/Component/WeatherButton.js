import React from "react";

const WeatherButton = ({ cities }) => {
  console.log("cities?", cities);
  return (
    <div className="WeatherButton">
      <button className="ntn">Current Location</button>
      {cities.map((item) => (
        <button className="btn">{item}</button>
      ))}
    </div>
  );
};

export default WeatherButton;
