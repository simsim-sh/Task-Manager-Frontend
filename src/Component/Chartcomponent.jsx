import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = () => {
  const data = {
    labels: ['Completed', 'Pending', 'In Progress'],
    datasets: [
      {
        label: 'Tasks Status',
        data: [12, 8, 5,9 ,4], // Example data
        backgroundColor: [
          '#4CAF50', // Green for Completed
          '#FF9800', // Orange for Pending
          '#2196F3', // Blue for In Progress
          '#fe777b', // Blue for In Progress
          '#556CD6', // Blue for In Progress
        ],
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Project Status</h2>
      <div className="h-[220px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
