import React, { useEffect, useRef } from 'react';
import classes from './InputPlaceholder.module.css';


const InputPlaceholder = (props) => {
    const hexToRgbA = (hex) => {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
        }
        throw new Error('Bad Hex');
    };

    const padZero = (str, len) => {
        len = len || 2;
        let zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    };

    const invertColor = (hex) => {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        };
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        };
        let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        return '#' + padZero(r) + padZero(g) + padZero(b);
    };

    const lab = useRef(null);
    const inp = useRef(null);

    useEffect(() => {
        if (props.autoFocus) {
            inp.current.focus();
        } else {
            inp.current.blur();
        };
    }, [props.autoFocus]);

    useEffect(() => {
        if (lab?.current?.style != null) {
            lab.current.style = `color: ${hexToRgbA(invertColor(props.bg))}`;
            lab.current.style.background = props.bg;
        };
    }, [props.bg]);

    return (
        <div className={classes.group}>
            <input
                ref={inp}
                style={props.style || {}}
                className={`
                    ${classes.input} ${props.className || ''} ${props.theme === "dark" ? classes.dark : ''} 
                    ${props.disabled ? classes.disabled : ''} ${props.highlight ? classes.highlight : ''} 
                `}
                value={props.value || ''}
                readOnly={props.disabled || false}
                onChange={props.onChange || function () { }}
                type={props.type || "text"}
                onKeyDown={props.onKeyDown || function() {}}
            />
            {
                props.placeholder &&
                <label
                    ref={lab}
                    style={{ color: hexToRgbA(invertColor(props.bg)), backgroundColor: props.bg }}
                    className={`${classes.placeholder} ${!/^\s*$/.test(props.value) && classes.active}`}
                >
                    {props.highlight ? props.condition ? props.condition : props.placeholder : props.placeholder}
                </label>
            }
        </div>
    );
};

export default InputPlaceholder;