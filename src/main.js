// Import the API key from the environment variable
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

// Function to fetch weather data
const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      return {
        temperature: data.main.temp,
        weather: data.weather[0].description,
        city: data.name,
      };
    } else {
      throw new Error("City not found or invalid.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

// Get the DOM elements
const getWeatherButton = document.querySelector("#getWeatherBtn");
const cityInput = document.querySelector("#cityInput");
const weatherInfo = document.querySelector("#weatherInfo");

// Event listener for the button click
getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value.trim(); // Get the city from the input field
  if (city) {
    fetchWeather(city).then((weather) => {
      if (weather) {
        weatherInfo.innerHTML = `
          <p><strong>City:</strong> ${weather.city}</p>
          <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
          <p><strong>Weather:</strong> ${weather.weather}</p>
        `;
      } else {
        weatherInfo.innerHTML = `<p>City not found or invalid.</p>`;
      }
    });
  } else {
    weatherInfo.innerHTML = `<p>Please enter a city name.</p>`;
  }
});
