import React from 'react';
import classes from './Checkbox.module.scss';

const Checkbox = (props) => {
    return (
        <div
            className={classes.block}
            onClick={() => {
                if (!props.disabled) {
                    props.setChecked(!props.checked);
                };
            }}
        >
            <input
                type="checkbox"
                value={props.value}
                checked={props.checked}
                className={`${props.className} ${classes.checkbox}`}
            />
            <label
                className={`${props.className} ${classes.label} ${classes[props.theme]}`}
            >
                {props.children}
            </label>
        </div>
    );
};

export default Checkbox;