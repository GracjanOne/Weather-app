let lat;
let long;
const apiKey = "6461d175d06df097e6c26912bca370ea";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    getWeather();
  });
}

function getWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      updateWeatherData(data);
    });
}

function updateWeatherData(data) {
  const city = data.name;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const cloudiness = data.clouds.all;
  const windSpeed = data.wind.speed;
  const weather = data.weather[0].description;
  let weatherIcon = data.weather[0].icon;
  document.getElementById(
    "weather-image"
  ).src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
  document.getElementById("location").innerHTML += city;
  document.getElementById("temp").innerHTML += temperature + "℃";
  document.getElementById("humid").innerHTML += humidity + "%";
  document.getElementById("press").innerHTML += pressure + " Pa";
  document.getElementById("cloudiness").innerHTML += cloudiness + "%";
  document.getElementById("wind-speed").innerHTML += windSpeed + " km/h";
  document.getElementById("weather").innerHTML = weather;
}
