import React, { useEffect, useState } from 'react';
import Formatting from '../../../API/Formatting';

const getDate = () => {
    const date = new Date();
    return `${Formatting.toDoubleNumber(date.getDate())}.${Formatting.toDoubleNumber(date.getMonth() + 1)}`;
};

const Date_Now = () => {
    const [date, setDate] = useState(getDate);
    useEffect(() => {
        setInterval(() => setDate(getDate), 1000 * 60 * 60 * 24);
    }, []);
    return (
        <span>
            {date}
        </span>
    );
};

export default Date_Now;