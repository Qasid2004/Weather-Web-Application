const apiKey = "b236985f4c336814e05e2f30eda3868c";
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", fetchWeather);

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") fetchWeather();
});

function fetchWeather() {
    const city = cityInput.value.trim();
    if (city === "") return;

    weatherResult.innerHTML = `<p>Fetching data...</p>`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        if (data.cod === "404") {
            weatherResult.innerHTML = `<p>City not found. Try again!</p>`;
            return;
        }

        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherResult.innerHTML = `
            <div class="weather-info">
                <h2>${data.name}</h2>
                <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="icon" />
                <span class="temp">${temp}°C</span>
                <p class="condition">${condition}</p>
            </div>
        `;
    })
    .catch(() => {
        weatherResult.innerHTML = `<p>Check your connection.</p>`;
    });
}
