// components/StreamMonitor.js
import React, { useState, useEffect } from 'react';

const StreamMonitor = () => {
  const [streamData, setStreamData] = useState({
    waikane: {
      height: 0,
      flow: 0,
      status: 'safe',
      lastReading: null
    },
    waihole: {
      height: 0,
      flow: 0,
      status: 'safe',
      lastReading: null
    }
  });

  // Mock data generation for demonstration
  useEffect(() => {
    const generateMockData = () => {
      const now = new Date();
      
      // Generate realistic stream height data (0-15 feet typical range)
      const waikaneHeight = Math.max(0, Math.sin(now.getTime() / 2000000) * 8 + 4 + Math.random() * 2);
      const waiholeHeight = Math.max(0, Math.sin(now.getTime() / 1800000) * 6 + 3.5 + Math.random() * 1.5);
      
      // Generate flow rates (cubic feet per second)
      const waikaneFlow = waikaneHeight * 15 + Math.random() * 20;
      const waiholeFlow = waiholeHeight * 12 + Math.random() * 15;
      
      // Determine status based on height
      const getStatus = (height) => {
        if (height > 10) return 'danger';
        if (height > 7) return 'warning';
        return 'safe';
      };

      setStreamData({
        waikane: {
          height: waikaneHeight,
          flow: waikaneFlow,
          status: getStatus(waikaneHeight),
          lastReading: now
        },
        waihole: {
          height: waiholeHeight,
          flow: waiholeFlow,
          status: getStatus(waiholeHeight),
          lastReading: now
        }
      });

      // Show emergency banner if either stream is high
      const emergencyBanner = document.getElementById('emergencyBanner');
      if (emergencyBanner) {
        if (waikaneHeight > 10 || waiholeHeight > 10) {
          emergencyBanner.style.display = 'block';
        } else {
          emergencyBanner.style.display = 'none';
        }
      }
    };

    // Initial load
    generateMockData();
    
    // Update every 30 seconds
    const interval = setInterval(generateMockData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'danger': return '🚨';
      case 'warning': return '⚠️';
      default: return '✅';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'danger': return 'HIGH WATER - AVOID AREA';
      case 'warning': return 'Elevated levels - Use caution';
      default: return 'Normal levels';
    }
  };

  const formatTime = (date) => {
    if (!date) return '--';
    return date.toLocaleString('en-US', {
      timeZone: 'Pacific/Honolulu',
      timeStyle: 'short'
    });
  };

  return (
    <div className="stream-monitor">
      {/* Waikāne Stream Monitor */}
      <div className="component-card">
        <div className="card-header">
          <div className="card-icon">🏞️</div>
          <div className="card-title">Waikāne Stream Monitor</div>
        </div>
        
        <div className="data-grid">
          <div className="data-item">
            <div className="data-value">
              {streamData.waikane.height.toFixed(1)} ft
            </div>
            <div className="data-label">Current Height</div>
          </div>
          
          <div className="data-item">
            <div className="data-value">
              {streamData.waikane.flow.toFixed(0)} cfs
            </div>
            <div className="data-label">Flow Rate</div>
          </div>
          
          <div className="data-item">
            <div className="data-value">
              {formatTime(streamData.waikane.lastReading)}
            </div>
            <div className="data-label">Last Reading</div>
          </div>
          
          <div className="data-item">
            <div className="data-value">
              {getStatusIcon(streamData.waikane.status)}
            </div>
            <div className="data-label">Status</div>
          </div>
        </div>
        
        <div className={`status-indicator status-${streamData.waikane.status}`}>
          {getStatusIcon(streamData.waikane.status)} {getStatusText(streamData.waikane.status)}
        </div>
        
        {/* Live Chart Placeholder */}
        <div className="chart-placeholder">
          📊 Waikāne Stream Height Chart (24 hours)
          <br />
          <small>Real-time USGS gauge data visualization</small>
        </div>
      </div>

      {/* Waihōle Stream Monitor */}
      <div className="component-card">
        <div className="card-header">
          <div className="card-icon">🌊</div>
          <div className="card-title">Waihōle Stream Monitor</div>
        </div>
        
        <div className="data-grid">
          <div className="data-item">
            <div className="data-value">
              {streamData.waihole.height.toFixed(1)} ft
            </div>
            <div className="data-label">Current Height</div>
          </div>
          
          <div className="data-item">
            <div className="data-value">
              {streamData.waihole.flow.toFixed(0)} cfs
            </div>
            <div className="data-label">Flow Rate</div>
          </div>
          
          <div className="data-item">
            <div className="data-value">
              {formatTime(streamData.waihole.lastReading)}
            </div>
            <div className="data-label">Last Reading</div>
          </div>
          
          <div className="data-item">
            <div className="data-value">
              {getStatusIcon(streamData.waihole.status)}
            </div>
            <div className="data-label">Status</div>
          </div>
        </div>
        
        <div className={`status-indicator status-${streamData.waihole.status}`}>
          {getStatusIcon(streamData.waihole.status)} {getStatusText(streamData.waihole.status)}
        </div>
        
        {/* Live Chart Placeholder */}
        <div className="chart-placeholder">
          📊 Waihōle Stream Height Chart (24 hours)
          <br />
          <small>Real-time USGS gauge data visualization</small>
        </div>
      </div>

      {/* Combined Overview */}
      <div className="component-card">
        <div className="card-header">
          <div className="card-icon">📊</div>
          <div className="card-title">Stream Comparison Overview</div>
        </div>
        
        <div className="comparison-grid">
          <div className="comparison-item">
            <h4>🏞️ Waikāne Stream</h4>
            <div className="comparison-stats">
              <span className="stat">Height: {streamData.waikane.height.toFixed(1)} ft</span>
              <span className="stat">Flow: {streamData.waikane.flow.toFixed(0)} cfs</span>
              <span className={`stat status-${streamData.waikane.status}`}>
                {getStatusIcon(streamData.waikane.status)} {streamData.waikane.status.toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="comparison-item">
            <h4>🌊 Waihōle Stream</h4>
            <div className="comparison-stats">
              <span className="stat">Height: {streamData.waihole.height.toFixed(1)} ft</span>
              <span className="stat">Flow: {streamData.waihole.flow.toFixed(0)} cfs</span>
              <span className={`stat status-${streamData.waihole.status}`}>
                {getStatusIcon(streamData.waihole.status)} {streamData.waihole.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        
        {/* Combined Chart Placeholder */}
        <div className="chart-placeholder">
          📊 Combined Stream Heights Comparison
          <br />
          <small>Real-time comparison of both streams</small>
        </div>
      </div>

      {/* Stream Information */}
      <div className="component-card">
        <div className="card-header">
          <div className="card-icon">ℹ️</div>
          <div className="card-title">Stream Information</div>
        </div>
        
        <div className="info-grid">
          <div className="info-section">
            <h4>🏞️ Waikāne Stream</h4>
            <ul className="info-list">
              <li><strong>Location:</strong> Waikāne Valley, Ko'olau Range</li>
              <li><strong>Length:</strong> ~8 miles</li>
              <li><strong>Drainage Area:</strong> 14.2 square miles</li>
              <li><strong>Flood Stage:</strong> 10.0 ft</li>
              <li><strong>Normal Range:</strong> 2.0 - 6.0 ft</li>
            </ul>
          </div>
          
          <div className="info-section">
            <h4>🌊 Waihōle Stream</h4>
            <ul className="info-list">
              <li><strong>Location:</strong> Waihōle Valley, Ko'olau Range</li>
              <li><strong>Length:</strong> ~6 miles</li>
              <li><strong>Drainage Area:</strong> 10.8 square miles</li>
              <li><strong>Flood Stage:</strong> 8.0 ft</li>
              <li><strong>Normal Range:</strong> 1.5 - 5.0 ft</li>
            </ul>
          </div>
        </div>
        
        <div className="alert-info">
          <i className="fas fa-info-circle"></i>
          <div>
            <strong>Safety Notice:</strong> These streams can rise rapidly during heavy rainfall. 
            Never attempt to cross flooded streams. When in doubt, turn around and find an alternate route.
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamMonitor;