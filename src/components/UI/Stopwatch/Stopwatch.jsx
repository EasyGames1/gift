import React, { useEffect, useRef, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Formatting from '../../../API/Formatting';
import Time from '../../../API/Time';
import IconButton from '../IconButton/IconButton';
import List from '../List/List';
import classes from './Stopwatch.module.scss';

const Stopwatch = (props) => {
    const [isRunning, setIsRunning] = useState(false);
    const [runTime, setRunTime] = useState();
    const [started, setStarted] = useState('');
    const [paused, setPaused] = useState(false);
    const [intervals, setIntervals] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const frame = useRef(null);
    const stopwatch = useRef(null);

    const resizeFunc = () => {
        setWidth(window.innerWidth);
    };

    const start = () => {
        setPaused(false);
        setIsRunning(true);
        setStarted(new Date());
    };

    const pause = () => {
        setPaused(true);
        cancelAnimationFrame(frame.current);
        setStarted('');
    };

    const cont = () => {
        setPaused(false);
        setStarted(new Date(new Date() - runTime));
    };

    const stop = () => {
        setIsRunning(false);
        setStarted('');
        setIntervals([]);
        cancelAnimationFrame(frame.current);
    };

    const update = () => {
        setRunTime(
            new Date() - started
        );
        frame.current = requestAnimationFrame(update);
    };

    useEffect(() => {
        if (started !== '') {
            update();
        };
    }, [started]);

    useEffect(() => {
        window.addEventListener('resize', resizeFunc);
        return () => {
            window.removeEventListener('resize', resizeFunc);
            cancelAnimationFrame(frame.current);
        };
    }, []);

    return (
        <div className='mw500 mt-4'>
            <h3 className="jcsb">
                Секундомер
                <div className="jcsb">
                    {
                        isRunning &&
                        <IconButton
                            theme={props.theme}
                            onClick={() => stopwatch.current.requestFullscreen()}
                            title="Смотреть в полноэкранном режиме"
                        >
                            fullscreen
                        </IconButton>
                    }
                    {
                        isRunning &&
                        intervals[intervals.length - 1] !== runTime &&
                        <IconButton
                            theme={props.theme}
                            style={{ color: "#37911F", filter: "invert(0%)" }}
                            onClick={() => {
                                setIntervals([...intervals, runTime]);
                            }}
                            title="Добавить интервал"
                        >
                            timer
                        </IconButton>
                    }
                    <div className="jcsb">
                        {
                            isRunning &&
                            <IconButton
                                theme={props.theme}
                                style={{ color: "#4361ee", filter: "invert(0%)" }}
                                onClick={() => {
                                    if (!paused) {
                                        pause();
                                    } else {
                                        cont();
                                    };
                                }}
                                title={
                                    paused ?
                                        "Продолжить" :
                                        "Пауза"
                                }
                            >
                                {
                                    paused ?
                                        "play_arrow" :
                                        "pause"
                                }
                            </IconButton>
                        }
                        <IconButton
                            theme={props.theme}
                            style={isRunning ? { color: "#BA0000", filter: "invert(0%)" } : { color: "#37911F", filter: "invert(0%)" }}
                            onClick={() => {
                                if (!isRunning) {
                                    start();
                                } else {
                                    stop();
                                };
                            }}
                            title={
                                isRunning ?
                                    "Стоп" :
                                    "Старт"
                            }
                        >
                            {
                                isRunning ?
                                    "stop" :
                                    "play_arrow"
                            }
                        </IconButton>
                    </div>
                </div>
            </h3>
            {
                isRunning &&
                <div className={`${classes.clock} ${classes[props.theme]} row`} ref={stopwatch}>
                    <div className={`${classes.item} col-4`}>
                        <p className={classes.timer}>
                            {
                                Formatting.toDoubleNumber(Time.msToTime(runTime)?.minutes)
                            }
                        </p>
                        <p className={classes.label}>
                            {
                                width > 767 &&
                                Formatting.declOfNum(Time.msToTime(runTime).minutes, ["Минута", "Минуты", "Минут"])
                            }
                        </p>
                    </div>
                    <div className={`${classes.item} col-4`}>
                        <p className={classes.timer}>
                            {
                                Formatting.toDoubleNumber(Time.msToTime(runTime)?.seconds)
                            }
                        </p>
                        <p className={classes.label}>
                            {
                                width > 767 &&
                                Formatting.declOfNum(Time.msToTime(runTime).seconds, ["Секунда", "Секунды", "Секунд"])
                            }
                        </p>
                    </div>
                    <div className={`${classes.item} col-4`}>
                        <p className={classes.timer}>
                            {
                                Formatting.toDoubleNumber(Time.msToTime(runTime)?.milliseconds)
                            }
                        </p>
                        <p className={classes.label}>
                            {
                                width > 767 &&
                                "Мс"
                            }
                        </p>
                    </div>
                </div>
            }
            {
                intervals.length > 0 &&
                <>
                    <h4 className='mt-3 jcsb'>
                        Интервалы
                        {
                            isRunning &&
                            intervals[intervals.length - 1] !== runTime &&
                            <IconButton
                                theme={props.theme}
                                style={{ color: "#37911F", filter: "invert(0%)" }}
                                onClick={() => {
                                    setIntervals([...intervals, runTime]);
                                }}
                                title="Добавить интервал"
                            >
                                add
                            </IconButton>
                        }
                    </h4>
                    <List
                        theme={props.theme}
                        className={`${classes.list} mt-4`}
                        style={{ maxHeight: "300px", overflow: "auto" }}
                    >
                        <TransitionGroup>
                            {
                                intervals.slice(0).reverse().map((interval, x) =>
                                    <CSSTransition
                                        key={interval}
                                        classNames="fade"
                                        timeout={300}
                                    >
                                        <li className='jcsb'>
                                            <span>
                                                {
                                                    Formatting.toDoubleNumber(Time.msToTime(interval).minutes)
                                                }:
                                                {
                                                    Formatting.toDoubleNumber(Time.msToTime(interval).seconds)
                                                }:
                                                {
                                                    Formatting.toDoubleNumber(Time.msToTime(interval).milliseconds)
                                                }
                                            </span>
                                            <span>
                                                {
                                                    x < intervals.length - 1 &&
                                                    <>
                                                        <span style={{ color: "#888" }}>
                                                            +
                                                        </span>
                                                        {
                                                            Formatting.toDoubleNumber(Time.msToTime(interval - intervals.slice(0).reverse()[x + 1]).minutes)
                                                        }:
                                                        {
                                                            Formatting.toDoubleNumber(Time.msToTime(interval - intervals.slice(0).reverse()[x + 1]).seconds)
                                                        }.
                                                        {
                                                            Formatting.toDoubleNumber(Time.msToTime(interval - intervals.slice(0).reverse()[x + 1]).milliseconds)
                                                        }
                                                    </>
                                                }
                                            </span>
                                        </li>
                                    </CSSTransition>
                                )
                            }
                        </TransitionGroup>
                    </List>
                </>
            }
        </div>
    );
};

export default Stopwatch;