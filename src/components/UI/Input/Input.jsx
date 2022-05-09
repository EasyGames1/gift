import React, { useEffect, useRef } from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    const inp = useRef(null);
    useEffect(() => {
        if (props.autoFocus) {
            inp.current.focus();
        } else {
            inp.current.blur();
        };
    }, [props.autoFocus]);

    return (
        <input
            ref={inp}
            style={props.style || {}}
            className={`${classes.input} ${props.className || ''} ${props.theme === "dark" ? classes.dark : ''} ${props.disabled ? classes.disabled : ''} ${props.highlight ? classes.highlight : ''} `}
            value={props.value || ''}
            readOnly={props.disabled || false}
            onChange={props.onChange || function () { }}
            type={props.type || 'text'}
            onKeyDown={props.onKeyDown || function () { }}
            placeholder={props.placeholder || ""}
        />
    );
};

export default Input;