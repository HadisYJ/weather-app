function updateWeatherInfo(response) {
  let currentTemperature = document.querySelector(".current-temperature");
  let h1 = document.querySelector("h1");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector(".current-temperature-icon");
  let timeElement = document.querySelector(".time");
  let date = new Date(response.data.time * 1000);

  let iconMapping = {
    "clear-sky-day": "Images/Sun day.svg",
    "thunderstorm-day": "Images/Thunder day.svg",
    "few-clouds-day": "Images/few clouds day.svg",
    "shower-rain-day": "Images/rain day.svg",
    "rain-day": "Images/sun rain day.svg",
    "broken-clouds-day": "Images/broken clouds day.svg",
    "overcast-clouds-day": "Images/broken clouds day.svg",
    "scattered-clouds-day": "Images/few clouds day.svg",
    "snow-day": "Images/snow day.svg",
    "mist-day": "Images/mist day.svg",
    "clear-sky-night": "Images/Moon.svg",
    "thunderstorm-night": "Images/Thunder night.svg",
    "few-clouds-night": "Images/few clouds night.svg",
    "shower-rain-night": "Images/rain night.svg",
    "rain-night": "Images/rain night.svg",
    "broken-clouds-night": "Images/few clouds night.svg",
    "overcast-clouds-night": "Images/Moon clouds night.svg",
    "scattered-clouds-night": "Images/Moon clouds night.svg",
    "snow-night": "Images/snow night.svg",
    "mist-night": "Images/mist night.svg",
  };
  let weatherCondition = response.data.condition.icon;
  let iconPath = iconMapping[weatherCondition];

  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  timeElement.innerHTML = formatDate(date);

  h1.innerHTML = response.data.city;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  icon.innerHTML = `<img src="${iconPath}" alt="${weatherCondition} icon"/>`;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "fe7b5aa15d53a1t7b432406eac34f4oa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeatherInfo);
}

function searchCitySubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#citySearchField");
  searchCity(inputCity.value);
}
let submitSearch = document.querySelector("#searchButton");
submitSearch.addEventListener("click", searchCitySubmit);

searchCity("Hamburg");
