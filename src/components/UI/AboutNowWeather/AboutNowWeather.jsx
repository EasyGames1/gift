import React, { useState, useEffect } from 'react';
import classes from './AboutNowWeather.module.css';
import Formatting from '../../../API/Formatting';
import { SemiPie } from '../Graphs/SemiPie/SemiPie';
import PostService from '../../../API/PostService';
import { useFetching } from '../../../hooks/useFetching';
import Loader from '../Loader/Loader';
import Time from '../../../API/Time';
import Weather from '../../../API/Weather';

const AboutNowWeather = (props) => {
    const [weather, setWeather] = useState('');
    const [now, setNow] = useState({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes()
    });
    const [events, setEvents] = useState(typeof weather !== 'string' && {
        sunrise:
            Time.diffSun(
                now.hours, Time.unixToDate(weather?.sys.sunrise).getHours(),
                now.minutes, Time.unixToDate(weather?.sys.sunrise).getMinutes()
            ),
        sunset:
            Time.diffSun(
                now.hours, Time.unixToDate(weather?.sys.sunset).getHours(),
                now.minutes, Time.unixToDate(weather?.sys.sunset).getMinutes()
            ),
    });
    const [cloudsData, setCloudsData] = useState(
        {
            labels: ['Облачность'],
            datasets: [{
                type: 'doughnut',
                data: [],
                backgroundColor: [
                    'rgba(139, 0, 255, 0.2)',
                    'rgba(0, 0, 0, 0)',
                ],
                borderColor: [
                    'rgba(139, 0, 255, 1)',
                    'rgba(0, 0, 0, 0.4)',
                ],
                borderWidth: 1,
                circumference: 90 * Math.PI,
                rotation: 69.6 * Math.PI,
            }],
        }
    );
    const [humidityData, setHumidityData] = useState(
        {
            labels: ['Влажность'],
            datasets: [{
                type: 'doughnut',
                data: [],
                backgroundColor: [
                    'rgba(139, 0, 255, 0.2)',
                    'rgba(0, 0, 0, 0)',
                ],
                borderColor: [
                    'rgba(139, 0, 255, 1)',
                    'rgba(0, 0, 0, 0.4)',
                ],
                borderWidth: 1,
                circumference: 90 * Math.PI,
                rotation: 69.6 * Math.PI,
            }]
        }
    );
    const [fetchWeather, isLoading, error] = useFetching(async () => {
        const response = await PostService.getWeather(props.coords.lat, props.coords.lon);
        setWeather(response.data);
    });

    useEffect(() => {
        if (props.coords) {
            fetchWeather();
        };
    }, [props.coords]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow({
                hours: new Date().getHours(),
                minutes: new Date().getMinutes()
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (typeof weather !== 'string') {
            setEvents({
                sunrise:
                    Time.diffSun(
                        now.hours, Time.unixToDate(weather?.sys.sunrise).getHours(),
                        now.minutes, Time.unixToDate(weather?.sys.sunrise).getMinutes()
                    ),
                sunset:
                    Time.diffSun(
                        now.hours, Time.unixToDate(weather?.sys.sunset).getHours(),
                        now.minutes, Time.unixToDate(weather?.sys.sunset).getMinutes()
                    ),
            });
        };
    }, [now]);

    useEffect(() => {
        if (typeof weather !== 'string') {
            setCloudsData(
                {
                    labels: cloudsData.labels,
                    datasets: [{
                        type: cloudsData.datasets[0].type,
                        data: [weather?.clouds.all, 100 - weather?.clouds.all],
                        backgroundColor: cloudsData.datasets[0].backgroundColor,
                        borderColor: cloudsData.datasets[0].borderColor,
                        borderWidth: cloudsData.datasets[0].borderWidth,
                        circumference: cloudsData.datasets[0].circumference,
                        rotation: cloudsData.datasets[0].rotation,
                    }],
                }
            );
            setHumidityData(
                {
                    labels: humidityData.labels,
                    datasets: [{
                        type: humidityData.datasets[0].type,
                        data: [weather?.main.humidity, 100 - weather?.main.humidity],
                        backgroundColor: humidityData.datasets[0].backgroundColor,
                        borderColor: humidityData.datasets[0].borderColor,
                        borderWidth: humidityData.datasets[0].borderWidth,
                        circumference: humidityData.datasets[0].circumference,
                        rotation: humidityData.datasets[0].rotation
                    }]
                }
            );
            setEvents({
                sunrise:
                    Time.diffSun(
                        now.hours, Time.unixToDate(weather?.sys.sunrise).getHours(),
                        now.minutes, Time.unixToDate(weather?.sys.sunrise).getMinutes()
                    ),
                sunset:
                    Time.diffSun(
                        now.hours, Time.unixToDate(weather?.sys.sunset).getHours(),
                        now.minutes, Time.unixToDate(weather?.sys.sunset).getMinutes()
                    ),
            });
        };
    }, [weather]);

    return (
        <>
            {typeof weather === 'string'
                ? <Loader /> :
                <div className={`${classes.weather} ${props.theme === "dark" ? classes.dark : ""} ${props.className}`} data-aos="fade-up" data-aos-duration="400">
                    <div data-aos="fade-in" data-aos-duration="400" data-aos-delay="200">
                        <div className={classes.weatherTitle}>
                            <span className={classes.city}>{weather?.name}</span>
                            <span>
                                {
                                    Formatting.toDoubleNumber(Time.unixToDate(weather.dt).getDate()) ===
                                        Formatting.toDoubleNumber(new Date().getDate()) &&
                                        Formatting.toDoubleNumber(Time.unixToDate(weather.dt).getMonth() + 1) ===
                                        Formatting.toDoubleNumber(new Date().getMonth() + 1) ?
                                        "Сегодня" :
                                        Formatting.toDoubleNumber(Time.unixToDate(weather.dt).getDate()) ===
                                            Formatting.toDoubleNumber(new Date().getDate() + 1) &&
                                            Formatting.toDoubleNumber(Time.unixToDate(weather.dt).getMonth() + 1) ===
                                            Formatting.toDoubleNumber(new Date().getMonth() + 1) ?
                                            "Завтра" :
                                            <>
                                                {Formatting.toDoubleNumber(Time.unixToDate(weather.dt).getDate())}.
                                                {Formatting.toDoubleNumber(Time.unixToDate(weather.dt).getMonth() + 1)}
                                            </>
                                }
                            </span>
                        </div>
                        <div className={classes.weatherTitle}>
                            <span>
                                {Formatting.fBig(weather?.weather[0].description)}
                            </span>
                            <span>
                                {Formatting.toDoubleNumber(Time.unixToDate(weather.dt).getHours())}:
                                {Formatting.toDoubleNumber(Time.unixToDate(weather.dt).getMinutes())}
                            </span>
                        </div>
                        <span className={classes.temp}>
                            <img
                                src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                                title={Formatting.fBig(weather.weather[0].description)}
                            />
                            {weather?.main.temp ? Math.round(weather.main.temp) : ""}°C
                        </span>
                        <div className='row mt-3'>
                            <div className='col-6'>
                                <SemiPie data={cloudsData} theme={props.theme} width={300} height={300} />
                            </div>
                            <div className='col-6'>
                                <SemiPie data={humidityData} theme={props.theme} width={300} height={300} />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-6 text-center mt-3'>
                                <span className={`${classes.paramName} ${props.theme === "dark" ? classes.dark : ""}`}>
                                    Ощущается как
                                </span><br />
                                <span className={classes.weatherData}>
                                    {Math.round(weather?.main.feels_like)}°C
                                </span>
                                <div className={classes.line} />
                            </div>
                            <div className='col-6 text-center mt-3'>
                                <span className={`${classes.paramName} ${props.theme === "dark" ? classes.dark : ""}`}>
                                    Давление
                                </span><br />
                                <span className={classes.weatherData}>
                                    {Math.round(weather?.main.pressure / 1.333)} мм
                                </span>
                                <div className={classes.line} />
                            </div>
                            <div className='col-6 text-center mt-3'>
                                <span className={`${classes.paramName} ${props.theme === "dark" ? classes.dark : ""}`}>
                                    Ветер {Weather.degToStr(weather?.wind.deg)}
                                </span><br />
                                <span className={classes.weatherData}>
                                    {Math.round(weather?.wind.speed)} м/с
                                </span>
                                <div className={classes.line} />
                            </div>
                            <div className='col-6 text-center mt-3'>
                                <span className={`${classes.paramName} ${props.theme === "dark" ? classes.dark : ""}`}>
                                    Видимость
                                </span><br />
                                <span className={classes.weatherData}>
                                    {Math.round(weather?.visibility / 100) / 10} км
                                </span>
                                <div className={classes.line} />
                            </div>
                            <div className='col-6 text-center mt-3'>
                                <img className={classes.image} src={'https://ik.imagekit.io/85o7oyz9cun/sunrise_VQaNkMgQv.png?'} title="Восход" /><br />
                                <span className={classes.weatherData}>
                                    {Formatting.toDoubleNumber(Time.unixToDate(weather?.sys.sunrise).getHours())}
                                    :
                                    {Formatting.toDoubleNumber(Time.unixToDate(weather?.sys.sunrise).getMinutes())}<br />
                                    {events.sunrise}
                                </span>
                                <div className={classes.line} />
                            </div>
                            <div className='col-6 text-center mt-3'>
                                <img className={classes.image} src={'https://ik.imagekit.io/85o7oyz9cun/sunset_ZAY26AhU6.png'} title="Закат" /><br />
                                <span className={classes.weatherData}>
                                    {Formatting.toDoubleNumber(Time.unixToDate(weather?.sys.sunset).getHours())}
                                    :
                                    {Formatting.toDoubleNumber(Time.unixToDate(weather?.sys.sunset).getMinutes())}<br />
                                    {events.sunset}
                                </span>
                                <div className={classes.line} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default AboutNowWeather;