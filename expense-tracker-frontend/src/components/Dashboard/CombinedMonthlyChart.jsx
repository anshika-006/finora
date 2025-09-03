import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { useTheme } from '../../contexts/ThemeContext';

const CombinedMonthlyChart = ({ expenseData, incomeData, labels }) => {
  const chartRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!labels || !expenseData || !incomeData) return;
    const chartInstance = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Expenses',
            data: expenseData,
            borderColor: '#16A34A', 
            backgroundColor: 'rgba(22,163,74,0.15)',
            fill: false,
            tension: 0.4,
            pointBackgroundColor: '#166534',
            pointBorderColor: '#166534',
          },
          {
            label: 'Income',
            data: incomeData,
            borderColor: '#4ADE80',
            backgroundColor: 'rgba(74,222,128,0.15)',
            fill: false,
            tension: 0.4,
            pointBackgroundColor: '#22C55E',
            pointBorderColor: '#22C55E',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#9CA3AF' ,
            },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.1)' },
            ticks: { color:  '#9CA3AF'  },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.1)'},
            ticks: { color:  '#9CA3AF' },
          },
        },
      },
    });
    return () => {
      chartInstance.destroy();
    };
  }, [theme, expenseData, incomeData, labels]);

  return <canvas ref={chartRef} style={{ height: 200 }} />;
};

export default CombinedMonthlyChart;
