import React from 'react';

const WeatherData = () => {
  return (
    <div className="weather-data">
      <div className="component-card">
        <div className="card-header">
          <div className="card-icon">🌤️</div>
          <div className="card-title">Weather Conditions</div>
        </div>
        
        <div className="data-grid">
          <div className="data-item">
            <div className="data-value">75°F</div>
            <div className="data-label">Temperature</div>
          </div>
          
          <div className="data-item">
            <div className="data-value">80%</div>
            <div className="data-label">Humidity</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;