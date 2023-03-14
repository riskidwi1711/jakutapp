import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Data Polling Masuk Per TPS',
    },
  },
};

const labels = ['TPS 1', 'TPS 2', 'TPS 3', 'TPS 4', 'TPS 5', 'TPS 6'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Calon 1',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#CFF5E7',
    },
    {
      label: 'Calon 2',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#A0E4CB',
    },
    {
      label: 'Calon 3',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#A0E4CB',
    },{
      label: 'Calon 4',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#59C1BD',
    },{
      label: 'Calon 5',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#0D4C92',
    }
  ],
};

export function ChartBar() {
  return <Bar options={options} data={data} />;
}