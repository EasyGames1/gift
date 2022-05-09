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

const Timer = (props) => {
    const [modal, setModal] = useState(false);
    const [running, setRunning] = useState(false);
    const [timer, setTimer] = useState('00:00');
    const [now, setNow] = useState();
    const [to, setTo] = useState();
    const [reset, setReset] = useState(false);
    const timeout = useRef(null);
    const interval = useRef(null);
    const soundInterval = useRef(null);
    const [play, { stop }] = useSound(alarm, { interrupt: true });
    const [sound, { pause }] = useSound(warning, { interrupt: true });
    const [played, setPlayed] = useState(false);

    const startFunc = () => {
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

    const alertFunc = () => {
        clearInterval(soundInterval.current);
        clearInterval(interval.current);
        clearTimeout(timeout.current);
        setRunning(false);
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
        if (timer !== '00:00') {
            startFunc();
        };
    }, [timer]);

    useEffect(() => {
        if (to - now <= 0 && running) {
            alertFunc();
        } else if (to - now <= 3000 && to - now > 2000 && running && !played) {
            sound();
            setPlayed(true);
        };
    }, [now]);

    useEffect(() => {


        return () => {
            clearInterval(interval.current);
            clearTimeout(timeout.current);
            setNow(null);
            setTo(null);
        };
    }, []);

    return (
        <div className='mw500 mt-4'>
            <h3 className="jcsb">
                Таймер
                {
                    running ?
                        <IconButton
                            theme={props.theme}
                            style={{ color: "#BA0000", filter: "invert(0%)" }}
                            onClick={stopFunc}
                        >
                            stop
                        </IconButton> :
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
                />
            }
            <Modal
                theme={props.theme}
                visible={modal}
                setVisible={setModal}
                title="Уведомление"
                footer="Подтвердить"
                onAccept={() => {
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
        </div>
    );
};

export default Timer;