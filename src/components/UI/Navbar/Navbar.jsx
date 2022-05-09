import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DateORWeather from '../DateORWeather/DateORWeather';
import Date_Now from '../Date_Now/Date_Now';
import IconButton from '../IconButton/IconButton';
import Time from '../Time/Time';
import Weather from '../Weather/Weather';
import classes from './Navbar.module.css';

const Navbar = (props) => {
    const [themeToggler, setThemetoggler] = useState(props.theme === "dark" ? "light_mode" : "dark_mode");
    const [links, setLinks] = useState([
        {
            title: "Подарок",
            to: "/",
        },
        {
            title: "Проекты",
            to: "/projects",
        }
    ]);

    useEffect(() => {
        setThemetoggler(props.theme === "dark" ? "light_mode" : "dark_mode");
    }, [props.theme]);
    
    return (
        <div>
            <nav className={`${classes.navbar} ${props.theme === "light" ? "" : classes.dark}`}>
                <div className={classes.router}>
                    {links.map((el, index) => 
                        <Link
                            key={index}
                            to={el.to}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            {el.title}
                        </Link>
                    )}
                    <Link to={'/settings'}>
                        <IconButton
                            theme={props.theme}
                        >
                            settings
                        </IconButton>
                    </Link>
                    <IconButton
                        theme={props.theme}
                        onClick={() => {props.setTheme(props.theme === "dark" ? "light" : "dark")}}
                    >
                        {themeToggler}
                    </IconButton>
                </div>
                    <div className={classes.info + " row"}>
                        <div className={classes.weather + " col"}>
                            {props.isGeo
                             ? <Weather coords={props.coords}/>
                             : <span className='material-icons'>location_off</span>
                            }
                        </div>
                        <div className={`col ${classes.currentInfo}`}>
                            {props.isGeo
                             ? <DateORWeather coords={props.coords} weather edge={450}/>
                             : <Date_Now/>
                            }
                            <Time/>
                        </div>
                    </div>
            </nav>
            <div className={classes.filler}></div>
        </div>
    );
};

export default Navbar;