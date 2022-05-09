import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetching } from "../../../../hooks/useFetching";
import PostService from "../../../../API/PostService";
import Loader from "../../Loader/Loader";
import classes from './WeatherExactPage.module.css';
import Formatting from "../../../../API/Formatting";
import Time from "../../../../API/Time";
import { SemiPie } from "../../Graphs/SemiPie/SemiPie";
import Weather from "../../../../API/Weather";
import GeoEnable from "../../GeoEnable/GeoEnable";
import WeatherForecast from "../../WeatherForecast/WeatherForecast";
import Button from "../../Button/Button";

const WeatherExactPage = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [weather, setWeather] = useState('');
    const [fetchWeather, isLoading, error] = useFetching(async () => {
        const response = await PostService.getWeatherForecast(props.coords.lat, props.coords.lon);
        setWeather(response.data);
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

    useEffect(() => {
        if (props.coords) {
            fetchWeather();
        };
    }, [props.coords]);

    useEffect(() => {
        if (isNaN(parseInt(params.index))) {
            navigate("/projects/weather")
        } else {
            if (parseInt(params.index) >= 40 || parseInt(params.index) < 0) {
                navigate("/projects/weather");
            };
        };
        return () => {
            setCloudsData();
            setHumidityData();
            setWeather();
        };
    }, []);

    useEffect(() => {
        if (typeof weather !== 'string') {
            setCloudsData(
                {
                    labels: ['Облачность'],
                    datasets: [{
                        type: 'doughnut',
                        data: [weather.list[params.index].clouds.all, 100 - weather.list[params.index].clouds.all],
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
            setHumidityData(
                {
                    labels: ['Влажность'],
                    datasets: [{
                        type: 'doughnut',
                        data: [weather.list[params.index].main.humidity, 100 - weather.list[params.index].main.humidity],
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
        };
    }, [weather, params.index]);

    return (
        <>
            {
                !error && params.index < 40 ?
                    <div>
                        {typeof weather !== 'string' &&
                            props.isGeo
                            &&
                            <>
                                <h1 className='text-center mb-4' style={{ marginTop: "70px" }}>
                                    Прогноз погоды<br />
                                    <Button className='mt-3' onClick={() => navigate('/projects/weather')}>К погоде сегодня</Button>
                                </h1>
                            </>
                        }
                        {typeof weather === 'string'
                            ? <Loader />
                            :
                            props.isGeo ?
                                <div className={`${classes.weather} ${props.theme === "dark" ? classes.dark : ""} ${props.className}`} data-aos="fade-up" data-aos-duration="400">
                                    <div data-aos="fade-in" data-aos-duration="400" data-aos-delay="200">
                                        <div className={classes.weatherTitle}>
                                            <span className={classes.city} >{weather.city.name}</span>
                                            <span>
                                                {
                                                    Formatting.toDoubleNumber(Time.unixToDate(weather.list[params.index].dt).getDate()) ===
                                                        Formatting.toDoubleNumber(new Date().getDate()) &&
                                                        Formatting.toDoubleNumber(Time.unixToDate(weather.list[params.index].dt).getMonth() + 1) ===
                                                        Formatting.toDoubleNumber(new Date().getMonth() + 1) ?
                                                        "Сегодня" :
                                                        Formatting.toDoubleNumber(Time.unixToDate(weather.list[params.index].dt).getDate()) ===
                                                            Formatting.toDoubleNumber(new Date().getDate() + 1) &&
                                                            Formatting.toDoubleNumber(Time.unixToDate(weather.list[params.index].dt).getMonth() + 1) ===
                                                            Formatting.toDoubleNumber(new Date().getMonth() + 1) ?
                                                            "Завтра" :
                                                            <>
                                                                {Formatting.toDoubleNumber(Time.unixToDate(weather.list[params.index].dt).getDate())}.
                                                                {Formatting.toDoubleNumber(Time.unixToDate(weather.list[params.index].dt).getMonth() + 1)}
                                                            </>
                                                }
                                            </span>
                                        </div>
                                        <div className={classes.weatherTitle}>
                                            <span >
                                                {Formatting.fBig(weather.list[params.index].weather[0].description)}
                                            </span>
                                            <span >
                                                {Formatting.toDoubleNumber(Time.unixToDate(weather.list[params.index].dt).getHours())}:
                                                {Formatting.toDoubleNumber(Time.unixToDate(weather.list[params.index].dt).getMinutes())}
                                            </span>
                                        </div>
                                        <br />
                                        <span className={classes.temp} >
                                            <img
                                                src={`https://openweathermap.org/img/w/${weather.list[params.index].weather[0].icon}.png`}
                                                title={Formatting.fBig(weather.list[params.index].weather[0].description)}
                                            />
                                            {weather.list[params.index].main.temp ? Math.round(weather.list[params.index].main.temp) : ""}°C
                                        </span>
                                        <div className='row mt-3'>
                                            <div className='col-6' >
                                                <SemiPie data={cloudsData} theme={props.theme} width={300} height={300} />
                                            </div>
                                            <div className='col-6' >
                                                <SemiPie data={humidityData} theme={props.theme} width={300} height={300} />
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-6 text-center mt-3' >
                                                <span className={`${classes.paramName} ${props.theme === "dark" ? classes.dark : ""}`}>
                                                    Ощущается как
                                                </span><br />
                                                <span className={classes.weatherData}>
                                                    {Math.round(weather.list[params.index].main.feels_like)}°C
                                                </span>
                                                <div className={classes.line} />
                                            </div>
                                            <div className='col-6 text-center mt-3' >
                                                <span className={`${classes.paramName} ${props.theme === "dark" ? classes.dark : ""}`}>
                                                    Давление
                                                </span><br />
                                                <span className={classes.weatherData}>
                                                    {Math.round(weather.list[params.index].main.pressure / 1.333)} мм
                                                </span>
                                                <div className={classes.line} />
                                            </div>
                                            <div className='col-6 text-center mt-3' >
                                                <span className={`${classes.paramName} ${props.theme === "dark" ? classes.dark : ""}`}>
                                                    Ветер {Weather.degToStr(weather.list[params.index].wind.deg)}
                                                </span><br />
                                                <span className={classes.weatherData}>
                                                    {Math.round(weather.list[params.index].wind.speed)} м/с
                                                </span>
                                                <div className={classes.line} />
                                            </div>
                                            <div className='col-6 text-center mt-3' >
                                                <span className={`${classes.paramName} ${props.theme === "dark" ? classes.dark : ""}`}>
                                                    Видимость
                                                </span><br />
                                                <span className={classes.weatherData}>
                                                    {Math.round(weather.list[params.index].visibility / 100) / 10} км
                                                </span>
                                                <div className={classes.line} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <GeoEnable
                                    isGeo={props.isGeo}
                                    setIsGeo={props.setIsGeo}
                                    theme={props.theme}
                                    setTheme={props.setTheme}
                                    setSettingsVisible={props.setSettingsVisible}
                                />
                        }
                        {props.isGeo &&
                            <WeatherForecast
                                theme={props.theme}
                                graph
                                isWeatherGraph={props.isWeatherGraph}
                                setIsWeatherGraph={props.setIsWeatherGraph}
                                isForbiddenWeatherGraph={props.isForbiddenWeatherGraph}
                                setIsForbiddenWeatherGraph={props.setIsForbiddenWeatherGraph}
                                weather={weather}
                            />
                        }
                    </div>
                    : ''
            }
        </>
    );
};

export default WeatherExactPage;