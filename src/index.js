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

function updateWeatherInfo(response) {
  let currentTemperature = document.querySelector(".current-temperature");
  let h1 = document.querySelector("h1");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector(".current-temperature-icon");
  let timeElement = document.querySelector(".time");
  let date = new Date(response.data.time * 1000);

  let weatherCondition = response.data.condition.icon;
  let iconPath = iconMapping[weatherCondition];

  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  timeElement.innerHTML = formatDate(date);

  h1.innerHTML = response.data.city;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  icon.innerHTML = `<img src="${iconPath}" alt="${weatherCondition} icon"/>`;

  getForecast(response.data.city);
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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherInfo);
}

function searchCitySubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#citySearchField");
  searchCity(inputCity.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "fe7b5aa15d53a1t7b432406eac34f4oa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      let weatherCondition = day.condition.icon;
      let iconPath = iconMapping[weatherCondition];
      forecastHtml += `
        <div class="forcastWeather">
          <div class="forcastDay">${formatDay(day.time)}</div>
          <div>
            <img src="${iconPath}" class="forcastIcon" alt="${weatherCondition} icon" />
          </div>
          <div class="forcastTemps">
            <span class="forcastTempMax">${Math.round(
              day.temperature.maximum
            )}°</span>
            -
            <span class="forcastTempMin">${Math.round(
              day.temperature.minimum
            )}°</span>
          </div>
        </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let submitSearch = document.querySelector("#searchButton");
submitSearch.addEventListener("click", searchCitySubmit);

searchCity("Hamburg");
