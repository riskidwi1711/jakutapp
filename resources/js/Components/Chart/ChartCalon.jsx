

import React, { useEffect } from 'react';
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

const labels = ['Data Polling Calon'];

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


function ChartCalon(props) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  let color = ["#0D4C92", "#59C1BD", "#A0E4CB", "#A0E4CB", "#CFF5E7"];

    const data = {
        labels : '',
        datasets: [],
    };

    useEffect(() => {
        props.datas.data.map((e, index) =>
            data.datasets.push({
                label: e[0],
                data: e[1],
                backgroundColor:
                    color[index],
            })
        );

        data.labels = props.datas.label;
    });
    return (
        <Bar options={options} data={data} redraw/>
    );
}

export default ChartCalon;