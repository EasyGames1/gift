import React, { useEffect, useRef, useState } from 'react';
import Time from '../../../API/Time';
import DateInput from '../DateInput/DateInput';
import IconButton from '../IconButton/IconButton';
import TimeBlock from '../TimeBlock/TimeBlock';
import Modal from '../Modal/Modal';
import useSound from 'use-sound';
import sound from '../../../media/sounds/countdownwarning.wav';
import alarmSound from '../../../media/sounds/alarm.wav';

const Countdown = (props) => {
    const [modal, setModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [now, setNow] = useState();
    const [running, setRunning] = useState(false);
    const [played, setPlayed] = useState(false);
    const timeout = useRef(null);
    const interval = useRef(null);
    const alarmInterval = useRef(null);
    const vibrationInterval = useRef(null);
    const timeblock = useRef(null);
    const [play] = useSound(sound, { interrupt: true });
    const [alarm, { stop }] = useSound(alarmSound, { interrupt: true });

    useEffect(() => {
        if (running) {
            clearInterval(alarmInterval.current);
            clearTimeout(timeout.current);
            clearInterval(interval.current);
            clearInterval(vibrationInterval.current);
            setNow(new Date());
            setPlayed(false);
            timeout.current = setTimeout(() => {
                setNow(new Date());
                setPlayed(false);
                interval.current = setInterval(() => {
                    setNow(new Date());
                }, 1000);
            }, 1000 - new Date().getMilliseconds());
        };
    }, [running, date]);

    useEffect(() => {
        if (date - now <= 0 && running) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            };
            if (window?.navigator?.vibrate) {
                window.navigator.vibrate([200, 100, 300, 100]);
                vibrationInterval.current = setInterval(() => {
                    window.navigator.vibrate([200, 100, 300, 100]);
                }, 1000);
            };
            alarm();
            alarmInterval.current = setInterval(() => {
                alarm();
            }, 8000);
            setModal(true);
            clearTimeout(timeout.current);
            clearInterval(interval.current);
            setRunning(false);
        } else if (date - now <= 3000 && !played && running) {
            play();
            setPlayed(true);
        };
    }, [now]);

    useEffect(() => {
        return () => {
            clearInterval(alarmInterval.current);
            clearTimeout(timeout.current);
            clearInterval(interval.current);
            clearInterval(vibrationInterval.current);
            setRunning(false);
            setModal(false);
            setDate(null);
            setNow(null);
            document.getElementById("title").textContent = "Подарок";
        };
    }, []);

    return (
        <div className='mw500 mt-4'>
            <h3 className='mb-3 jcsb'>
                Обратный отсчёт
                <div className="jcsb">
                    {
                        running &&
                        <IconButton
                            theme={props.theme}
                            onClick={() => timeblock.current.requestFullscreen()}
                        >
                            fullscreen
                        </IconButton>
                    }
                    <div className="jcsb">
                        {
                            running ?
                                <IconButton
                                    theme={props.theme}
                                    style={{ color: "#BA0000", filter: "invert(0%)" }}
                                    onClick={() => setRunning(false)}
                                >
                                    stop
                                </IconButton> :
                                <div style={{ maxWidth: "150px", fontSize: "1.3rem" }}>
                                    <DateInput
                                        theme={props.theme}
                                        date={date}
                                        setDate={setDate}
                                        start={new Date()}
                                        onChange={() => !running && setRunning(true)}
                                    />
                                </div>
                        }
                    </div>
                </div>
            </h3>
            {
                running &&
                <>
                    {
                        (Time.msToTime(date - now)?.years !== 0 ||
                            Time.msToTime(date - now)?.months !== 0 ||
                            Time.msToTime(date - now)?.days !== 0) &&
                        <TimeBlock
                            theme={props.theme}
                            time={date - now}
                            type="date"
                        />
                    }
                    <TimeBlock
                        theme={props.theme}
                        time={date - now}
                        type="time"
                        ref={timeblock}
                    />
                </>
            }
            <Modal
                theme={props.theme}
                visible={modal}
                setVisible={setModal}
                title="Уведомление"
                footer="Подтвердить"
                onAccept={() => {
                    stop();
                    clearInterval(alarmInterval.current);
                    clearInterval(vibrationInterval.current);
                    if (window?.navigator?.vibrate) {
                        window.navigator.vibrate(0);
                    };
                    setModal(false);
                }}
                fixed
            >
                <div className="mw500">
                    <h3>Время обратного отсчёта истекло.</h3>
                </div>
            </Modal>
        </div>
    );
};

export default Countdown;