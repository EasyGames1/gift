import React, { useEffect, useState } from 'react';
import classes from './WeatherGraph.module.css';
import { Line } from 'react-chartjs-2';
import Time from '../../../../API/Time';
import Formatting from '../../../../API/Formatting';
import 'chart.js/auto';

const WeatherGraph = (props) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Температура",
                data: [],
                fill: false,
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Облачность",
                data: [],
                fill: false,
                borderColor: "#742774",
            },
            {
                label: "Влажность",
                data: [],
                fill: false,
                borderColor: "rgb(196, 111, 37)"
            }
        ]
    });

    useEffect(() => {
        const timeData = [];
        const tempData = [];
        const cloudsData = [];
        const humidityData = [];
        props.weather.map((item) => {
            timeData.push(`${Formatting.toDoubleNumber(Time.unixToDate(item.dt).getDate())}.${Formatting.toDoubleNumber(Time.unixToDate(item.dt).getMonth() + 1)} ${Formatting.toDoubleNumber(Time.unixToDate(item.dt).getHours())}:${Formatting.toDoubleNumber(Time.unixToDate(item.dt).getMinutes())}`);
            tempData.push(item.main.temp);
            cloudsData.push(item.clouds.all);
            humidityData.push(item.main.humidity);
        });
        setData(
            {
                labels: timeData,
                datasets: [
                    {
                        label: "Температура",
                        data: tempData,
                        fill: false,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)"
                    },
                    {
                        label: "Облачность",
                        data: cloudsData,
                        fill: false,
                        borderColor: "#742774"
                    },
                    {
                        label: "Влажность",
                        data: humidityData,
                        fill: false,
                        borderColor: "rgb(196, 111, 37)"
                    }
                ]
            }
        );
    }, []);

    return (
        <Line
            data={data}
            className={`${classes.chart} ${props.className}`}
            width={500}
            height={300}
        />
    );
};

export default WeatherGraph;