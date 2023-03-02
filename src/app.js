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
