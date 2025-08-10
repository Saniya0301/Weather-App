const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

const emojiMap = {
    clouds: "☁️",
    clear: "☀️",
    rain: "🌧",
    drizzle: "🌦",
    thunderstorm: "⛈",
    snow: "❄️",
    mist: "🌫",
    haze: "🌫",
    smoke: "🌫",
    dust: "🌫",
    fog: "🌫",
    sand: "🌫",
    ash: "🌋",
    squall: "💨",
    tornado: "🌪"
};

async function checkWeather(city) {
    const api_key = "api_key";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === "404") {
            location_not_found.hidden = false;
            weather_body.hidden = true;
            return;
        }

        location_not_found.hidden = true;
        weather_body.hidden = false;

        const condition = weather_data.weather[0].main.toLowerCase();
        const emoji = emojiMap[condition] || "🌈";

        temperature.innerHTML = `${emoji} ${Math.round(weather_data.main.temp - 273.15)} <sup>°C</sup>`;
        description.innerHTML = `${emoji} ${weather_data.weather[0].description}`;
        humidity.innerHTML = `💧 ${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `🌬 ${weather_data.wind.speed} Km/H`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "/assets/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "/assets/clear.png";
                break;
            case 'Rain':
                weather_img.src = "/assets/rain.png";
                break;
            case 'Mist':
                weather_img.src = "/assets/mist.png";
                break;
            case 'Snow':
                weather_img.src = "/assets/snow.png";
                break;
            default:
                weather_img.src = "/assets/clear.png";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener('click', () => {
    if (inputBox.value.trim() !== "") {
        checkWeather(inputBox.value);
    }
});

