import React, { useState, useEffect } from 'react';
import classes from './IMTGraph.module.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Time from '../../../../API/Time';

const IMTGraph = (props) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Рост",
                data: [],
                fill: false,
                backgroundColor: "rgba(75,192,192,0.5)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Вес",
                data: [],
                fill: false,
                borderColor: "#742774",
            }
        ]
    });

    useEffect(() => {
        const timeData = [];
        const heightData = [];
        const weightData = [];
        props.data.map((item) => {
            timeData.push(Time.dateToStr(item.date, true));
            heightData.push(item.height);
            weightData.push(item.weight);
        });
        setData(
            {
                labels: timeData,
                datasets: [
                    {
                        label: 'Вес',
                        data: weightData,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)",
                        yAxisID: 'y',
                    },
                    {
                        label: 'Рост',
                        data: heightData,
                        backgroundColor: "rgba(116, 39, 116, 0.2)",
                        borderColor: "rgb(116, 39, 116)",
                        yAxisID: 'y1',
                    }
                ]

            },
        );
    }, [props.data]);

    return (
        <Line
            data={data}
            options={{
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                stacked: false,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                }
            }}
            className={`${classes.chart} ${props.className}`}
            width={700}
            height={300}
        >

        </Line>
    );
};

export default IMTGraph;