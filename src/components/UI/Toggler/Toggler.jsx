import React, { useContext } from 'react';
import useSound from 'use-sound';
import { SoundContext, VibrationContext } from '../../../context';
import classes from './Toggler.module.sass';

const Toggler = (props) => {
    const isSound = useContext(SoundContext);
    const isVibration = useContext(VibrationContext);
    const sound = isSound && require('../../../media/sounds/toggle.mp3');
    const [play] = useSound(sound, { interrupt: true });

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
                        };
                        if (isVibration && window?.navigator?.vibrate) {
                            window.navigator.vibrate(10);
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