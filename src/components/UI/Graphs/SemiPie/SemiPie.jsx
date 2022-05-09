import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import classes from './SemiPie.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export const SemiPie = (props) => {
  return (
    <Doughnut
        data={props.data}
        className={props.theme === "dark" ? classes.dark : classes.light}
        width={props.width}
        height={props.height}
    />
  );
}
