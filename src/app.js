let currentLink = "celsius-link";
function convertUnit(event) {
  event.preventDefault();
  if (currentLink === event.target.id) {
    return;
  } else {
    let currentTemperature = document.querySelector("#current-temperature");
    let forecastArray = [
      document.querySelector("#forecast-temperature-max0"),
      document.querySelector("#forecast-temperature-max1"),
      document.querySelector("#forecast-temperature-max2"),
      document.querySelector("#forecast-temperature-max3"),
      document.querySelector("#forecast-temperature-max4"),
      document.querySelector("#forecast-temperature-min0"),
      document.querySelector("#forecast-temperature-min1"),
      document.querySelector("#forecast-temperature-min2"),
      document.querySelector("#forecast-temperature-min3"),
      document.querySelector("#forecast-temperature-min4"),
    ];
    let temperature = parseInt(currentTemperature.innerHTML, 10);
    let tempToDisplay;
    if (event.target.id === "fahrenheit-link") {
      currentLink = "fahrenheit-link";
      tempToDisplay = calculateFahrenheit(temperature);
      forecastArray.forEach(
        (forecast) =>
          (forecast.innerHTML = calculateFahrenheit(
            parseInt(forecast.innerHTML, 10)
          ))
      );
    } else if (event.target.id === "celsius-link") {
      currentLink = "celsius-link";
      tempToDisplay = calculateCelsius(temperature);
      forecastArray.forEach(
        (forecast) =>
          (forecast.innerHTML = calculateCelsius(
            parseInt(forecast.innerHTML, 10)
          ))
      );
    }
    currentTemperature.innerHTML = tempToDisplay;
  }
}

function calculateFahrenheit(temperature) {
  return Math.round(temperature * 1.8 + 32);
}

function calculateCelsius(temperature) {
  return Math.round((temperature - 32) / 1.8);
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

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${
    coordinates.lat
  }&lon=${coordinates.lon}&appid=${getKey()}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function getDataFromUrl(apiUrl) {
  axios
    .get(apiUrl)
    .then(function (response) {
      setTemperature(response.data.main.temp);
      setCity(response.data.name);
      setDate(response.data.dt, response.data.timezone);
      setWeather(response.data.weather[0].description);
      setHumidity(response.data.main.humidity);
      setWind(response.data.wind.speed);
      setIcon(response.data.weather[0].icon);
      getForecast(response.data.coord);
    })
    .catch(showError);
}

function setDate(dt, timezone) {
  let h2 = document.querySelector("h2");
  let now = new Date(dt * 1000 + (timezone - 3240) * 1000);

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

function setWeather(description) {
  let newWeather = document.querySelector("#current-weather");
  newWeather.innerHTML = description;
}

function setHumidity(humidity) {
  let newHumidity = document.querySelector("#current-humidity");
  newHumidity.innerHTML = humidity;
}

function setWind(wind) {
  let windSpeed = document.querySelector("#current-wind");
  windSpeed.innerHTML = Math.round(wind);
}

function setIcon(icon) {
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.list;

  let forecastWeather = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let forecastIndex = 0;
  forecast.forEach(function (forecastDay, index) {
    if (index === 0 || index % 8 === 0) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col">
              <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
              <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
              <div class="forecast-temperature">
                <span class="forecastMaxTemp"   id="forecast-temperature-max${forecastIndex}">${Math.round(
          forecastDay.main.temp_max
        )}</span><span>° </span
                ><span class="forecastMinTemp"   id="forecast-temperature-min${forecastIndex}">${Math.round(
          forecastDay.main.temp_min
        )}</span><span>°</span
                >
              </div>
                                  
          </div>`;
      forecastIndex += 1;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastWeather.innerHTML = forecastHTML;
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

let load = document.querySelector("#load");
load.addEventListener("DOMContentLoaded", getWeatherFromUrl("Oslo"));
