import React, { useContext } from 'react';
import classes from './Button.module.css';
import sound from '../../../media/sounds/button.mp3';
import useSound from 'use-sound';
import { SoundContext, VibrationContext } from '../../../context';

const Button = ({ children, ...props }) => {
    const [play] = useSound(sound, { interrupt: true });
    const isSound = useContext(SoundContext);
    const isVibration = useContext(VibrationContext);

    return (
        <button
            style={props.style || {}}
            onClick={props.onClick ? () => {
                props.onClick();
                if (isSound) {
                    play();
                    if (isVibration && window?.navigator?.vibrate) {
                        window.navigator.vibrate(10);
                    };
                };
            } : function () { }}
            className={`${classes.myBtn} ${props.className ? props.className : ""} ${props.red ? classes.red : ''}`}
        >
            {children}
        </button>
    );
};

export default Button;