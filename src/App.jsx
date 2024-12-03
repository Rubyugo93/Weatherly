import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London'); // Default city
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError('Failed to fetch weather data');
        setLoading(false);
      });
  }, [city]);

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1>Weatherly</h1>
        <input
          type="text"
          value={city}
          onChange={handleChangeCity}
          placeholder="Enter city"
          className="city-input"
        />
      </header>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;

