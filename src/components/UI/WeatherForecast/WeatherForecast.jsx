import React, { useEffect, useState, Suspense } from 'react';
import PostService from '../../../API/PostService';
import { useFetching } from '../../../hooks/useFetching';
import classNamees from './WeatherForecast.module.css';
import Loader from '../Loader/Loader';
import Slider from '../Slider/Slider';
import Time from '../../../API/Time';
import Formatting from '../../../API/Formatting';
import { Link } from 'react-router-dom';
import classes from './WeatherForecast.module.css';
import WeatherGraph from '../Graphs/WeatherGraph/WeatherGraph';
import Button from '../Button/Button';

const WeatherForecast = (props) => {
    const [isGraph, setIsGraph] = useState(props.isWeatherGraph);
    const [weather, setWeather] = useState('');
    const [fetchWeather, isLoading, error] = useFetching(async () => {
        const response = props.weather ? props.weather : await PostService.getWeatherForecast(props.coords.lat, props.coords.lon);
        setWeather(response.data.list);
    });

    useEffect(() => {
        if (props.coords) {
            fetchWeather();
        };
    }, [props.coords]);

    useEffect(() => {
        if (props.weather) {
            if (props.weather !== '') {
                setWeather(props.weather.list);
            };
        };
    }, [props.weather]);

    useEffect(() => {

        return () => {
            setWeather('');
        };
    }, []);

    return (
        <>
            {
                error === ''
                &&
                <div className={classNamees.weather}>
                    <h3 className='text-center mb-4 mt-5' data-aos="fade-up" data-aos-duration="400">Прогноз</h3>
                    {typeof weather === 'string'
                        ? <Loader />
                        :
                        <>
                            <div data-aos="fade-up" data-aos-duration="400">
                                <Slider theme={props.theme}>
                                    {weather.map((interval, index) =>
                                        <Link
                                            to={`/projects/weather/${index}`}
                                            className={classes.link}
                                            key={index}
                                            onClick={() => window.scrollTo(0, 0)}
                                            data-aos="fade-up"
                                            data-aos-duration="400"
                                            data-aos-delay="100"
                                            data-aos-offset="110"
                                        >
                                            {
                                                Formatting.toDoubleNumber(new Date().getDate()) ===
                                                    Formatting.toDoubleNumber(Time.unixToDate(interval.dt).getDate()) ?
                                                    <>
                                                        Сегодня<br />
                                                    </>
                                                    :
                                                    Formatting.toDoubleNumber(new Date().getDate() + 1) ===
                                                        Formatting.toDoubleNumber(Time.unixToDate(interval.dt).getDate()) ?
                                                        <>
                                                            Завтра<br />
                                                        </>
                                                        :
                                                        <>
                                                            {Formatting.toDoubleNumber(Time.unixToDate(weather[index].dt).getDate())}.
                                                            {Formatting.toDoubleNumber(Time.unixToDate(weather[index].dt).getMonth() + 1)}<br />
                                                        </>
                                            }
                                            {Formatting.toDoubleNumber(Time.unixToDate(weather[index].dt).getHours())}:
                                            {Formatting.toDoubleNumber(Time.unixToDate(weather[index].dt).getMinutes())}<br />
                                            {Math.round(interval.main.temp)}°C
                                        </Link>
                                    )}
                                </Slider>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="400">
                                {!props.isForbiddenWeatherGraph && props.graph &&
                                    <Button
                                        className={"mt-4"}
                                        onClick={() =>
                                            setIsGraph(!isGraph)
                                        }
                                    >
                                        {isGraph ? "Скрыть" : "Показать"} график
                                    </Button>
                                }
                                {!props.isForbiddenWeatherGraph && isGraph &&
                                    <div className='mw500'>
                                        <WeatherGraph className={"mt-4"} weather={weather} />
                                    </div>
                                }
                            </div>
                        </>
                    }
                </div>
            }
            {error !== '' &&
                <h3 className='text-center'>
                    Не удалось загрузить данные.
                </h3>
            }
        </>
    );
};

export default WeatherForecast;