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



function ChartSurvey(props) {

     const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: props.title,
            },
        },
    };

    let color = ["#0D4C92", "#59C1BD", "#A0E4CB", "#A0E4CB", "#CFF5E7"];

    const data = {
        labels: [],
        datasets: [
            {
                label: props.title,
                data: [],
                backgroundColor: [],
            },
        ],
    };

    useEffect(() => {
        if (props.datas) {
            props.datas.map((e, index) => data.labels.push(e[0]));
            props.datas.map((e, index) => data.datasets[0].data.push(e[1]));
            props.datas.map((e, index) =>
                data.datasets[0].backgroundColor.push(color[index])
            );
        }
    });

    return <Bar options={options} data={data} redraw />;
}

export default ChartSurvey;
