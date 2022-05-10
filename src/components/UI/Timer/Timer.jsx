import React, { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import Time from '../../../API/Time';
import CustomInputTime from '../CustomInputTime/CustomInputTime';
import TimeBlock from '../TimeBlock/TimeBlock';
import classes from './Timer.module.css';
import warning from '../../../media/sounds/countdownwarning.wav';
import alarm from '../../../media/sounds/alarm.wav';
import Modal from '../Modal/Modal';
import IconButton from '../IconButton/IconButton';
import Storage from '../../../API/Storage';
import TimeList from '../TimeList/TimeList';
import InputPlaceholder from '../InputPlaceholder/InputPlaceholder';
import Formatting from '../../../API/Formatting';
import List from '../List/List';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Timer = (props) => {
    const snippets = [
        {
            title: "Зубная щётка",
            icon: "mood",
            time: "00:02"
        },
        {
            title: "Лицевая маска",
            icon: "face_retouching_natural",
            time: "00:15"
        },
        {
            title: "Яйца на пару",
            icon: "egg",
            time: "00:10"
        },
        {
            title: "Варка пельменей",
            icon: "alarm",
            time: "00:10"
        },
        {
            title: "Градусник",
            icon: "device_thermostat",
            time: "00:10"
        }
    ];
    const [modal, setModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [running, setRunning] = useState(false);
    const [paused, setPaused] = useState(false);
    const [timer, setTimer] = useState('00:00');
    const [now, setNow] = useState();
    const [to, setTo] = useState();
    const [reset, setReset] = useState(false);
    const timeblock = useRef(null);
    const timeout = useRef(null);
    const interval = useRef(null);
    const soundInterval = useRef(null);
    const [play, { stop }] = useSound(alarm, { interrupt: true });
    const [sound, { pause }] = useSound(warning, { interrupt: true });
    const [played, setPlayed] = useState(false);
    const [mysnippets, setMysnippets] = useState(
        Storage.getUserData('data')?.extended?.time?.mysnippets ?
            Storage.getUserData('data')?.extended?.time?.mysnippets :
            []
    );
    const [isFocus, setIsFocus] = useState(false);
    const [highlight, setHighlight] = useState(false);
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [resetNew, setResetNew] = useState(false);

    const startFunc = () => {
        clearInterval(soundInterval.current);
        clearTimeout(timeout.current);
        clearInterval(interval.current);
        setTo(new Date(new Date().getTime() + Time.inptimeToMs(timer)));
        setRunning(true);
        setPlayed(false);
        setNow(new Date());
        timeout.current = setTimeout(() => {
            setNow(new Date());
            interval.current = setInterval(() => {
                setNow(new Date());
            }, 1000);
        }, 1000 - new Date().getMilliseconds());
    };

    const pauseFunc = () => {
        if (paused) {
            setPaused(false);
            setTo(to => new Date(new Date().getTime() + to.getTime() - now.getTime()));
            clearInterval(soundInterval.current);
            clearTimeout(timeout.current);
            clearInterval(interval.current);
            setPlayed(false);
            setNow(new Date());
            timeout.current = setTimeout(() => {
                setNow(new Date());
                interval.current = setInterval(() => {
                    setNow(new Date());
                }, 1000);
            }, 1000 - new Date().getMilliseconds());
        } else {
            setPaused(true);
            clearInterval(soundInterval.current);
            clearTimeout(timeout.current);
            clearInterval(interval.current);
            setPlayed(false);
            stop();
            pause();
        };
    };

    const alertFunc = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        };
        clearInterval(soundInterval.current);
        clearInterval(interval.current);
        clearTimeout(timeout.current);
        setRunning(false);
        document.getElementById("title").textContent = "Таймер сработал!";
        play();
        soundInterval.current = setInterval(() => {
            play();
        }, 8000);
        setModal(true);
        setTo(null);
        setTimer('00:00');
        setReset(true);
    };

    const stopFunc = () => {
        clearInterval(soundInterval.current);
        clearInterval(interval.current);
        clearTimeout(timeout.current);
        stop();
        pause();
        setRunning(false);
        setTo(null);
        setTimer('00:00');
        setReset(true);
    };

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                time: {
                    ...Storage.getUserData('data')?.extended?.time,
                    mysnippets: mysnippets
                }
            }
        });
    }, [mysnippets]);

    useEffect(() => {
        if (!running) {
            document.getElementById("title").textContent = "Работа со временем";
        };
    }, [running]);

    useEffect(() => {
        if (timer !== '00:00') {
            startFunc();
        };
    }, [timer]);

    useEffect(() => {
        if (running) {
            document.getElementById("title").textContent = `${Time.msToTime(to - now)?.hours}:${Time.msToTime(to - now)?.minutes}:${Time.msToTime(to - now)?.seconds} - Таймер`;
        };
        if (to - now <= 0 && running) {
            alertFunc();
        } else if (to - now <= 3000 && to - now > 2000 && running && !played) {
            sound();
            setPlayed(true);
        };
    }, [now]);

    useEffect(() => {
        if (addModal) {
            setTimeout(() => {
                setIsFocus(true);
            }, 50);
        } else {
            setName('');
            setTime('');
            setResetNew(true);
            setIsFocus(false);
        };
    }, [addModal]);

    useEffect(() => {
        if (highlight) {
            setTimeout(() => {
                setHighlight(false);
            }, 1500);
        };
    }, [highlight]);

    useEffect(() => {
        return () => {
            clearInterval(interval.current);
            clearTimeout(timeout.current);
            setNow(null);
            setTo(null);
            document.getElementById("title").textContent = "Подарок";
        };
    }, []);

    return (
        <div className='mt-4'>
            <div className="mw500">
                <h3 className="jcsb">
                    Таймер
                    {
                        running ?
                            <div className="jcsb">
                                <IconButton
                                    theme={props.theme}
                                    onClick={() => timeblock.current.requestFullscreen()}
                                >
                                    fullscreen
                                </IconButton>
                                <div className="jcsb">
                                    <IconButton
                                        theme={props.theme}
                                        style={{ color: "#4361ee", filter: "invert(0%)" }}
                                        onClick={pauseFunc}
                                    >
                                        {
                                            paused ?
                                                "play_arrow" :
                                                "pause"
                                        }
                                    </IconButton>
                                    <IconButton
                                        theme={props.theme}
                                        style={{ color: "#BA0000", filter: "invert(0%)" }}
                                        onClick={stopFunc}
                                    >
                                        stop
                                    </IconButton>
                                </div>
                            </div> :
                            <CustomInputTime
                                theme={props.theme}
                                style={{ fontSize: "1.3rem" }}
                                onChange={(value) => setTimer(value)}
                                reset={reset}
                                setReset={setReset}
                            />
                    }
                </h3>
                {
                    running &&
                    <TimeBlock
                        theme={props.theme}
                        time={to - now}
                        type="time"
                        ref={timeblock}
                    />
                }
            </div>
            {
                !running &&
                <>
                    {
                        mysnippets.length > 0 &&
                        <>
                            <h3 className="mt-3 text-center text-uppercase green">Мои таймеры</h3>
                            <TimeList
                                className="mt-4 mw700"
                                theme={props.theme}
                                list={mysnippets}
                                onClick={(time) => setTimer(time)}
                                addible
                                onAdd={() => setAddModal(true)}
                            />
                        </>
                    }
                    <h3 className="mt-3 text-center text-uppercase green">Быстрый доступ</h3>
                    <TimeList
                        className="mt-4 mw700"
                        theme={props.theme}
                        list={snippets}
                        onClick={(time) => setTimer(time)}
                        addible
                        onAdd={() => setAddModal(true)}
                    />
                    {
                        mysnippets.length > 0 &&
                        <>
                            <h3 className="mt-3 mb-3 text-center text-uppercase red">Удаление таймеров</h3>
                            <List theme={props.theme}>
                                <TransitionGroup>
                                    {
                                        mysnippets.map((el, i) =>
                                            <CSSTransition
                                                key={el.title}
                                                classNames='fade'
                                                timeout={300}
                                            >
                                                <li className='jcsb'>
                                                    <div>
                                                        {
                                                            el.title
                                                        }
                                                        <small style={{color: "#999", marginLeft: '5px'}}>
                                                            {
                                                                el.time
                                                            }
                                                        </small>
                                                    </div>
                                                    <IconButton
                                                        theme={props.theme}
                                                        style={{color: "#BA0000", filter: "invert(0%)"}}
                                                        onClick={() => setMysnippets(mysnippets.filter((s, x) => x !== i))}
                                                    >
                                                        delete
                                                    </IconButton>
                                                </li>
                                            </CSSTransition>
                                        )
                                    }
                                </TransitionGroup>
                            </List>
                        </>
                    }
                </>
            }
            <Modal
                theme={props.theme}
                visible={modal}
                setVisible={setModal}
                title="Уведомление"
                footer="Подтвердить"
                onAccept={() => {
                    document.getElementById("title").textContent = "Работа со временем";
                    stop();
                    clearInterval(soundInterval.current);
                    setModal(false);
                }}
                fixed
            >
                <div className="mw500">
                    <h3>Таймер сработал!</h3>
                </div>
            </Modal>
            <Modal
                theme={props.theme}
                visible={addModal}
                setVisible={setAddModal}
                title="Добавление таймера"
                footer="Добавить"
                onAccept={() => {
                    if (!/^\s*$/.test(name) && time !== '' && time !== '00:00:00' && !mysnippets.map((el) => el.title).includes(Formatting.fBig(name))) {
                        setMysnippets([...mysnippets, {
                            title: Formatting.fBig(name),
                            time: time
                        }]);
                        setName('');
                        setTime('');
                        setAddModal(false);
                    } else {
                        setHighlight(true);
                    };
                }}
            >
                <div className="text-center">
                    <InputPlaceholder
                        theme={props.theme}
                        placeholder="Название"
                        bg={props.theme === "light" ? "#fff" : "#202020"}
                        autoFocus={isFocus}
                        highlight={highlight}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <CustomInputTime
                        theme={props.theme}
                        reset={resetNew}
                        setReset={setResetNew}
                        onChange={(value) => setTime(value)}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default Timer;