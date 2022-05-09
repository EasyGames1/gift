import React from 'react';
import classes from './Button.module.css';

const Button = ({children, ...props}) => {
    return (
        <button
            style={props.style || {}}
            onClick={props.onClick || function(){}}
            className={`${classes.myBtn} ${props.className ? props.className : ""} ${props.red ? classes.red : ''}`}
        >
            {children}
        </button>
    );
};

export default Button;