import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { useTheme } from '../../contexts/ThemeContext';

const WeeklySpendingChart = ({ weeklyData }) => {
  const chartRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!weeklyData) return;
    const chartInstance = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: weeklyData.labels,
        datasets: [{
          label: 'Spending',
          data: weeklyData.data,
          fill: false,
          borderColor: '#10B981',
          tension: 0.4,
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
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color:  '#9CA3AF'  },
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color:  '#9CA3AF' },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [theme, weeklyData]);

  return <canvas ref={chartRef} />;
};

export default WeeklySpendingChart;
