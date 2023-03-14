import React, { useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
            position: "top",
        },
        title: {
            display: true,
            text: "Data Polling Masuk Per TPS",
        },
    },
};


function ChartTps(props) {
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

    return <Bar options={options} data={data} redraw />;
}

export default ChartTps;
