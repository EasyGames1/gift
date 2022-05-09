import React from 'react';
import classes from './IconButton.module.css';
import 'material-icons';

const IconButton = ({ children, theme, ...props }) => {
    return (
        <span
            {...props}
            className={`${classes.myBtn} ${props.disabled && classes.disabled} ${theme === "dark" ? classes.dark : ""} material-icons${props.outlined ? "-outlined" : ""}`}
        >
            {children}
        </span>
    );
};
export default IconButton;