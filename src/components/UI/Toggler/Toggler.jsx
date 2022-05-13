import React, { useContext } from 'react';
import useSound from 'use-sound';
import { SoundContext, VibrationContext } from '../../../context';
import sound from '../../../media/sounds/toggle.mp3';
import classes from './Toggler.module.sass';

const Toggler = (props) => {
    const [play] = useSound(sound, { interrupt: true });
    const isSound = useContext(SoundContext);
    const isVibration = useContext(VibrationContext);

    return (
        <>
            <input
                type="checkbox"
                className={`${classes.checkbox} ${props.disabled && classes.disabled}`}
                checked={props.checked}
                readOnly
                onChange={props.onChange}
            />
            <label
                onClick={() => {
                    if (!props.disabled) {
                        props.setChecked(!props.checked);
                        if (isSound) {
                            play();
                            if (isVibration && window?.navigator?.vibrate) {
                                window.navigator.vibrate(10);
                            };
                        };
                    };
                }}
                className={`${props.className}`}
                style={props.style}
                title={props.title}
            />
        </>
    );
};

export default Toggler;