import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export function ChartPie(props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Data Polling Masuk Per TPS",
            },
        },
    };

    const labels = props.data[0];

    const data = {
        labels,
        datasets: [
            {
                label: "Calon 1",
                data: props.data[1],
                backgroundColor: ["#59C1BD", "#A0E4CB"],
            },
        ],
    };

    console.log(props.data);
    return props.data[0].length < 1 ? (
        <div className="d-flex justify-content-center align-items-center">
            Tidak Ada Data
        </div>
    ) : (
        <Pie redraw options={options} data={data} />
    );
}
