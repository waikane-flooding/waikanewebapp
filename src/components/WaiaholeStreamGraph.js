import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

const WaiaholeStreamGraph = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/waiahole_stream')
      .then(res => res.json())
      .then(streamData => {
        const sortedData = streamData
          .filter(d => d.ft != null && d.DateTime)
          .sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime));

        const dataPoints = sortedData.map(item => ({
          x: new Date(item.DateTime),
          y: item.ft
        }));

        const latestPoint = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1] : null;

        const now = new Date();
        const xMin = new Date(now.getTime() - 48 * 60 * 60 * 1000);
        const xMax = new Date(now.getTime() + 3 * 60 * 60 * 1000);

        const data = {
          datasets: [{
            label: 'Stream Height (ft)',
            data: dataPoints,
            borderColor: 'rgba(54, 162, 235, 0.8)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            tension: 0.1,
            fill: true,
            spanGaps: true,
            pointRadius: 0,
            pointStyle: 'rect',
            pointHitRadius: 10
          }, {
            label: 'Latest Reading',
            data: latestPoint ? [latestPoint] : [],
            type: 'scatter',
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
            pointStyle: 'triangle',
            radius: 8,
            order: 1
          }]
        };

        const config = {
          type: 'line',
          data: data,
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Waiahole Stream Height - The Last 2 Days',
                font: { size: 16, color: 'black' },
                color: 'black'
              },
              legend: {
                display: true,
                position: 'top',
                labels: {
                  color: 'black',
                  usePointStyle: true,
                }
              },
              annotation: {
                annotations: {
                  yellowLine: {
                    type: 'line',
                    yMin: 12,
                    yMax: 12,
                    borderColor: '#FFC107',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    label: {
                      content: '12 ft',
                      enabled: true,
                      position: 'start'
                    }
                  },
                  redLine: {
                    type: 'line',
                    yMin: 16.4,
                    yMax: 16.4,
                    borderColor: 'red',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    label: {
                      content: '16.4 ft',
                      enabled: true,
                      position: 'start'
                    }
                  }
                }
              }
            },
            scales: {
              x: {
                type: 'time',
                min: xMin,
                max: xMax,
                time: {
                  unit: 'hour',
                  displayFormats: {
                    hour: 'MMM d, h:mm a'
                  }
                },
                title: {
                  display: true,
                  text: 'Time',
                  color: 'black'
                },
                ticks: {
                  color: 'black',
                  maxRotation: 45,
                  minRotation: 45,
                  autoSkip: true,
                  callback: function(value) {
                    const date = new Date(value);
                    const hour = date.getHours();
                    return hour % 6 === 0 ? date.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    }) : null;
                  }
                },
                grid: { color: 'rgba(0, 0, 0, 0.1)' }
              },
              y: {
                beginAtZero: true,
                max: 22,
                title: {
                  display: true,
                  text: 'Height (ft)',
                  color: 'black'
                },
                ticks: { color: 'black', stepSize: 2 },
                grid: { color: 'rgba(0, 0, 0, 0.1)' }
              }
            }
          }
        };

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, config);
      })
      .catch(err => console.error("Failed to load stream data", err));

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: '800px', height: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', margin: '0 auto' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default WaiaholeStreamGraph;
