import React, { useEffect, useState } from 'react';
import PostService from '../../../API/PostService';
import { useFetching } from '../../../hooks/useFetching';

const Weather = (props) => {
    const [temp, setTemp] = useState();
    const [fetchWeather, isLoading, error] = useFetching(async () => {
        const response = await PostService.getWeather(props.coords.lat, props.coords.lon);
        setTemp(`${Math.round(response.data.main.temp)}°C`);
    });

    useEffect(() => {
        if (props.coords && temp == null) {
            fetchWeather();
        };
    }, [props.coords]);

    useEffect(() => {
        return () => {
            setTemp();
        };
    }, []);
    return (
        <span {...props}>
            {temp}
        </span>
    );
};

export default Weather;