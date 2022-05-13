import React, { useContext } from 'react';
import classes from './IconButton.module.css';
import 'material-icons';
import { SoundContext, VibrationContext } from '../../../context';
import useSound from 'use-sound';
import sound from '../../../media/sounds/iconbutton.mp3';

const IconButton = ({ children, theme, onClick, ...props }) => {
    const [play] = useSound(sound, { interrupt: true });
    const isSound = useContext(SoundContext);
    const isVibration = useContext(VibrationContext);

    return (
        <span
            {...props}
            onClick={onClick ? () => {
                onClick();
                if (isSound) {
                    play();
                    if (isVibration && window?.navigator?.vibrate) {
                        window.navigator.vibrate(10);
                    };
                };
            } : () => { }}
            className={`${classes.myBtn} ${props.disabled && classes.disabled} ${theme === "dark" ? classes.dark : ""} material-icons${props.outlined ? "-outlined" : ""}`}
        >
            {children}
        </span>
    );
};
export default IconButton;