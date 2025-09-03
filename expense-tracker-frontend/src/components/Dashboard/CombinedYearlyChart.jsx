import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { useTheme } from '../../contexts/ThemeContext';

const CombinedYearlyChart = ({ expenseData, incomeData, labels }) => {
  const chartRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!labels || !expenseData || !incomeData) return;
    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Expenses',
            data: expenseData,
            backgroundColor: 'rgba(22,163,74,0.7)', 
            borderRadius: 6,
          },
          {
            label: 'Income',
            data: incomeData,
            backgroundColor: 'rgba(74,222,128,0.7)', 
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#9CA3AF',
            },
          },
        },
        scales: {
          x: {
            grid: { color:  'rgba(255,255,255,0.1)' },
            ticks: { color: '#9CA3AF' },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.1)' },
            ticks: { color: '#9CA3AF'},
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

export default CombinedYearlyChart;
