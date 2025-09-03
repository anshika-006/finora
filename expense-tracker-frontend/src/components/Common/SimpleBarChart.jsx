import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { useTheme } from '../../contexts/ThemeContext';

const SimpleBarChart = ({ labels, data, label = '' }) => {
  const chartRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!labels || !data) return;
    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: '#3B82F6',
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.1)' },
            ticks: { color: '#9CA3AF'  },
          },
          y: {
            grid: { color:'rgba(255,255,255,0.1)' },
            ticks: { color: '#9CA3AF' },
          },
        },
      },
    });
    return () => chartInstance.destroy();
  }, [theme, labels, data, label]);

  return <canvas ref={chartRef} style={{ width: '100%', height: '180px' }} />;
};

export default SimpleBarChart;
