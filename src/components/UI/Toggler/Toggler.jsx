import React from 'react';
import classes from './Toggler.module.sass';

const Toggler = (props) => {
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