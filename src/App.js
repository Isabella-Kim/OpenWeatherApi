import React, { useState, useEffect, CSSProperties } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
/// css
import "./reset.css";
import "./App.css";
// component
import WeatherBox from "./Component/WeatherBox";
import WeatherButton from "./Component/WeatherButton";
/*
이 코드는 navigator.geolocation.getCurrentPosition 함수를 사용하여 브라우저의 위치 정보를 가져옵니다. useEffect 훅을 사용하여 컴포넌트가 마운트될 때 한 번만 getCurrentLocation 함수를 호출하도록 설정했습니다. 가져온 위치 정보는 콘솔에 출력됩니다.
​
이 코드를 이해하고 실행하려면 React 애플리케이션의 구조와 기본 동작 방식에 대한 이해가 필요합니다. 컴포넌트의 내용을 추가하여 원하는 기능을 구현하고 화면에 출력할 수 있습니다.
​
*/
// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨 화씨 날씨상태가 보인다
// 3. 5개의 버튼이 있다. 1개는 현재위치날씨, 4개는 다른도시의 날씨
// 4. 도시 버튼을 클릴할 때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 불러오는 동안 로딩스피너가 돌아간다

const cities = ["Seoul", "Daegu", "Busan", "Jeju"];

function App() {
  // 로딩스피너 활용을 위한 useState 선언
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#36d7b7");

  // 현재 위치 정보를 가져와서 출력하는 함수
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeaterByCurrentLocation(lat, lon);
    });
  };
  const getWeaterByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9036d38eec3e4107acb42b41bebc16e0&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    setWeather(data);
  };

  const getWeatherByCity = async () => {
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit={limit}&appid=9036d38eec3e4107acb42b41bebc16e0`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    setWeather(data);
  };

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때, 현재 위치 정보를 가져옴
    getCurrentLocation();
    if (city == null) {
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className="wrap">
      {/* 로딩 스피너 */}
      <PacmanLoader
        className="pacman"
        color={color}
        loading={loading}
        //cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="mainContainer">
        {/* 날씨정보 */}
        <div className="wrapWeather">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} />
        </div>
      </div>
    </div>
  );
}
export default App;
