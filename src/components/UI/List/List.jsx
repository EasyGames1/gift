import React from 'react';
import classes from './List.module.css';

const List = (props) => {
    return (
        <ul
            className={`${props.className} ${classes.bullet} ${classes[props.theme]} ${props.clickable ? classes.clickable : ''}`}
            style={props.style || {}}
        >
            {props.children}
        </ul>
    );
};

export default List;