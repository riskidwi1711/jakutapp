import React from "react";
import {
    Chart as ChartJS,
    PointElement,
    ArcElement,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    LineElement,
    CategoryScale,
    PointElement,
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
            position: "top",
        },
        title: {
            display: true,
            text: "Data Polling Masuk Per menit",
        },
    },
};

const labels = ["1", "2", "3", "4", "5", "6"];

export const data = {
    labels,
    datasets: [
        {
            label: "Calon 1",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "#CFF5E7",
        },
        {
            label: "Calon 2",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "#A0E4CB",
        },
        {
            label: "Calon 3",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "#A0E4CB",
        },
        {
            label: "Calon 4",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "#59C1BD",
        },
        {
            label: "Calon 5",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "#0D4C92",
        },
    ],
};



function ChartData(props) {
    return <Line options={options} data={data} />;
}

export default ChartData;
