import React, { useState, useEffect, useRef } from 'react';
import classes from './TodayBlock.module.scss';
import Formatting from '../../../API/Formatting';
import Time from '../../../API/Time';
import IconButton from '../IconButton/IconButton';

const TodayBlock = (props) => {
    const [date, setDate] = useState(new Date());
    const [width, setWidth] = useState(window.innerWidth);
    const [fullscreen, setFullscreen] = useState(false);
    const today = useRef(null);

    const resizeFunc = () => {
        setWidth(window.innerWidth);
    };

    const fullscreenFunc = () => {
        setFullscreen(!fullscreen);
    };

    useEffect(() => {
        if (props.fullscreen) {
            today.current.requestFullscreen();
        };
    }, [props.fullscreen]);

    useEffect(() => {
        let timeout, interval;
        timeout = setTimeout(() => {
            setDate(new Date());
            interval = setInterval(() => {
                setDate(new Date());
            }, 1000);
        }, 1000 - date.getMilliseconds());
        window.addEventListener('resize', resizeFunc);
        window.addEventListener('fullscreenchange', fullscreenFunc);
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            window.removeEventListener('resize', resizeFunc);
            window.removeEventListener('fullscreenchange', fullscreenFunc);
        };
    }, []);

    return (
        <div className={classes.parent}>
            <div className={`${classes.date} ${classes[props.theme]}`}>
                {
                    Time.dateToStr(Time.getFullDate())
                }
                <IconButton
                    theme={props.theme}
                    title="Смотреть в полноэкранном режиме"
                    onClick={() => today.current.requestFullscreen()}
                >
                    fullscreen
                </IconButton>
            </div>
            <div className={`${classes.clock} ${classes[props.theme]} row`} ref={today}>
                <div className={`${classes.item} col-xl-3 col-md-3 col-sm-12 col-12`}>
                    <p className={classes.timer}>
                        {
                            width <= 767 ?
                                Time.getDay(date.getDay()) :
                                Time.getShortDay(date.getDay())
                        }
                    </p>
                    <p className={classes.label}>
                        {
                            width > 767 &&
                            "День"
                        }
                    </p>
                </div>
                <div className={`${classes.item} col-xl-3 col-md-3 col-sm-4 col-4`}>
                    <p className={classes.timer}>
                        {
                            Formatting.toDoubleNumber(date.getHours())
                        }
                    </p>
                    <p className={classes.label}>
                        {
                            width > 767 &&
                            Formatting.declOfNum(date.getHours(), ["Час", "Часа", "Часов"])
                        }
                    </p>
                </div>
                <div className={`${classes.item} col-xl-3 col-md-3 col-sm-4 col-4`}>
                    <p className={classes.timer}>
                        {
                            Formatting.toDoubleNumber(date.getMinutes())
                        }
                    </p>
                    <p className={classes.label}>
                        {
                            width > 767 &&
                            Formatting.declOfNum(date.getMinutes(), ["Минута", "Минуты", "Минут"])
                        }
                    </p>
                </div>
                <div className={`${classes.item} col-xl-3 col-md-3 col-sm-4 col-4`}>
                    <p className={classes.timer}>
                        {
                            Formatting.toDoubleNumber(date.getSeconds())
                        }
                    </p>
                    <p className={classes.label}>
                        {
                            width > 767 &&
                            Formatting.declOfNum(date.getSeconds(), ["Секунда", "Секунды", "Секунд"])
                        }
                    </p>
                </div>
            </div>
        </div >
    );
};

export default TodayBlock;