const apiKey = "b236985f4c336814e05e2f30eda3868c";
const weatherDiv = document.getElementById("weather");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === "404") {
        weatherResult.innerHTML = `<p>City not found </p>`;
        return;
      }

      const temp = data.main.temp;
      const condition = data.weather[0].description;
      const icon = data.weather[0].icon;

      weatherResult.innerHTML = `
        <h2>${city}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon" />
        <p><strong>${temp}°C</strong> - ${condition}</p>
      `;
    })
    .catch(error => {
      weatherResult.innerHTML = `<p>Error getting weather </p>`;
      console.error(error);
    });
});
