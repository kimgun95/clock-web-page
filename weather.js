const weatherTemp = document.querySelector(".js-weatherTemp"),
  weatherLoc = document.querySelector(".js-weatherLoc");

// api는 다른 서버로 부터 손쉽게 데이터를 가지고 올 수 있는 수단 and 컴퓨터 끼리 소통하기 위해 만든 수단
// js를 이용하여 특정 url을 호출하는 법? js는 웹사이트에 request를 보내 respond한 data를 사용
// 가져온 data는 refresh없이도 나의 웹사이트에 적용 가능
const API_KEY = "de452b6427131d8dee62058f33bef99a";

const COORDS = "coords";

function getWeather(lat, log) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      const temperature = json.main.temp;
      const location = json.name;

      weatherTemp.innerText = `${temperature}ºC`;
      weatherLoc.innerText = `${location}`;

      weatherTemp.classList.add("temperature");
      weatherLoc.classList.add("location");

      // weather.innerText = `${temperature}ºC | ${location}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// Object(객체)안에서 변수명과 value값의 이름이 같을때는 하나로 축약할 수 있음
function handleGeoSuccess(position) {
  // latitude=위도, longitude=경도
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
}

function handleGeoError() {
  console.log("I cant find a position");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseLoadedCoords = JSON.parse(loadedCoords);
    getWeather(parseLoadedCoords.latitude, parseLoadedCoords.longitude);
  }
}

// 위치(좌표)를 로드해온다
function init() {
  loadCoords();
}

init();
