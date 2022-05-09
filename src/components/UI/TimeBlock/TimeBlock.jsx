import React, { useEffect, useRef, useState } from 'react';
import Formatting from '../../../API/Formatting';
import Time from '../../../API/Time';
import classes from './TimeBlock.module.scss';

const TimeBlock = (props) => {
    const [width, setWidth] = useState(window.innerWidth);
    const timeblock = useRef(null);

    const resizeFunc = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        if (props.fullscreen) {
            timeblock.current.requestFullscreen();
        };
    }, [props.fullscreen]);

    useEffect(() => {
        window.addEventListener("resize", resizeFunc);
        return () => {
            window.removeEventListener("resize", resizeFunc);
        };
    }, []);

    return (
        <div className={`${classes.clock} ${classes[props.theme]} row`} ref={timeblock}>
            <div className={`${classes.item} col-4`}>
                <p className={classes.timer}>
                    {
                        props.type === "time" ?
                            Formatting.toDoubleNumber(Time.msToTime(props.time)?.hours)
                            : Formatting.toDoubleNumber(Time.msToTime(props.time)?.years)
                    }
                </p>
                <p className={classes.label}>
                    {
                        props.type === "time" ?
                            width > 767 &&
                            Formatting.declOfNum(Time.msToTime(props.time).hours, ["Час", "Часа", "Часов"])
                            : width > 767 && Formatting.declOfNum(Time.msToTime(props.time).years, ["Год", "Года", "Лет"])
                    }
                </p>
            </div>
            <div className={`${classes.item} col-4`}>
                <p className={classes.timer}>
                    {
                        props.type === "time" ?
                            Formatting.toDoubleNumber(Time.msToTime(props.time)?.minutes)
                            : Formatting.toDoubleNumber(Time.msToTime(props.time)?.months)
                    }
                </p>
                <p className={classes.label}>
                    {
                        props.type === "time" ?
                            width > 767 &&
                            Formatting.declOfNum(Time.msToTime(props.time).minutes, ["Минута", "Минуты", "Минут"])
                            : width > 767 && Formatting.declOfNum(Time.msToTime(props.time).months, ["Месяц", "Месяца", "Месяцев"])
                    }
                </p>
            </div>
            <div className={`${classes.item} col-4`}>
                <p className={classes.timer}>
                    {
                        props.type === "time" ?
                            Formatting.toDoubleNumber(Time.msToTime(props.time)?.seconds)
                            : Formatting.toDoubleNumber(Time.msToTime(props.time)?.days)
                    }
                </p>
                <p className={classes.label}>
                    {
                        props.type === "time" ?
                            width > 767 &&
                            Formatting.declOfNum(Time.msToTime(props.time).seconds, ["Секунда", "Секунды", "Секунд"])
                            : width > 767 && Formatting.declOfNum(Time.msToTime(props.time)?.days, ["День", "Дня", "Дней"])
                    }
                </p>
            </div>
        </div>
    );
};

export default TimeBlock;