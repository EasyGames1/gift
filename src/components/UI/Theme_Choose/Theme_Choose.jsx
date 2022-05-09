import React from 'react';
import classes from './Theme_Choose.module.css';

const Theme_Choose = (props) => {
    return (
        <button
            className={`${props.showTheme === "dark" ? classes.isDark : classes.isLight} ${props.theme === "dark" ? classes.dark : ""}`}
            onClick={() => props.setTheme(props.showTheme)}
            disabled={props.showTheme === props.theme}
        >
            {props.showTheme === "dark" ? "Тёмная" : "Светлая"}
        </button>
    );
};

export default Theme_Choose;