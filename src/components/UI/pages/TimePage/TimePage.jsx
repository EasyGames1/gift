import React, { useRef } from 'react';
import Countdown from '../../Countdown/Countdown';
import Stopwatch from '../../Stopwatch/Stopwatch';
import Timer from '../../Timer/Timer';
import TodayBlock from '../../TodayBlock/TodayBlock';

const TimePage = (props) => {
    return (
        <div>
            <h1 className='text-center'>Работа со временем</h1>
            <TodayBlock theme={props.theme}/>
            <Stopwatch theme={props.theme}/>
            <Countdown theme={props.theme}/>
            <Timer theme={props.theme}/>
        </div>
    );
};

export default TimePage;