import React, { useState } from 'react';

const WeatherData = () => {
  const [weatherData] = useState({
    current: {
      temp: 75,
      humidity: 80,
      windSpeed: 12,
      rainfall: 0.2,
      conditions: 'Partly Cloudy'
    },
    forecast: [
      { day: 'Today', high: 78, low: 72, conditions: 'Partly Cloudy', rain: '30%' },
      { day: 'Tomorrow', high: 79, low: 71, conditions: 'Scattered Showers', rain: '60%' },
      { day: 'Wednesday', high: 77, low: 70, conditions: 'Rain', rain: '80%' },
      { day: 'Thursday', high: 76, low: 71, conditions: 'Scattered Showers', rain: '50%' },
      { day: 'Friday', high: 78, low: 72, conditions: 'Partly Cloudy', rain: '20%' },
      { day: 'Saturday', high: 79, low: 73, conditions: 'Mostly Sunny', rain: '10%' },
      { day: 'Sunday', high: 77, low: 71, conditions: 'Scattered Showers', rain: '40%' }
    ]
  });

  const getWeatherIcon = (conditions) => {
    switch (conditions.toLowerCase()) {
      case 'sunny': return '☀️';
      case 'mostly sunny': return '🌤️';
      case 'partly cloudy': return '⛅';
      case 'scattered showers': return '🌦️';
      case 'rain': return '🌧️';
      default: return '☁️';
    }
  };

  return (
    <div className="weather-data">
      <div className="component-card">
        <div className="card-header">
          <div className="card-icon">🌤️</div>
          <div className="card-title">
            Weather Conditions
            <div className="card-subtitle">Waikāne Valley, O'ahu</div>
          </div>
        </div>
        
        {/* Current Conditions */}
        <div className="current-weather">
          <h3>Current Conditions</h3>
          <div className="data-grid">
            <div className="data-item">
              <div className="data-value">{weatherData.current.temp}°F</div>
              <div className="data-label">Temperature</div>
            </div>
            
            <div className="data-item">
              <div className="data-value">{weatherData.current.humidity}%</div>
              <div className="data-label">Humidity</div>
            </div>

            <div className="data-item">
              <div className="data-value">{weatherData.current.windSpeed} mph</div>
              <div className="data-label">Wind Speed</div>
            </div>

            <div className="data-item">
              <div className="data-value">{weatherData.current.rainfall}"</div>
              <div className="data-label">Rainfall (24h)</div>
            </div>
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="weekly-forecast">
          <h3>7-Day Forecast</h3>
          <div className="forecast-grid">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="forecast-item">
                <div className="forecast-day">{day.day}</div>
                <div className="forecast-icon">{getWeatherIcon(day.conditions)}</div>
                <div className="forecast-temps">
                  <span className="high">{day.high}°</span>
                  <span className="low">{day.low}°</span>
                </div>
                <div className="forecast-rain">{day.rain} rain</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;