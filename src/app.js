let currentLink = "celsius-link";
function convertUnit(event) {
  event.preventDefault();
  if (currentLink === event.target.id) {
    return;
  } else {
    let currentTemperature = document.querySelector("#current-temperature");
    let temperature = parseInt(currentTemperature.innerHTML, 10);
    let tempToDisplay;
    if (event.target.id === "fahrenheit-link") {
      currentLink = "fahrenheit-link";
      tempToDisplay = Math.round(temperature * 1.8 + 32);
    } else if (event.target.id === "celsius-link") {
      currentLink = "celsius-link";
      tempToDisplay = Math.round((temperature - 32) / 1.8);
    }
    currentTemperature.innerHTML = tempToDisplay;
  }
}

let celcius = document.querySelector("#celsius-link");
celcius.addEventListener("click", convertUnit);
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertUnit);
let newCity = document.querySelector("#your-city");

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#your-city");
  if (city.value.trim() !== "") {
    getWeatherFromUrl(city.value);
  }
  city.value = "";
}

function getKey() {
  return "6319d62dd258df6cd5093107663545ff";
}
function getUnits() {
  if (currentLink === "celsius-link") {
    return "metric";
  } else {
    return "imperial";
  }
}
function getWeatherFromUrl(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${getKey()}&units=${getUnits()}`;
  getDataFromUrl(apiUrl);
}

function getDataFromUrl(apiUrl) {
  axios
    .get(apiUrl)
    .then(function (response) {
      setTemperature(response.data.main.temp);
      setCity(response.data.name);
      setDate(response.data.dt);
    })
    .catch(showError);
}

function setDate(dt, timezone) {
  let h2 = document.querySelector("h2");
  let now = new Date(dt * 1000);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  h2.innerHTML = `${day} ${hours}:${minutes}`;
}

function showError() {
  alert("City not found!");
}
function setCity(city) {
  let newCity = document.querySelector("#city-name");
  newCity.innerHTML = city;
}
function setTemperature(temp) {
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(temp);
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);
function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentWeatherFromUrl);
}

function getCurrentWeatherFromUrl(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${getUnits()}&appid=${getKey()}`;
  getDataFromUrl(apiUrl);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrent);
