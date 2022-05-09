import React, { useEffect, useRef, useState } from 'react';
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
    const [fullscreen, setFullscreen] = useState(false);
    const timeout = useRef(null);
    const interval = useRef(null);
    const alarmInterval = useRef(null);
    const [play] = useSound(sound, { interrupt: true });
    const [alarm] = useSound(alarmSound, { interrupt: true });

    useEffect(() => {
        if (running) {
            clearTimeout(timeout.current);
            clearInterval(interval.current);
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
            clearTimeout(timeout.current);
            clearInterval(interval.current);
            setRunning(false);
            setModal(false);
            setDate(null);
            setNow(null);
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
                            onClick={() => setFullscreen(true)}
                        >
                            fullscreen
                        </IconButton>
                    }
                    <div className="jcsb">
                        <div style={{ maxWidth: "150px", fontSize: "1.3rem" }}>
                            <DateInput
                                theme={props.theme}
                                date={date}
                                setDate={setDate}
                                start={new Date()}
                                onChange={() => !running && setRunning(true)}
                            />
                        </div>
                        <IconButton
                            theme={props.theme}
                            style={running ? { color: "#BA0000", filter: "invert(0%)" } : { color: "#37911F", filter: "invert(0%)" }}
                            onClick={() => setRunning(!running)}
                        >
                            {
                                running ?
                                    "stop" :
                                    "play_arrow"
                            }
                        </IconButton>
                    </div>
                </div>
            </h3>
            {
                running &&
                <>
                    <TimeBlock
                        theme={props.theme}
                        time={date - now}
                        type="date"
                    />
                    <TimeBlock
                        theme={props.theme}
                        time={date - now}
                        type="time"
                        fullscreen={fullscreen}
                    />
                </>
            }
            <Modal
                theme={props.theme}
                visible={modal}
                setVisible={setModal}
                title="Уведомление"
                footer="Подтвердить"
                onAccept={() => console.dir(alarm)}
            >
                <div className="mw500">
                    <h3>Время обратного отсчёта истекло.</h3>
                </div>
            </Modal>
        </div>
    );
};

export default Countdown;