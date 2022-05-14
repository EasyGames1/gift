import React, { useContext, useEffect, useState } from 'react';
import { Buttonsound, SoundContext, VibrationContext } from '../../../context';
import classes from './Select.module.css';
import useSound from 'use-sound';

const Select = (props) => {
    const [show, setShow] = useState(false);
    const isSound = useContext(SoundContext);
    const isVibration = useContext(VibrationContext);
    const sound = useContext(Buttonsound);
    const [play] = useSound(sound, { interrupt: true });

    const showFunc = (e) => {
        e.stopPropagation();
        setShow(!show);
    };

    const hide = () => {
        setShow(false);
    };

    const elEvent = (e) => {
        props.onChange(e.props.children);
        if (isSound) {
            play();
            if (isVibration && window?.navigator?.vibrate) {
                window.navigator.vibrate(10);
            };
        };
        setShow(false);
    };

    const clickFunc = (e, children) => {
        if (children.props.onClick) {
            children.props.onClick(e);
        };
        if (!children.props.disabled) {
            elEvent(children);
        };
    }

    useEffect(() => {
        if (props.show !== '') {
            setShow(props.show);
        };
    }, [props.show]);

    useEffect(() => {
        if (props.title !== '') {
            props.onChange(props.title);
            if (isSound) {
                play();
                if (isVibration && window?.navigator?.vibrate) {
                    window.navigator.vibrate(10);
                };
            };
            setShow(false);
        } else {
            props.setTitle(props?.children[0]?.props?.children);
        };
    }, [props.title]);

    useEffect(() => {
        document.addEventListener("click", hide);
        return () => {
            document.removeEventListener("click", hide);
        };
    }, []);

    return (
        <span className={`${props.className ? props.className : ""} ${classes.own} ${show ? classes.show : ""}`}>
            <span
                className={`${classes.select} ${classes[props.theme]}`}
                onClick={showFunc}
            >
                {
                    props.title
                }
            </span>
            <label
                className={classes.label}
                onClick={(e) => e.stopPropagation()}
            >
                {
                    props.children.map((children, child) =>
                        React.cloneElement(
                            children,
                            {
                                key: child,
                                onClick: (e) => clickFunc(e, children),
                            }
                        )
                    )
                }
            </label>
        </span>
    );
};

export default Select;