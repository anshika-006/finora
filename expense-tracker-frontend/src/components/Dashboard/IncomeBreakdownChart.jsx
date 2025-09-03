import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { useTheme } from '../../contexts/ThemeContext';

const IncomeBreakdownChart = ({ breakdown }) => {
  const chartRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!breakdown) return;
    const labels = breakdown.map(b => b.name);
    const data = breakdown.map(b => b.amount);
    const colors = ['#10B981', '#3B82F6', '#F59E0B', '#6B7280', '#6366F1', '#F472B6', '#F87171', '#34D399'];

    const chartInstance = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors.slice(0, labels.length),
          borderColor:'#1F2937' ,
          borderWidth: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#9CA3AF' ,
              boxWidth: 12,
              padding: 20,
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [theme, breakdown]);

  return <canvas ref={chartRef} />;
};

export default IncomeBreakdownChart;
