import React from 'react';
import classes from './WeatherPage.module.css';
import AboutNowWeather from '../../AboutNowWeather/AboutNowWeather';
import WeatherForecast from '../../WeatherForecast/WeatherForecast';
import GeoEnable from '../../GeoEnable/GeoEnable';

const WeatherPage = (props) => {

    return (
        <>
            {props.isGeo
                ?
                <div className='container'>
                    <div className={classes.title}>
                        <h1>Погода</h1>
                    </div>
                    <AboutNowWeather theme={props.theme} className="mb-5" coords={props.coords} />
                    <WeatherForecast
                        theme={props.theme}
                        graph
                        isWeatherGraph={props.isWeatherGraph}
                        setIsWeatherGraph={props.setIsWeatherGraph}
                        isForbiddenWeatherGraph={props.isForbiddenWeatherGraph}
                        setIsForbiddenWeatherGraph={props.setIsForbiddenWeatherGraph}
                        coords={props.coords}
                    />
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
        </>
    );
};

export default WeatherPage;