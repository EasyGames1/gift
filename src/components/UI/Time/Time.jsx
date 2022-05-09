import React, { useEffect, useState } from 'react';
import Formatting from '../../../API/Formatting';

const Time = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        let timeout, interval;
        timeout = setTimeout(() => {
            setTime(new Date());
            interval = setInterval(() => {
                setTime(new Date());
            }, 60000);
        }, (60 - time.getSeconds()) * 1000 - time.getMilliseconds());

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            setTime();
        };
    }, []);

    return (
        <span>
            {Formatting.toDoubleNumber(time.getHours())}:
            {Formatting.toDoubleNumber(time.getMinutes())}
        </span>
    );
};

export default Time;