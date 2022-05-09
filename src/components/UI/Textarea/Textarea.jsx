import React from 'react';
import classes from './Textarea.module.css';

const Textarea = (props) => {

    return (
        <textarea
            style={props.style || {}}
            className={`${props.className && props.className} ${classes.textarea} ${classes[props.theme]}`}
            onChange={props.onChange || function () { }}
            onKeyDown={props.onKeyDown || function(){}}
            value={props.value || ''}
            onSelect={props.onSelect || props.onChange}
            autoFocus={props.autoFocus || false}
        />
    );
};

export default Textarea;