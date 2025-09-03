
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { useTheme } from '../../contexts/ThemeContext';


const WeeklyIncomeChart = ({ weeklyData }) => {
  const chartRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!weeklyData) return;
    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: weeklyData.labels,
        datasets: [
          {
            label: 'Income',
            data: weeklyData.data,
            backgroundColor: 'rgba(34,197,94,0.7)',
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#9CA3AF'  },
            grid: { color:  'rgba(255,255,255,0.1)'  },
          },
          x: {
            ticks: { color: '#9CA3AF'  },
            grid: { color:'rgba(255,255,255,0.1)'},
          },
        },
      },
    });
    return () => {
      chartInstance.destroy();
    };
  }, [theme, weeklyData]);

  return <canvas ref={chartRef} style={{ height: 160 }} />;
};

export default WeeklyIncomeChart;
