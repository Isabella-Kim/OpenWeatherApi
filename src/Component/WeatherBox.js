import React from "react";

function WeatherBox({ weather }) {
  console.log("weather");
  return (
    <div className="WeatherBox">
      <h2>지구온난화의 축복이 끝이없네..</h2>
      <p>인간이 미안하다 그치만 아이스크림은 먹고싶어</p>
      <div className="weatherReport">
        <h3>{weather?.name}</h3>
        <h3>최소 {weather?.main.temp_min}도</h3>
        <h3>최대 {weather?.main.temp_max}도</h3>
        <h3>바람 {weather?.wind.speed}</h3>
      </div>
    </div>
  );
}

export default WeatherBox;
