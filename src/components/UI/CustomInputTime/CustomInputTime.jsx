import React, { useEffect, useState } from 'react';
import classes from './CustomInputTime.module.css';

const CustomInputTime = (props) => {
    const [value, setValue] = useState('00:00');

    useEffect(() => {
        if (props.reset) {
            setValue('00:00');
            props.setReset(false);
        };
    }, [props.reset]);

    return (
        <input
            value={value}
            onChange={(e) => {
                if (props.onChange) {
                    props.onChange(e.target.value);
                };
                setValue(e.target.value);
            }}
            className={`${classes.inp} ${classes[props.theme]}`}
            style={props.style || {}}
            type="time"
            step={2}
        />
    );
};

export default CustomInputTime;