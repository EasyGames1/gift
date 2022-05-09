import React, { useRef } from 'react';
import Countdown from '../../Countdown/Countdown';
import Stopwatch from '../../Stopwatch/Stopwatch';
import TodayBlock from '../../TodayBlock/TodayBlock';

const TimePage = (props) => {
    return (
        <div>
            <h3 style={{border: "1px solid red", padding: "16px", maxWidth: "500px", margin: "auto"}}>Внимание! Программист ушёл в запой. Проект не доделан и может работать нестабильно!</h3>
            <h1 className='text-center'>Работа со временем</h1>
            <TodayBlock theme={props.theme}/>
            <Stopwatch theme={props.theme}/>
            <Countdown theme={props.theme}/>
        </div>
    );
};

export default TimePage;