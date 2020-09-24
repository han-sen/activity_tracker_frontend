import React, { useEffect } from "react";
import Chart from "chart.js";

const BarChart = () => {
    const prepareData = (data) => {
        console.log(data);
        const chartData = {
            labels: [],
            datasets: [
                {
                    label: "Hours Spent",
                    data: [],
                },
            ],
        };

        data.forEach((activity) => {
            chartData.labels.push(`${activity.description.slice(0, 15)}...`);
            chartData.datasets[0].data.push(activity.time_spent);
        });
        return chartData;
    };
    const createChart = (data) => {
        const ctx = document.querySelector("#activities_chart");
        return new Chart(ctx, {
            type: "line",
            data: data,
        });
    };
    const getData = () => {
        fetch("https://arete-time-tracker-backend.herokuapp.com/activities/")
            .then((response) => response.json())
            .then((jData) => prepareData(jData))
            .then((data) => createChart(data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Activities / Time Spent</h1>
            <canvas id="activities_chart" width="300" height="100"></canvas>
        </>
    );
};

export default BarChart;
