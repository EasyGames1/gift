import React, { useEffect, useState } from 'react';
import Date_Now from '../Date_Now/Date_Now';
import Weather from '../Weather/Weather';

const DateORWeather = ({weather, coords, edge=450}) => {
    const [width, setWidth] = useState(window.innerWidth);
    const resizeFunc = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', resizeFunc);
        return () => {
            window.removeEventListener("resize", resizeFunc);
            setWidth();
        };
    }, []);
    return (
        <div className='text-center'>
            {width <= edge ? weather ? <Weather coords={coords}/> : <Date_Now/> : <Date_Now/>}
        </div>
    );
};

export default DateORWeather;